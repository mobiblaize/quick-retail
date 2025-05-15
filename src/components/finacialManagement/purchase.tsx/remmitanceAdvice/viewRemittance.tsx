import { useState } from "react";
import {  useNavigate } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import FormInput from "../../../General/formInput";
import FormSelect from "../../../General/select";
import CreditNoteModal2 from "../../salesManagement/creditNote/creditNoteModal2";
import FileUpload from "../../salesManagement/receipts/fileUpload";
import VendorInvoices from "./allVendorCard";
import DebitRemittanceNote from "./debitNote";


export default function RemmittanceView() {
  const [showAllocatedModal, setShowAllocatedModal] = useState(false);
  const navigate = useNavigate();
  const handleCreate = () => {
navigate(ROUTES.allRemittance)
  };


return (
    <>
      {showAllocatedModal && (
        <CreditNoteModal2
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
                      Basic information <span className="text-[red]"> *</span>
                    </h2>

                    <div>
                      <div className="mt-6">
                        <FormInput
                          type="text"
                          label="Select Vendor"
                          paddingY={"0.7rem"}
                          placeholder="Name"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <FormSelect
                          type="text"
                          label="Select Type"
                          paddingY="4"
                          options={["Multiple Invoice", "Single Purchase Invoice"]}
                          placeholder=""
                        />
                        <FormInput
                          type="text"
                          label="Remittance Advice ID"
                          paddingY={"0.7rem"}
                          placeholder="12345"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormInput
                          type="date"
                          label="Issue Date"
                          paddingY={"0.7rem"}
                        />
                        <FormInput
                          type="text"
                          label="Accounts "
                          paddingY={"0.7rem"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                    <VendorInvoices />
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <h2>No. Of Invoice Selected:</h2>
                      <p className="font-semibold">Five (5P)</p>
                    </div>
                    <div className="flex justify-between mt-3 border-b border-gray-400">
                      <h2>Total Outstanding Selected:</h2>
                      <p className="text-[#D42620]">₦ 30,000</p>
                    </div>
                    <div className="flex justify-between mt-8">
                      <h2>Total Amount Payable for Receipt</h2>
                      <p className="text-[black] text-xl font-semibold">₦ 25,000</p>
                    </div>
                  </div>
                </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                  <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                  PROOF OF PAYMENT <span className="text-[red]"> *</span>
                  </h2>

                  <div className="mt-3">
                    <FileUpload />
                  </div>
                </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                    <h2 className="text-lg font-medium text-gray-400 mb-4 border-b border-gray-200 uppercase">
                      EXCHANGE RATES<span className="text-[red]"> *</span>
                    </h2>

                    <div className="text-gray-400">
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
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                  <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
               ADDITIONAL COMMENTS
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
                </div>

                {/* mobile */}
                <div className="flex flex-col w-full lg:hidden">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                      Basic information
                    </h2>

                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <FormInput
                          type="text"
                          label="Select Vendor"
                          paddingY={"0.7rem"}
                          placeholder="New Couch for Finance"
                        />
                       
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <FormSelect
                          type="text"
                          label="Select Type"
                          paddingY="4"
                          options={[]}
                          placeholder="Profit Center"
                        />
                        <FormInput
                          type="text"
                          label="Remittance Advice ID"
                          paddingY={"0.7rem"}
                          placeholder="New Couch for Finance"
                        />
  <FormInput
                          type="date"
                          label="Issue Date"
                          paddingY={"0.7rem"}
                        />
                        <FormInput
                          type="text"
                          label="Accounts "
                          paddingY={"0.7rem"}
                        />
                       
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                    <VendorInvoices />
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <h2>No. Of Invoice Selected:</h2>
                      <p className="font-semibold">Five (5P)</p>
                    </div>
                    <div className="flex justify-between mt-3 border-b border-gray-400">
                      <h2>Total Outstanding Selected:</h2>
                      <p className="text-[#D42620]">₦ 30,000</p>
                    </div>
                    <div className="flex justify-between mt-8">
                      <h2>Total Amount Payable for Receipt</h2>
                      <p className="text-[black] text-xl font-semibold">₦ 25,000</p>
                    </div>
                  </div>
                </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                  <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                  PROOF OF PAYMENT <span className="text-[red]"> *</span>
                  </h2>

                  <div className="mt-3">
                    <FileUpload />
                  </div>
                </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                    <h2 className="text-lg font-medium text-gray-400 mb-4 border-b border-gray-200 uppercase">
                      EXCHANGE RATES<span className="text-[red]"> *</span>
                    </h2>

                    <div className="text-gray-400">
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
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                  <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
               ADDITIONAL COMMENTS
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
                </div>

                <div className="w-[30%] h-[40vh] md:block hidden">
                <DebitRemittanceNote/>
                </div>
              </div>
            </div>

          
          </div>

          <div className="sticky bottom-0 right-0 w-full bg-white py-8 border-t border-gray-200 mt-12">
              <div className="w-[100%] mx-auto flex justify-end gap-4 items-end pr-4">
                <button className=" cursor-pointer bg-[white] text-[#F16722] px-12 py-2 rounded-lg font-semibold hover:bg-orange-200 transition duration-300 border border-[#F16722]">
                  Back
                </button>
                <button
                  className="bg-[#F16722] text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 cursor-pointer"
           
                  onClick={handleCreate}
                >
            Save 
                </button>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

