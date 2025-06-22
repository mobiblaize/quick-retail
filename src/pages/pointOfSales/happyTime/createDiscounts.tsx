import { Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import CreateDiscountForm from "../../../components/dashboard/pointOfSales/happyTime/createDiscountForm";

const CreateDiscounts: React.FC = () => {
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
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2">
        <Text fw={500} size="xl" c="black">
          Create Discount
        </Text>
      </div>,
    ];

    return subHeaders;
  };

  // const getBottomButtons = () => {
  //   return [
  //     <div key="search-product-buttons" className="flex gap-4 justify-end">
  //       <Button variant="outline-primary" onClick={() => navigate(-1)}>
  //         Cancel
  //       </Button>

  //       <Link to={ROUTES.inventoryDetails}>
  //         <Button variant="filled-primary">Submit</Button>
  //       </Link>
  //     </div>,
  //   ];
  // };

  return (
    <PageContainer
      subHeaders={getSubHeaders()}
      // subHeaderButtom={getBottomButtons()}
    >
      <CreateDiscountForm />
    </PageContainer>
  );
};

export default CreateDiscounts;
