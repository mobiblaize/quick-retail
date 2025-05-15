import { Button } from "@mantine/core";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../../constants/routes";


export default function AllocateRemittance() {
  const navigate = useNavigate();
  const handlePreview = () => {
    navigate(ROUTES.unallocatedRemittance);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
    <div className="max-w-xl mx-auto p-6 md:block hidden">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
         Select Vendor
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Query System database to get specific result
        </p>

        {/* Dropdown */}
        <div className="relative">
          <label className="block text-sm text-gray-600 mb-1">Vendor</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-3 bg-white w-full">

            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
            <select className="w-full bg-transparent focus:outline-none text-sm sm:text-base">

              <option>Victoria Store LLC</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 border-t pt-6 text-sm text-gray-700">
        {/* Note Column */}
        <div className="space-y-6 pr-4">
          <p className="font-medium text-gray-500">Note</p>
          <p>
          Sixteen Unallocated / Not fully paid invoices found for this Vendor
          </p>
          <p>
          Sixteen Unallocated / Not fully paid invoices found for this Vendor
          </p>
        </div>

        {/* Value Column with vertical divider */}
        <div className="space-y-6 text-right font-semibold border-l border-gray-300 pl-4">
          <p className="font-medium text-gray-500 text-left">Value</p>
          <p className="text-left">₦ 80,000,000</p>
          <p className="text-left">₦ 80,000,000</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6 border-t">
        <div className="mt-[2em]" onClick={handleBack}>
          <Button
            variant="outline"
            style={{
              color: "#F16722",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 3.9rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%",
              border: "1px solid #F16722",
              backgroundColor: "#ffffff",
            }}
          >
            Back
          </Button>
        </div>
        <div className="mt-[2em]" onClick={handlePreview}>
          <Button
            variant="filled"
            style={{
              backgroundColor: "#F16722",
              color: "white",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 1.1rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%",
            }}
          >
            Match and allocate receipt
          </Button>
        </div>
      </div>
    </div>
    {/* // mobile */}
    <div className="lg:hidden p-6 ">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Fill in the report parameter below
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Query System database to get specific result
        </p>

        {/* Dropdown */}
        <div className="relative">
          <label className="block text-sm text-gray-600 mb-1">Customer</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-3 bg-white w-full">

            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
            <select className="w-full bg-transparent focus:outline-none text-sm sm:text-base">

              <option>Victoria Store LLC</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 border-t pt-6 text-sm text-gray-700">
        {/* Note Column */}
        <div className="space-y-6 pr-4">
          <p className="font-medium text-gray-500">Note</p>
          <p>
            Sixteen unpaid / Not fully paid invoices found for this customer
          </p>
          <p>
            Sixteen unpaid / Not fully paid invoices found for this customer
          </p>
        </div>

        {/* Value Column with vertical divider */}
        <div className="space-y-6 text-right font-semibold border-l border-gray-300 pl-4">
          <p className="font-medium text-gray-500 text-left">Value</p>
          <p className="text-left">₦ 80,000,000</p>
          <p className="text-left">₦ 80,000,000</p>
        </div>
      </div>

      {/* Buttons */}
      <div className=" mt-6 border-t">
        <div className="mt-[2em]" onClick={handleBack}>
          <Button
            variant="outline"
            style={{
              color: "#F16722",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 3.9rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%",
              border: "1px solid #F16722",
              backgroundColor: "#ffffff",
            }}
          >
            Back
          </Button>
        </div>
        <div className="mt-[2em]" onClick={handlePreview}>
          <Button
            variant="filled"
            style={{
              backgroundColor: "#F16722",
              color: "white",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 1.1rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%",
            }}
          >
            Match and allocate receipt
          </Button>
        </div>
      </div>
    </div>
    </>
  
    
  );
}
