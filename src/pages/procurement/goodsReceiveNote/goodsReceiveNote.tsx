import { Button, Text } from "@mantine/core";
import { Plus } from "lucide-react";
import PageContainer from "../../../layout/pageContainer";
import AllGoodsTable from "../../../components/dashboard/procurement/goodsReceiveNote/allGoodsTable";

const GoodsReceiveNote = () => {

  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
           Goods Received Notes (G.R.N)
        </Text>
        <Button
          // onClick={() => setIsLogComplaintsOpen(true)}
          variant="filled-primary"
          className="flex gap-1.5"
        >
          Export
          <Plus size={24} />
        </Button>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <AllGoodsTable />
    </PageContainer>
  );
};


export default GoodsReceiveNote;