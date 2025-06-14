import { useState, useEffect } from "react";

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
          <ul className="">
            {selectedItems.map((item) => {
              {
                /* @ts-ignore */
              }
              const itemKey = item.custom
                ? /* @ts-ignore */
                  `custom-${item.name}`
                : /* @ts-ignore */
                  item.variationID;

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
                    {
                      /* /* @ts-ignore */
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

                      /* Stock level */
                    }
                    <div className="flex flex-col items-center min-w-[70px]">
                      <span className="text-md text-black-500">
                        Stock Quantity
                      </span>
                      <span className="font-medium">
                        {item.quantity_available}
                      </span>
                    </div>

                    {/* Total Price */}
                    <div className="flex flex-col items-center min-w-[70px]">
                      <span className="text-md text-black-500">
                        Reorder Level
                      </span>
                      <span className="font-medium">
                        {item.reorder_level}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <div className="flex flex-col items-center min-w-[70px]">
                      <span className="text-md text-black-500">Location</span>
                      <span className="font-medium ">
                        {item.product.location.name}
                      </span>
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
