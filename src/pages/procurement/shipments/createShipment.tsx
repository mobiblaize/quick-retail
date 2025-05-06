import { Text } from "@mantine/core";
import {  ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import CreateShipmentForm from "../../../components/dashboard/procurement/shipments/createShipmentForm";

const CreateShipment: React.FC = () => {
  const navigate = useNavigate();


  const handleBack = () => {
    navigate(-1);
  };

  const getSubHeaders = () => {
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
            <Text>Shipment</Text>
            <>
              <span className="mx-2">/</span>
              <Text c="black" fw={500}>
              Create Shipment
              </Text>
            </>
          </div>
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2" className="justify-between flex items-center">
        <Text fw={500} size="xl" c="black">
           Create Shipment
        </Text>

       

      </div>,
    ];

    return subHeaders;
  };

  return (
      <PageContainer subHeaders={getSubHeaders()}>
        <CreateShipmentForm/>
      </PageContainer>
  );
};

export default CreateShipment;
