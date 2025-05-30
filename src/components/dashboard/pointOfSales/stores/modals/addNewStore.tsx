import { Button, Modal, Text } from "@mantine/core";
import FormInput from "../../../../General/formInput";
import { SetStateAction, useState } from "react";
import storeIcon from "../../../../../assets/images/newStore.png";
import { CircleHelp } from "lucide-react";
import { useCreateStore } from "../../../../../hooks/backendApis/pos/storeManagement";
import { notifications } from "@mantine/notifications";

interface AddNewStoreModalProps {
  opened: boolean;
  onClose: () => void;
  refetchStores?: () => void | Promise<any>;
}

const AddNewStore = ({
  opened,
  onClose,
  refetchStores,
}: AddNewStoreModalProps) => {
  // const [isEnabled, ] = useState(false);
  // const [isActivateStoreOpen, setIsActivateOpen] = useState(false);

  const [name, setName] = useState("");
  const [gla, setGla] = useState("");
  const [gsa, setGsa] = useState("");
  const [staff_no, setstaff_no] = useState();
  const [country, setCountry] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [lga, setLga] = useState(""); // optional
  const [address, setAddress] = useState("");

  const { mutate: createStore, isPending } = useCreateStore();

  const handleSubmit = () => {
    const payload = {
      name,
      gla,
      gsa,
      staff_no,
      country,
      state: stateVal,
      lga,
      address,
    };

    createStore(payload, {
      onSuccess: async () => {
        notifications.show({
          title: "Creation Successful",
          message: `${name} has been successfully created.`,
          color: "green",
          autoClose: 4000,
        });

        if (refetchStores) {
          try {
            await refetchStores(); 
          } catch (err) {
            console.error("Error while refetching stores:", err);
          }
        }

        onClose(); 
      },
      onError: (err: any) => {
        console.error("Failed to create store", err);
        notifications.show({
          title: "Creation Failed",
          message: "An error occurred while creating the store.",
          color: "red",
          autoClose: 5000,
        });
      },
    });
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
            <label className="flex items-center gap-2 mb-1.5">
              Store Name <CircleHelp color="#98A2B3" size={20} />
            </label>
            <FormInput
              type="text"
              paddingY="6px"
              value={name}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 mb-1.5">
                GLA <CircleHelp color="#98A2B3" size={20} />
              </label>
              <FormInput
                type="text"
                paddingY="6px"
                value={gla}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setGla(e.target.value)
                }
              />
            </div>
            <div>
              <label className="flex items-center gap-2 mb-1.5">
                GSA <CircleHelp color="#98A2B3" size={20} />
              </label>
              <FormInput
                type="text"
                paddingY="6px"
                value={gsa}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setGsa(e.target.value)
                }
              />
            </div>
            {/* <div>
              <label className="flex items-center gap-2 mb-1.5">
                Store ID <CircleHelp color="#98A2B3" size={20} />
              </label>
              <FormInput
                type="text"
                paddingY="6px"
                value={storeID}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setStoreID(e.target.value)}
              />
            </div> */}

            <div>
              <label className="flex items-center gap-2 mb-1.5">
                State <CircleHelp color="#98A2B3" size={20} />
              </label>
              <FormInput
                type="text"
                paddingY="6px"
                value={stateVal}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setStateVal(e.target.value)
                }
              />
            </div>
            <div>
              <label className="flex items-center gap-2 mb-1.5">
                LGA <CircleHelp color="#98A2B3" size={20} />
              </label>
              <FormInput
                type="text"
                paddingY="6px"
                value={lga}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setLga(e.target.value)
                }
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="flex items-center gap-2 mb-1.5">
                Country <CircleHelp color="#98A2B3" size={20} />
              </label>
              <FormInput
                type="text"
                paddingY="6px"
                value={country}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setCountry(e.target.value)
                }
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="flex items-center gap-2 mb-1.5">
                Address <CircleHelp color="#98A2B3" size={20} />
              </label>
              <FormInput
                type="text"
                paddingY="6px"
                value={address}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setAddress(e.target.value)
                }
              />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="flex items-center gap-2 mb-1.5">
                Number of Staff <CircleHelp color="#98A2B3" size={20} />
              </label>
              <FormInput
                type="number"
                paddingY="6px"
                value={staff_no}
                onChange={(e: { target: { value: string } }) =>
                //@ts-ignore
                  setstaff_no(Number(e.target.value))
                }
              />
            </div>
            {/* <div>
              <Text>Status</Text>
              <Switch
                checked={isEnabled}
                onChange={(event) => setIsEnabled(event.target.checked)}
                className={`${
                  isEnabled ? "text-[#12B76A]" : "text-gray-300"
                }`}
                size="md"
                label="Active"
              />
            </div> */}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button
              variant="outline-primary"
              onClick={onClose}
              style={{ border: "1px solid #D0D5DD", color: "#344054" }}
              className="order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              variant="filled-primary"
              loading={isPending}
              onClick={handleSubmit}
              className="order-1 sm:order-2"
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
      {/* <ActivateStore
        opened={isActivateStoreOpen}
        onClose={() => setIsActivateOpen(false)}
      /> */}
    </>
  );
};

export default AddNewStore;
