import { Button, Modal, Text } from "@mantine/core";
import FormInput from "../../../../General/formInput";
import FormSelect from "../../../../General/select";

interface CreateDiscountModalProps {
  opened: boolean;
  onClose: () => void;
}

const CreateGiftCard = ({ opened, onClose }: CreateDiscountModalProps) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <div>
            <Text size="1.5rem" c="black" fw={700}>
              Create GiftCard
            </Text>
            <Text mt="5">Input discount information below.</Text>
          </div>
        }
        centered
        size="lg"
        radius={10}
        padding="xl"
      >
        <div className="flex flex-col space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              type="text"
              label="Recipient's First Name"
              paddingY="6px"
            />

            <FormInput
              type="text"
              label="Recipient's Last Name"
              paddingY="6px"
            />

            <div className="col-span-2">
              <FormInput type="email" label="Email" paddingY="6px" />
            </div>

            <div className="col-span-2">
              <FormInput type="tel" label="Phone Number" paddingY="6px" />
            </div>

            <FormSelect options={["1,2,3,4,5"]} label="Quantity" paddingY="3" />
            <FormInput type="tel" label="Amount" paddingY="6px" />
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

export default CreateGiftCard;
