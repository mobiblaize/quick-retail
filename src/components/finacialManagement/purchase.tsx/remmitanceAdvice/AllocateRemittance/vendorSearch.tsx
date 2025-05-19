import { Button } from "@mantine/core";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../../constants/routes";


export default function VendorSearch() {
  const navigate = useNavigate();
  const handlePreview = () => {
    navigate(ROUTES.matchRemittance);
  };

  return (
    <div className="">
      <div className="max-w-xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
           Select Vendor
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Query System database to get specific result
          </p>

          {/* Dropdown */}
          <div className="relative">
            <label className="block text-sm text-gray-900 mb-1">Vendor</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-4 bg-white">
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
              <select className="flex-1 bg-transparent focus:outline-none">
                <option></option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>
          <div className="mt-8" onClick={handlePreview}>
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
          Match and Locate Remittance Advice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
