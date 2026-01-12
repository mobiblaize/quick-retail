/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  useEffect,
  useCallback,
} from "react";
import { Box, Button, Loader, Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { Search } from "lucide-react";
// import { SqrCode } from "../../../../assets/svg";
import {
  useScanProduct,
  useSearchLocationProducts,
} from "../../../../hooks/backendApis/pos/products";
import { formatMoney } from "../../../../utils/helpers";
import {
  useOrderStore,
  type SelectedItemPayload,
} from "../../../../hooks/useOrderFormStore";

interface SelectedItem extends SelectedItemPayload {
  variationID?: string;
  image_path?: string;
  selling_price?: number;
  sku?: string;
  ean?: string;
  variation_attributes?: any;
  product?: any;
  quantity_available?: number;
}

interface SearchProductProps {
  onSelect: (value: string | { custom: true; name: string }) => void;
  onItemsChange: (items: SelectedItemPayload[]) => void;
  initialItems?: SelectedItem[];
}

const SearchProduct = ({
  onSelect,
  onItemsChange,
  initialItems = [],
}: SearchProductProps) => {
  const { items, setItems } = useOrderStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(items);
  const [hasSetInitial, setHasSetInitial] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedBuffer, setScannedBuffer] = useState("");
  const scanProductMutation = useScanProduct();
  const isScanningBarcode = scanProductMutation.isPending;



  useEffect(() => {
    if (!hasSetInitial && initialItems.length > 0) {
      setSelectedItems((prev) => {
        const newItems = initialItems.filter((initial) => {
          if (initial.custom) {
            return !prev.some((p) => p.custom && p.name === initial.name);
          }
          return !prev.some((p) => p.variationId === initial.variationId);
        });
        return [...prev, ...newItems];
      });
      setHasSetInitial(true);
    }
  }, [initialItems, hasSetInitial]);



  useEffect(() => {
    setItems(selectedItems);
    onItemsChange(selectedItems);
  }, [selectedItems, setItems, onItemsChange]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const { data, isLoading } = useSearchLocationProducts(
    { search: debouncedSearch },
    !!debouncedSearch
  );

  const products = data?.products?.data
    ? data.products.data
    : data?.data
      ? [data.data]
      : [];

  const handleSelect = useCallback((item: {
    name: string;
    custom: boolean;
    variationId?: string;
    [key: string]: any;
  }) => {
    const itemWithDefaultQuantity = {
      ...item,
      quantity: 1,
    };

    setSelectedItems((prev) => {
      const exists = item.custom
        ? prev.some((i) => i.custom && i.name === item.name)
        : prev.some((i) => i.variationId === item.variationId);

      if (exists) return prev;
      return [...prev, itemWithDefaultQuantity];
    });

    if (item.custom) {
      onSelect({ custom: true, name: item.name });
    } else if (item.variationId) {
      onSelect(item.variationId);
    }

    setSearchTerm("");
  }, [onSelect]);

  const extractScannedVariation = (payload: any) => {
    if (!payload) return null;

    const candidates = [
      payload.product_variation,
      payload.variation,
      payload.data?.product_variation,
      payload.data?.variation,
      payload.data?.data?.product_variation,
      payload.data?.data?.variation,
      payload.data?.data,
      payload.data,
      payload,
    ];

    return candidates.find((candidate) => Boolean(candidate)) ?? null;
  };

  const processScannedBarcode = useCallback(async (eanCode: string) => {
    const trimmedCode = eanCode.trim();
    if (!trimmedCode || isScanningBarcode) return;

    setScanError(null);

    try {
      const response = await scanProductMutation.mutateAsync({
        ean: trimmedCode,
      });
      const payload = response?.data ?? response;
      const variationData = extractScannedVariation(payload);

      if (!variationData) {
        setScanError("This barcode did not return a product.");
        return;
      }

      const variationId =
        variationData?.variationID ??
        variationData?.variation_id ??
        variationData?.id ??
        variationData?.product_variation?.variationID ??
        variationData?.product_variation?.variation_id;

      if (!variationId) {
        setScanError("This barcode is not linked to a product variation.");
        return;
      }

      const normalizedItem = {
        ...variationData,
        name:
          variationData?.name ??
          variationData?.product?.name ??
          "Scanned product",
        variationId,
        variationID: variationId,
        selling_price:
          variationData?.selling_price ?? variationData?.price ?? 0,
        price: variationData?.price ?? variationData?.selling_price ?? 0,
        image_path:
          variationData?.image_path ??
          variationData?.product?.image_path ??
          variationData?.product?.image ??
          "",
        sku: variationData?.sku ?? variationData?.product?.sku ?? "",
        ean: variationData?.ean ?? trimmedCode,
        quantity: 1,
        custom: false,
      };

      handleSelect(normalizedItem);
      setIsScanning(false);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.response?.message ??
        error?.message ??
        "Failed to retrieve product for this barcode.";
      setScanError(message);
      setIsScanning(false);
    }
  }, [isScanningBarcode, scanProductMutation, handleSelect]);

  // Listen for physical barcode scanner input when scanning is active
  useEffect(() => {
    if (!isScanning) {
      setScannedBuffer("");
      return;
    }

    let bufferTimeout: NodeJS.Timeout;

    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent default behavior during scanning
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        // Don't interfere if user is typing in an input
        return;
      }

      // Clear any existing timeout
      clearTimeout(bufferTimeout);

      if (event.key === "Enter") {
        // Barcode scanner typically sends Enter after the code
        event.preventDefault();
        if (scannedBuffer.trim()) {
          processScannedBarcode(scannedBuffer);
          setScannedBuffer("");
        }
      } else if (event.key.length === 1) {
        // Accumulate characters (barcode scanners type very fast)
        setScannedBuffer((prev) => prev + event.key);

        // Auto-submit after 100ms of no input (barcode scanners are fast)
        bufferTimeout = setTimeout(() => {
          if (scannedBuffer.trim()) {
            processScannedBarcode(scannedBuffer);
            setScannedBuffer("");
          }
        }, 100);
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      clearTimeout(bufferTimeout);
    };
  }, [isScanning, scannedBuffer, processScannedBarcode]);

  const toggleScanning = () => {
    if (isScanning) {
      setIsScanning(false);
      setScannedBuffer("");
      setScanError(null);
    } else {
      setIsScanning(true);
      setScanError(null);
    }
  };

  const handleQuantityChange = (itemKey: any, value: number | "") => {
    const nextQuantity = value === "" ? undefined : value;
    setSelectedItems((prev) =>
      prev.map((item) =>
        (item.custom ? `custom-${item.name}` : item.variationID) === itemKey
          ? { ...item, quantity: nextQuantity }
          : item
      )
    );
  };
  useEffect(() => { }, [initialItems]);

  return (
    <main className="w-full h-auto  bg-white p-6 rounded-lg shadow-md border border-gray-200">

      <div className="px-6 py-2">
        <Text size="lg" fw={500} c="textSecondary.9" tt="uppercase">
          Search Product
        </Text>
      </div>
      <div className="flex items-center justify-between">
      <div className="pt-4 pb-4 max-w-md px-6">
        <FormInput
          placeholder="Search by name, SKU, or EAN"
          value={searchTerm}
          paddingY="0.7rem"
          onChange={(val: string) => setSearchTerm(val)}
          leftIcon={<Search color="#667185" />}
        />
      </div>

      <div className="px-6 pb-4">
        <Button
          variant={"filled-primary"}
          loading={isScanningBarcode}
          disabled={isScanningBarcode}
          onClick={toggleScanning}
          type="button"
          style={{
            backgroundColor: isScanning ? "#F97316" : undefined,
            animation: isScanning ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : undefined,
          }}
        >
          {isScanning ? "⏹ Stop Scanning" : "Scan Barcode"}
        </Button>
        {isScanning && (
          <Text size="xs" c="orange.6" mt="xs">
            Scanner active - scan a barcode now...
          </Text>
        )}
        {scanError && (
          <Text size="xs" c="red" mt="xs">
            {scanError}
          </Text>
        )}
      </div>
      </div>

      {isLoading && (
        <Box px="md" py="xs">
          <Loader size="sm" color="orange" type="oval" />
        </Box>
      )}

      {!isLoading && debouncedSearch && (
        <ul className="px-6 pb-4 space-y-2 max-h-64 overflow-y-auto max-w-md">
          {products.length > 0 ? (
            products.map(
              (item: {
                variationID: any;
                image_path?: any;
                name: any;
                sku?: any;
                variation_attributes?: any;
                product?: any;
                quantity?: number;
                quantity_available?: number;
                custom?: any;
              }) => {
                const isOutOfStock =
                  item.quantity === 0 ||
                  item.quantity_available === 0;

                return (
                  <li
                    key={item.variationID}
                    onClick={() => {
                      if (!isOutOfStock) {
                        handleSelect({
                          // @ts-expect-error - This is a workaround to fix the type error
                          name: item.name,
                          custom: false,
                          variationId: item.variationID,
                          image_path: item.image_path,
                          // @ts-expect-error - This is a workaround to fix the type error
                          selling_price: item.selling_price,
                          sku: item.sku,
                          // @ts-expect-error - This is a workaround to fix the type error
                          ean: item.ean,
                          quantity: 1,
                          ...item,
                        });
                      }
                    }}
                    className={`flex items-center gap-4 px-4 py-3 rounded border 
                      ${isOutOfStock
                        ? "bg-red-50 border-red-200 cursor-not-allowed"
                        : "hover:bg-gray-100 border-gray-200 cursor-pointer"
                      }`}
                  >
                    <img
                      src={item.image_path}
                      // alt={item.name}
                      alt=""
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <Text fw={500}>{item.name}</Text>

                      {/* Stock warning */}
                      {isOutOfStock && (
                        <Text size="xs" fw={600} c="red">
                          No stock
                        </Text>
                      )}

                      <Text size="sm" c="dimmed">
                        {item.sku}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {item.variation_attributes
                          ?.map(
                            (attr: { option_type: any; option_value: any }) =>
                              `${attr.option_type}: ${attr.option_value}`
                          )
                          .join(", ")}
                      </Text>

                      <Text size="xs" c="gray.5">
                        {item.product?.location?.name}, {item.product?.location?.state}
                      </Text>
                    </div>
                  </li>
                );
              }
            )
          ) : (
            <li
              onClick={() =>
                handleSelect({ name: debouncedSearch, custom: true })
              }
            // className="cursor-pointer px-4 py-2 rounded bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 text-yellow-800 italic"
            >
              {/* Use custom entry: <strong>{debouncedSearch}</strong> */}
            </li>
          )}
        </ul>
      )}

      {selectedItems.length > 0 && (
        <section className="px-6 py-4 mt-6 border-t border-gray-300 w-full">
          <Text size="md" fw={600} c="black">
            SELECTED PRODUCTS ({selectedItems.length})
          </Text>
          <ul className="mt-[2em]">
            {selectedItems.map((item) => {
              const itemKey = item.custom
                ? 
                `custom-${item.name}`
                :
                item.variationId;
              const quantity = item.quantity ?? 0;
              const unitPrice = Number(item.selling_price || 0);
              const totalPrice = unitPrice * quantity;

              return (
                <li
                  key={itemKey}
                  className="flex items-center gap-4 p-3 rounded bg-gray-50"
                >
                  {/* Image */}
                  {!item.custom && (
                    <img
                      src={item.image_path}
                      // alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}

                  {/* Name, color, sku */}
                  <div className="flex justify-around gap-[2em] w-full">
                    {
                      <div className="flex flex-col ">
                        <Text fw={500} c="dark.9">
                          {item.name}
                        </Text>

                        {item.ean && (
                          <Text size="sm" c="gray.6">
                            EAN:{" "}
                            <Text span fw={500}>
                              {item.ean}
                            </Text>
                          </Text>
                        )}

                        {item.sku && (
                          <Text size="sm" c="gray.6">
                            SKU:{" "}
                            <Text span fw={500}>
                              {item.sku}
                            </Text>
                          </Text>
                        )}
                      </div>
                    }
                    <div className="flex flex-col items-center min-w-[70px]">
                      <Text size="xs" c="dark.7">
                        Unit Price
                      </Text>
                      <Text fw={500}>
                        ₦ {formatMoney(unitPrice.toFixed(2))}
                      </Text>
                    </div>

                    {/* Quantity Input */}
                    <div className="min-w-[70px]">
                      <Text size="xs" c="dark.7">
                        Quantity
                      </Text>
                      <FormInput
                        type="number"
                        min={1}
                        value={item.quantity?.toString() ?? ""}
                        onChange={(val: string) => {

                          if (val === "") {
                            handleQuantityChange(itemKey, "");
                            return;
                          }

                          const parsed = parseInt(val, 10);
                          if (!isNaN(parsed) && parsed >= 1) {
                            handleQuantityChange(itemKey, parsed);
                          }
                        }}
                        className="w-16 font-medium"
                      />
                    </div>


                    {/* Total Price */}
                    <div className="flex flex-col items-center min-w-[70px]">
                      <Text size="xs" c="dark.9">
                        Total Price
                      </Text>
                      <Text fw={600} c="#2E90FA">
                        ₦ {formatMoney(totalPrice.toFixed(2))}
                      </Text>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="subtle"
                      color="dark"
                      size="lg"
                      aria-label="Remove selected item"
                      styles={(theme) => ({
                        root: {
                          fontFamily: '"DM Sans", sans-serif',
                          fontWeight: 400,
                          fontSize: "16px",
                          cursor: "pointer",
                          color: "red",
                          "&:hover": {
                            color: theme.colors.orange[5],
                            backgroundColor: "transparent",
                          },
                        },
                      })}
                      onClick={() => {
                        setSelectedItems((prev) =>
                          prev.filter((i) =>
                            item.custom
                              ? !(i.custom && i.name === item.name)
                              : i.variationID !== item.variationID
                          )
                        );
                      }}
                    >
                      &times; Remove
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
};

export default SearchProduct;