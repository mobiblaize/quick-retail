import { Button, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import {
  useCreateSubCategory,
  useFetchSubCatOfCat,
} from "../../../../../hooks/backendApis/pos/categories";
import Dropdown from "../../../../General/dropdown";
import FormInput from "../../../../General/formInput";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
  categories: { label: string; value: number }[];
}

const CreateSubCategory = ({ opened, onClose, categories }: ResolveProps) => {
  const createSubCategory = useCreateSubCategory();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [subCategoryName, setSubCategoryName] = useState("");

  // Fetch existing subcategories for the selected category to check for duplicates
  const { data: existingSubCategories } = useFetchSubCatOfCat(
    selectedCategoryId,
    !!selectedCategoryId,
  );
  

  const handleSubmit = async () => {
    if (!selectedCategoryId || !subCategoryName.trim()) {
      notifications.show({
        title: "Validation error",
        message: "Please select a category and enter a sub-category name",
        color: "red",
      });
      return;
    }

    // Check if sub-category name already exists for the selected category
    const existingSubCats = existingSubCategories?.data || [];

const normalizedInput = subCategoryName.trim().toLowerCase();

const isDuplicate = existingSubCats.some(
  (subCat: { name: string }) =>
    subCat.name.trim().toLowerCase() === normalizedInput,
);
console.log(isDuplicate)


    if (isDuplicate) {
      notifications.show({
        title: "Duplicate Sub-Category",
        message:
          "A sub-category with this name already exists for the selected category",
        color: "red",
      });
      return;
    }

    try {
      await createSubCategory.mutateAsync({
        category_id: selectedCategoryId,
        name: subCategoryName.trim(),
      });

      notifications.show({
        title: "New Sub-category Saved!",
        message: "You can now add products to the new category",
        color: "green",
      });

      setSubCategoryName("");
      setSelectedCategoryId(null);
      onClose();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to create sub-category",
        color: "red",
      });
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <div style={{ wordBreak: "break-word" }}>
            <Text
              c="black"
              fw={800}
              style={{
                fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
              }}
            >
              Create Sub-Category
            </Text>
            <Text
              mt="5"
              style={{
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
              }}
            >
              Fill the details below.
            </Text>
          </div>
        }
        centered
        size="md"
        radius={20}
        padding="xl"
      >
        <div className="space-y-4 grid grid-cols-1">
          <Dropdown
            label="Select Category"
            options={categories}
            placeholder="Select a category"
            value={selectedCategoryId}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            onChange={(val) => setSelectedCategoryId(val)}
            required
            // textColorClass="text-gray-800"
          />

          <FormInput
            label="Sub-Category Name"
            placeholder="Enter Sub-Category Name"
            paddingY={6}
            value={subCategoryName}
            onChange={(val: string) => setSubCategoryName(val)}
          />
        </div>
        <div className="flex mt-7 gap-5">
          <Button
            variant="outline"
            onClick={() => {
              setSubCategoryName("");
              setSelectedCategoryId(null);
              onClose();
            }}
            style={{
              color: "#475367",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 1.5rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%",
              border: "1px solid #475367",
            }}
          >
            No
          </Button>
          <Button
            variant="filled-primary"
            style={{
              color: "white",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 1.5rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%",
            }}
            onClick={handleSubmit}
            loading={createSubCategory.isPending}
          >
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateSubCategory;
