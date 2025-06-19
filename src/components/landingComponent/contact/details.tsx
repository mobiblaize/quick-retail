"use client";

import { UseFormReturnType } from "@mantine/form";
import FormInput from "../../General/formInput";
import { useFetchCompanySize } from "../../../hooks/backendApis/authentication/signupAuth";
import { useSignupStore } from "./useSignupStore";

const Details = ({ form }: { form: UseFormReturnType<any> }) => {
  const { data } = useFetchCompanySize();

  const handleNext = (values: typeof form.values) => {
    const payload = {
      ...values,
      company_size_id:
        typeof values.company_size_id === "string"
          ? parseInt(values.company_size_id, 10)
          : values.company_size_id,
      billing_type: "trial",
      payment_method: "paystack",
      password_url: "https://api-quick-retail.sbscuk.co.uk/public",
      paystack_complete_callback:
        "https://api-quick-retail.sbscuk.co.uk/public",
      applications: [
        {
          subscription_id: "3",
          application_id: "1",
          amount: "9000",
          additional_seat: "1",
        },
        {
          subscription_id: "4",
          application_id: "2",
          amount: "9000",
          additional_seat: "2",
        },
        {
          subscription_id: "5",
          application_id: "3",
          amount: "9000",
          additional_seat: "3",
        },
      ],
    };

    useSignupStore.getState().setPayload(payload);
  };

  return (
    <form onSubmit={form.onSubmit(handleNext)}>
      <div className="bg-white border border-[#D0D5DD] rounded-lg p-6 mt-4">
        <h3 className="text-md font-medium text-gray-900 mb-6">Your Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <FormInput
            label="First Name"
            placeholder="Enter your first name"
            {...form.getInputProps("firstname")}
          />
          <FormInput
            label="Last Name"
            placeholder="Enter your last name"
            {...form.getInputProps("lastname")}
          />
          <FormInput
            label="Phone Number"
            placeholder="Enter your phone number"
            {...form.getInputProps("phoneno")}
          />
          <FormInput
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps("email")}
          />
          <FormInput
            label="Company's name"
            placeholder="Enter company's name"
            {...form.getInputProps("company_name")}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company's size
            </label>
            <select
              {...form.getInputProps("company_size_id")}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select a company size</option>
              {data?.data?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.description}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Details;
