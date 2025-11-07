import { Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import EditProductFormNew from "../../../components/dashboard/pointOfSales/productManagement/EditProductFormNew";
import { useEditProduct } from "../../../hooks/backendApis/pos/products";

const EditNewProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Fetch product data by ID
  const { data: productData, isLoading } = useEditProduct(id);
  
  console.log("Producst ID:", id);
  console.log("Product Data:", productData);

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
          {/* <div className="flex items-center">
            <Text>Product management</Text>
            <>
              <span className="mx-2">/</span>
              <Text c="black" fw={500}>
                Add Variable Product
              </Text>
            </>
          </div> */}
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2">
        <Text fw={500} size="xl" c="black">
          Edit Product
        </Text>
      </div>,
    ];

    return subHeaders;
  };

  return (
    <PageContainer
      subHeaders={getSubHeaders()}
    >
      <EditProductFormNew 
        initialData={productData} 
        isLoading={isLoading} 
      />
    </PageContainer>
  );
};

export default EditNewProduct;