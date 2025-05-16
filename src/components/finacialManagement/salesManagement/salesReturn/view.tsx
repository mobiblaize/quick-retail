import { useState } from "react";
import CustomDropdown from "../../../General/customDropdown";
import FormInput from "../../../General/formInput";
import FormSelect from "../../../General/select";
import FileUpload from "../receipts/fileUpload";
import ReceiptPreview from "../receipts/receiptPreview";
import CreditNoteModal from "./creditNoteModal";

export default function ViewReturns() {

  const [selectedType, setSelectedType] = useState("");
  const [showAllocatedModal, setShowAllocatedModal] = useState(false);
  return (
    <>
    {showAllocatedModal && (
        <CreditNoteModal
          opened={showAllocatedModal}
          onClose={() => setShowAllocatedModal(false)}
        />
      )}
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
                      <FormSelect
                        type="text"
                        label="Invoice Type"
                        paddingY="4"
                        options={[]}
                        placeholder="Select invoice type"
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
                    ITEMS RETURNED <span className="text-[red]"> *</span>
                  </h2>

                  <div>
                    <div className="">
                      <CustomDropdown
                        label="Item Name"
                        options={["Product 1", "Product 2", "Product 3"]}
                        placeholder="Enter Product ID"
                        value={selectedType}
                        onChange={(val) => setSelectedType(val)}
                        textColorClass="text-white"
                      />

                      <CustomDropdown
                        label="Item Name"
                        options={["Product 1", "Product 2", "Product 3"]}
                        placeholder="Enter Product ID"
                        value={selectedType}
                        onChange={(val) => setSelectedType(val)}
                        textColorClass="text-white"
                      />
                      <CustomDropdown
                        label="Item Name"
                        options={["Product 1", "Product 2", "Product 3"]}
                        placeholder="Enter Product ID"
                        value={selectedType}
                        onChange={(val) => setSelectedType(val)}
                        textColorClass="text-white"
                      />
                      <CustomDropdown
                        label="Item Name"
                        options={["Product 1", "Product 2", "Product 3"]}
                        placeholder="Enter Product ID"
                        value={selectedType}
                        onChange={(val) => setSelectedType(val)}
                        textColorClass="text-white"
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
                      <FormSelect
                        type="text"
                        label="Invoice Type"
                        paddingY="4"
                        options={[]}
                        placeholder="Select invoice type"
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
                    ITEMS RETURNED <span className="text-[red]"> *</span>
                  </h2>

                  <div>
                    <div className="">
                      <CustomDropdown
                        label="Item Name"
                        options={["Product 1", "Product 2", "Product 3"]}
                        placeholder="Enter Product ID"
                        value={selectedType}
                        onChange={(val) => setSelectedType(val)}
                
                      />

                      <CustomDropdown
                        label="Item Name"
                        options={["Product 1", "Product 2", "Product 3"]}
                        placeholder="Enter Product ID"
                        value={selectedType}
                        onChange={(val) => setSelectedType(val)}
                
                      />
                      <CustomDropdown
                        label="Item Name"
                        options={["Product 1", "Product 2", "Product 3"]}
                        placeholder="Enter Product ID"
                        value={selectedType}
                        onChange={(val) => setSelectedType(val)}
                  
                      />
                      <CustomDropdown
                        label="Item Name"
                        options={["Product 1", "Product 2", "Product 3"]}
                        placeholder="Enter Product ID"
                        value={selectedType}
                        onChange={(val) => setSelectedType(val)}
                  
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
              </div>

<div className="w-[30%] h-[40vh] md:block hidden">
                <ReceiptPreview />
              </div>
            </div>
{/* desktop */}
            <div className="w-[69%] md:block hidden">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                  REASON FOR RETURN
                </h2>

                <div>
                  <div className="">
                    <textarea
                      placeholder="Share your reason here..."
                      className=" w-full border-gray-200 outline-none text-sm text-gray-600 border rounded-md pl-4 py-[1em] "
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                  PROOF OF PAYMENT<span className="text-[red]"> *</span>
                </h2>

                <div className="mt-3">
                  <FileUpload />
                </div>
              </div>
            </div>

            {/* mobile */}

            <div className="w-full lg:hidden">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                  REASON FOR RETURN
                </h2>

                <div>
                  <div className="">
                    <textarea
                      placeholder="Share your reason here..."
                      className=" w-full border-gray-200 outline-none text-sm text-gray-600 border rounded-md pl-4 py-[1em] "
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                  PROOF OF PAYMENT<span className="text-[red]"> *</span>
                </h2>

                <div className="mt-3">
                  <FileUpload />
                </div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 right-0 w-full bg-white py-8 border-t border-gray-200 mt-12">
            <div className="w-[100%] mx-auto flex justify-end gap-4 items-end pr-4">
              <button className=" cursor-pointer bg-[white] text-[#F16722] px-12 py-2 rounded-lg font-semibold hover:bg-orange-200 transition duration-300 border border-[#F16722]">
                Cancel
              </button>
              <button
                className="bg-[#F16722] text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 cursor-pointer"
                onClick={() => setShowAllocatedModal(true)}
              >
        Update & Save Changes
              </button>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
    </>
  );
}
