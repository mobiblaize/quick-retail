import { Button, Modal, Switch, Text } from "@mantine/core";
import FormInput from "../../../../General/formInput";
import { useState } from "react";
import storeIcon from "../../../../../assets/images/newStore.png";
import { CircleHelp } from "lucide-react";
import ActivateStore from "./activateStore";
interface AddNewStoreModalProps {
  opened: boolean;
  onClose: () => void;
}

const AddNewStore = ({ opened, onClose }: AddNewStoreModalProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isActivateStoreOpen, setIsActivateOpen] = useState(false);

  const handleActivateStore = () => {
    onClose();
    setIsActivateOpen(true);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <div>
            <img src={storeIcon} alt="store-icon" className="mb-2" />
            <Text size="1.5rem" c="black" fw={700}>
              Add New Store
            </Text>
            <Text mt="5">Input store information below.</Text>
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
              Store Name
              <CircleHelp color="#98A2B3" size={20} />
            </label>
            <FormInput type="number" paddingY="6px" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="" className="flex items-center gap-2 mb-1.5">
                GLA
                <CircleHelp color="#98A2B3" size={20} />
              </label>
              <FormInput type="text" paddingY="6px" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="flex items-center gap-2 mb-1.5">
                GSA
                <CircleHelp color="#98A2B3" size={20} />
              </label>
              <FormInput type="text" paddingY="6px" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="flex items-center gap-2 mb-1.5">
                Store ID
                <CircleHelp color="#98A2B3" size={20} />
              </label>
              <FormInput type="text" paddingY="6px" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="flex items-center gap-2 mb-1.5">
                Country
                <CircleHelp color="#98A2B3" size={20} />
              </label>
              <FormInput type="text" paddingY="6px" />
            </div>{" "}
            <div className="col-span-2">
              <div className="col-span-2">
                <label htmlFor="" className="flex items-center gap-2 mb-1.5">
                  Address
                  <CircleHelp color="#98A2B3" size={20} />
                </label>
                <FormInput type="text" paddingY="6px" />
              </div>
            </div>
            <div className="flex flex-col">
              <Text>Status</Text>
              <Switch
                checked={isEnabled}
                onChange={(event) => setIsEnabled(event.target.checked)}
                className={`${
                  isEnabled ? "text-[#12B76A] bg-[#E16635]" : "text-gray-300"
                } relative inline-flex h-6 w-12 items-center rounded-full transition`}
                size="md"
                label="Active"
              />
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
            <Button variant="filled-primary" onClick={handleActivateStore}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>
      <ActivateStore
        opened={isActivateStoreOpen}
        onClose={() => setIsActivateOpen(false)}
      />
    </>
  );
};

export default AddNewStore;
