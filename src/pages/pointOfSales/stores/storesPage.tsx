import { Button, Text } from "@mantine/core";
import { ChevronRight, Plus } from "lucide-react";
import PageContainer from "../../../layout/pageContainer";
import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";
import StoreTargetTable from "../../../components/dashboard/pointOfSales/stores/storeTargetTable";
import { useState } from "react";
import SetStoreTarget from "../../../components/dashboard/pointOfSales/stores/modals/setStoreTarget";

const StoresPage = () => {
  const [isSetStoreOpen, setIsSetStoreOpen] = useState(false);

  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Store Target
        </Text>
        <div className="flex gap-4">
          <Button
            variant="filled-primary"
            className="flex gap-1.5"
            style={{ padding: "0.8rem 1rem" }}
            onClick={() => setIsSetStoreOpen(true)}
          >
            Set New Store Target
            <Plus />
          </Button>
          <Link to={ROUTES.storeTarget}>
            <Button
              variant="outline-primary"
              className="flex gap-1.5"
              style={{ padding: "0.8rem 1rem" }}
            >
              Stores
              <ChevronRight />
            </Button>
          </Link>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <StoreTargetTable />
      <SetStoreTarget
        opened={isSetStoreOpen}
        onClose={() => setIsSetStoreOpen(false)}
      />
    </PageContainer>
  );
};

export default StoresPage;
