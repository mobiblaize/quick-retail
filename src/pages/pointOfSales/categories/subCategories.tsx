import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import SubCategoryTable from "../../../components/dashboard/pointOfSales/categories/subCategoryTable";
import { useNavigate } from "react-router";

const SubCategories = () => {
  const navigate = useNavigate();
  const subHeaders = [
    <div key="1" className="py-2.5">
      <div className="flex gap-8 items-center">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          Back
        </button>
        <div className="flex items-center">
          <Text>Categories</Text>
          <span className="mx-2">/</span>
          <Text c={"black"}>Cosmetics</Text>
        </div>
      </div>
    </div>,
    <div key="2">
      <Text fw={500} size="xl" c="black">
        Men
      </Text>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <SubCategoryTable />
    </PageContainer>
  );
};

export default SubCategories;
