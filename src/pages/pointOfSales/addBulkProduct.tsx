import React from "react";
import { Button, Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../layout/pageContainer";
import AddBulkUploadDoc from "./addBulkUploadDoc";

const AddBulkProduct: React.FC = () => {
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
            <Text>In-Store Management</Text>
            <>
              <span className="mx-2">/</span>
              <Text c="black" fw={500}>
                Add Product
              </Text>
            </>
          </div>
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2">
        <Text fw={500} size="xl" c="black">
          Add Bulk Product
        </Text>
      </div>,
    ];

    return subHeaders;
  };

  const getBottomButtons = () => {
    return [
      <div key="search-product-buttons" className="flex gap-4 justify-end">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button variant="filled-primary">Next</Button>
      </div>,
    ];
  };

  return (
    <PageContainer
      subHeaders={getSubHeaders()}
      subHeaderButtom={getBottomButtons()}
    >
      <AddBulkUploadDoc />
    </PageContainer>
  );
};

export default AddBulkProduct;
