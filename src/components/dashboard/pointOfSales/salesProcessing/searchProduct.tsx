/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { Box, Button, Loader, Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { Search } from "lucide-react";
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
  negotiated_price?: number;
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
    !!debouncedSearch,
  );

  // --- FIX START: Logic updated to handle Arrays correctly ---
  const products = data?.products?.data
    ? data.products.data
    : Array.isArray(data?.data) // Check if data.data is already an array
      ? data.data
      : data?.data
        ? [data.data] // Only wrap in array if it's a single object
        : [];
  // --- FIX END ---

  const handleSelect = useCallback(
    (item: {
      name: string;
      custom: boolean;
      variationId?: string;
      [key: string]: any;
    }) => {
      const itemWithDefaults = {
        ...item,
        quantity: 1,
        negotiated_price: item.selling_price || item.price || 0,
      };

      setSelectedItems((prev) => {
        const exists = item.custom
          ? prev.some((i) => i.custom && i.name === item.name)
          : prev.some((i) => i.variationId === item.variationId);

        if (exists) return prev;
        return [...prev, itemWithDefaults];
      });

      if (item.custom) {
        onSelect({ custom: true, name: item.name });
      } else if (item.variationId) {
        onSelect(item.variationId);
      }

      setSearchTerm("");
    },
    [onSelect],
  );

  const handleNegotiatedPriceChange = (itemKey: any, value: string) => {
    const nextPrice = value === "" ? undefined : Number(value);
    setSelectedItems((prev) =>
      prev.map((item) =>
        (item.custom ? `custom-${item.name}` : item.variationID) === itemKey
          ? { ...item, negotiated_price: nextPrice }
          : item,
      ),
    );
  };

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

  const processScannedBarcode = useCallback(
    async (eanCode: string) => {
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
          negotiated_price:
            variationData?.selling_price ?? variationData?.price ?? 0,
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
    },
    [isScanningBarcode, scanProductMutation, handleSelect],
  );

  useEffect(() => {
    if (!isScanning) {
      setScannedBuffer("");
      return;
    }

    let bufferTimeout: NodeJS.Timeout;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      clearTimeout(bufferTimeout);

      if (event.key === "Enter") {
        event.preventDefault();
        if (scannedBuffer.trim()) {
          processScannedBarcode(scannedBuffer);
          setScannedBuffer("");
        }
      } else if (event.key.length === 1) {
        setScannedBuffer((prev) => prev + event.key);
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
          : item,
      ),
    );
  };
  useEffect(() => {}, [initialItems]);

  return (
    <main className="w-full h-auto bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
      <div className="px-2 md:px-6 py-2">
        <Text size="lg" fw={500} c="textSecondary.9" tt="uppercase">
          Search Product
        </Text>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="pt-4 pb-4 px-2 md:px-6 w-full md:max-w-md">
          <FormInput
            placeholder="Search by name, SKU, or EAN"
            value={searchTerm}
            paddingY="0.7rem"
            onChange={(val: string) => setSearchTerm(val)}
            leftIcon={<Search color="#667185" />}
          />
        </div>

        <div className="px-2 md:px-6 pb-4 w-full md:w-auto">
          <Button
            variant={"filled-primary"}
            loading={isScanningBarcode}
            disabled={isScanningBarcode}
            onClick={toggleScanning}
            type="button"
            fullWidth
            style={{
              backgroundColor: isScanning ? "#F97316" : undefined,
              animation: isScanning
                ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                : undefined,
            }}
          >
            {isScanning ? "⏹ Stop Scanning" : "Scan Barcode"}
          </Button>
          {isScanning && (
            <Text size="xs" c="orange.6" mt="xs" ta="center">
              Scanner active - scan a barcode now...
            </Text>
          )}
          {scanError && (
            <Text size="xs" c="red" mt="xs" ta="center">
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
        <ul className="px-2 md:px-6 pb-4 space-y-2 max-h-64 overflow-y-auto w-full">
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
                negotiation_price?: number;
                quantity_available?: number;
                custom?: any;
                selling_price?: number;
                ean?: string;
              }) => {
                const isOutOfStock =
                  item.quantity === 0 || item.quantity_available === 0;

                return (
                  <li
                    key={item.variationID || Math.random().toString()} // Fallback key just in case
                    onClick={() => {
                      if (!isOutOfStock) {
                        handleSelect({
                          custom: false,
                          variationId: item.variationID,
                          quantity: 1,
                          ...item,
                        });
                      }
                    }}
                    className={`flex items-center gap-4 px-4 py-3 rounded border 
                      ${
                        isOutOfStock
                          ? "bg-red-50 border-red-200 cursor-not-allowed"
                          : "hover:bg-gray-100 border-gray-200 cursor-pointer"
                      }`}
                  >
                    <img
                      src={item.image_path}
                      alt=""
                      className="w-12 h-12 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <Text fw={500} className="truncate">
                        {item.name}
                      </Text>

                      {isOutOfStock && (
                        <Text size="xs" fw={600} c="red">
                          No stock
                        </Text>
                      )}

                      <Text size="sm" c="dimmed">
                        {item.sku}
                      </Text>
                      <Text size="sm" c="dimmed" className="truncate">
                        {item.variation_attributes
                          ?.map(
                            (attr: { option_type: any; option_value: any }) =>
                              `${attr.option_type}: ${attr.option_value}`,
                          )
                          .join(", ")}
                      </Text>

                      <Text size="xs" c="gray.5">
                        {item.product?.location?.name},{" "}
                        {item.product?.location?.state}
                      </Text>
                    </div>
                  </li>
                );
              },
            )
          ) : (
            <li className="px-4 py-2 text-gray-500">
              No products found for "{debouncedSearch}"
            </li>
          )}
        </ul>
      )}

      {selectedItems.length > 0 && (
        <section className="px-2 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 mt-6 sm:mt-8 border-t border-orange-200 w-full">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-1.5 sm:w-2 h-5 sm:h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full" />
            <Text size="md" fw={700} c="#1D2739">
              Selected Products ({selectedItems.length})
            </Text>
          </div>
          <ul className="space-y-2 sm:space-y-3">
            {selectedItems.map((item) => {
              const itemKey = item.custom
                ? `custom-${item.name}`
                : item.variationId;
              const quantity = item.quantity ?? 0;
              const unitPrice = Number(item.selling_price || 0);
              const negotiatedPrice = Number(
                item.negotiated_price || item.selling_price || 0,
              );
              const totalPrice = negotiatedPrice * quantity;

              return (
                <li
                  key={itemKey}
                  className="flex flex-col xl:flex-row items-start xl:items-stretch gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100/50 border border-orange-200 mb-2 sm:mb-3 transition-all duration-200 hover:shadow-sm"
                >
                  {/* Product Info Section */}
                  <div className="flex items-center gap-3 sm:gap-4 w-full xl:w-72 2xl:w-80 flex-shrink-0">
                    {!item.custom && (
                      <img
                        src={item.image_path}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded-lg sm:rounded-xl flex-shrink-0 border border-orange-200 shadow-sm"
                      />
                    )}

                    <div className="flex flex-col flex-1 min-w-0">
                      <Text
                        fw={600}
                        c="#1D2739"
                        className="truncate text-sm sm:text-base"
                      >
                        {item.name}
                      </Text>

                      <div className="mt-0.5 sm:mt-1 space-y-0.5">
                        {item.ean && (
                          <Text size="xs" c="#667085">
                            EAN:{" "}
                            <Text span fw={500} c="#1D2739">
                              {item.ean}
                            </Text>
                          </Text>
                        )}

                        {item.sku && (
                          <Text size="xs" c="#667085">
                            SKU:{" "}
                            <Text span fw={500} c="#1D2739">
                              {item.sku}
                            </Text>
                          </Text>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price & Quantity Fields */}
                  <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-3 w-full xl:flex-1">
                    <div className="flex flex-col gap-1">
                      <Text size="xs" c="#667085" fw={500}>
                        Unit Price
                      </Text>
                      <Text fw={600} c="#1D2739" size="sm">
                        ₦ {formatMoney(unitPrice.toFixed(2))}
                      </Text>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Text size="xs" c="#667085" fw={500}>
                        Negotiated Price
                      </Text>
                      <FormInput
                        type="number"
                        min={1}
                        leftIcon="₦"
                        value={item.negotiated_price?.toString() ?? ""}
                        onChange={(val: string) => {
                          handleNegotiatedPriceChange(itemKey, val);
                        }}
                        className="w-full font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Text size="xs" c="#667085" fw={500}>
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
                        className="w-full font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-1 bg-white/60 rounded-lg md:bg-transparent md:border-0 border border-orange-100 p-2 md:p-0">
                      <Text size="xs" c="#667085" fw={500}>
                        Total Price
                      </Text>
                      <Text fw={700} c="#F16722" size="md">
                        ₦ {formatMoney(totalPrice.toFixed(2))}
                      </Text>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="w-full md:w-auto xl:self-center md:mx-auto">
                    <Button
                      variant="outline"
                      color="red"
                      size="sm"
                      fullWidth
                      aria-label="Remove selected item"
                      styles={(theme) => ({
                        root: {
                          fontFamily: '"DM Sans", sans-serif',
                          fontWeight: 500,
                          fontSize: "13px",
                          borderRadius: "8px",
                          padding: "0.5rem 1rem",
                          minWidth: "100px",
                          borderColor: theme.colors.red[3],
                          color: theme.colors.red[6],
                          "&:hover": {
                            backgroundColor: theme.colors.red[0],
                            borderColor: theme.colors.red[5],
                            color: theme.colors.red[7],
                          },
                        },
                      })}
                      onClick={() => {
                        setSelectedItems((prev) =>
                          prev.filter((i) =>
                            item.custom
                              ? !(i.custom && i.name === item.name)
                              : i.variationID !== item.variationID,
                          ),
                        );
                      }}
                    >
                      Remove
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
