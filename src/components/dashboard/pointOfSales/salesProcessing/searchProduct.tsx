import { useState, useEffect, SetStateAction } from "react";
import { Divider, Loader, Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { Search } from "lucide-react";
import { SqrCode } from "../../../../assets/svg";
import { useSearchAllProducts } from "../../../../hooks/backendApis/pos/products";

interface SelectedItemPayload {
  variationId: string;
  quantity: number;
}

interface SearchProductProps {
  onSelect: (value: string | { custom: true; name: string }) => void;
  onItemsChange: (items: SelectedItemPayload[]) => void;
}

const SearchProduct = ({ onSelect, onItemsChange }: SearchProductProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    onItemsChange(selectedItems);
  }, [selectedItems, onItemsChange]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const { data, isLoading } = useSearchAllProducts(
    { search: debouncedSearch },
    !!debouncedSearch
  );

  const products = data?.products?.data
    ? data.products.data
    : data?.data
    ? [data.data]
    : [];

  const handleSelect = (item: {
    name: any;
    custom: any;
    variationID?: any;
  }) => {
         /* @ts-ignore */
    setSelectedItems((prev) => {
           /* @ts-ignore */
      if (item.custom && prev.some((i) => i.custom && i.name === item.name)) {
        return prev;
      }
      if (
        !item.custom &&
             /* @ts-ignore */
        prev.some((i) => i.variationID === item.variationID)
      ) {
        return prev;
      }
      return [...prev, item];
    });

    if (item?.custom) {
      onSelect({ custom: true, name: item.name });
    } else {
      onSelect(item.variationID);
    }

    setSearchTerm("");
  };

  const handleQuantityChange = (itemKey: any, value: number) => {
         /* @ts-ignore */
    setSelectedItems((prev) =>
      prev.map((item) =>
           /* @ts-ignore */
        (item.custom ? `custom-${item.name}` : item.variationID) === itemKey
             /* @ts-ignore */
          ? { ...item, quantity: value }
          : item
      )
    );
  };

  return (
    <main className="w-full h-auto rounded-lg bg-white">
      <div className="px-6 py-2">
        <Text size="lg" fw={500} c="textSecondary.9" tt="uppercase">
          Search Product
        </Text>
      </div>
      <Divider size="sm" className="mt-3" color="#E4E7EC" />
      <div className="pt-8 pb-4 max-w-md px-6">
        <FormInput
          placeholder="Search by Name."
          value={searchTerm}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setSearchTerm(e.target.value)
          }
          leftIcon={<Search color="#667185" />}
          rightIcon={<SqrCode />}
        />
      </div>

      {isLoading && (
        <div className="px-6 py-2">
          <Loader size="sm" />
        </div>
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
                custom?: any;
              }) => (
                <li
                  key={item.variationID}
                       /* @ts-ignore */
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-4 cursor-pointer px-4 py-3 rounded hover:bg-gray-100 border border-gray-200"
                >
                  <img
                    src={item.image_path}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.sku}</span>
                    <span className="text-sm text-gray-500">
                      {item.variation_attributes
                        ?.map(
                          (attr: { option_type: any; option_value: any }) =>
                            `${attr.option_type}: ${attr.option_value}`
                        )
                        .join(", ")}
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.product?.location?.name},{" "}
                      {item.product?.location?.state}
                    </span>
                  </div>
                </li>
              )
            )
          ) : (
            <li
              onClick={() =>
                handleSelect({ name: debouncedSearch, custom: true })
              }
              className="cursor-pointer px-4 py-2 rounded bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 text-yellow-800 italic"
            >
              Use custom entry: <strong>{debouncedSearch}</strong>
            </li>
          )}
        </ul>
      )}

      {/* New selected items section */}
      {selectedItems.length > 0 && (
        <section className="px-6 py-4 mt-6 border-t border-gray-300 w-full">
          <Text size="md" fw={600} c="black" className="mb-3">
            SELECTED PRODUCTS
          </Text>
          <ul className="">
            {selectedItems.map((item) => {
                   {/* @ts-ignore */}
              const itemKey = item.custom
                   /* @ts-ignore */
                ? `custom-${item.name}`
                     /* @ts-ignore */
                : item.variationID;
                     /* @ts-ignore */
              const quantity = item.quantity ?? 0; // default quantity 1
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
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}

                  {/* Name, color, sku */}
                  <div className="flex justify-around gap-[2em] w-full">
                        {/* /* @ts-ignore */ 
                    <div className="flex flex-col ">
                      <span className="font-semibold text-gray-900">
                       {/* @ts-ignore */}
                        {item.name}
                      </span>
                      {/* @ts-ignore */}
                      {item.ean && (
                        <span className="text-sm text-gray-600">
                          {/* @ts-ignore */}
                          EAN: {item.ean}
                        </span>
                      )}
                      {/* @ts-ignore */}
                      {item.sku && (
                        <span className="text-sm text-gray-600">
                          {/* @ts-ignore */}
                          SKU: {item.sku}
                        </span>
                      )}
                    </div>

                    /* Unit Price */}
                    <div className="flex flex-col items-center min-w-[70px]">
                      <span className="text-xs text-gray-500">Unit Price</span>
                      <span className="font-medium">
                        ${unitPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity Input */}
                    <div className="min-w-[70px]">
                      <span className="text-xs text-gray-500">Quantity</span>
                      <FormInput
                        type="number"
                        min={1}
                             /* @ts-ignore */
                        value={item.quantity?.toString() ?? ""}
                        onChange={(e: { target: { value: any; }; }) => {
                          const val = e.target.value;

                          // Allow empty value while typing
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
                        className="w-16"
                      />
                    </div>

                    {/* Total Price */}
                    <div className="flex flex-col items-center min-w-[70px]">
                      <span className="text-xs text-gray-500">Total Price</span>
                      <span className="font-semibold text-[#2E90FA]">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => {
                        setSelectedItems((prev) =>
                          prev.filter((i) =>
                          // @ts-ignore
                            item.custom
                              // @ts-ignore
                              ? !(i.custom && i.name === item.name)
                                // @ts-ignore
                              : i.variationID !== item.variationID
                          )
                        );
                      }}
                      className="text-red-500 hover:text-red-700 font-bold text-xxl"
                      aria-label="Remove selected item"
                    >
                      &times; Remove
                    </button>
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
