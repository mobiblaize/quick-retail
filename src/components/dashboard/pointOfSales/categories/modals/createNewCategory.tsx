import { Button, Modal, Text } from "@mantine/core";
import FormInput from "../../../../General/formInput";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
}

const CreateNewCategory = ({ opened, onClose }: ResolveProps) => {
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
          />
        </div>
        <div className="flex mt-7 gap-5">
          <Button
            variant="outline"
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
          >
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreateNewCategory;
