import { Button, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useCreateCustomer } from "../../../../hooks/backendApis/pos/customer";
import FormInput from "../../../General/formInput";

// Strict validation for Nigerian phone numbers
const phoneNumberRegex = /^(?:\+234|234|0)(7[0-9]|8[0-9]|9[0-9])[0-9]{8}$/;
// Standard email regex
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

  const isFormValid = firstName.trim() && lastName.trim() && phoneNumber.trim();

  const handleSave = () => {
    // 1. Sanitize and validate Phone Number
    const sanitizedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");
    if (!phoneNumberRegex.test(sanitizedPhoneNumber)) {
      notifications.show({
        title: "Validation error",
        message: "Please enter a valid Nigerian phone number.",
        color: "red",
      });
      return;
    }

    // 2. Validate Email ONLY if it is not empty
    if (email.trim() !== "" && !emailRegex.test(email.trim())) {
      notifications.show({
        title: "Validation error",
        message: "Please enter a valid email address.",
        color: "red",
      });
      return;
    }

    // 3. Check Required Fields
    if (!isFormValid) {
      notifications.show({
        title: "Validation error",
        message: "Please fill in all required fields (First name, Last name, Phone number)",
        color: "red",
      });
      return;
    }

    mutate(
      {
        customer_name: `${firstName.trim()} ${lastName.trim()}`,
        customer_email: email || null,
        customer_phone: sanitizedPhoneNumber,
        customer_address: address.trim(),
      },
      {
        onSuccess: () => {
          notifications.show({
            title: "New Customer Saved!",
            message: "New Customer successfully added.",
            color: "green",
          });

          // Reset fields
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhoneNumber("");
          setAddress("");

          if (onCreated) {
            onCreated();
          } else {
            onClose();
          }
        },
        onError: (error: unknown) => {
          const message =
            (error as any)?.response?.data?.message ||
            "Failed to create customer";
          notifications.show({
            title: "Error",
            message,
            color: "red",
          });
        },
      },
    );
  };

  const handlePhoneNumberChange = (val: string) => {
    let value = val.replace(/[^0-9]/g, "");
    if (value.length > 11) {
      value = value.slice(0, 11);
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
            onChange={(val: string) => setFirstName(val)}
          />
          <FormInput
            label="Last Name"
            placeholder="Enter last name"
            paddingY={6}
            value={lastName}
            onChange={(val: string) => setLastName(val)}
          />
        </div>

        <FormInput
          label="Email (Optional)"
          placeholder="Enter customer email"
          paddingY={6}
          value={email}
          onChange={(val: string) => setEmail(val)}
        />
        <FormInput
          label="Phone Number"
          placeholder="Enter phone number"
          paddingY={6}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <FormInput
          label="Address (Optional)"
          placeholder="Enter address"
          paddingY={6}
          value={address}
          onChange={(val: string) => setAddress(val)}
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