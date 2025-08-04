import { Text } from "@mantine/core";
import DivisionReturnsChartReport from "../../../General/table/divisionReturnschart";
import RefundStatsPieChart from "../../../General/table/locationrefundchart";
import LocationBarChart from "./returnLocationBarchart";

interface SalesCustomerAnalysisProps {
  reportInfo: {
    reportData: {
      data: {
        product_returns?: {
          product_name: string;
          product_price: number;
          return_count: string;
        }[];
        location_status?: {
          approved: string;
          store: string;
          total_refunded: string;
        }[];
      };
    };
  };
}

const RefundAnalysis = ({ reportInfo }: SalesCustomerAnalysisProps) => {
  const Stores = reportInfo?.reportData?.data?.location_status ?? [];
  // @ts-ignore
  const locationId = reportInfo?.locationId;
    // @ts-ignore
  const stats = reportInfo?.reportData?.data?.stats ?? {};
  const pendingCount = Number(stats.total_pending_complaints || 0);
  const resolvedCount = Number(stats.total_resolved_complaints || 0);
  const declinedCount = Number(stats.total_declined_complaints || 0);
  

  
  return (
    <main className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[50%] h-auto px-3 sm:px-4 py-6 sm:py-8 rounded-lg bg-white">
        <Text size="xl" fw={600} c="textSecondary.9" mb={2}>
          Most Returned Products (Pie Chart)
        </Text>
        <Text size="sm" className="text-gray-600 font-normal mb-4">
          See which products are most frequently returned.
        </Text>
        <DivisionReturnsChartReport
          returns={reportInfo?.reportData?.data?.product_returns ?? []}
        />
      </div>

      {/* Render the bar chart only if no specific locationId is passed */}
      {!locationId && (
        <div className="w-full lg:w-[50%] h-auto px-4 sm:px-6 py-6 sm:py-8 rounded-lg bg-white">
          <Text size="xl" fw={600} c="textSecondary.9" mb={2}>
            Returns
          </Text>
          <Text size="sm" className="text-gray-600 font-normal mb-4">
          See how your products are being returned in stores.
          </Text>
          {/* @ts-ignore */}
          <LocationBarChart data={Stores} />

          
        </div>
      )}
      {locationId && (
        <div className="w-full lg:w-[50%] h-auto px-3 sm:px-4 py-6 sm:py-8 rounded-lg bg-white">
          <Text size="xl" fw={600} c="textSecondary.9" mb={2}>
            Returns
          </Text>
          <Text size="sm" className="text-gray-600 font-normal mb-4">
            See how your products are being returned .
          </Text>

   
    <RefundStatsPieChart
      pending={pendingCount}
      declined={declinedCount}
      resolved={resolvedCount}
    />

        </div>
      )}
    </main>
  );
};

export default RefundAnalysis;
