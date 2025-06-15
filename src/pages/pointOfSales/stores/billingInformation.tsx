import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { useLocation, useNavigate } from "react-router";
import OrderInformation from "../../../components/dashboard/pointOfSales/stores/orderInformation";
import ProductOrderedTable from "../../../components/dashboard/pointOfSales/stores/productOrderedTable";
import InformationTab from "../../../components/dashboard/pointOfSales/categories/informationTab";
import { PaidDot } from "../../../assets/svg";

const BillingInformation = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;
  console.log("Received order data:", orderData);
  const navigate = useNavigate();
  const subHeaders = [
    <div key="1" className="py-2.5">
      <div className="flex gap-8 items-center">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          Back
        </button>
        {/* <div className="md:flex hidden items-center">
          <Text>Categories</Text>
          <span className="mx-2">/</span>
          <Text c={"black"}>Cosmetics</Text>
        </div> */}
      </div>
    </div>,
    <div key="2">
      <div className="flex items-center gap-3">
        <Text fw={500} size="xl" c="black">
          {/* {orderData.location.name} */}
          View Order
        </Text>
        <p className="bg-[#E7F6EC] text-[#099137] p-1 rounded-lg flex">
          {" "}
          <span className="mt-2">
            <PaidDot />{" "}
          </span>{" "}
          {orderData.payment_status}
        </p>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <OrderInformation orderData={orderData} />
      {/* <InformationTab orderData={orderData} /> */}
      <ProductOrderedTable orderId={orderData?.orderID} />
    </PageContainer>
  );
};

export default BillingInformation;
