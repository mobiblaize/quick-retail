import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import CategoryProductDetails from "../../../components/dashboard/pointOfSales/categories/categoryProductDetails";
import CategoriesProductTable from "../../../components/dashboard/pointOfSales/categories/categoriesProductTable";
import EditCategory from "../../../components/dashboard/pointOfSales/categories/modals/editCategory";

const ViewCollection = () => {
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const category = state?.category;

  const initialSubCategory = state?.subCategory;
  const [subCategory, setSubCategory] = useState(initialSubCategory); 

  const subHeaders = [
    <div key="1" className="py-2.5">
      <div className="flex gap-8 items-center">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          Back
        </button>
      
      </div>
    </div>,
    <div key="2">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          {subCategory?.name}
        </Text>

        <Button
          onClick={() => setIsEditCategoryOpen(true)}
          variant="outline-primary"
          style={{ padding: "14px 25px" }}
        >
          Edit Sub-Category
        </Button>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <CategoryProductDetails category={category} subCategory={subCategory} />

      <CategoriesProductTable subCategoryId={subCategory?.id} />
      <EditCategory
        opened={isEditCategoryOpen}
        onClose={() => setIsEditCategoryOpen(false)}
        subCategory={subCategory}
        onUpdate={(updatedSubCategory) => {
          setSubCategory(updatedSubCategory); 
          setIsEditCategoryOpen(false);
        }}
      />
    </PageContainer>
  );
};

export default ViewCollection;
