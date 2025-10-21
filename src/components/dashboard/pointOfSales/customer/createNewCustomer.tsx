import { Button, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { notifications } from '@mantine/notifications';
import { useCreateCustomer } from "../../../../hooks/backendApis/pos/customer";
import FormInput from "../../../General/formInput";

// Strict validation for Nigerian phone numbers
const phoneNumberRegex = /^(?:\+234|234|0)(7[0-9]|8[0-9]|9[0-9])[0-9]{8}$/;

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const CreateNewCustomer = ({ opened, onClose, onCreated }: ResolveProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const { mutate, isPending } = useCreateCustomer();

  const isFormValid = firstName.trim() && lastName.trim() && email.trim() && phoneNumber.trim();

  const handleSave = () => {
    // Validate email format
    if (!emailRegex.test(email.trim())) {
      notifications.show({
        title: 'Validation error',
        message: 'Please enter a valid email address.',
        color: 'red',
      });
      return;
    }

    // Remove any non-numeric characters from the phone number
    const sanitizedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");

    // Validate that the phone number matches the Nigerian format and is exactly 11 digits
    if (!phoneNumberRegex.test(sanitizedPhoneNumber)) {
      notifications.show({
        title: 'Validation error',
        message: 'Please enter a valid Nigerian phone number.',
        color: 'red',
      });
      return;
    }

    // If the form is not valid, show an error
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
          customer_phone: sanitizedPhoneNumber,  // Use the sanitized phone number
          customer_address: address,
        },
        {
          onSuccess: () => {
            notifications.show({
              title: 'New Customer Saved!',
              message: 'New Customer successfully added.',
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
          onError: (error: unknown) => {
            const message = (error as any)?.response?.data?.message || 'Failed to create customer';
            notifications.show({
              title: 'Error',
              message,
              color: 'red',
            });
          },
        }
      );
  };

  const handlePhoneNumberChange = (val: string) => {
    // Remove any non-numeric characters
    let value = val.replace(/[^0-9]/g, "");

    // Restrict the length to 11 digits
    if (value.length > 11) {
      value = value.slice(0, 11); // Truncate to 11 digits
    }

    setPhoneNumber(value);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <div>
          <Text size="1.8rem" c="black" fw={800}>
            Add New Customer
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
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            onChange={(val: string) =>  setFirstName(val)}
          />
          <FormInput
            label="Last Name"
            placeholder="Enter last name"
            paddingY={6}
            value={lastName}
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            onChange={(val: string) =>  setLastName(val)}
          />
        </div>

        <FormInput
          label="Email"
          placeholder="Enter customer email"
          paddingY={6}
          value={email}
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          onChange={(val: string) =>  setEmail(val)}
        />
        <FormInput
          label="Phone Number"
          placeholder="Enter phone number"
          paddingY={6}
          value={phoneNumber}
          onChange={handlePhoneNumberChange} // Updated handler
        />
        <FormInput
          label="Address (Optional)"
          placeholder="Enter address"
          paddingY={6}
          value={address}
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          onChange={(val: string) =>  setAddress(val)}
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
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default CreateNewCustomer;
