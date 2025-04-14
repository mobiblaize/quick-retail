import { Button, Menu, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { ChevronDown } from "lucide-react";
import CategoriesTable from "../../../components/dashboard/pointOfSales/categories/categoriesTable";
import { useState } from "react";
import CreateNewCategory from "../../../components/dashboard/pointOfSales/categories/modals/createNewCategory";
import CreateSubCategory from "../../../components/dashboard/pointOfSales/categories/modals/createSubCategory";

const CategoriesPage = () => {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isCreateSubCategoryOpen, setIsSubCreateCategoryOpen] = useState(false);

  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Categories
        </Text>
        <div>
          <Menu>
            <Menu.Target>
              <Button variant="filled-primary">
                Create New
                <ChevronDown className="ml-2" />
              </Button>
            </Menu.Target>

            <Menu.Dropdown
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Menu.Item
                onClick={() => setIsCreateCategoryOpen(true)}
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
              >
                New Category
              </Menu.Item>
              <Menu.Item
                onClick={() => setIsSubCreateCategoryOpen(true)}
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
              >
                New Sub-category
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <CategoriesTable />
      <CreateNewCategory
        opened={isCreateCategoryOpen}
        onClose={() => setIsCreateCategoryOpen(false)}
      />
      <CreateSubCategory
        opened={isCreateSubCategoryOpen}
        onClose={() => setIsSubCreateCategoryOpen(false)}
      />
    </PageContainer>
  );
};

export default CategoriesPage;
