import { Text } from "@mantine/core";
import { useFetchRetrun, } from "../../../../hooks/backendApis/pos/returns";

interface CustomerDetailsProps {
  returnId: string;
}

const CustomerDetails = ({ returnId }: CustomerDetailsProps) => {

  const { data: returnedData } = useFetchRetrun(returnId || "");

  const product = returnedData?.data?.product_variation;
  const salesOrder = returnedData?.data?.sales_order_detail;
  return (
    <main className="w-full h-auto rounded-lg bg-white px-6 py-8">
      <div className="flex justify-between items-center">
        <Text c="black" size="xl" fw={500}>
          SELECTED PRODUCTS TO RETURN
        </Text>
      </div>

      <section className="mt-6 w-full">
        <div className="grid grid-cols-1 gap-4 w-full max-w-6xl mx-auto">
          <ul className="space-y-3">
            <li className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg bg-gray-50 shadow-sm">
              {/* Product image */}
              <img
                src={product?.image_path || "/placeholder.png"}
                alt={product?.name || "Product Image"}
                className="w-20 h-20 object-cover rounded border"
              />

              <div className="flex flex-1 flex-col md:flex-row justify-between w-full gap-4">
                {/* Product info */}
                <div>
                  <span className="font-semibold text-gray-900">
                    {product?.name || "Product Name"}
                  </span>
                  <div className="text-sm text-black-600">
                    <div>EAN: {product?.ean || "N/A"}</div>
                    <div>SKU: {product?.sku || "N/A"}</div>
                  </div>
                </div>

                {/* Unit price */}
                <div className="flex flex-col items-center min-w-[90px]">
                  <span className="text-xs text-black-500">Unit Price</span>
                  <span className="font-medium text-black-500">
                    ₦ {Number(product?.selling_price || 0).toLocaleString()}
                  </span>
                </div>

                {/* Quantity */}
                <div className="flex flex-col items-center min-w-[90px]">
                  <span className="text-xs text-black-500">Quantity</span>
                  <input
                    type="number"
                    min={1}
                    value={salesOrder?.quantity_returned }
                    className="w-16 border rounded px-1 text-center text-black-500"
                    disabled
                  />
                </div>

                {/* Total price */}
                <div className="flex flex-col items-center min-w-[90px]">
                  <span className="text-xs text-black-500">Total Price</span>
                  <span className="font-semibold text-[#2E90FA]">
                    ₦ {Number(salesOrder?.total_price || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default CustomerDetails;
