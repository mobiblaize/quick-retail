import { Loader, Text } from "@mantine/core";
import { useFetchAllCustomers } from "../../../../hooks/backendApis/pos/customersManagement";
import DivisionSaleChartReport from "../../../General/table/divisionSalesChartReport";
import { useFetchAllSales } from "../../../../hooks/backendApis/pos/salesProcessing";
import { shortenTransactionId } from "../../../../utils/helpers";
import others from "../../../../assets/images/others.png";

type OtherSummary = {
  quantity_sold: number;
  total_price: number;
};

const SalesCustomerAnalysis = () => {


  const { data: allCustomersData } = useFetchAllCustomers();

  const customers =
    allCustomersData?.data?.customers?.data?.sort(
      (a: { sales_orders_count: number }, b: { sales_orders_count: number }) =>
        b.sales_orders_count - a.sales_orders_count
    ) ?? [];
  const { data, isLoading, error } = useFetchAllSales();
  const salesData = data?.data?.sales?.data ?? [];

  // Flatten all product variations
  const productVariations = salesData.flatMap(
    (sale: { sale_order_details: any[] }) =>
      sale.sale_order_details?.map((detail) => detail.product_variation) ?? []
  );


  const variationMap = productVariations.reduce(
    (
      acc: { [x: string]: { quantity_sold: number } },
      pv: { variationID: string | number; quantity_sold: any }
    ) => {
      if (!pv) return acc;
      if (!acc[pv.variationID]) {
        acc[pv.variationID] = {
          ...pv,
          quantity_sold: Number(pv.quantity_sold),
        };
      } else {
        acc[pv.variationID].quantity_sold += Number(pv.quantity_sold);
      }
      return acc;
    },
    {}
  );
  // Same logic for topProducts
  const topProducts = Object.values(variationMap)
    // ts-ignore
    .sort((a, b) => b.quantity_sold - a.quantity_sold)
    .slice(0, 4);

  // Get variationIDs of top products
    // ts-ignore
  const topProductIDs = new Set(topProducts.map((p) => p.variationID));

  // Compute other products summary
  const otherProducts = Object.values(variationMap).filter(
      // ts-ignore
    (p) => !topProductIDs.has(p.variationID)
  );

  const otherSummary = otherProducts.reduce(
    (acc: OtherSummary, p) => {
        // ts-ignore
      acc.quantity_sold += p.quantity_sold;
        // ts-ignore
      acc.total_price += p.quantity_sold * Number(p.selling_price || 0);
      return acc;
    },
    { quantity_sold: 0, total_price: 0 }
  );

  return (
    <main className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[50%] h-auto px-3 sm:px-4 py-6 sm:py-8 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <div className="flex-col">
            <Text size="xl" fw={600} c="textSecondary.9">
              Customer Analysis
            </Text>
          </div>
        </div>

        <DivisionSaleChartReport customers={customers} />
      </div>

      <section className="w-full lg:w-[50%] h-auto px-4 sm:px-6 py-6 sm:py-8 rounded-lg bg-white">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Sales by Product
          </Text>
          <Text className="secondary font-normal">
            See how your products are selling.
          </Text>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader size="sm" />
          </div>
        ) : error ? (
          <Text c="red" className="mt-4">
            Failed to load products
          </Text>
        ) : (
          <div className="mt-6 flex flex-col gap-4">
            {topProducts.map((product) => (
              <div
                // ts-ignore
                key={product.variationID}
                className="flex justify-between items-center px-2 py-2 hover:bg-gray-100 rounded"
              >
                <div className="flex gap-2 items-center">
                  <img
                    // ts-ignore
                    src={product.image_path || "/placeholder.png"}
                      // ts-ignore
                    alt={product.name || "Product image"}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex flex-col">
                    <Text fw={500} size="sm" c="black">
                       {/* ts-ignore */}
                      {shortenTransactionId(product.name || "Unnamed Product")}
                
                    </Text>
                    <Text fw={500} size="sm">
                       {/* ts-ignore */}
          
                      {product.sku || "Unnamed Product"}
                    </Text>
                  </div>
                </div>
                <Text fw={400} size="sm" c="black">
               {/* ts-ignore */}
                  ₦{Number(product.selling_price || 0).toLocaleString()}
                </Text>
                <Text fw={400} size="sm" c="black">
               {/* ts-ignore */}
                  {Number(product.quantity_sold).toLocaleString()} sold
                </Text>
              </div>
            ))}
            {otherProducts.length > 0 && (
              <div className="flex justify-between items-center px-2 py-2 bg-gray-50 rounded">
                <div className="flex gap-2 items-center">
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
                <Text fw={400} size="sm" c="black">
                  ₦{otherSummary.total_price.toLocaleString()}
                </Text>
                <Text fw={400} size="sm" c="black">
                  {otherSummary.quantity_sold.toLocaleString()} sold
                </Text>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default SalesCustomerAnalysis;
