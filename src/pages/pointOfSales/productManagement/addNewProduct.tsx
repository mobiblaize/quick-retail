import { useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import AddProductFormNew from "../../../components/dashboard/pointOfSales/productManagement/AddProductFormNew";

const AddNewProduct: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isVariable, setIsVariable] = useState(
    searchParams.get("variable") === "true"
  );

  // 🔄 Watch for query param changes
  useEffect(() => {
    setIsVariable(searchParams.get("variable") === "true");
  }, [searchParams]);

  const handleBack = () => navigate(-1);

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

    const title = isVariable ? "Add Variable Product" : "Add Simple Product";

    return [
      <div key="1" className="py-2.5">
        <div className="hidden sm:flex gap-8 items-center">{backButton}</div>
        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2">
        <Text fw={500} size="xl" c="black">
          {title}
        </Text>
      </div>,
    ];
  };

  return (
    <PageContainer subHeaders={getSubHeaders()}>
      <AddProductFormNew />
    </PageContainer>
  );
};

export default AddNewProduct;
