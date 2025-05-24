import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { useLocation, useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import ViewOrderReceipt from "../../../components/dashboard/pointOfSales/salesProcessing/viewOrderReceipt";

const ViewOrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBack = () => {
    navigate(-1);
  };

  const handleDownloadReceipt = async (orderId: string | number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/pos/sales/sales-order/${orderId}/receipt`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // adjust token retrieval
          },
        }
      );
  
      if (!response.ok) throw new Error("Failed to download receipt");
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.download = `order-receipt-${orderId}.pdf`; // adjust extension
      link.click();
  
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Could not download the receipt.");
    }
  };
  
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
        <div className="flex items-center">
          <Text>Sales processing</Text>
          <span className="mx-2">/</span>
          <Text c="black">View Order</Text>
        </div>
      </div>

      <div className="flex sm:hidden">{backButton}</div>
    </div>,
    <div key="2" className="justify-between flex items-center">
      <Text fw={500} size="xl" c="black">
        View Order
      </Text>
      <div key="customer-receipt-buttons" className="flex gap-4 justify-end">
        <Button variant="filled-primary"  onClick={() => handleDownloadReceipt(location.state?.orderID)}>Download Receipt</Button>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <ViewOrderReceipt />
    </PageContainer>
  );
};

export default ViewOrderPage;
