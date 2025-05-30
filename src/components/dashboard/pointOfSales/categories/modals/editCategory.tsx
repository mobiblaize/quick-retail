import { Button, Modal, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import FormInput from "../../../../General/formInput";
import { notifications } from "@mantine/notifications";
import { useUpdateSubCategories } from "../../../../../hooks/backendApis/pos/categories";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
  subCategory: {
    id: string | number;
    name: string;
  };
  onUpdate?: (updatedSubCategory: { id: string | number; name: string }) => void; // new prop
}

const EditCategory = ({ opened, onClose, subCategory,  onUpdate  }: ResolveProps) => {
  const [subCategoryName, setSubCategoryName] = useState(
    subCategory.name || ""
  );

  const { mutate, isPending } = useUpdateSubCategories(subCategory.id);

  useEffect(() => {
    if (opened) {
      setSubCategoryName(subCategory.name || "");
    }
  }, [opened, subCategory]);

  const handleSave = () => {
    if (!subCategoryName.trim()) {
      notifications.show({
        title: "Validation error",
        message: "Subcategory name is required",
        color: "red",
      });
      return;
    }

    mutate(
      { name: subCategoryName },
      {
        onSuccess: () => {
          notifications.show({
            title: "Success",
            message: "Subcategory updated successfully",
            color: "green",
          });
          // Tell parent to update its state with the new subcategory name
          onUpdate?.({ ...subCategory, name: subCategoryName });
        },
        onError: (error: any) => {
          notifications.show({
            title: "Error",
            message: error?.response?.data?.message || "Failed to update subcategory",
            color: "red",
          });
        },
      }
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <div>
          <Text size="1.8rem" c="black" fw={800}>
            Edit Subcategory
          </Text>
          <Text mt="5">Fill the details below.</Text>
        </div>
      }
      centered
      size="md"
      radius={20}
      padding="xl"
    >
      <div className="space-y-4 grid grid-cols-1">
        <FormInput
          label=""
          placeholder=""
          paddingY={6}
          value={subCategoryName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSubCategoryName(e.target.value)
          }
        />
      </div>

      <div className="flex mt-7 gap-5">
        <Button
          variant="outline"
          onClick={onClose}
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
          onClick={handleSave}
          loading={isPending}
          style={{
            color: "white",
            borderRadius: "0.4rem",
            height: "auto",
            padding: "0.9rem 1.5rem",
            fontWeight: 600,
            fontSize: "16px",
            width: "100%",
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default EditCategory;
