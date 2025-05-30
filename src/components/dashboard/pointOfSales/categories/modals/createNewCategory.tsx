import { Button, Modal, Text } from "@mantine/core";
import { useState } from "react";
import FormInput from "../../../../General/formInput";
import { notifications } from '@mantine/notifications';
import { useCreateCategory } from "../../../../../hooks/backendApis/pos/categories";


interface ResolveProps {
  opened: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const CreateNewCategory = ({ opened, onClose,  onCreated}: ResolveProps) => {
  const [categoryName, setCategoryName] = useState("");
  const { mutate, isPending  } = useCreateCategory();

  const handleSave = () => {
    if (!categoryName.trim()) {
      notifications.show({
        title: 'Validation error',
        message: 'Category name is required',
        color: 'red',
      });
      return;
    }
  
    mutate(
      { name: categoryName },
      {
        onSuccess: () => {
          notifications.show({
            title: 'New Category Saved!',
            message: 'You can now add products to the new Categories',
            color: 'green',
          });
          setCategoryName('');
          if (onCreated) {
            onCreated();  // <-- call this here to refetch & close modal
          } else {
            onClose();
          }
        },
        onError: (error: any) => {
          notifications.show({
            title: 'Error',
            message:
              error?.response?.data?.message || 'Failed to create category',
            color: 'red',
          });
        },
      }
    );
  };
  
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <div>
            <Text size="1.8rem" c="black" fw={800}>
              Create Category
            </Text>
            <Text mt="5">Give your category a name below.</Text>
          </div>
        }
        centered
        size="md"
        radius={20}
        padding="xl"
      >
        <div className="space-y-4 grid grid-cols-1">
          <FormInput
            label="Category Name"
            placeholder="Enter Cateory Name"
            paddingY={6}
            value={categoryName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCategoryName(e.target.value)
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
            loading={isPending }
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
    </>
  );
};

export default CreateNewCategory;
