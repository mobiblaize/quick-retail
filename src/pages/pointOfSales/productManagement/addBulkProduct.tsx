import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import AddBulkUploadDoc from "../../../components/dashboard/pointOfSales/productManagement/addBulkUploadDoc";
import { useCreateBulkProduct } from "../../../hooks/backendApis/pos/products";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import UploadSuccessModal from "./UploadSuccessModal";
import ValidationFailedUI from "./ValidationFailedUI";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

interface BulkProductError {
  row: number;
  field: string;
  message: string;
  value: string;
}

interface BulkProductResponse {
  error: boolean;
  message: string;
  data: {
    success_count: number;
    failed_count: number;
    total_rows: number;
    errors: BulkProductError[];
    has_errors: boolean;
    created_products: string[];
  };
}

const AddBulkProduct: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [uploadedCount, setUploadedCount] = useState<number>(0);
  const [step, setStep] = useState<1 | 2>(1);
  const [validationData, setValidationData] = useState<
    BulkProductResponse["data"] | null
  >(null);

  const { mutate: createBulkProduct, isPending } = useCreateBulkProduct();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!file) {
      showNotification({
        title: "No File Selected",
        message: "Please select a file to upload",
        color: "red",
        icon: <IconX />,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "variant");

    createBulkProduct(formData, {
      onSuccess: (response: BulkProductResponse) => {
        setValidationData(response.data);
        setUploadedCount(response.data.success_count);
        setSuccessModalOpen(true);
        setStep(2);
        if (response.data.has_errors) {
          showNotification({
            title: "Upload Failed",
            message: response?.message || "An error occurred during upload",
            color: "red",
            icon: <IconX />,
          });
        } else {
          showNotification({
            title: "Upload Successful",
            message: `${response.data.success_count} products uploaded successfully`,
            color: "green",
            icon: <IconCheck />,
          });
        }
      },
      onError: (error: any) => {
        // Check if error response has validation data structure (422 errors)
        const errorData = error?.response?.data?.data;

        if (errorData && errorData.has_errors && errorData.errors) {
          // Format error has validation errors - show validation UI
          setValidationData(errorData);
          setStep(2);
        } else {
          // Generic error - show notification
          showNotification({
            title: "Upload Failed",
            message:
              error?.response?.data?.message ||
              "An error occurred during upload",
            color: "red",
            icon: <IconX />,
          });
        }
      },
    });
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setValidationData(null);
    } else {
      navigate(-1);
    }
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
          {step === 1 ? "Add Bulk Product" : "Validation Results"}
        </Text>
      </div>,
    ];
  };

  const getBottomButtons = () => {
    if (step === 2) {
      return [
        <div key="validation-buttons" className="flex gap-4 justify-end">
          <Button
            variant="outline-primary"
            onClick={() => {
              setStep(1);
              setValidationData(null);
              setFile(null);
            }}
          >
            Upload New File
          </Button>
        </div>,
      ];
    }

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
          disabled={!file}
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
      {step === 1 && <AddBulkUploadDoc file={file} setFile={setFile} />}
      {step === 2 && validationData && (
        <ValidationFailedUI data={validationData} />
      )}

      {/* ✅ Success Modal */}
      <UploadSuccessModal
        opened={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
        }}
        count={uploadedCount}
      />
    </PageContainer>
  );
};

export default AddBulkProduct;
