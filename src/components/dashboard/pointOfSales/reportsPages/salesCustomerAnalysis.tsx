import { Text } from "@mantine/core";
import DivisionSaleChartReport from "../../../General/table/divisionSalesChartReport";
import { truncateText } from "../../../../utils/helpers";
import others from "../../../../assets/images/others.png";

interface SalesCustomerAnalysisProps {
  reportInfo: {
    reportData: {
      data: {
        customer_sales?: {
          customer_name: string;
          total_order_value: string;
          total_orders: number;
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

const SalesCustomerAnalysis = ({ reportInfo }: SalesCustomerAnalysisProps) => {
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
      acc.total_price +=
        p.price !== "Multiple" ? Number(p.price) * Number(p.total_sold) : 0;
      return acc;
    },
    { quantity_sold: 0, total_price: 0 }
  );

  return (
    <main className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Sales by Customers */}
      <div className="flex-1 min-w-0 h-auto px-3 sm:px-4 py-6 sm:py-8 rounded-lg bg-white">
        <div className="flex flex-col mb-4">
          <Text size="xl" fw={600} c="textSecondary.9">
            Sales by Customers
          </Text>
          <Text size="sm" c="dimmed">
            See how your customers are buying
          </Text>
        </div>

        <DivisionSaleChartReport
          customers={reportInfo?.reportData?.data?.customer_sales ?? []}
        />
      </div>

      {/* Sales by Products */}
      <section className="flex-1 min-w-0 h-auto px-4 sm:px-6 py-6 sm:py-8 rounded-lg bg-white">
        <div className="flex flex-col mb-4">
          <Text size="xl" fw={600} c="textSecondary.9">
            Sales by Product
          </Text>
          <Text size="sm" c="dimmed">
            See how your products are selling.
          </Text>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {topProducts.map((product, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-2 py-2 hover:bg-gray-100 rounded"
            >
              {/* Left: Image + Product Info */}
              <div className="flex gap-2 items-center flex-1 min-w-0">
                <img
                  src={product.image_path || "/placeholder.png"}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex flex-col min-w-0 truncate">
                  <Text fw={500} size="sm" c="black" lineClamp={1}>
                    {truncateText(product.product_name || "Unnamed Product")}
                  </Text>
                  <Text fw={500} size="sm" c="gray" lineClamp={1}>
                    {product.sku || "Unnamed SKU"}
                  </Text>
                </div>
              </div>

              {/* Right: Price & Sold */}
              <div className="flex gap-4 items-center justify-end text-right flex-shrink-0">
                <Text fw={400} size="sm" c="black" className="w-[80px] text-right">
                  ₦{Number(product.price || 0).toLocaleString()}
                </Text>
                <Text fw={400} size="sm" c="black" className="w-[80px] text-right">
                  {Number(product.total_sold).toLocaleString()} sold
                </Text>
              </div>
            </div>
          ))}

          {otherSummary.quantity_sold > 0 && (
            <div className="flex justify-between items-center px-2 py-2 bg-gray-50 rounded">
              <div className="flex gap-2 items-center flex-1 min-w-0">
                <img
                  src={others}
                  alt="Other Products"
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex flex-col min-w-0 truncate">
                  <Text fw={500} size="sm" c="black" lineClamp={1}>
                    Other Products
                  </Text>
                </div>
              </div>

              <div className="flex gap-4 items-center justify-end text-right flex-shrink-0">
                <Text fw={400} size="sm" c="black" className="w-[80px] text-right">
                  ₦{otherSummary.total_price.toLocaleString()}
                </Text>
                <Text fw={400} size="sm" c="black" className="w-[80px] text-right">
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

export default SalesCustomerAnalysis;
