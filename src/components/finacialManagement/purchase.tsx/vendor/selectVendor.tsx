import { Button } from "@mantine/core";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../constants/routes";


const SelectVendor = () => {
  const navigate = useNavigate();
  const handleProceed = () => {
    navigate(ROUTES.unsettledVendor);
  };

  return (
    <div className="">
      <div className="max-w-xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Basic Information
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Query System database to get specific result
          </p>

          {/* Dropdown */}
          <div className="relative">
            <label className="block text-sm text-gray-900 mb-1 mt-4">
              Vendor Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-4 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-gray-500"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <select className="flex-1 bg-transparent focus:outline-none">
                <option></option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>
          <div className="mt-8" onClick={handleProceed}>
            <Button
              variant="filled"
              style={{
                backgroundColor: "#F16722",
                color: "white",
                borderRadius: "0.8rem",
                height: "auto",
                padding: "0.9rem 1.1rem",
                fontWeight: 600,
                fontSize: "16px",
                width: "100%",
              }}
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectVendor;
