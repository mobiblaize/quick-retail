import { useState } from "react";
import FormInput from "../../../General/formInput";
import FormSelect from "../../../General/select";
import FileUpload from "./fileUpload";
import ReceiptPreview from "./receiptPreview";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import CustomDropdown from "../../../General/customDropdown";

export default function CreateReceipt() {
  const [, setCustomer] = useState("");
  const [, setInvoiceType] = useState("");
  const [, setIssueDate] = useState("");
  const [, setBaseCurrency] = useState("");
  const [, setTransactionCurrency] = useState("");
  const [, setAccount] = useState("");
  const [, setProfitCenter] = useState("");
  const [, setComments] = useState("");
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  const handleCancel = () => {
    setCustomer("");
    setInvoiceType("");
    setIssueDate("");
    setBaseCurrency("");
    setTransactionCurrency("");
    setAccount("");
    setProfitCenter("");
    setComments("");
  };

  const handleContinue = () => {
    navigate(ROUTES.confirmReceipt);
  };
  return (
    <div className="">
      <div className="md:col-span-2 space-y-8">
        <div className="grid ">
          <div className="flex flex-col">
            <div className="flex flex-row gap-8">
              {/* desktop */}
              <div className="flex flex-col w-[70%] md:block hidden ">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                    Basic information
                  </h2>

                  <div>
                    <FormSelect
                      type="text"
                      label="Customer"
                      paddingY="4"
                      options={[]}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <CustomDropdown
                        label="Invoice Type"
                        options={[
                          "Multiple Invoice",
                          "Payment in advance",
                          "Single Invoice",
                        ]}
                        textColorClass="text-white"
                        placeholder="Enter Product ID"
                        value={selectedType}
                        onChange={(val) => {
                          setSelectedType(val);

                          // Navigate to a new route based on selection
                          if (val === "Multiple Invoice") {
                            navigate(ROUTES.confirmReceipt);
                          } else if (val === "Payment in advance") {
                            navigate(ROUTES.confirmReceipt);
                          } else if (val === "Single Invoice") {
                            navigate(ROUTES.confirmReceipt);
                          }
                        }}
                      />

                      <FormInput
                        type="date"
                        label="Issue Date"
                        paddingY={"0.7rem"}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                  <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                    EXCHANGE RATES<span className="text-[red]"> *</span>
                  </h2>

                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <FormInput
                        type="number"
                        label="Base Currency"
                        paddingY={"0.7rem"}
                        leftPrefix="NGN"
                      />

                      <FormInput
                        type="number"
                        label="Current Transaction Currency "
                        paddingY={"0.7rem"}
                        leftPrefix="USD"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* mobile */}
              <div className="flex flex-col w-full lg:hidden">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                    Basic information
                  </h2>

                  <div>
                    <FormSelect
                      type="text"
                      label="Customer"
                      paddingY="4"
                      options={[]}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <CustomDropdown
                        label="Invoice Type"
                        options={[
                          "Multiple Invoice",
                          "Payment in advance",
                          "Single Invoice",
                        ]}
                        textColorClass="text-white"
                        placeholder="Enter Product ID"
                        value={selectedType}
                        onChange={(val) => {
                          setSelectedType(val);

                          // Navigate to a new route based on selection
                          if (val === "Multiple Invoice") {
                            navigate(ROUTES.confirmReceipt);
                          } else if (val === "Payment in advance") {
                            navigate(ROUTES.confirmReceipt);
                          } else if (val === "Single Invoice") {
                            navigate(ROUTES.confirmReceipt);
                          }
                        }}
                      />

                      <FormInput
                        type="date"
                        label="Issue Date"
                        paddingY={"0.7rem"}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                  <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                    EXCHANGE RATES<span className="text-[red]"> *</span>
                  </h2>

                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <FormInput
                        type="number"
                        label="Base Currency"
                        paddingY={"0.7rem"}
                        leftPrefix="NGN"
                      />

                      <FormInput
                        type="number"
                        label="Current Transaction Currency "
                        paddingY={"0.7rem"}
                        leftPrefix="USD"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[30%] h-[40vh] md:block hidden">
                <ReceiptPreview />
              </div>
            </div>
            {/* desktop */}
            <div className="w-[69%] md:block hidden">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                  PROOF OF PAYMENT<span className="text-[red]"> *</span>
                </h2>

                <div className="mt-3">
                  <FileUpload />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                  ACCOUNTS AND PROFIT CENTRE
                  <span className="text-[red]"> *</span>
                </h2>

                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <FormSelect
                      type="text"
                      label="Accounts"
                      paddingY="4"
                      options={[]}
                      placeholder="Input"
                    />

                    <FormSelect
                      type="text"
                      label="Profit Center"
                      paddingY="4"
                      options={[]}
                      placeholder="Profit center 01"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                  ADDITIONAL COMMENTS<span className="text-[red]"> *</span>
                </h2>

                <div>
                  <div className="">
                    <textarea
                      placeholder="Write comment here..."
                      className=" w-full border-gray-200 outline-none text-sm text-gray-600 border rounded-md pl-4 py-[1em] "
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* mobile */}
            <div className="w-full lg:hidden">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                  PROOF OF PAYMENT<span className="text-[red]"> *</span>
                </h2>

                <div className="mt-3">
                  <FileUpload />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                  ACCOUNTS AND PROFIT CENTRE
                  <span className="text-[red]"> *</span>
                </h2>

                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <FormSelect
                      type="text"
                      label="Accounts"
                      paddingY="4"
                      options={[]}
                      placeholder="Input"
                    />

                    <FormSelect
                      type="text"
                      label="Profit Center"
                      paddingY="4"
                      options={[]}
                      placeholder="Profit center 01"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                  ADDITIONAL COMMENTS<span className="text-[red]"> *</span>
                </h2>

                <div>
                  <div className="">
                    <textarea
                      placeholder="Write comment here..."
                      className=" w-full border-gray-200 outline-none text-sm text-gray-600 border rounded-md pl-4 py-[1em] "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 right-0 w-full bg-white py-8 border-t border-gray-200 mt-12">
            <div className="w-[100%] mx-auto flex justify-end gap-4 items-end pr-4 cursor-pointer ">
              <button
                className="bg-[white] cursor-pointer text-[#F16722] px-12 py-2 rounded-lg font-semibold hover:bg-orange-200 transition duration-300 border border-[#F16722]"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-[#F16722] text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 cursor-pointer"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}
