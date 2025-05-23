import { Button, Modal, Text } from "@mantine/core";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;  
}

const ActivateCategory = ({ opened, onClose,   onConfirm }: ResolveProps) => {
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
              Activate Sub-Category
            </Text>
            <Text
              mt="5"
              style={{
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
              }}
            >
              Are you sure you want to activate this Categorie? Activated
              Categories will appear when adding a product. You can also
              deactivate this product later.
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
            onClick={() => {
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
            variant="filled"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              backgroundColor: "#04802E",
              color: "white",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 1.5rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%",
            }}
          >
            Yes, activate
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ActivateCategory;
