/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Box,
  Paper,
  Stack,
  Text,
  Group,
  Skeleton,
  Modal,
  Alert,
} from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchInvoice } from "../../../hooks/backendApis/admin/billing";
import { ROUTES } from "../../../constants/routes";
import PageContainer from "../../../layout/pageContainer";
import { IconAlertCircle } from "@tabler/icons-react";

const InvoiceView: React.FC = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();
  const brandOrange = "#F16722";
  const [invoiceData, setInvoiceData] = useState<any>(null);

  const {
    mutateAsync: fetchInvoice,
    isPending: isInvoiceLoading,
    error: invoiceError,
  } = useFetchInvoice();

  useEffect(() => {
    // Only fetch if invoiceId is valid and not the string "undefined"
    if (invoiceId && invoiceId !== "undefined") {
      fetchInvoice(invoiceId)
        .then((res) => {
          // The API returns { error: false, data: { ... } }
          setInvoiceData(res.data);
        })
        .catch((err) => {
          console.error("Invoice fetch failed:", err);
        });
    }
  }, [invoiceId, fetchInvoice]);

  const handlePayNow = () => {
    if (invoiceData?.paystack_payment_url) {
      // Clean up the URL: remove backticks and whitespace
      const cleanUrl = invoiceData.paystack_payment_url
        .replace(/`/g, "")
        .trim();
      window.location.href = cleanUrl;
    }
  };

  return (
    <PageContainer
      subHeaders={[
        <div key="1" className="py-2.5 flex gap-4 items-center">
          <button
            onClick={() => navigate(ROUTES.billingPage)}
            className="flex cursor-pointer gap-2 items-center"
          >
            <Text fw={500} c="black">
              ← Back to Billing History
            </Text>
          </button>
        </div>,
      ]}
    >
      <Modal
        opened={true}
        onClose={() => navigate(ROUTES.billingPage)}
        centered
        size="lg"
        withCloseButton={true}
      >
        <Box bg="#FFFFFF" p="xl" style={{ borderTop: "4px dashed #E4E7EC" }}>
          <Box style={{ maxWidth: "600px", margin: "0 auto" }}>
            <Paper p="xl" radius="md" withBorder={false}>
              <Stack gap="xl" align="stretch">
                <Text ta="center" size="lg" fw={700} c="#1D2739">
                  Welcome to QuickRetail - View your invoice
                </Text>

                {isInvoiceLoading && (
                  <Stack gap="md">
                    <Skeleton height={20} width="60%" />
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={40} width="100%" />
                  </Stack>
                )}

                {invoiceError && (
                  <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
                    {(invoiceError as any)?.response?.data?.message || 
                     "This invoice could not be found or you do not have permission to view it."}
                  </Alert>
                )}

                {invoiceData && !isInvoiceLoading && (
                  <>
                    <Text size="md" c="#1D2739">
                      Hi, {invoiceData.company_name}
                    </Text>
                    <Text size="sm" c="#667085">
                      Your invoice from Quick Retail has been generated and is
                      ready for payment.
                    </Text>

                    <Stack gap="xs" mt="md">
                      <Text fw={600} c="#1D2739">Invoice details</Text>
                      <Stack gap="xs" mt="sm">
                        <DataRow label="Invoice Number" value={invoiceData.invoice_number} />
                        <DataRow label="Invoice Date" value={invoiceData.billing_period_start} />
                        <DataRow label="Due Date" value={invoiceData.due_date} />
                        <DataRow 
                          label="Amount Due" 
                          value={`₦ ${invoiceData.total_amount}`} 
                          highlight 
                        />
                        <DataRow label="Billing Period" value={invoiceData.billing_period} />
                        <DataRow label="Total Orders" value={invoiceData.total_orders} />
                        <DataRow label="Fee Rate" value={`₦ ${invoiceData.fee_rate}`} />
                        <DataRow label="Status" value={invoiceData.status} />
                      </Stack>
                    </Stack>

                    <Text size="sm" c="#667085" mt="md">
                      You can review your invoice details and complete your
                      payment securely using the link below.
                    </Text>

                    {invoiceData.can_pay && invoiceData.status !== "Paid" && (
                      <Button
                        fullWidth
                        bg={brandOrange}
                        mt="xl"
                        size="lg"
                        onClick={handlePayNow}
                      >
                        Pay Now
                      </Button>
                    )}
                  </>
                )}
              </Stack>
            </Paper>
          </Box>
        </Box>
      </Modal>
    </PageContainer>
  );
};

// Helper component for layout
const DataRow = ({ label, value, highlight = false }: { label: string, value: any, highlight?: boolean }) => (
  <Group justify="space-between">
    <Text c="#667085" size="sm">{label} :</Text>
    <Text c="#1D2739" size="sm" fw={highlight ? 700 : 500}>
      {value || "N/A"}
    </Text>
  </Group>
);

export default InvoiceView;