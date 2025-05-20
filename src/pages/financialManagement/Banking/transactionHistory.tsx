import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ChevronLeft} from "lucide-react";
import TransactionTable from "../../../components/finacialManagement/Banking/transactionTable";
import PageContainer from "../../../layout/pageContainer";
import AllTransactionOverview from "../../../components/finacialManagement/Banking/overviewTransaction";
import { ROUTES } from "../../../constants/routes";
import { cards } from "../../../utils/mockData";
import CardComponent from "../../../components/finacialManagement/Banking/cardDetails";
import { useState } from "react";



const AllTransactionPage = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const handleBack = () => {
      navigate(-1);
    };

    const handleCard = () => {
        navigate(ROUTES.addCard);
      };
    
  
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
    <div className="hidden sm:flex gap-8 items-center">{backButton}</div>

    <div className="flex sm:hidden">{backButton}</div>
  </div>,
    <div key="1">
      <div className="flex justify-between">
        <Text fw={500} size="xl" c="black">
        Add New Card
        </Text>
        <Button
            variant="filled-primary"
            onClick={handleCard} 
            style={{
              color: "white",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 1.5rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "20%",
            }}
          >
    Add new card
          </Button>
      </div>
    </div>,
  ];
  return (
    <>
    <PageContainer subHeaders={subHeaders}>
    <div className="flex w-full gap-4">
  {cards.map((card, index) => (
    <div key={index} className="w-1/3">
      <CardComponent
        {...card}
        active={index === activeIndex}
        onClick={() => setActiveIndex(index)}
      />
    </div>
  ))}
</div>

        <AllTransactionOverview/>
      <TransactionTable/>
    </PageContainer>
    </>
  );
};

export default AllTransactionPage;
