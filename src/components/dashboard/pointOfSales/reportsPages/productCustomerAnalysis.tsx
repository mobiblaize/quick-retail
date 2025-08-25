import { Text } from "@mantine/core";
import { truncateText } from "../../../../utils/helpers";
import others from "../../../../assets/images/others.png";
import DivisionProductChartReport from "../../../General/table/divisionProductChartReport";

interface SalesCustomerAnalysisProps {
  reportInfo: {
    reportData: {
      data: {
        category_sales?: {
          category_name: string;
          total_quantity_sold: number;
          total_revenue: string;
          percentage: number;
        }[];
        product_sales?: {
            image_path: string;
            sku: string;
          product_name: string;
          price: string;
          total_sold: string;
        }[];
      };
    };
  };
}



const ProductCustomerAnalysis = ({ reportInfo }: SalesCustomerAnalysisProps) => {
  const productSales = reportInfo?.reportData?.data?.product_sales ?? [];

  // Top products
  const topProducts = productSales
    .filter((p) => p.product_name !== "Others")
    .sort((a, b) => Number(b.total_sold) - Number(a.total_sold))
    .slice(0, 4);

  // Other products
  const otherProducts = productSales.filter((p) => p.product_name === "Others");

  const otherSummary = otherProducts.reduce(
    (acc, p) => {
      acc.quantity_sold += Number(p.total_sold);
      acc.total_price += p.price !== "Multiple" ? Number(p.price) * Number(p.total_sold) : 0;
      return acc;
    },
    { quantity_sold: 0, total_price: 0 }
  );

  return (
    <main className="flex flex-col lg:flex-row lg:flex-wrap gap-6 w-full">
    {/* Left: Category Chart */}
    <div className="w-full lg:flex-1 min-w-[320px] h-auto px-3 sm:px-4 py-6 sm:py-8 rounded-lg bg-white">
      <div className="flex justify-between items-center">
        <div className="flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Product by Category
          </Text>
          <Text size="sm" className="text-gray-600 font-normal mb-4">
            See how your customers are buying
          </Text>
        </div>
      </div>
  
      <DivisionProductChartReport
        categories={reportInfo?.reportData?.data?.category_sales ?? []}
      />
    </div>
  
    {/* Right: Top Products */}
    <section className="w-full lg:flex-1 min-w-[320px] h-auto px-4 sm:px-6 py-6 sm:py-8 rounded-lg bg-white">
      <div className="flex flex-col">
        <Text size="xl" fw={600} c="textSecondary.9">
          Product by Sales
        </Text>
        <Text size="sm" className="text-gray-600 font-normal mb-4">
          See how your products are selling.
        </Text>
      </div>
  
      {/* Scroll wrapper for products */}
      <div className="mt-6 flex flex-col gap-4 overflow-x-auto">
        {/* Product list */}
        {topProducts.map((product, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-2 py-2 hover:bg-gray-100 rounded min-w-[320px]"
          >
            {/* Left: Image + Info */}
            <div className="flex gap-2 items-center flex-1 min-w-0">
              <img
                src={product.image_path || "/placeholder.png"}
                alt={product.product_name}
                className="w-10 h-10 rounded object-cover flex-shrink-0"
              />
              <div className="flex flex-col truncate min-w-0">
                <Text fw={500} size="sm" c="black" className="truncate">
                  {truncateText(product.product_name || "Unnamed Product")}
                </Text>
                <Text fw={500} size="sm" c="gray" className="truncate">
                  {/* @ts-ignore */}
                  {product.sku || "Unnamed SKU"}
                </Text>
              </div>
            </div>
  
            {/* Right: Price + Sold */}
            <div className="flex gap-6 sm:gap-8 items-center justify-end text-right min-w-[200px]">
              <Text
                fw={400}
                size="sm"
                c="black"
                className="min-w-[80px] text-right"
              >
                ₦{Number(product.price || 0).toLocaleString()}
              </Text>
              <Text
                fw={400}
                size="sm"
                c="black"
                className="min-w-[80px] text-right"
              >
                {Number(product.total_sold).toLocaleString()} sold
              </Text>
            </div>
          </div>
        ))}
  
        {/* Others Summary */}
        {otherSummary.quantity_sold > 0 && (
          <div className="flex justify-between items-center px-2 py-2 bg-gray-50 rounded min-w-[320px]">
            <div className="flex gap-2 items-center flex-1 min-w-0">
              <img
                src={others}
                alt="Other Products"
                className="w-10 h-10 rounded object-cover flex-shrink-0"
              />
              <div className="flex flex-col truncate min-w-0">
                <Text fw={500} size="sm" c="black" className="truncate">
                  Other Products
                </Text>
              </div>
            </div>
  
            <div className="flex gap-6 sm:gap-8 items-center justify-end text-right min-w-[200px]">
              <Text
                fw={400}
                size="sm"
                c="black"
                className="min-w-[80px] text-right"
              >
                ₦{otherSummary.total_price.toLocaleString()}
              </Text>
              <Text
                fw={400}
                size="sm"
                c="black"
                className="min-w-[80px] text-right"
              >
                {otherSummary.quantity_sold.toLocaleString()} sold
              </Text>
            </div>
          </div>
        )}
      </div>
    </section>
  </main>
  
  );
};

export default ProductCustomerAnalysis;

