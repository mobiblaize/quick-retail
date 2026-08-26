/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Button, TextInput, Select, Modal, Center, Box, Title, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useAtomValue } from "jotai";
import {
  selectedSubs,
  billingTypeStore,
  seatCount,
} from "../../../store/subscriptionStore";
import { useFetchData, usePostData } from "../../../hooks/useApis";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { z } from "zod";
import successGif from "../../../assets/gif/bookingSuccess.gif";
import { handleOpenEmail } from "../../../utils/handleEmail";

const schema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .regex(/^[A-Za-z\s]+$/, "First Name can only contain letters"),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .regex(/^[A-Za-z\s]+$/, "Last Name can only contain letters"),
  companyName: z.string().min(1, "Company Name is required"),
  companySize: z.string().min(1, "Company Size is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
});

const PaymentSummary = () => {
  const selectedSubFromStore = useAtomValue(selectedSubs);
  const billingTypeFromStore = useAtomValue(billingTypeStore);
  const adminSeat = useAtomValue(seatCount);
  
  const windowUrl = window.location.origin;
  const [trialSuccess, setTrialSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const isDirectOnboarding = selectedSubFromStore.length === 0;
  const billingType = isDirectOnboarding ? "trial" : billingTypeFromStore;

  const { data: companySizes } = useFetchData("applications/company-sizes");
  const { data: trialSubscriptions, isPending: isTrialPlansLoading } =
    useFetchData("applications/allSubscription?billing_type=trial");
  const { mutateAsync: createPayment, isPending } = usePostData("auth/onboarding/register");

  const trialPlans = trialSubscriptions?.data?.plans ?? [];
  const defaultTrialPlan =
    trialPlans.find((plan: any) => plan.is_active && plan.slug !== "test-plan") ??
    trialPlans.find((plan: any) => plan.is_active) ??
    trialPlans[0];

  const selectedSub = isDirectOnboarding
    ? defaultTrialPlan
      ? [
          {
            id: defaultTrialPlan.id,
            application_id: defaultTrialPlan.applications?.[0]?.id,
            amount: 0,
            application: { name: defaultTrialPlan.name },
          },
        ]
      : []
    : (selectedSubFromStore as any);

  const paymentForm = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      companySize: "",
      phoneNumber: "",
      email: "",
    },
    validate: zodResolver(schema),
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: typeof paymentForm.values) => {
    const selectedCompanySize = companySizes?.data?.find(
      (size: any) => size.label === values.companySize,
    );

    const companyUrlSlug = values.companyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const trialApplications = defaultTrialPlan?.applications ?? [];
    const planId = isDirectOnboarding ? defaultTrialPlan?.id : selectedSub[0]?.id;

    if (!planId) {
      notifications.show({
        title: "Registration Error",
        message: "No trial plan is available. Please try again.",
        color: "red",
      });
      return;
    }

    const applicationsArray = isDirectOnboarding
      ? trialApplications.map((app: any) => ({
          subscription_id: String(planId),
          application_id: String(app.id),
          amount: "0",
          additional_seat: String(adminSeat || 0),
        }))
      : selectedSub.map((sub: any) => ({
          subscription_id: String(sub.id),
          application_id: String(sub.application_id),
          amount: "0",
          additional_seat: String(adminSeat || 0),
        }));

    const payload: Record<string, unknown> = {
      firstname: values.firstName,
      lastname: values.lastName,
      email: values.email,
      phoneno: values.phoneNumber,
      company_name: values.companyName,
      company_url: `${companyUrlSlug}.quick_retail.sbscuk.co.uk`,
      company_size_id: selectedCompanySize?.id || 1,
      product_modules: isDirectOnboarding
        ? trialApplications.map((app: any) => app.id)
        : selectedSub.map((sub: any) => sub.application_id || 1),
      plan_id: planId,
      role: "admin",
      billing_type: billingType,
      password_url: windowUrl + "/create-password",
      applications: applicationsArray,
      // Keys must be present so PHP does not throw "Undefined array key".
      // Trial does not use Paystack; paid plans still send the provider.
      payment_type: billingType === "trial" ? "" : "paystack",
      payment_method: billingType === "trial" ? "" : "paystack",
    };

    if (billingType !== "trial") {
      payload.paystack_complete_callback = windowUrl + "/payment-summary";
    }

    try {
      await createPayment(payload);
      sessionStorage.setItem("registerEmail", values.email);
      setRegisteredEmail(values.email);
      setTrialSuccess(true);
    } catch {
      notifications.show({
        title: "Registration Error",
        message: "Failed to complete setup. Please check your details.",
        color: "red",
      });
    }
  };

  const openSetupEmail = () => {
    handleOpenEmail(registeredEmail);
  };

  if (trialSuccess)
    return (
      <Modal
        opened={trialSuccess}
        onClose={() => setTrialSuccess(false)}
        centered
        withCloseButton={false}
        radius="lg"
        padding="xl"
      >
        <Center mb="md">
          <Box className="bg-[#F7FDF9] rounded-full w-24 h-24 flex items-center justify-center">
             <img src={successGif} alt="success" className="w-20 h-20 object-cover" />
          </Box>
        </Center>
        <Title order={3} ta="center" mb={8}>Check Your Email</Title>
        <p className="text-center text-[#6C6975] text-sm mb-6">
          We sent a password setup link to <strong>{registeredEmail}</strong>.
          Open that email to get the correct token and create your password.
        </p>
        <Button fullWidth color="#F56630" radius="md" size="md" onClick={openSetupEmail}>
          Open Email
        </Button>
      </Modal>
    );

  return (
    <div className="flex flex-col min-h-screen mt-10">
      <main className="flex-grow max-w-2xl mx-auto w-full px-4">
        <Stack gap="xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#101828]">Complete Your Setup</h1>
            <p className="text-gray-500 mt-2">Enter your business details to get started with your 30-day trial.</p>
          </div>

          <form onSubmit={paymentForm.onSubmit(handleSubmit)}>
            <Card shadow="sm" radius="lg" p={40} withBorder>
              <Stack gap="lg">
                <h4 className="text-lg font-bold text-[#48464E]">Business Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput label="First Name" placeholder="John" {...paymentForm.getInputProps("firstName")} />
                  <TextInput label="Last Name" placeholder="Doe" {...paymentForm.getInputProps("lastName")} />
                </div>

                <TextInput label="Email Address" placeholder="john@business.com" {...paymentForm.getInputProps("email")} />
                
                <TextInput label="Phone Number" placeholder="08012345678" maxLength={11} {...paymentForm.getInputProps("phoneNumber")} />

                <TextInput label="Company Name" placeholder="e.g. Acme Retail Ltd" {...paymentForm.getInputProps("companyName")} />

                <Select
                  label="Company Size"
                  placeholder="Select size"
                  data={companySizes?.data?.map((size: any) => ({ value: size.label, label: size.label })) || []}
                  {...paymentForm.getInputProps("companySize")}
                />

                <Button
                  fullWidth
                  color="#F56630"
                  radius="md"
                  size="lg"
                  mt={20}
                  type="submit"
                  loading={isPending || isTrialPlansLoading}
                  disabled={isDirectOnboarding && !defaultTrialPlan}
                >
                  Complete Setup
                </Button>
              </Stack>
            </Card>
          </form>
        </Stack>
      </main>
    </div>
  );
};

export default PaymentSummary;