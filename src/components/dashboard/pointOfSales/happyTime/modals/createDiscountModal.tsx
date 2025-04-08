import { Button, Modal, Text } from "@mantine/core";
import FormInput from "../../../../General/formInput";
import { useState } from "react";

interface CreateDiscountModalProps {
  opened: boolean;
  onClose: () => void;
}

const CreateDiscountModal = ({ opened, onClose }: CreateDiscountModalProps) => {
  const [discountType, setDiscountType] = useState<string>("Amount");

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <div>
            <Text size="1.5rem" c="black" fw={700}>
              Create Discount
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
              label="Discount Name"
              placeholder="Enter discount name"
              paddingY="6px"
            />

            <FormInput
              type="text"
              label="Discount Code"
              placeholder="Enter discount code"
              paddingY="6px"
            />

            <FormInput type="date" label="Date From" paddingY="6px" />

            <FormInput type="date" label="Date To" paddingY="6px" />

            <div className="col-span-2">
              <FormInput
                type="text"
                label="Discount Product"
                paddingY="6px"
                placeholder="Search or select"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Discount Type
              </label>
              <select
                className="w-full p-3 border border-gray-300  rounded"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
              >
                <option value="Amount">Amount</option>
                <option value="Percentage">Percentage</option>
              </select>
            </div>

            {discountType === "Percentage" ? (
              <div className="col-span-2">
                <FormInput
                  type="text"
                  label="Percentage"
                  placeholder="%"
                  paddingY="6px"
                />
              </div>
            ) : (
              <div className="col-span-2 grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Amount
                  </label>
                  <input
                    type="text"
                    placeholder="Enter amount"
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <div className="h-6 mb-1"></div>
                  <select className="w-full p-3 border border-[#EAECF0]  bg-[#EAECF0]  rounded">
                    <option value="Naira">Naira</option>
                    <option value="Dollar">Dollar</option>
                  </select>
                </div>
              </div>
            )}
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

export default CreateDiscountModal;
