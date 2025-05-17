import { Button } from "@mantine/core";
import { SetStateAction, useState } from "react";
import {
  MasterCard,
  PayPal,
  Paystack,
  Skrill,
  Visa,
} from "../../../assets/svg";
import PaymentModal from "./paymentModal";

const MakePayment = () => {
 
  const [showAllocatedModal, setShowAllocatedModal] = useState(false);
  const paymentMethods = [
    { name: "MasterCard", Icon: MasterCard, expiry: "06/2024" },
    { name: "PayPal", Icon: PayPal, expiry: "06/2024" },
    { name: "Skrill", Icon: Skrill, expiry: "06/2024" },
    { name: "Visa", Icon: Visa, expiry: "06/2024" },
  ];
  const [selected, setSelected] = useState(null);

  const handleSelect = (id: SetStateAction<null>) => {
    setSelected(id);
  };
  return (
    <>
    {showAllocatedModal && (
      <PaymentModal
        opened={showAllocatedModal}
        onClose={() => setShowAllocatedModal(false)}
      />
    )}
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col lg:flex-row gap-6">
      {/* Left Column: Pay via Processor */}
      <div className="bg-white rounded-xl shadow p-6 w-full lg:w-1/2">
        <h2 className="text-lg font-semibold text-gray-700 mb-1">
          Pay via a Processor
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Select a processor of your choice to proceed
        </p>

        <div className="border-2 border-dashed border-orange-400 rounded-xl p-6 flex flex-col items-center bg-orange-200">
          <div className=" text-white  w-12 h-12 flex items-center justify-center mb-4">
            {/* Icon Placeholder */}
            <Paystack />
          </div>
          <p className="text-sm text-[#F16722] mb-2">admin@fan-finance.com</p>
          <p className="text-sm text-gray-500">Amount Payable</p>
          <p className="text-xl font-bold text-orange-600 mt-1">₦ 25,000</p>
        </div>
      </div>

      {/* Right Column: Pay with Card */}
      <div className="bg-white rounded-xl shadow p-6 w-full lg:w-1/2">
        <h2 className="text-lg font-semibold text-gray-700 mb-1">
          Pay from Debit/Credit Card
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Select a processor of your choice to proceed
        </p>

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          {/* @ts-ignore */}
          {paymentMethods.map(({ id, name, Icon, expiry }) => (
            <label
              key={id}
              className={`border rounded-lg px-4 py-3 flex items-center gap-4 cursor-pointer hover:bg-gray-50 ${
                selected === id ? "ring-2 ring-orange-400" : ""
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={selected === id}
                onChange={() => handleSelect(id)}
                className="form-radio h-5 w-5 text-orange-500"
              />
              {/* @ts-ignore */}
              <Icon className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  {name}
                </span>
                <span className="text-xs text-gray-400">Expiry {expiry}</span>
              </div>
            </label>
          ))}
        </div>

        {/* Payment Form */}
        <div className="space-y-4">
          <h2 className="font-semibold">Pay to: Debit/Credit Card</h2>
          <div>
            <label className="text-sm text-gray-600">Select Bank</label>
            <select className="mt-1 w-full p-2 border rounded-md text-sm">
              <option>Select bank name</option>
              <option>GTBank</option>
              <option>Access Bank</option>
              <option>First Bank</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Account Name</label>
            <input
              type="text"
              placeholder="Enter account name"
              className="mt-1 w-full p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Account Number</label>
            <input
              type="text"
              placeholder="Enter account number"
              className="mt-1 w-full p-2 border rounded-md text-sm"
            />
          </div>
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4 px-8 mt-[3em]">
          <Button
            variant="outline"
            style={{
              color: "#475367",
              borderRadius: "0.375rem",
              height: "2.5rem",
              padding: "0.5rem 3.8rem",
              fontWeight: 500,
              fontSize: "14px",
              border: "1px solid #475367",
              width: "fit-content",
            }}
          >
            Back
          </Button>

          <Button
            variant="filled"
            style={{
              backgroundColor: "#F16722",
              color: "white",
              borderRadius: "0.375rem",
              height: "2.5rem",
              padding: "0.5rem 3.8rem",
              fontWeight: 500,
              fontSize: "14px",
              width: "fit-content",
            }}
            onClick={() => setShowAllocatedModal(true)}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default MakePayment;
