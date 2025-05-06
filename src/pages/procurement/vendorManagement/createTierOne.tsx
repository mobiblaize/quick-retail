import { Button, Text } from "@mantine/core";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import CreateTierOneForm from "../../../components/dashboard/procurement/vendorManagement/createTierOneForm";
import CreateVendorModal from "../../../components/dashboard/procurement/vendorManagement/modal/createVendorModal";
import { useState } from "react";

const CreateTierOne: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

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
            <Text>Vendor</Text>
            <>
              <span className="mx-2">/</span>
              <Text c="black" fw={500}>
                Create a Tier 1 Vendor
              </Text>
            </>
          </div>
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2" className="justify-between flex items-center">
        <Text fw={500} size="xl" c="black">
          Create a Tier 1 Vendor
        </Text>

        <div className="flex flex-row gap-2 md:gap-4">
          <Button
            variant="filled-primary"
            className="flex gap-1.5 items-center justify-center"
            style={{ padding: "0.8rem 1rem" }}
            onClick={() => setModalOpen(true)}
          >
            <span className="whitespace-nowrap">Create Vendor</span>
            <ChevronRight />
          </Button>
        </div>
      </div>,
    ];

    return subHeaders;
  };

  return (
    <>
      <PageContainer subHeaders={getSubHeaders()}>
        <CreateTierOneForm />

        <CreateVendorModal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </PageContainer>
    </>
  );
};

export default CreateTierOne;
