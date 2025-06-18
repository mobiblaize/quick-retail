import { Modal, Button, Text, Box, Center, Title } from "@mantine/core";

import successGif from "../../../assets/gif/bookingSuccess.gif";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../../hooks/useApis";
import { handleOpenEmail } from "../../../utils/handleEmail";
import { useEffect } from "react";

interface PaymentSuccessModalProps {
  opened: boolean;
  onClose: () => void;
  onCompleteSetup?: () => void;
}

const PaymentSuccessModal = ({
  opened,
  onClose,
  onCompleteSetup,
}: PaymentSuccessModalProps) => {
  const registerEmail = sessionStorage.getItem("registerEmail");

  // get reference from url
  const reference = new URLSearchParams(window.location.search).get(
    "reference"
  );

  const isValid = registerEmail && reference;

  const { refetch, isPending } = useFetchData(
    isValid ? `auth/payment/verify-payment?reference=${reference}` : ""
  );

  useEffect(() => {
    if (opened) {
      refetch();
    }
  }, [opened, refetch]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      radius="lg"
      padding="xl"
      size="md"
      overlayProps={{ blur: 2 }}
    >
      <Center mb="md">
        <Box
          style={{
            background: "#F7FDF9",
            borderRadius: "50%",
            width: 90,
            height: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <img
            src={successGif}
            alt="success"
            className="size-30 object-cover"
          />
        </Box>
      </Center>
      <Title order={3} ta="center" mb={8}>
        Payment Success
      </Title>
      <Text ta="center" c="dimmed" mb="xl">
        Congratulation, you have successfully paid for your subscription. Go and
        Onboard and Log in to your system, we have sent you an email.
      </Text>
      <Button
        fullWidth
        color="orange"
        radius="md"
        size="md"
        style={{ fontWeight: 600 }}
        disabled={!isValid}
        loading={isPending}
        onClick={() => {
          handleOpenEmail(registerEmail ?? "");
          onCompleteSetup?.();
        }}
      >
        Complete Business Setup
      </Button>
    </Modal>
  );
};

export default PaymentSuccessModal;
