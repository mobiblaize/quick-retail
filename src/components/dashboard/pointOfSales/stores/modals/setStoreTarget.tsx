import { SetStateAction, useState } from "react";
import { Button, Modal, Text } from "@mantine/core";
import FormInput from "../../../../General/formInput";
import { CircleHelp } from "lucide-react";
import {
  useFetchStore,
  uselocationTarget,
} from "../../../../../hooks/backendApis/pos/storeManagement";
import Dropdown from "../../../../General/dropdown";
import { notifications } from "@mantine/notifications";

interface AddNewStoreModalProps {
  opened: boolean;
  onClose: () => void;
}

const SetStoreTarget = ({ opened, onClose }: AddNewStoreModalProps) => {
  const [locationId, setLocationId] = useState("");
  const [duration, setDuration] = useState("");
  const [transactionValue, setTransactionValue] = useState("");
  const [conversionRate, setConversionRate] = useState("");

  const { mutate, isPending } = uselocationTarget();
  const { data } = useFetchStore();
  const storeOptions = Array.isArray(data?.data?.stores?.data)
    ? data.data.stores.data.map((store: any) => ({
        label: store.name,
        value: store.locationID,
      }))
    : [];
  const handleSubmit = () => {
    mutate(
      {
        locationId,
        duration: `${duration} months`,
        transaction_value: Number(transactionValue),
        conversion_rate: Number(conversionRate),
      },
      {
        onSuccess: () => {
          notifications.show({
            title: "Success",
            message: "Store target created successfully!",
            color: "green",
            autoClose: 3000,
          });
          onClose();
        },
        onError: (error) => {
          notifications.show({
            title: "Error",
            message: "Failed to create store target.",
            color: "red",
            autoClose: 5000,
          });
          console.error("Store target creation failed", error);
        },
      }
    );
  };

  return (
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
          <label className="flex items-center gap-2 mb-1.5">
            Select Store
            <CircleHelp color="#98A2B3" size={20} />
          </label>
          <Dropdown
            options={storeOptions}
            value={locationId}
            onChange={(val) => setLocationId(val as string)}
            textColorClass="text-gray-800"
            placeholder="Select a store"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="flex items-center gap-2 mb-1.5">
            Select Target Period (months)
            <CircleHelp color="#98A2B3" size={20} />
          </label>
          <div className="flex items-center gap-2">
            <FormInput
              type="number"
              value={duration}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setDuration(e.target.value)
              }
              paddingY="6px"
              className="w-full"
            />
            <span className="text-gray-600">months</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="flex items-center gap-2 mb-1.5">
              Average Transaction Value
              <CircleHelp color="#98A2B3" size={20} />
            </label>
            <FormInput
              type="number"
              value={transactionValue}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setTransactionValue(e.target.value)
              }
              paddingY="6px"
            />
          </div>
          <div className="flex flex-col">
            <label className="flex items-center gap-2 mb-1.5">
              Conversion Rate (%)
              <CircleHelp color="#98A2B3" size={20} />
            </label>
            <FormInput
              type="number"
              value={conversionRate}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setConversionRate(e.target.value)
              }
              paddingY="6px"
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
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="filled-primary"
            loading={isPending}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SetStoreTarget;
