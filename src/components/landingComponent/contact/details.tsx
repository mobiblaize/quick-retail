// import FormInput from "../../General/formInput";

// const Details = () => {
//   return (
//     <div className="bg-white border border-[#D0D5DD] rounded-lg p-6 mt-4">
//       <h3 className="text-md font-medium text-gray-900 mb-6">Your Details</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
//         <FormInput label="First Name" placeholder="Enter your first name" />
//         <FormInput label="Last Name" placeholder="Enter your last name" />
//         <FormInput label="Phone Number" placeholder="Enter your phone number" />
//         <FormInput label="Email" placeholder="Enter your email" />
//         <FormInput label="Company's name" placeholder="Enter company's name" />
//         <FormInput label="Company's size" placeholder="Enter company's size" />
//       </div>
//     </div>
//   );
// };

// export default Details;

import { Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { notifications } from "@mantine/notifications";
import FormInput from "../../General/formInput";
import { useSignUpUser } from "../../../hooks/backendApis/authentication/signupAuth";
import { useFetchCompanySize } from "../../../hooks/backendApis/authentication/signupAuth";

// ✅ Validation Schema
const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  phoneno: z.string().min(7, "Phone number is too short"),
  email: z.string().email("Invalid email address"),
  company_name: z.string().min(1, "Company name is required"),
  company_size_id: z.union([z.string(), z.number()]).refine(
    (val) => {
      const num = typeof val === "string" ? parseInt(val, 10) : val;
      return !isNaN(num) && num > 0;
    },
    { message: "Company size is required" }
  ),
});


const Details = () => {
  const { mutateAsync: register, isPending } = useSignUpUser();

  const { data } = useFetchCompanySize();

  console.log("findnow", data);

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      firstname: "",
      lastname: "",
      phoneno: "",
      email: "",
      company_name: "",
      company_size_id: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const payload = {
        ...values,
        company_size_id:
          typeof values.company_size_id === "string"
            ? parseInt(values.company_size_id, 10)
            : values.company_size_id,
        billing_type: "trial", // or "monthly", "yearly"
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

      const res = await register(payload);
      if (!res?.data?.auth_url) {
        throw new Error("Could not initialize payment.");
      }

      // ✅ Redirect user to Paystack checkout page
      window.location.href = res.data.auth_url;
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message:
          error?.response?.data?.message ||
          "Signup or payment failed. Try again later.",
        color: "red",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
          {/* <FormInput
            label="Company's size"
            placeholder="Enter company's size"
            {...form.getInputProps("company_size_id")}
          /> */}
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

        <div className="mt-6 flex justify-end">
          <Button type="submit" loading={isPending}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Details;
