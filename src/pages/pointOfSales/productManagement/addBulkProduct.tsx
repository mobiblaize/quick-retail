// import { Button } from "@mantine/core";
// import { useNavigate } from "react-router-dom";
// import PageContainer from "../../../layout/pageContainer";
// import AddBulkUploadDoc from "../../../components/dashboard/pointOfSales/productManagement/addBulkUploadDoc";
// import { useCreateBulkProduct } from "../../../hooks/backendApis/pos/products";
// import { useState } from "react";

// const AddBulkProduct: React.FC = () => {
//   const navigate = useNavigate();
//   const [file, setFile] = useState<File | null>(null);

//   const { mutate: createBulkProduct, isPending } = useCreateBulkProduct();

//   const handleSubmit = () => {
//     if (!file) {
//       alert("Please upload a file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     createBulkProduct(formData, {
//       onSuccess: () => {
//         // alert("Upload successful!");
//         navigate(-1);
//       },
//       onError: (err: any) => {
//         console.error("Upload failed", err);
//         // alert("Upload failed.");
//       },
//     });
//   };

//   const getBottomButtons = () => {
//     return [
//       <div key="bulk-upload-buttons" className="flex gap-4 justify-end">
//         <Button variant="outline-primary" onClick={() => navigate(-1)}>
//           Cancel
//         </Button>
//         <Button
//           variant="filled-primary"
//           onClick={handleSubmit}
//           loading={isPending}
//         >
//           Next
//         </Button>
//       </div>,
//     ];
//   };

//   const getSubHeaders = () => {
//     return [
//       <div key="bulk-upload-header">
//         <h2>Add Bulk Products</h2>
//         <p>Upload a CSV or Excel file to add products in bulk.</p>
//       </div>
//     ];
//   };

//   return (
//     <PageContainer
//       subHeaders={getSubHeaders()}
//       subHeaderButtom={getBottomButtons()}
//     >
//       <AddBulkUploadDoc file={file} setFile={setFile} />
//     </PageContainer>
//   );
// };

// export default AddBulkProduct;


import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import AddBulkUploadDoc from "../../../components/dashboard/pointOfSales/productManagement/addBulkUploadDoc";
import { useCreateBulkProduct } from "../../../hooks/backendApis/pos/products";
import { useState } from "react";
import { IconCheck, IconX } from "@tabler/icons-react"; 

const AddBulkProduct: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const { mutate: createBulkProduct, isPending } = useCreateBulkProduct();

  const handleSubmit = () => {
    if (!file) {
      showNotification({
        title: "Missing file",
        message: "Please upload a file first.",
        color: "red",
        icon: <IconX />,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    createBulkProduct(formData, {
      onSuccess: () => {
        showNotification({
          title: "Success",
          message: "Upload successful!",
          color: "green",
          icon: <IconCheck />,
        });
        navigate(-1);
      },
      onError: (err: any) => {
        console.error("Upload failed", err);
        const errorMsg =
          err?.response?.data?.errors?.file?.[0] ||
          err?.response?.data?.message ||
          "Upload failed. Please try again.";

        showNotification({
          title: "Upload Failed",
          message: errorMsg,
          color: "red",
          icon: <IconX />,
        });
      },
    });
  };

  const getBottomButtons = () => {
    return [
      <div key="bulk-upload-buttons" className="flex gap-4 justify-end">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          variant="filled-primary"
          onClick={handleSubmit}
          loading={isPending}
        >
          Next
        </Button>
      </div>,
    ];
  };

  const getSubHeaders = () => {
    return [
      <div key="bulk-upload-header">
        <h2>Add Bulk Products</h2>
        <p>Upload a CSV or Excel file to add products in bulk.</p>
      </div>,
    ];
  };

  return (
    <PageContainer
      subHeaders={getSubHeaders()}
      subHeaderButtom={getBottomButtons()}
    >
      <AddBulkUploadDoc file={file} setFile={setFile} />
    </PageContainer>
  );
};

export default AddBulkProduct;
