import { Text } from "@mantine/core";
import { truncateText } from "../../../../utils/helpers";
import others from "../../../../assets/images/others.png";
import DivisionDiscountChartReport from "../../../General/table/divisonDiscountChart";

interface DiscountCustomerAnalysisProps {
  reportInfo: {
    reportData: {
      data: {
        top_discounted_products?: {
            image_path: string;
            sku: string;
          product_name: string;

          selling_price: number;

          total_discount_value: string;

          total_redemptions: number;
        }[];
      };
    };
  };
}

const DiscountAnalysis = ({ reportInfo }: DiscountCustomerAnalysisProps) => {
  const rawProducts = reportInfo?.reportData?.data?.top_discounted_products;
  const productSales =
    rawProducts && typeof rawProducts === "object"
      ? Object.values(rawProducts)
      : [];

  // Separate "Others" product
  const otherProduct = productSales.find((p) => p.product_name === "Others");

  // Filter out Others + sort by redemptions
  const topProducts = productSales
    .filter((p) => p.product_name !== "Others")
    .sort((a, b) => Number(b.total_redemptions) - Number(a.total_redemptions))
    .slice(0, 4);




  return (
    <main className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[50%] h-auto px-3 sm:px-4 py-6 sm:py-8 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <div className="flex-col">
            <Text size="xl" fw={600} c="textSecondary.9">
              Top Discounted Product
            </Text>
            <Text size="sm" className="text-gray-600 font-normal mb-4">
            See how your data on discounted products
            </Text>
          </div>
        </div>

        <DivisionDiscountChartReport discounts={productSales} />
      </div>

      <section className="w-full lg:w-[50%] h-auto px-4 sm:px-6 py-6 sm:py-8 rounded-lg bg-white">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
          Top Redemption by Products
          </Text>
          <Text size="sm" className="text-gray-600 font-normal mb-4">
          See how your customers are buying
          </Text>
        </div>

<div className="mt-6 flex flex-col gap-4">
  {/* Header */}
  <div className="flex justify-between items-center px-2 py-2 bg-gray-100 rounded font-medium text-sm text-black">
    <div className="flex-1 min-w-0">Product</div>
    <div className="flex gap-8 items-center justify-end text-right min-w-[200px]">
      <div className="min-w-[80px]">Selling Price</div>
      <div className="min-w-[80px]">Redemption</div>
    </div>
  </div>

  {/* Product List */}
  {topProducts.map((product, index) => (
    <div
      key={index}
      className="flex justify-between items-center px-2 py-2 hover:bg-gray-100 rounded"
    >
      <div className="flex gap-2 items-center flex-1 min-w-0">
        <img
          src={product.image_path || "/placeholder.png"}
          alt={product.product_name}
          className="w-10 h-10 rounded object-cover"
        />
        <div className="flex flex-col truncate">
          <Text fw={500} size="sm" c="black">
            {truncateText(product.product_name || "Unnamed Product")}
          </Text>
          <Text fw={500} size="sm" c="gray">
            {/* @ts-ignore */}
            {product.sku || "Unnamed Product"}
          </Text>
        </div>
      </div>
      <div className="flex gap-8 items-center justify-end text-right min-w-[200px]">
        <Text fw={400} size="sm" c="black" className="min-w-[80px]">
          ₦{Number(product.selling_price || 0).toLocaleString()}
        </Text>
        <Text fw={400} size="sm" c="black" className="min-w-[80px]">
          {Number(product.total_redemptions || 0).toLocaleString()} sold
        </Text>
      </div>
    </div>
  ))}

  {/* Others */}
  {otherProduct && (
    <div className="flex justify-between items-center px-2 py-2 bg-gray-50 rounded">
      <div className="flex gap-2 items-center flex-1 min-w-0">
        <img
          src={others}
          alt="Other Products"
          className="w-10 h-10 rounded object-cover"
        />
        <div className="flex flex-col">
          <Text fw={500} size="sm" c="black">
            Other Products
          </Text>
        </div>
      </div>
      <div className="flex gap-8 items-center justify-end text-right min-w-[200px]">
        <Text fw={400} size="sm" c="black" className="min-w-[80px]">
          ₦{Number(otherProduct.selling_price || 0).toLocaleString()}
        </Text>
        <Text fw={400} size="sm" c="black" className="min-w-[80px]">
          {Number(otherProduct.total_redemptions || 0).toLocaleString()} sold
        </Text>
      </div>
    </div>
  )}
</div>

       
      </section>
    </main>
  );
};

export default DiscountAnalysis;
