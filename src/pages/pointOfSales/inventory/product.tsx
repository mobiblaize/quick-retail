
import { useState, useEffect } from "react";
import { Image, Text } from "@mantine/core";

const Product = ({ product }: { product: any }) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  useEffect(() => {
    if (product) {
      setSelectedItems([product]);
    }
  }, [product]);

  return (
    <main className="w-full h-auto rounded-lg bg-white">
      {selectedItems.length > 0 && (
        <section className="px-6 py-4 mt-6 border-t border-gray-300 w-full">
          <ul>
            {selectedItems.map((item) => {
              // build item key
              const itemKey = item.custom
                ? `custom-${item.name}`
                : item.variationID;

              return (
                <li
                  key={itemKey}
                  className="flex items-center gap-4 p-3 rounded bg-gray-50"
                >
                  {/* Image */}
                  {!item.custom && (
                    <Image
                      src={item.image_path}
                      alt=""
                      className="!w-16 !h-16 !object-cover rounded"
                      radius="md"
                      fit="cover"
                      width={64}
                      height={64}
                    />
                  )}

                  {/* Name, attributes, sku, stock, reorder, location */}
                  <div className="flex justify-around gap-[2em] w-full">
                    {/* Name + attributes + SKU */}
                    <div className="flex flex-col">
                      <Text fw={600} c="dark.9">
                        {item.product.product_name}
                      </Text>

                      {/* Variation attributes */}
                      {item.variation_attributes?.length > 0 && (
                        <div>
                          {item.variation_attributes.map((attr: any) => (
                            <Text
                              key={attr.option_type}
                              size="sm"
                              c="gray.6"
                            >
                              {attr.option_type.charAt(0).toUpperCase() +
                                attr.option_type.slice(1)}
                              :{" "}
                              <Text span fw={500}>
                                {attr.option_value}
                              </Text>
                            </Text>
                          ))}
                        </div>
                      )}

                      {/* SKU */}
                      {item.sku && (
                        <Text size="sm" c="gray.6">
                          SKU:{" "}
                          <Text span fw={500}>
                            {item.sku}
                          </Text>
                        </Text>
                      )}
                    </div>

                    {/* Stock Quantity */}
                    <div className="flex flex-col items-center min-w-[70px]">
                      <Text size="sm" c="gray.7">
                        Stock Quantity
                      </Text>
                      <Text fw={500}>{item.quantity_available}</Text>
                    </div>

                    {/* Reorder Level */}
                    <div className="flex flex-col items-center min-w-[70px]">
                      <Text size="sm" c="gray.7">
                        Reorder Level
                      </Text>
                      <Text fw={500}>{item.reorder_level}</Text>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col items-center min-w-[70px]">
                      <Text size="sm" c="gray.7">
                        Location
                      </Text>
                      <Text fw={500}>{item.product.location.name}</Text>
                    </div>
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

export default Product;
