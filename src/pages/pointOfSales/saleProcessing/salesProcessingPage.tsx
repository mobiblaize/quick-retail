// import { Text } from "@mantine/core";
// import PageContainer from "../../../layout/pageContainer";
// import CustomerOrdersTable from "../../../components/dashboard/pointOfSales/dashboard/orderTable";
// import { ROUTES } from "../../../constants/routes";
// import { Link } from "react-router";
// import { Button} from "@mantine/core";
// import { useFetchAllSales } from "../../../hooks/backendApis/pos/salesProcessing";
// import SalesOverview from "../../../components/dashboard/pointOfSales/salesProcessing/salesOverview";

// const SalesProcessingPage = () => {

//   const { data,isLoading,  } = useFetchAllSales();

//   // const salesData = data?.data?.sales?.data ?? [];
//   const subHeaders = [
//     <div key="1">
//       <div className="flex items-center justify-between">
//         <Text fw={500} size="xl" c="black">
//           Sale Processing
//         </Text>
//         <Link to={ROUTES.createOrder}>
//           <Button variant="filled-primary">Create Order</Button>
//         </Link>
//       </div>
//     </div>,
//   ];

//   return (
//     <PageContainer subHeaders={subHeaders}>
//         <SalesOverview data={data?.data}  isLoading={isLoading} />
//       <CustomerOrdersTable  />
//     </PageContainer>
//   );
// };

// export default SalesProcessingPage;

// pages/SalesProcessingPage.tsx
import { useState } from "react";
import { Text, Button } from "@mantine/core";
import { Link } from "react-router";
import PageContainer from "../../../layout/pageContainer";
import CustomerOrdersTable from "../../../components/dashboard/pointOfSales/dashboard/orderTable";
import { ROUTES } from "../../../constants/routes";
import SalesOverview from "../../../components/dashboard/pointOfSales/salesProcessing/salesOverview";
import { useFetchAllSales } from "../../../hooks/backendApis/pos/salesProcessing";

const SalesProcessingPage = () => {
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });

  const { data, isLoading } = useFetchAllSales({
    start_date: dateRange.startDate,
    end_date: dateRange.endDate,
  });
  const salesData = data?.data?.sales?.data ?? [];

  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Sale Processing
        </Text>
        <Link to={ROUTES.createOrder}>
          <Button variant="filled-primary">Create Order</Button>
        </Link>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <SalesOverview
        data={data?.data}
        isLoading={isLoading}
        setDateRange={setDateRange}
      />
        <CustomerOrdersTable salesData={salesData} />
    </PageContainer>
  );
};

export default SalesProcessingPage;

