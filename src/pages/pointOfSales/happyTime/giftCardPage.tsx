import { Button, Text } from "@mantine/core";
import { Plus } from "lucide-react";
import PageContainer from "../../../layout/pageContainer";
import AllProductData from "../../../components/dashboard/pointOfSales/happyTime/allProductData";
import GiftOrderTable from "../../../components/dashboard/pointOfSales/happyTime/giftOrderTable";
import CreateGiftCard from "../../../components/dashboard/pointOfSales/happyTime/modals/createGiftCard";
import { useState } from "react";

const GiftCardPage = () => {
  const [isCreateGiftOpen, setIsCreateGiftOpen] = useState(false);

  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Gift Cards
        </Text>
        <div className="flex gap-4">
          <Button
            variant="filled-primary"
            className="flex gap-1.5"
            style={{ padding: "0.8rem 1rem" }}
            onClick={() => setIsCreateGiftOpen(true)}
          >
            Create Giftcard
            <Plus size={24} />
          </Button>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <AllProductData />
      <GiftOrderTable />
      <CreateGiftCard
        opened={isCreateGiftOpen}
        onClose={() => setIsCreateGiftOpen(false)}
      />
    </PageContainer>
  );
};

export default GiftCardPage;
