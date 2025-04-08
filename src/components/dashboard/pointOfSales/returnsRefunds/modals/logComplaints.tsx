import { Button, Modal, Text } from "@mantine/core";
import FormSelect from "../../../../General/select";
import FormInput from "../../../../General/formInput";

interface LogComplaintsProps {
  opened: boolean;
  onClose: () => void;
}

const LogComplaints = ({ opened, onClose }: LogComplaintsProps) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <div>
            <Text size="1.5rem" c="black" fw={700}>
              Log in Complaint
            </Text>
            <Text mt="5">Fill the details below.</Text>
          </div>
        }
        centered
        size="lg"
        radius={10}
        padding="xl"
      >
        <div className="space-y-4 grid grid-cols-1">
          <FormSelect
            label="Select or Search Customer's Name"
            options={["Dele"]}
            placeholder="Enter customer"
            paddingY="3"
          />
          <FormInput
            label="Order No"
            placeholder="Enter order no"
            paddingY="6px"
          />
          <FormInput
            label="Product No"
            placeholder="Enter order no"
            paddingY="6px"
          />
          <FormInput
            label="Order No"
            placeholder="Enter product no"
            paddingY="6px"
          />
          <FormSelect
            label="Reason for Refund"
            options={["Dele"]}
            placeholder="Enter reason"
            paddingY="3"
          />
          <FormInput
            label="Description"
            placeholder="Enter product no"
            optional
            paddingY="6px"
          />
        </div>
        <div
          key="confirm-payment-buttons"
          className="flex mt-7 justify-between"
        >
          <Button variant="outline-primary">Cancel</Button>
          <Button variant="filled-primary">Log Complaint</Button>
        </div>
      </Modal>
    </>
  );
};

export default LogComplaints;
