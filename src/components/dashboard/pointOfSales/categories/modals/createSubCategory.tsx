import { Button, Modal, Text } from "@mantine/core";
import FormInput from "../../../../General/formInput";
import FormSelect from "../../../../General/select";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
}

const CreateSubCategory = ({ opened, onClose }: ResolveProps) => {
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
              fill the details below.
            </Text>
          </div>
        }
        centered
        size="md"
        radius={20}
        padding="xl"
      >
        <div className="space-y-4 grid grid-cols-1">
          <FormSelect
            options={["TG GOLD"]}
            paddingY="3"
            label="Select Category"
          />
          <FormInput
            label="Sub-Category Name"
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

export default CreateSubCategory;
