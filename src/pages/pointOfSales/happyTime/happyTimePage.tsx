import { Button, Text } from "@mantine/core";
import { ChevronRight, Plus } from "lucide-react";
import PageContainer from "../../../layout/pageContainer";
import DiscountTable from "../../../components/dashboard/pointOfSales/happyTime/discountTable";
import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";
import { useState } from "react";
import CreateDiscountModal from "../../../components/dashboard/pointOfSales/happyTime/modals/createDiscountModal";

const HappyTimePage = () => {
  const [isLogComplaintsOpen, setIsLogComplaintsOpen] = useState(false);

  const subHeaders = [
    <div key="1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <Text fw={500} size="xl" c="black">
          Discount Promotion
        </Text>
        <div className="flex flex-row gap-2 md:gap-4">
          <Link to={ROUTES.happyDiscountAnalytics}>
            <Button
              variant="outline-primary"
              className="flex gap-1.5 items-center justify-center"
              style={{ padding: "0.8rem 1rem" }}
            >
              <span className="whitespace-nowrap">Discount Analytics</span>
              <ChevronRight />
            </Button>
          </Link>
          <Button
            variant="filled-primary"
            className="flex gap-1.5 items-center justify-center"
            style={{ padding: "0.8rem 0.5rem" }}
            onClick={() => setIsLogComplaintsOpen(true)}
          >
            <span className="whitespace-nowrap">Create Discount</span>
            <Plus size={24} />
          </Button>
        </div>
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <DiscountTable />
      <CreateDiscountModal
        opened={isLogComplaintsOpen}
        onClose={() => setIsLogComplaintsOpen(false)}
      />
    </PageContainer>
  );
};

export default HappyTimePage;
