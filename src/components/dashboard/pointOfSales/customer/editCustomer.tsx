import { Button, Modal, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { notifications } from '@mantine/notifications';
import { useCreateCustomer } from "../../../../hooks/backendApis/pos/customer";
import FormInput from "../../../General/formInput";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
  onCreated?: () => void;
  customer?: any;  
}

const EditCustomer = ({ opened, onClose, onCreated, customer }: ResolveProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const { mutate, isPending } = useCreateCustomer();

  const isFormValid = firstName.trim() && lastName.trim() && email.trim() && phoneNumber.trim();
  useEffect(() => {
    if (customer) {
      // Split name if needed
      const nameParts = customer.name?.split(' ') || [];
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
      setEmail(customer.contact || '');
      setPhoneNumber(customer.number || '');
      setAddress(customer.address || '');
    }
  }, [customer]);
  
  const handleSave = () => {
    if (!isFormValid) {
      notifications.show({
        title: 'Validation error',
        message: 'Please fill in all required fields (First name, Last name, Email, Phone number)',
        color: 'red',
      });
      return;
    }

    mutate(
        {
          customer_name: `${firstName.trim()} ${lastName.trim()}`,
          customer_email: email,
          customer_phone: phoneNumber,
          customer_address: address,
        },
        {
          onSuccess: () => {
            notifications.show({
              title: 'New Customer Saved!',
              message: 'New Customer succesfully added.',
              color: 'green',
            });
      
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumber('');
            setAddress('');
      
            if (onCreated) {
              onCreated();
            } else {
              onClose();
            }
          },
          onError: (error: any) => {
            notifications.show({
              title: 'Error',
              message: error?.response?.data?.message || 'Failed to create customer',
              color: 'red',
            });
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
          <Text size="1.8rem" c="black" fw={800}>
            Edit Customer
          </Text>
          <Text mt="5">Enter the details below to add a new customer</Text>
        </div>
      }
      centered
      size="md"
      radius={20}
      padding="xl"
    >
      <div className="space-y-4 grid grid-cols-1">
        <div className="flex gap-4">
          <FormInput
            label="First Name"
            placeholder="Enter first name"
            paddingY={6}
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          />
          <FormInput
            label="Last Name"
            placeholder="Enter last name"
            paddingY={6}
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          />
        </div>

        <FormInput
          label="Email"
          placeholder="Enter customer email"
          paddingY={6}
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <FormInput
          label="Phone Number"
          placeholder="Enter phone number"
          paddingY={6}
          value={phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
        />
        <FormInput
          label="Address (Optional)"
          placeholder="Enter address"
          paddingY={6}
          value={address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
        />
      </div>

      <div className="flex mt-7 gap-5">
        <Button
          variant="outline"
          onClick={onClose}
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
          onClick={handleSave}
          loading={isPending}
          disabled={!isFormValid || isPending}
          style={{
            color: "white",
            borderRadius: "0.4rem",
            height: "auto",
            padding: "0.9rem 1.5rem",
            fontWeight: 600,
            fontSize: "16px",
            width: "100%",
            opacity: isFormValid ? 1 : 0.5,
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
        >
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default EditCustomer;
