import { Button } from "@mantine/core";
import { useState } from "react";
import FormInput from "../../General/formInput";
import FormSelect from "../../General/select";
import AddcardModal from "./addCardModal";

export default function AddBank() {
  const [showAllocatedModal, setShowAllocatedModal] = useState(false);
  return (
    <>
      {showAllocatedModal && (
        <AddcardModal
          opened={showAllocatedModal}
          onClose={() => setShowAllocatedModal(false)}
        />
      )}
      <div className="">
        <div className="max-w-xl mx-auto p-6">
          {/* Header */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Bank Information
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Add your bank details below
            </p>

            {/* Dropdown */}
            <div className="relative">
              <FormInput
                type="text"
                label="Account Number"
                placeholder="Enter Account Number"
                paddingY={"0.7rem"}
              />
            </div>
            <div className="relative mt-3">
              <FormInput
                type="text"
                label="Account Name"
                placeholder="Enter account name"
                paddingY={"0.7rem"}
              />
            </div>
            <div className="relative mt-3">
              <FormSelect
                options={["Bank 1", "Bank 2", "Bank 3"]}
                type="text"
                label="Bank Name"
                placeholder="Select Bank name"
                paddingY="4"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1 mt-[1em]">
            Financial Information
            </h2>
            <p className="text-sm text-gray-700 mb-4">
            Add your financial information below
            </p>

            <div className="relative mt-3">
              <FormSelect
                options={["NGN", "USD", "CAD"]}
                type="text"
                label="Select Currency"
                placeholder="Select Currency"
                paddingY="4"
              />
            </div>
            <div className="relative mt-3">
              <FormInput
                type="number"
                label="Opening Balance"
                placeholder="000"
                paddingY={"0.7rem"}
              />
            </div>
            <div className="relative mt-3">
              <FormInput
                type="number"
                label="Opening Balance as at"
                placeholder="00/000"
                paddingY={"0.7rem"}
              />
            </div>
           

            <div className="mt-8 flex gap-6">
              <Button
                variant="filled"
                style={{
                  backgroundColor: "#FFFFFF", // Corrected to proper white
                  color: "#F16722", // Orange text
                  borderRadius: "0.4rem",
                  height: "auto",
                  padding: "0.9rem 1.1rem",
                  fontWeight: 600,
                  fontSize: "16px",
                  width: "100%",
                  border: "2px solid #F16722", // Orange border added properly
                }}
              >
                Back
              </Button>

              <Button
                variant="filled"
                onClick={() => setShowAllocatedModal(true)}
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
                Add Card
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
