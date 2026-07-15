import { useEffect, useState } from "react";
import {
  Box,
  Group,
  Stack,
  Title,
  Text,
  Button,
  Paper,
  Loader,
} from "@mantine/core";
import { CheckCircle, ChevronLeft } from "lucide-react";
import { useNavigate, useParams} from "react-router-dom";

export default function TransactionSuccessCallback() {
  const navigate = useNavigate();
  const { id } = useParams();
  const brandOrange = "#F16722";
  const [isVerifying, setIsVerifying] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Simulate transaction verification
    const timer = setTimeout(() => {
      setIsVerifying(false);
    }, 1500);

    // Countdown timer for auto redirect
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          navigate("/dashboard/admin/billing");
          return 0;
        }
        return prev - 1;
      });
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, [navigate]);

  return (
    <Box p="md" bg="#F9FAFB" style={{ minHeight: "100vh" }}>
      <Group mb="xl">
        <Button
          variant="subtle"
          color="gray"
          leftSection={<ChevronLeft size={20} />}
          onClick={() => navigate("/dashboard/admin/billing")}
        >
          Back to Transaction Fees
        </Button>
      </Group>

      <Box style={{ maxWidth: "600px", margin: "0 auto", marginTop: "50px" }}>
        <Paper p="xl" withBorder radius="md">
          <Stack gap="lg" align="center">
            {isVerifying ? (
              <Stack gap="md" align="center">
                <Loader size={48} color={brandOrange} />
                <Title order={3} fw={700} c="#1D2739">
                  Verifying Transaction...
                </Title>
                <Text size="sm" c="dimmed" ta="center">
                  Please wait while we verify your transaction
                </Text>
              </Stack>
            ) : (
              <Stack gap="md" align="center">
                <CheckCircle size={64} color="#22c55e" />
                <Title order={2} fw={700} c="#1D2739">
                  Transaction Successful!
                </Title>
                <Text size="sm" c="dimmed" ta="center">
                  Your payment has been processed successfully. Invoice has been
                  marked as paid.
                </Text>

                <Stack gap="sm" w="100%">
                  <Button
                    fullWidth
                    bg={brandOrange}
                    onClick={() => navigate("/dashboard/admin/billing")}
                  >
                    View Transaction Fees
                  </Button>
                  {id && (
                    <Button
                      fullWidth
                      variant="outline"
                      color="gray"
                      onClick={() => navigate(`/dashboard/admin/billing/view/${id}`)}
                    >
                      View Billing History
                    </Button>
                  )}
                  <Text size="xs" c="dimmed" ta="center">
                    Redirecting in {countdown} seconds...
                  </Text>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
