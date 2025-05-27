//  import { Button, Text } from "@mantine/core";
//  import PageContainer from "../../../layout/pageContainer";
//  import {  useNavigate } from "react-router" 
//  import { ChevronLeft } from "lucide-react";
//  import ViewOrderReceiptDraft from "../../../components/dashboard/pointOfSales/salesProcessing/viewOrderReceiptDraft";
// import { ROUTES } from "../../../constants/routes";

// const ViewOrderDraftPage = () => {
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const handleContinue = () => {
//     navigate(ROUTES.createOrder);
//   };

 
//   const backButton = (
//     <button
//       onClick={handleBack}
//       className="flex cursor-pointer gap-2 items-center"
//     >
//       <ChevronLeft />
//       <Text fw={500} c="black">
//         Back
//       </Text>
//     </button>
//   );

//   const subHeaders = [
//     <div key="1" className="py-2.5">
//       <div className="hidden sm:flex gap-8 items-center">
//         {backButton}
//         <div className="flex items-center">
//           <Text>Sales processing</Text>
//           <span className="mx-2">/</span>
//           <Text c="black">View Order</Text>
//         </div>
//       </div>

//       <div className="flex sm:hidden">{backButton}</div>
//     </div>,
//     <div key="2" className="justify-between flex items-center">
//       <Text fw={500} size="xl" c="black">
//         View Draft Order
//       </Text>
//       <div key="customer-receipt-buttons" className="flex gap-4 justify-end">
//         <Button variant="filled-primary"  onClick={handleContinue}>Continue Order</Button>
//       </div>
//     </div>,
//   ];

//   return (
//     <PageContainer subHeaders={subHeaders}>
//       <ViewOrderReceiptDraft />
//     </PageContainer>
//   );
// };

// export default ViewOrderDraftPage;

import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { useNavigate, useLocation } from "react-router";
import { ChevronLeft } from "lucide-react";
import ViewOrderReceiptDraft from "../../../components/dashboard/pointOfSales/salesProcessing/viewOrderReceiptDraft";
import { ROUTES } from "../../../constants/routes";
import { useFetchSingleSale } from "../../../hooks/backendApis/pos/salesProcessing";

const ViewOrderDraftPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderID;

  const { data: saleData, isLoading, isError } = useFetchSingleSale(orderId);

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    navigate(ROUTES.createOrder, { state: { saleData } });
  };


  const backButton = (
    <button onClick={handleBack} className="flex cursor-pointer gap-2 items-center">
      <ChevronLeft />
      <Text fw={500} c="black">
        Back
      </Text>
    </button>
  );

  const subHeaders = [
    <div key="1" className="py-2.5">
      <div className="hidden sm:flex gap-8 items-center">
        {backButton}
        {/* <div className="flex items-center">
          <Text>Sales processing</Text>
          <span className="mx-2">/</span>
          <Text c="black">View Order</Text>
        </div> */}
      </div>
      <div className="flex sm:hidden">{backButton}</div>
    </div>,
    <div key="2" className="justify-between flex items-center">
      <Text fw={500} size="xl" c="black">
        View Draft Order
      </Text>
      <div key="customer-receipt-buttons" className="flex gap-4 justify-end">
        <Button variant="filled-primary" onClick={handleContinue}>
          Continue Order
        </Button>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <ViewOrderReceiptDraft saleData={saleData} isLoading={isLoading} isError={isError} />
    </PageContainer>
  );
};

export default ViewOrderDraftPage;

