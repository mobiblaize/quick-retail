import {
  Modal,
  Button,
  Text,
  Box,
  PasswordInput,
} from "@mantine/core";
import { useState } from "react";
import { useChangePassword } from "../../../../hooks/backendApis/admin/settings";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function ChangePasswordModal({ opened, onClose }: Props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState("");

  // @ts-ignore
  const { mutate, isLoading } = useChangePassword();

  const isValid =
    currentPassword &&
    newPassword &&
    confirmPassword &&
    newPassword === confirmPassword;

  const handleSubmit = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setPasswordMismatchError("");

    if (newPassword !== confirmPassword) {
      setPasswordMismatchError("Passwords do not match.");
      return;
    }

    mutate(
      {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      },
      {
        onSuccess: (res) => {
          if (res?.error === false) {
            setSuccessMessage(res.message || "Password changed successfully");
            setTimeout(() => {
              onClose();
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setSuccessMessage("");
            }, 1500);
          } else {
            setErrorMessage(res.message || "Something went wrong");
          }
        },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || "An error occurred";
          setErrorMessage(msg);
        },
      }
    );
  };

  const sharedStyles = {
    input: {
      background: "#F9FAFB",
      borderColor: "#E5E7EB",
      fontWeight: 400,
    },
  };

  const sharedLabel = {
    label: "text-[14px] text-[#222] font-medium",
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={600} size="lg" c="#101928">
          Change Password
          <Text fw={600} size="sm" c="#667185">
            Fill the details below
          </Text>
        </Text>
      }
      radius="lg"
      centered
    >
      <Box className="space-y-4">
        <PasswordInput
          label="Current Password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.currentTarget.value)}
          withAsterisk
          radius="md"
          size="md"
          styles={sharedStyles}
          classNames={sharedLabel}
        />

        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.currentTarget.value)}
          withAsterisk
          radius="md"
          size="md"
          styles={sharedStyles}
          classNames={sharedLabel}
        />

        <div>
          <PasswordInput
            label="Confirm New Password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.currentTarget.value);
              setPasswordMismatchError(""); // Clear error on typing
            }}
            withAsterisk
            radius="md"
            size="md"
            styles={sharedStyles}
            classNames={sharedLabel}
          />
          {passwordMismatchError && (
            <Text c="red" size="sm" className="mt-1">
              {passwordMismatchError}
            </Text>
          )}
        </div>

        {errorMessage && (
          <Text c="red" size="sm" className="mt-1 text-center">
            {errorMessage}
          </Text>
        )}

        {successMessage && (
          <Text c="green" size="sm" className="mt-1 text-center">
            {successMessage}
          </Text>
        )}

        <div className="flex gap-4 mt-[2em] justify-center rounded-lg">
          <Button variant="outline" onClick={onClose}>
            No
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!isValid || isLoading}
            loading={isLoading}
          >
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
