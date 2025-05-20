import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
// import UnitDetails from "../../../components/dashboard/pointOfSales/categories/unitDetails";
// import BusinessUnitTable from "../../../components/dashboard/pointOfSales/categories/businessUnitTable";
import { useState } from "react";
import { useNavigate } from "react-router";
import CategoryProductDetails from "../../../components/dashboard/pointOfSales/categories/categoryProductDetails";
import CategoriesProductTable from "../../../components/dashboard/pointOfSales/categories/categoriesProductTable";
import EditCategory from "../../../components/dashboard/pointOfSales/categories/modals/editCategory";

const ViewCollection = () => {
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
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
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Shoes
        </Text>
        <Button
          onClick={() => setIsEditCategoryOpen(true)}
          variant="outline-primary"
          style={{ padding: "14px 25px" }}
        >
          Edit Category
        </Button>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <CategoryProductDetails />
      <CategoriesProductTable/>
      {/* <UnitDetails /> */}
      {/* <BusinessUnitTable /> */}
      <EditCategory
        opened={isEditCategoryOpen}
        onClose={() => setIsEditCategoryOpen(false)}
      />
    </PageContainer>
  );
};

export default ViewCollection;
