import { Button } from "@mantine/core";
import { useState } from "react";
import FormInput from "../../General/formInput";
import AddcardModal from "./addCardModal";

export default function AddCard() {
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
              Add Card
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Add your card details below
            </p>

            {/* Dropdown */}
            <div className="relative">
              <FormInput
                type="text"
                label="Card Number"
                placeholder="Enter Card Number"
                paddingY={"0.7rem"}
              />
            </div>
            <div className="relative mt-3">
              <FormInput
                type="text"
                label="Cardholder Name"
                placeholder="Enter cardholder name"
                paddingY={"0.7rem"}
              />
            </div>
            <div className="relative mt-3 flex gap-3 w-full">
              <FormInput
                type="text"
                label="Expiry Date"
                placeholder="00 / 00"
                paddingY={"0.7rem"}
                className="flex-1"
              />
              <FormInput
                type="text"
                label="CVV"
                placeholder="000"
                paddingY={"0.7rem"}
                className="flex-1"
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
