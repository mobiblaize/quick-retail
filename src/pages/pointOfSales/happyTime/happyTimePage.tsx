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
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Discount Promotion
        </Text>
        <div className="flex gap-4">
          <Link to={ROUTES.happyDiscountAnalytics}>
            <Button
              variant="outline-primary"
              className="flex gap-1.5"
              style={{ padding: "0.8rem 1rem" }}
            >
              Discount Analytics
              <ChevronRight />
            </Button>
          </Link>
          <Button
            variant="filled-primary"
            className="flex gap-1.5"
            style={{ padding: "0.8rem 1rem" }}
            onClick={() => setIsLogComplaintsOpen(true)}
          >
            Create Discount
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
