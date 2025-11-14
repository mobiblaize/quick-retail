import { Text, Loader  } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import SubCategoryTable from "../../../components/dashboard/pointOfSales/categories/subCategoryTable";
import { useLocation, useNavigate } from "react-router";
import { useFetchSingleSubCatOfCat } from "../../../hooks/backendApis/pos/categories";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";

export interface SubCategories {
  id: number
  category_id: number
  name: string
  file_path: string
  is_active: number
  status: string
  created_at: string
  updated_at: string
  total_quantity: number
}


const SubCategories = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const category = state?.category;
  const { data, isLoading, refetch, error, isError  } = useFetchSingleSubCatOfCat(category?.id);
  const [subCategories, setSubCategories] = useState<SubCategories[]>([]);
  const handleDeleteSuccess = () => {
    // Refetch data from backend
    refetch();
  };

  
  useEffect(() => {
    if (isError) {
      notifications.show({
        title: "Failed to fetch subcategories",
        message:
          (error as { message?: string })?.message ||
          "An error occurred",
        color: "red",
      });
      setSubCategories([]);
    }
    if (data) {
      setSubCategories(Array.isArray(data?.data) ? data.data : []);
    }
  }, [isError, error, data]);


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
      <SubCategoryTable refetch={refetch} subCategories={subCategories} category={category} isLoading={isLoading}  onDeleteSuccess={handleDeleteSuccess}  />
    </PageContainer>
  );
};

export default SubCategories;
