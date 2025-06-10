import { ArrowLeft } from "lucide-react";
import Details from "../../components/landingComponent/contact/details";
import Summary from "../../components/landingComponent/contact/summary";

const Contact = () => {
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
        <Details />
        <Summary />
      </section>
    </main>
  );
};

export default Contact;
