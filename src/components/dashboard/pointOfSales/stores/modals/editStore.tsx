import { Button, Modal, Text } from "@mantine/core";
import FormInput from "../../../../General/formInput";
import Dropdown from "../../../../General/dropdown";
import { useEffect, useState } from "react";
import {
  useEditStore,
  useFetchCountries,
  useFetchStates,
  useFetchCities,
} from "../../../../../hooks/backendApis/pos/storeManagement";
import { notifications } from "@mantine/notifications";
import { formatDate } from "../../../../../utils/helpers";

interface AddNewStoreModalProps {
  opened: boolean;
  onClose: () => void;
  store: any;
  setStore: React.Dispatch<React.SetStateAction<any>>;
}

const EditStore = ({ opened, onClose, store, setStore }: AddNewStoreModalProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [name, setName] = useState("");

  // store IDs instead of names
  const [country, setCountry] = useState<string>("");
  const [stateVal, setStateVal] = useState<string>("");
  const [lga, setLga] = useState<string>("");
  const [address, setAddress] = useState("");

  const storeIdForEdit = store?.locationID || "";
  const { mutate: editStore, isPending } = useEditStore(storeIdForEdit);
  const [, setCreatedAt] = useState("");

  const { data: countriesData } = useFetchCountries();
  const { data: statesData } = useFetchStates(country);
  const { data: citiesData } = useFetchCities(stateVal);

  // Load initial store values
  useEffect(() => {
    if (store) {
      setName(store.name || "");
      setAddress(store.address || "");
      setIsEnabled(store.is_active === 1);
      setCreatedAt(store.created_at || "");
    }
  }, [store]);

  // Load Country ID from store
  useEffect(() => {
    if (store && countriesData?.data) {
      if (store.country_id) {
        setCountry(store.country_id.toString());
      } else {
        const found = countriesData.data.find((c: any) => c.name === store.country);
        if (found) setCountry(found.id.toString());
      }
    }
  }, [store, countriesData]);

  // Load State ID
  useEffect(() => {
    if (store && statesData?.data) {
      if (store.state_id) {
        setStateVal(store.state_id.toString());
      } else {
        const found = statesData.data.find((s: any) => s.name === store.state);
        if (found) setStateVal(found.id.toString());
      }
    }
  }, [store, statesData]);

  // Load City ID (LGA)
  useEffect(() => {
    if (store && citiesData?.data) {
      if (store.lga_id) {
        setLga(store.lga_id.toString());
      } else {
        const found = citiesData.data.find((c: any) => c.name === store.lga);
        if (found) setLga(found.id.toString());
      }
    }
  }, [store, citiesData]);

  const handleSubmit = () => {
    const payload = {
      name,
      country: "", // ID as string
      state: stateVal, // ID as string
      lga: "", // ID as string
      address,
      is_active: isEnabled ? 1 : 0,
    };

    editStore(payload, {
      onSuccess: () => {
        notifications.show({
          title: "Update Successful",
          message: `${name} has been updated successfully.`,
          color: "green",
        });

        const selectedCountryName =
          countriesData?.data?.find((c: any) => c.id.toString() === country)?.name || store.country;

        const selectedStateName =
          statesData?.data?.find((s: any) => s.id.toString() === stateVal)?.name || store.state;

        const selectedLgaName =
          citiesData?.data?.find((c: any) => c.id.toString() === lga)?.name || store.lga;

        // Update UI after success
        setStore((prev: any) => ({
          ...prev,
          name,
          country: selectedCountryName,
          state: selectedStateName,
          lga: selectedLgaName,
          address,
          is_active: isEnabled ? 1 : 0,
        }));

        onClose();
      },

      onError: () => {
        notifications.show({
          title: "Update Failed",
          message: "An error occurred while updating the store.",
          color: "red",
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
            <Text size="1.5rem" fw={700}>Edit Store</Text>
            <Text mt="5">Edit store details below.</Text>
          </div>
        }
        centered
        size="lg"
        radius={10}
        padding="xl"
      >
        <div className="w-full bg-[#FFF4ED] text-black mt-3 p-4 rounded text-sm font-medium flex justify-between">
          <div>
            <p className="text-gray-700">Date Created:</p>
            <span>{formatDate(store.created_at)}</span>
          </div>
          <div>
            <p className="text-gray-700">Total Staff</p>
            <p>{store.staff_no}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-6 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="mb-1.5 block">Store Name</label>
              <FormInput value={name} onChange={setName} type="text" paddingY="6px" />
            </div>

            <Dropdown
              label="Country"
              placeholder="Select Country"
              value={country}
              onChange={(val: string | number) => setCountry(val.toString())}
              options={
                countriesData?.data?.map((c: any) => ({
                  label: c.name,
                  value: c.id.toString(),
                })) || []
              }
              searchable
            />

            <Dropdown
              label="State"
              placeholder="Select State"
              value={stateVal}
              onChange={(val: string | number) => setStateVal(val.toString())}
              options={
                statesData?.data?.map((s: any) => ({
                  label: s.name,
                  value: s.id.toString(),
                })) || []
              }
              disabled={!country}
              searchable
            />

            <Dropdown
              label="Region/LGA"
              placeholder="Select LGA"
              value={lga}
              onChange={(val: string | number) => setLga(val.toString())}
              options={
                citiesData?.data?.map((city: any) => ({
                  label: city.name,
                  value: city.id.toString(),
                })) || []
              }
              disabled={!stateVal}
              searchable
            />

            <div className="col-span-2">
              <label className="mb-1.5 block">Address</label>
              <FormInput value={address} onChange={setAddress} type="text" paddingY="6px" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button variant="outline-primary" onClick={onClose} style={{ border: "1px solid #F16722", color: "#F16722" }}>
              Cancel
            </Button>

            <Button variant="filled-primary" loading={isPending} onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditStore;
