import { useState, useEffect } from "react";
import { Box, Button, Loader, Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { Search } from "lucide-react";
// import { SqrCode } from "../../../../assets/svg";
import { useSearchLocationProducts } from "../../../../hooks/backendApis/pos/products";
import { formatMoney } from "../../../../utils/helpers";
import { useOrderStore } from "../../../../hooks/useOrderFormStore";

interface SelectedItemPayload {
  variationId: string;
  quantity: number;
}

interface SelectedItem {
  variationId?: string;
  quantity?: number;
  price?: number;
  name?: string;
  custom?: boolean;
  [key: string]: any;
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
    //  @ts-ignore
    setItems(selectedItems);
    //  @ts-ignore
    onItemsChange(selectedItems);
  }, [selectedItems]);


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

  const handleSelect = (item: {
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
  };

  const handleQuantityChange = (itemKey: any, value: number) => {
    /* @ts-ignore */
    setSelectedItems((prev) =>
      prev.map((item) =>
        /* @ts-ignore */
        (item.custom ? `custom-${item.name}` : item.variationID) === itemKey
          ? /* @ts-ignore */
          { ...item, quantity: value }
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
      <div className="pt-4 pb-4 max-w-md px-6">
        <FormInput
          placeholder="Search by Name."
          value={searchTerm}
          paddingY="0.7rem"
          onChange={(val: string) => setSearchTerm(val)}
          leftIcon={<Search color="#667185" />}
        // rightIcon={<SqrCode />}
        />
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
                          // @ts-ignore
                          name: item.name,
                          custom: false,
                          variationId: item.variationID,
                          image_path: item.image_path,
                          // @ts-ignore
                          selling_price: item.selling_price,
                          sku: item.sku,
                          // @ts-ignore
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
              {
                /* @ts-ignore */
              }
              const itemKey = item.custom
                ? /* @ts-ignore */
                `custom-${item.name}`
                : /* @ts-ignore */
                item.variationId;
              /* @ts-ignore */
              const quantity = item.quantity ?? 0;
              /* @ts-ignore */
              const unitPrice = Number(item.selling_price || 0);
              const totalPrice = unitPrice * quantity;

              return (
                <li
                  /* @ts-ignore */
                  key={itemKey}
                  className="flex items-center gap-4 p-3 rounded bg-gray-50"
                >
                  {/* Image */}
                  {/* @ts-ignore  */}
                  {!item.custom && (
                    /* @ts-ignore */
                    <img
                      /* @ts-ignore */
                      src={item.image_path}
                      /* @ts-ignore */
                      // alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}

                  {/* Name, color, sku */}
                  <div className="flex justify-around gap-[2em] w-full">
                    {
                      /* /* @ts-ignore */
                      <div className="flex flex-col ">
                        <Text fw={500} c="dark.9">
                          {/* @ts-ignore */}
                          {item.name}
                        </Text>

                        {/* @ts-ignore */}
                        {item.ean && (
                          <Text size="sm" c="gray.6">
                            EAN:{" "}
                            <Text span fw={500}>
                              {item.ean}
                            </Text>
                          </Text>
                        )}

                        {/* @ts-ignore */}
                        {item.sku && (
                          <Text size="sm" c="gray.6">
                            SKU:{" "}
                            <Text span fw={500}>
                              {item.sku}
                            </Text>
                          </Text>
                        )}
                      </div>
                      /* Unit Price */
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
                        /* @ts-ignore */
                        value={item.quantity?.toString() ?? ""}
                        onChange={(val: string) => {

                          if (val === "") {
                            // @ts-ignore
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