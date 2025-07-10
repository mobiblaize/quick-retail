import { Modal, Button, Text, Box, Center, Title } from "@mantine/core";

import successGif from "../../../assets/gif/bookingSuccess.gif";

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
  // get reference as param from url e.g http://localhost:5173/payment-summary?trxref=xrafr1sxkp&reference=xrafr1sxkp

  // get the reference from the url
  const reference = new URLSearchParams(window.location.search).get(
    "reference"
  );
  const email = sessionStorage.getItem("registerEmail");

  const isValid = email && reference;

  const { refetch, isPending } = useFetchData(
    isValid ? `auth/payment/verify-payment?reference=${reference}` : ""
  );

  useEffect(() => {
    if (opened && isValid) {
      refetch();
    }
  }, [opened, refetch, isValid]);

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
        Congratulations! You have successfully paid for your subscription. Go
        and onboard and log in to your system. We’ve also sent you an email.
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
          handleOpenEmail(email ?? "");
          onCompleteSetup?.();
        }}
      >
        Complete Business Setup
      </Button>
    </Modal>
  );
};

export default PaymentSuccessModal;
