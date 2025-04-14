import { Button, Modal, Text } from "@mantine/core";
import FormInput from "../../../../General/formInput";
import FormSelect from "../../../../General/select";
import { CircleHelp } from "lucide-react";
interface AddNewStoreModalProps {
  opened: boolean;
  onClose: () => void;
}

const SetStoreTarget = ({ opened, onClose }: AddNewStoreModalProps) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <div>
            <Text size="1.5rem" c="black" fw={700}>
              Store Target
            </Text>
            <Text mt="5">Input store target below.</Text>
          </div>
        }
        centered
        size="lg"
        radius={10}
        padding="xl"
      >
        <div className="flex flex-col space-y-6">
          <div className="col-span-2">
            <label htmlFor="" className="flex items-center gap-2 mb-1.5">
              Select Store
              <CircleHelp color="#98A2B3" size={20} />
            </label>
            <FormSelect options={["Palm Mall Vi"]} paddingY="3" />
          </div>

          <div className="col-span-2">
            <label htmlFor="" className="flex items-center gap-2 mb-1.5">
              Select Target Period
              <CircleHelp color="#98A2B3" size={20} />
            </label>
            <FormSelect options={["6 month"]} paddingY="3" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="" className="flex items-center gap-2 mb-1.5">
                Average Transaction Value
                <CircleHelp color="#98A2B3" size={20} />
              </label>
              <FormInput type="text" paddingY="6px" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="flex items-center gap-2 mb-1.5">
                Conversion Rate (%)
                <CircleHelp color="#98A2B3" size={20} />
              </label>
              <FormInput type="text" paddingY="6px" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button
              variant="outline-primary"
              style={{
                border: "1px solid #D0D5DD",
                color: "#344054",
              }}
            >
              Cancel
            </Button>
            <Button variant="filled-primary">Submit</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SetStoreTarget;
