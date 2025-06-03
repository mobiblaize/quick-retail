import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { useLocation, useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "../../../constants/routes";
import { useFetchSingleSale } from "../../../hooks/backendApis/pos/salesProcessing";
import ViewTransactionReceipt from "../../../components/dashboard/pointOfSales/transactions/viewTransaction";

const ViewTransactionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialOrderId = location.state?.orderId || location.state?.orderID;
  const { data: orderData, isLoading, } = useFetchSingleSale(initialOrderId);
  
  const orderId = orderData?.orderID || orderData?.orderId || initialOrderId;
  const handleBack = () => {
    navigate(-1);
  };

  const handlePreview = () => {
    if (orderData) {
      navigate(ROUTES.previewTransaction, {
        state: { 
          order: orderData,
          orderId: orderId, 
        },
      });
    }
  };
  
  if (isLoading) return <div>Loading...</div>;
  // if (isError || !orderData) return <div>Order not found.</div>;

  const backButton = (
    <button
      onClick={handleBack}
      className="flex cursor-pointer gap-2 items-center"
    >
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
        View Order
      </Text>
      <div key="customer-receipt-buttons" className="flex gap-4 justify-end">
        <Button variant="filled-primary"  onClick={handlePreview}>Preview Receipt</Button>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <ViewTransactionReceipt/>
    </PageContainer>
  );
};

export default ViewTransactionPage;
