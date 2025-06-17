import { ArrowLeft } from "lucide-react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import Details from "../../components/landingComponent/contact/details";
import Summary from "../../components/landingComponent/contact/summary";


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

const Contact = () => {
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

  return (
    <main className="max-w-7xl mx-auto font-sans mt-6 px-4 sm:mt-8 sm:px-6">
      <ArrowLeft className="mb-8" />
      <h3 className="text-[#48464E] text-xl sm:text-2xl font-semibold">
        Complete Your Subscription Plan
      </h3>
      <p className="text-[#6C6975] mt-2 sm:mt-3 text-sm sm:text-md tracking-wider">
        Fill the information below and pay to access now and unlock powerful{" "}
        <br className="hidden sm:block" />
        tools to streamline your workforce and business operations effortlessly!
      </p>
      <section className="flex flex-col gap-6 sm:gap-8 mt-4">
        <Details form={form} />
        <Summary form={form} />
      </section>
    </main>
  );
};

export default Contact;


