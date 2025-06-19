import { ArrowLeft } from "lucide-react";

import PaymentSummary from "../../components/landingComponent/contact/paymentSummary";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <main className="container mx-auto max-w-[1008px] font-sans mt-6 px-4 sm:mt-8 sm:px-6">
      {/* Back Button */}
      <ArrowLeft
        className="mb-8 hover:opacity-70 cursor-pointer"
        onClick={() => navigate("/signup")}
      />
      <h3 className="text-[#48464E] text-xl sm:text-2xl font-semibold">
        Complete Your Subscription Plan
      </h3>
      <p className="text-[#6C6975] mt-2 sm:mt-3 text-sm sm:text-md tracking-wider">
        Fill the information below and pay to access now and unlock powerful{" "}
        <br className="hidden sm:block" />
        tools to streamline your workforce and business operations effortlessly!
      </p>
      <PaymentSummary />
    </main>
  );
};

export default Contact;
