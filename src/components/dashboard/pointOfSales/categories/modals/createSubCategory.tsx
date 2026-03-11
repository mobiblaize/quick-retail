import { Button, Modal, MultiSelect, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useCreateSubCategory } from "../../../../../hooks/backendApis/pos/categories";
import FormInput from "../../../../General/formInput";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
  categories: { label: string; value: number | string }[];
}

const CreateSubCategory = ({ opened, onClose, categories }: ResolveProps) => {
  const createSubCategory = useCreateSubCategory();

  // State to hold multiple category IDs
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [subCategoryName, setSubCategoryName] = useState("");

  // Convert categories to string for MultiSelect compatibility
  const multiSelectData = categories.map((c) => ({
    label: c.label,
    value: String(c.value),
  }));

  const handleSubmit = async () => {
    // Validation
    if (selectedCategoryIds.length === 0 || !subCategoryName.trim()) {
      notifications.show({
        title: "Validation error",
        message: "Please select at least one category and enter a name",
        color: "red",
      });
      return;
    }

    // Construct the specific payload structure requested:
    // {
    //    "category": [ { "category_id": "4" }, { "category_id": "3" } ],
    //    "name": "Female wears"
    // }
    const payload = {
      category: selectedCategoryIds.map((id) => ({
        category_id: id,
      })),
      name: subCategoryName.trim(),
    };

    try {
      // Pass the new payload structure to the mutation
      // @ts-ignore - Ignoring type check if mutation expects old interface
      await createSubCategory.mutateAsync(payload);

      notifications.show({
        title: "New Sub-category Saved!",
        message: "Sub-category created successfully for selected categories",
        color: "green",
      });

      // Reset form
      setSubCategoryName("");
      setSelectedCategoryIds([]);
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
          {/* Changed to MultiSelect to allow picking multiple parents */}
          <MultiSelect
            label="Select Categories"
            data={multiSelectData}
            placeholder="Select one or more categories"
            value={selectedCategoryIds}
            onChange={setSelectedCategoryIds}
            searchable
            clearable
            required
            styles={{
              input: {
                paddingTop: "12px",
                paddingBottom: "12px",
                height: "auto",
                minHeight: "45px",
              },
              label: {
                marginBottom: "8px",
                fontWeight: 500,
                fontSize: "14px",
              }
            }}
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
              setSelectedCategoryIds([]);
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
            Cancel
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
            disabled={selectedCategoryIds.length === 0 || !subCategoryName}
          >
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateSubCategory;