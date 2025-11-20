import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import AddBulkUploadDoc from "../../../components/dashboard/pointOfSales/productManagement/addBulkUploadDoc";
import { useCreateBulkProduct } from "../../../hooks/backendApis/pos/products";
import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { ChevronLeft } from "lucide-react";
import UploadSuccessModal from "./UploadSuccessModal";

const AddBulkProduct: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [uploadedCount, setUploadedCount] = useState<number>(0);

  const { mutate: createBulkProduct, isPending } = useCreateBulkProduct();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/dashboard/product-management/view-bulk")
  };

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

    return [
      <div key="1" className="py-2.5">
        <div className="hidden sm:flex gap-8 items-center">{backButton}</div>
        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2">
        <Text fw={500} size="xl" c="black">
          Add Bulk Product
        </Text>
      </div>,
    ];
  };

  const getBottomButtons = () => {
    return [
      <div key="bulk-upload-buttons" className="flex gap-4 justify-end">
        <Button
          variant="outline-primary"
          onClick={() => navigate(-1)}
          style={{ width: 150 }}
        >
          Cancel
        </Button>
        <Button
          variant="filled-primary"
          onClick={handleSubmit}
          loading={isPending}
          style={{ width: 150, opacity: !file ? 0.5 : 1 }}
        >
          Upload
        </Button>
      </div>,
    ];
  };

  return (
    <PageContainer
      subHeaders={getSubHeaders()}
      subHeaderButtom={getBottomButtons()}
    >
      <AddBulkUploadDoc file={file} setFile={setFile} />

      {/* ✅ Success Modal */}
      <UploadSuccessModal
        opened={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          navigate(-1);
        }}
        count={uploadedCount}
      />
    </PageContainer>
  );
};

export default AddBulkProduct;
