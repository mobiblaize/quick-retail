import { Text, Loader  } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import SubCategoryTable from "../../../components/dashboard/pointOfSales/categories/subCategoryTable";
import { useLocation, useNavigate } from "react-router";
import { useFetchSingleSubCatOfCat } from "../../../hooks/backendApis/pos/categories";


const SubCategories = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const category = state?.category;
  const { data, isLoading,refetch  } = useFetchSingleSubCatOfCat(category?.id);
  const subCategories = Array.isArray(data?.data) ? data.data : [];
  const handleDeleteSuccess = () => {
    // Refetch data from backend
    refetch();
  };


  const subHeaders = [
    <div key="1" className="py-2.5">
      <div className="flex gap-8 items-center">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          Back
        </button>
      </div>
    </div>,
    <div key="2">
      <Text fw={500} size="xl" c="black">
      {category?.name || "Unnamed Category"}
      </Text>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
       {isLoading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
        <Loader size="xl" color="orange" />
      </div>
    )}
      <SubCategoryTable subCategories={subCategories} category={category} isLoading={isLoading}  onDeleteSuccess={handleDeleteSuccess}  />
    </PageContainer>
  );
};

export default SubCategories;
