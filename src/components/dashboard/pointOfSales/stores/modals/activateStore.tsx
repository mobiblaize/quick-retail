import { Button, Modal, Text } from "@mantine/core";
import activate from "../../../../../assets/images/activateStore.png";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
}

const ActivateStore = ({ opened, onClose }: ResolveProps) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <div>
            <img src={activate} alt="activate store" className="mb-2" />
            <Text size="1.4rem" c="black" fw={400}>
              Activate Store
            </Text>
            <Text mt="5">Are you sure you want to activate store?</Text>
            <Text mt="5">if activated store will be visibile to customers</Text>
          </div>
        }
        centered
        size="md"
        radius={20}
        padding="xl"
      >
        <div className="space-y-4 grid grid-cols-1"></div>
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
            variant="filled"
            style={{
              backgroundColor: "#099137",
              color: "white",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 1.5rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%",
            }}
          >
            Activate
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ActivateStore;
