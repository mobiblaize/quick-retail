
import PageContainer from "../../../layout/pageContainer";
import { Text } from "@mantine/core";
import LogOrder from "../../../components/dashboard/pointOfSales/returnsRefunds/logPage";

const LogPage: React.FC = () => {
    const subHeaders = [
        <div key="1">
          <div className="flex items-center justify-between">
            <Text fw={500} size="xl" c="black">
             Log Returns 
            </Text>
          
          </div>
        </div>,
      ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <LogOrder/>
      </PageContainer >
  );
};

export default LogPage;
