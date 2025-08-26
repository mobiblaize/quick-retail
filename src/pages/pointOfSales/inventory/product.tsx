// import { useState, useEffect } from "react";

// const Product = ({ product }: { product: any }) => {
//   const [selectedItems, setSelectedItems] = useState<any[]>([]);

//   useEffect(() => {
//     if (product) {
//       setSelectedItems([product]);
//     }
//   }, [product]);

//   return (
//     <main className="w-full h-auto rounded-lg bg-white">
//       {selectedItems.length > 0 && (
//         <section className="px-6 py-4 mt-6 border-t border-gray-300 w-full">
//           <ul className="">
//             {selectedItems.map((item) => {
//               {
//                 /* @ts-ignore */
//               }
//               const itemKey = item.custom
//                 ? /* @ts-ignore */
//                   `custom-${item.name}`
//                 : /* @ts-ignore */
//                   item.variationID;

//               return (
//                 <li
//                   /* @ts-ignore */
//                   key={itemKey}
//                   className="flex items-center gap-4 p-3 rounded bg-gray-50"
//                 >
//                   {/* Image */}
//                   {/* @ts-ignore  */}
//                   {!item.custom && (
//                     /* @ts-ignore */
//                     <img
//                       /* @ts-ignore */
//                       src={item.image_path}
//                       /* @ts-ignore */
//                       alt={item.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   )}

//                   {/* Name, color, sku */}
//                   <div className="flex justify-around gap-[2em] w-full">
//                     {
//                       /* /* @ts-ignore */
//                       <div className="flex flex-col ">
//                         <span className="font-semibold text-gray-900">
//                           {/* @ts-ignore */}
//                           {item.name}
//                         </span>
//                         {/* @ts-ignore */}
//                        {/* Display size and colour if available */}
// {item.variation_attributes?.length > 0 && (
//   <div className="text-sm text-gray-600">
//     {item.variation_attributes.map((attr: any) => (
//       <div key={attr.option_type}>
//         {attr.option_type.charAt(0).toUpperCase() + attr.option_type.slice(1)}:{" "}
//         {attr.option_value}
//       </div>
//     ))}
//   </div>
// )}

//                         {/* @ts-ignore */}
//                         {item.sku && (
//                           <span className="text-sm text-gray-600">
//                             {/* @ts-ignore */}
//                             SKU: {item.sku}
//                           </span>
//                         )}
//                       </div>

//                       /* Stock level */
//                     }
//                     <div className="flex flex-col items-center min-w-[70px]">
//                       <span className="text-md text-black-500">
//                         Stock Quantity
//                       </span>
//                       <span className="font-medium">
//                         {item.quantity_available}
//                       </span>
//                     </div>

//                     {/* Total Price */}
//                     <div className="flex flex-col items-center min-w-[70px]">
//                       <span className="text-md text-black-500">
//                         Reorder Level
//                       </span>
//                       <span className="font-medium">
//                         {item.reorder_level}
//                       </span>
//                     </div>

//                     {/* Remove Button */}
//                     <div className="flex flex-col items-center min-w-[70px]">
//                       <span className="text-md text-black-500">Location</span>
//                       <span className="font-medium ">
//                         {item.product.location.name}
//                       </span>
//                     </div>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         </section>
//       )}
//     </main>
//   );
// };

// export default Product;


import { useState, useEffect } from "react";
import { Text } from "@mantine/core";

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
                    <img
                      src={item.image_path}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}

                  {/* Name, attributes, sku, stock, reorder, location */}
                  <div className="flex justify-around gap-[2em] w-full">
                    {/* Name + attributes + SKU */}
                    <div className="flex flex-col">
                      <Text fw={600} c="dark.9">
                        {item.name}
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
