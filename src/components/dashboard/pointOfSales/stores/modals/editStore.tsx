import { Button, Modal, Text } from "@mantine/core";
import FormInput from "../../../../General/formInput";
import { SetStateAction, useEffect, useState } from "react";
import { useEditStore } from "../../../../../hooks/backendApis/pos/storeManagement";
import { notifications } from "@mantine/notifications";
import { formatDate } from "../../../../../utils/helpers";

interface AddNewStoreModalProps {
  opened: boolean;
  onClose: () => void;
  store: any;
  setStore: React.Dispatch<React.SetStateAction<any>>; 
}

const EditStore = ({ opened, onClose, store,   setStore }: AddNewStoreModalProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  console.log("stores", store);
  const [name, setName] = useState("");
  const [staff_no, setstaff_no] = useState("");
  const [country, setCountry] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [lga, setLga] = useState(""); // optional
  const [address, setAddress] = useState("");
  const storeIdForEdit = store?.locationID || "";
  const { mutate: editStore, isPending } = useEditStore(storeIdForEdit);
  const [, setCreatedAt] = useState("");

  useEffect(() => {
    if (store) {
      setName(store.name || "");

      setCountry(store.country || "");
      setstaff_no(store.staff_no || "");
      setStateVal(store.state || "");
      setLga(store.lga || "");
      setAddress(store.address || "");
      setIsEnabled(store.is_active === 1);
      setCreatedAt(store.created_at || "");
    }
  }, [store]);



  const handleSubmit = () => {
    const payload = {
      name,
      // gla,
      // gsa,
      // storeID,
      country,
      state: stateVal,
      lga,
      address,
      status: isEnabled ? "active" : "inactive",
    };

    editStore(payload, {
      onSuccess: () => {
        notifications.show({
          title: "Update Successful",
          message: `${name} has been updated successfully.`,
          color: "green",
          autoClose: 4000,
        });

        onClose();
        setStore((prev: any) => ({ ...prev, ...payload }));
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
            <Text size="1.5rem" c="black" fw={700}>
              Edit Store
            </Text>
            <Text mt="5">Edit store details below.</Text>

          </div>
        }
        centered
        size="lg"
        radius={10}
        padding="xl"
      >
         <div className="w-full bg-[#FFF4ED] text-black mt-3 p-4 rounded text-sm font-medium flex flex-col sm:flex-row justify-between gap-4">
    <div className="flex flex-col">

      <p className="text-gray-700">      Date Created:</p>
      <span>{formatDate(store.created_at)}</span>
    </div>
    <div className="flex flex-col">
      <p className="text-gray-700">Total Staff</p>
      <p>{store.staff_no}</p>
    </div>
  </div>
        <div className="flex flex-col space-y-6">
         
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       
            <div className="">
            <label className="flex items-center gap-2 mb-1.5">
              Store Name 
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
          <div>
              <label className="flex items-center gap-2 mb-1.5">
                Country 
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
            <div>
              <label className="flex items-center gap-2 mb-1.5">
                State 
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
                Region/LGA 
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
                Address 
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
                Number of Staff 
              </label>
              <FormInput
                type="number"
                paddingY="6px"
                value={staff_no}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                 //@ts-ignore
                setstaff_no(e.target.value)
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
              style={{ border: "1px solid #F16722", color: "#F16722" }}
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
           Save Changes
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

export default EditStore;
