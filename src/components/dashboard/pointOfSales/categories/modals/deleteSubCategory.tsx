import { Button, Modal, Text } from "@mantine/core";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
}

const DeleteSubCategory = ({ opened, onClose }: ResolveProps) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <div>
            <Text size="1.8rem" c="black" fw={700}>
              Delete Sub-Category
            </Text>
            <Text mt="5">
              Are you sure you want to delete this sub-category ?
            </Text>
          </div>
        }
        centered
        size="lg"
        radius={20}
        padding="xl"
      >
        <div className="space-y-4 grid grid-cols-1"></div>
        <div className="flex mt-7 gap-14">
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
            variant="filled"
            style={{
              backgroundColor: "#CB1A14",
              color: "white",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 1.5rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%",
            }}
          >
            Yes, delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteSubCategory;
