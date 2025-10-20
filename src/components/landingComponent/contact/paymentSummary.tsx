import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Card, Button, TextInput, Select } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useAtomValue } from "jotai";
import {
  selectedSubs,
  totalPrice,
  billingTypeStore,
  SubscriptionData,
  seatCount,
} from "../../../store/subscriptionStore";
import { useFetchData, usePostData } from "../../../hooks/useApis";
import { notifications } from "@mantine/notifications";
import NoSubCard from "./NoSubCard";
import { formatMoney } from "../../../utils/helpers";
import PaymentSuccessModal from "./PaymentSuccessModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  companyName: z.string().min(1, "Company Name is required"),
  companySize: z.string().min(1, "Company Size is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "email is required")
    .optional()
    .or(z.literal("")),
});

const PaymentSummary = () => {
  const selectedSub = useAtomValue(selectedSubs);
  const totalPriceValue = useAtomValue(totalPrice);
  const billingType = useAtomValue(billingTypeStore);
  const navigate = useNavigate();
  const reference = new URLSearchParams(window.location.search).get(
    "reference"
  );
  const [opened, setOpened] = useState(!!reference);
  const adminSeat = useAtomValue(seatCount);

  const windowUrl = window.location.origin;

  const { data: companySizes, isPending: isCompanySizesPending } = useFetchData(
    "applications/company-sizes"
  );

  const { mutateAsync: createPayment, isPending } = usePostData(
    "auth/signup/register"
  );

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
  });

  const handleSubmit = async (values: typeof paymentForm.values) => {
    const payload = {
      company_name: values.companyName,
      firstname: values.firstName,
      lastname: values.lastName,
      company_size_id: 1,
      phoneno: values.phoneNumber,
      email: values.email,
      billing_type: billingType,
      payment_method: "paystack",
      password_url: windowUrl + "/create-password",
      paystack_complete_callback: windowUrl + "/payment-summary",
      applications: selectedSub.map((sub: SubscriptionData) => ({
        subscription_id: sub.id,
        application_id: sub.application_id,
        amount: sub.amount,
        additional_seat: adminSeat,
      })),
    };

    try {
      const response = await createPayment(payload);
      sessionStorage.setItem("registerEmail", values.email);
      sessionStorage.setItem("registerData", response?.data);
      window.location.href = response?.data?.auth_url;
    } catch (error) {
      notifications.show({
        title: "Payment Error",
        message: "Failed to initialize payment. Please try again.",
        color: "red",
      });
      console.error(error);
    }
  };

  if (selectedSub.length === 0 && !reference) return <NoSubCard />;
  if (reference)
    return (
      <PaymentSuccessModal
        opened={opened}
        onClose={() => setOpened(false)}
        onCompleteSetup={() => {
          setOpened(false);
          navigate("/login");
        }}
      />
    );

  return (
    <div className="flex flex-col min-h-screen mt-6">
      <main className="flex-grow">
        <form
          onSubmit={paymentForm.onSubmit(handleSubmit)}
          className="space-y-8"
        >
          <div className="flex flex-col gap-8">
            <Card
              shadow="sm"
              radius="lg"
              p={32}
              withBorder
              className="!bg-white"
            >
              <h4 className="text-xl font-bold text-[#48464E] mb-4">
                Your Details
              </h4>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="First Name"
                    placeholder="Enter your first name"
                    {...paymentForm.getInputProps("firstName")}
                  />
                  <TextInput
                    label="Last Name"
                    placeholder="Enter your last name"
                    {...paymentForm.getInputProps("lastName")}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="Phone Number"
                    type="tel"
                    placeholder="Phone number"
                    maxLength={11}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value
                        .replace(/\D/g, "")
                        .slice(0, 11);
                    }}
                    {...paymentForm.getInputProps("phoneNumber")}
                  />
                  <TextInput
                    label="Email"
                    type="text"
                    placeholder="example@company.com"
                    {...paymentForm.getInputProps("email")}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="Company Name"
                    placeholder="Enter your company name"
                    {...paymentForm.getInputProps("companyName")}
                  />
                  <Select
                    label="Company Size"
                    placeholder="Select your company size"
                    disabled={isCompanySizesPending}
                    data={
                      companySizes?.data?.map((size: any) => ({
                        value: size?.label,
                        label: size?.label,
                      })) || []
                    }
                    {...paymentForm.getInputProps("companySize")}
                    rightSection={<ChevronDown size={16} />}
                    rightSectionProps={{ className: "text-[#F56630] text-sm" }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Payment Summary & Card Form */}
          <div className="bg-white grid grid-cols-1 md:grid-cols-2 gap-8 ">
            <Card
              shadow="sm"
              radius="lg"
              p={32}
              withBorder
              className="!bg-white"
            >
              <h4 className="text-lg font-bold text-[#48464E] mb-4">
                Subscription Summary
              </h4>
              <div className="flex flex-col gap-4">
                {selectedSub.map((sub: SubscriptionData) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between border rounded-lg px-4 py-3"
                  >
                    <div>
                      <div className="font-semibold text-[#48464E]">
                        {sub?.application?.name}
                      </div>
                      <div className="text-xs text-[#6C6975]">
                        {sub?.application?.free_user_access} Admin Seat (Free) |{" "}
                        {adminSeat} Additional Seat
                      </div>
                    </div>
                    <div className="font-bold text-[#F16722]">
                      ₦{" "}
                      {formatMoney(
                        Number(
                          sub?.amount +
                            (adminSeat || 0) *
                              (sub?.price_per_seat || 0)
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t pt-4">
                <h4 className="text-[#48464E] text-lg font-bold pb-4">
                  Other Details
                </h4>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Billing Type</span>
                  <span className="capitalize">
                    {billingType} (
                    {billingType === "monthly"
                      ? "1 Month"
                      : billingType === "yearly"
                      ? "12 Months"
                      : "60 Days"}
                    )
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Billing Start</span>
                  <span>
                    {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Billing Ends</span>
                  <span>
                    {new Date(
                      new Date().getTime() +
                        (billingType === "monthly"
                          ? 30
                          : billingType === "yearly"
                          ? 365
                          : 60) * 
                          24 *
                          60 *
                          60 *
                          1000
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Card>
            <Card
              className="flex flex-col gap-8 h-fit "
              shadow="sm"
              radius="lg"
              p={32}
              withBorder
            >
              <div className="">
                <h4 className="text-lg font-bold text-[#48464E] mb-4">
                  Payment Summary
                </h4>
                <div className="flex flex-col gap-2">
                  {selectedSub.map((sub: SubscriptionData, index: number) => (
                    <div
                      key={sub.id}
                      // border should not show for the last item
                      className={`flex justify-between text-sm py-2 border-b border-[#EAECF0] ${
                        index === selectedSub.length - 1
                          ? "border-b-0"
                          : "border-b"
                      }`}
                    >
                      <span>{sub?.application?.name}</span>
                      <span className=" text-[#F16722]">
                        ₦ {formatMoney(Number(sub?.amount)).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  {/* Additional User Seats */}
                  <div className="flex justify-between text-sm py-2 border-b border-[#EAECF0]">
                    <span>
                      Additional User Seats (
                      {selectedSub.reduce(
                        (sum: number, sub: SubscriptionData) =>
                          sum + (adminSeat || 0),
                        0
                      )}
                      X ₦
                      {formatMoney(Number(selectedSub[0]?.price_per_seat || 0))}
                      )
                    </span>
                    <span className="text-[#F16722]">
                      ₦{" "}
                      {selectedSub
                        .reduce(
                          (sum: number, sub: SubscriptionData) =>
                            sum +
                            (adminSeat || 0) *
                              (sub.price_per_seat || 0),
                          0
                        )
                        .toLocaleString()}
                    </span>
                  </div>
                  {/* VAT and Total */}
                  <div className="flex justify-between text-sm py-2 border-b border-[#EAECF0]">
                    <span>V.A.T (7.5%)</span>
                    <span className="text-[#F16722]">
                      ₦{" "}
                      {formatMoney(
                        Math.round(totalPriceValue * 0.075)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between  text-sm   pb-2 mt-2 border-b border-[#EAECF0]">
                    <span>Total Cost</span>
                    <span className="text-[#F16722]">
                      ₦{" "}
                      {formatMoney(
                        Math.round(totalPriceValue * 1.075)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="">
                {/* <h4 className=" font-bold text-[#48464E] mb-4">
                  Add Your Card
                </h4>
                <Text size="sm" c="#6C6975" className="mb-4">
                  Add Your Card You will be charged when you exceed your 60 days
                  free trial period. You can choose to cancel or upgrade your
                  plan before the free trial expires.
                </Text> */}
                <div className="flex flex-col gap-4 mt-4">
                  {/* <TextInput
                    label="Card Name"
                    placeholder="Name on card"
                    {...paymentForm.getInputProps("cardName")}
                  />
                  <TextInput
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    {...paymentForm.getInputProps("cardNumber")}
                  /> */}
                  {/* <div className="flex gap-4">
                    <TextInput
                      className="w-1/2"
                      label="Expiration"
                      placeholder="MM/YY"
                      {...paymentForm.getInputProps("expiration")}
                    />
                    <TextInput
                      className="w-1/2"
                      label="Cvv"
                      placeholder="123"
                      {...paymentForm.getInputProps("cvv")}
                    />
                  </div> */}
                  <Button
                    color="#F56630"
                    radius="xl"
                    size="md"
                    className="w-full mt-4"
                    rightSection={<ArrowUpRight size={16} />}
                    type="submit"
                    loading={isPending}
                  >
                    Pay ₦{" "}
                    {formatMoney(
                      Math.round(totalPriceValue * 1.075)
                    ).toLocaleString()}{" "}
                    Now
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PaymentSummary;
