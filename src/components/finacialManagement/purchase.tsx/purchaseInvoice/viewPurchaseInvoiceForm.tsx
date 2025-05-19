
import {PlusIcon } from "lucide-react";
import { useState } from "react";
import FormInput from "../../../General/formInput";
import FormSelect from "../../../General/select";
import FileUpload from "../../salesManagement/receipts/fileUpload";
import PurchaseInvoice from "./purchaseInvoice";
import SaveModal from "./saveModal";



export default function ViewPurchaseInvoiceForm() {
  const [showAllocatedModal, setShowAllocatedModal] = useState(false);
  
  const [rows, setRows] = useState([
    { type: "Debit", account: "Acct 01", description: "", amount: "600000" },
    { type: "Credit", account: "Acct 02", description: "", amount: "150000" },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { type: "Debit", account: "", description: "", amount: "" },
    ]);
  };

  const financeButtons = [
    "₦ Purchase Order Version History",
    "₦ Purchase Transactiion Version History",
  ];
  return (
    <>
      {showAllocatedModal && (
        <SaveModal
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
                      ADD TO PROFIT CENTER{" "}
                      <span className="text-[red]"> *</span>
                    </h2>

                    <div>
                      <div className="mt-[2em]">
                        <FormSelect
                          type="text"
                          label="Select Profit Center"
                          paddingY="4"
                          options={[]}
                          placeholder="Profit Center"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                    <h2 className="text-lg font-medium text-gray-400 mb-4 border-b border-gray-200 uppercase">
                      Purchase Invoice Value
                      <span className="text-[red]"> *</span>
                    </h2>

                    <div className="text-gray-400">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormInput
                          type="number"
                          label="Preset Purchase Invoice Value"
                          paddingY={"0.7rem"}
                          leftPrefix="NGN"
                        />

                        <FormInput
                          type="number"
                          label=" Converted Purchase Invoice Value "
                          paddingY={"0.7rem"}
                          leftPrefix="USD"
                        />
                      </div>
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

                  <div className="p-4 bg-white rounded shadow mt-[2em]">
                    <label className="font-semibold block mb-2">
                      ACCOUNT <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-5 gap-4 items-center font-semibold bg-gray-100 p-2 rounded">
                      <div>Account Type</div>
                      <div>Account</div>
                      <div>Description</div>
                      <div>Invoice Amount</div>
                      <div></div>
                    </div>

                    {rows.map((row, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-5 gap-4 items-center mt-2"
                      >
                        <select
                          className="border border-gray-400 p-2 rounded"
                          value={row.type}
                          onChange={(e) => {
                            const updated = [...rows];
                            updated[index].type = e.target.value;
                            setRows(updated);
                          }}
                        >
                          <option value="Debit">Debit</option>
                          <option value="Credit">Credit</option>
                        </select>

                        <select
                          className="border  border-gray-400 p-2 rounded"
                          value={row.account}
                          onChange={(e) => {
                            const updated = [...rows];
                            updated[index].account = e.target.value;
                            setRows(updated);
                          }}
                        >
                          <option value="">Select Account</option>
                          <option value="Acct 01">Acct 01</option>
                          <option value="Acct 02">Acct 02</option>
                        </select>

                        <input
                          className="border border-gray-400 p-2 rounded"
                          placeholder="Description"
                          value={row.description}
                          onChange={(e) => {
                            const updated = [...rows];
                            updated[index].description = e.target.value;
                            setRows(updated);
                          }}
                        />

                        <input
                          className="border p-2 border-gray-400 rounded"
                          placeholder="Amount"
                          type="text"
                          value={`₦ ${parseInt(
                            // @ts-ignore
                            row.amount || 0
                          ).toLocaleString()}`}
                          onChange={(e) => {
                            const updated = [...rows];
                            updated[index].amount = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            setRows(updated);
                          }}
                        />

                        <button
                          onClick={addRow}
                          className="text-orange-500 border border-orange-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-orange-100"
                          type="button"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                    <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                      PURCHASE INVOICE DETAILS{" "}
                      <span className="text-[red]"> *</span>
                    </h2>

                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormInput
                          type="date"
                          label="Purchase Invoice Issued Date"
                          paddingY={"0.7rem"}
                        />
                        <FormInput
                          type="date"
                          label="Purchase Invoice Issued Date"
                          paddingY={"0.7rem"}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormSelect
                          type="text"
                          label="Sales Return ID"
                          paddingY="4"
                          options={[]}
                          placeholder="Select invoice type"
                        />

                        <FormInput
                          type="text"
                          label="Invoice ID"
                          paddingY={"0.7rem"}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* mobile */}
                <div className="flex flex-col w-full lg:hidden">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                      ADD TO PROFIT CENTER{" "}
                      <span className="text-[red]"> *</span>
                    </h2>

                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormSelect
                          type="text"
                          label="Select Profit Center"
                          paddingY="4"
                          options={[]}
                          placeholder="Profit Center"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                    <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                      Purchase Invoice Value
                      <span className="text-[red]"> *</span>
                    </h2>

                    <div className="text-gray-400">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormInput
                          type="number"
                          label="Preset Purchase Invoice Value"
                          paddingY={"0.7rem"}
                          leftPrefix="NGN"
                        />

                        <FormInput
                          type="number"
                          label=" Converted Purchase Invoice Value "
                          paddingY={"0.7rem"}
                          leftPrefix="USD"
                        />
                      </div>
                    </div>
                  </div>{" "}
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                    <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
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
                  <div className="p-4 bg-white rounded shadow mt-[2em]">
                    <label className="font-semibold block mb-2">
                      ACCOUNT <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-5 gap-4 items-center font-semibold bg-gray-100 p-2 rounded">
                      <div>Account Type</div>
                      <div>Account</div>
                      <div>Description</div>
                      <div>Invoice Amount</div>
                      <div></div>
                    </div>

                    {rows.map((row, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-5 gap-4 items-center mt-2"
                      >
                        <select
                          className="border border-gray-400 p-2 rounded"
                          value={row.type}
                          onChange={(e) => {
                            const updated = [...rows];
                            updated[index].type = e.target.value;
                            setRows(updated);
                          }}
                        >
                          <option value="Debit">Debit</option>
                          <option value="Credit">Credit</option>
                        </select>

                        <select
                          className="border  border-gray-400 p-2 rounded"
                          value={row.account}
                          onChange={(e) => {
                            const updated = [...rows];
                            updated[index].account = e.target.value;
                            setRows(updated);
                          }}
                        >
                          <option value="">Select Account</option>
                          <option value="Acct 01">Acct 01</option>
                          <option value="Acct 02">Acct 02</option>
                        </select>

                        <input
                          className="border border-gray-400 p-2 rounded"
                          placeholder="Description"
                          value={row.description}
                          onChange={(e) => {
                            const updated = [...rows];
                            updated[index].description = e.target.value;
                            setRows(updated);
                          }}
                        />

                        <input
                          className="border p-2 border-gray-400 rounded"
                          placeholder="Amount"
                          type="text"
                          value={`₦ ${parseInt(
                            // @ts-ignore
                            row.amount || 0
                          ).toLocaleString()}`}
                          onChange={(e) => {
                            const updated = [...rows];
                            updated[index].amount = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            setRows(updated);
                          }}
                        />

                        <button
                          onClick={addRow}
                          className="text-orange-500 border border-orange-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-orange-100"
                          type="button"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 ">
                    <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                      PURCHASE INVOICE DETAILS{" "}
                      <span className="text-[red]"> *</span>
                    </h2>

                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormInput
                          type="date"
                          label="Purchase Invoice Issued Date"
                          paddingY={"0.7rem"}
                        />
                        <FormInput
                          type="date"
                          label="Purchase Invoice Issued Date"
                          paddingY={"0.7rem"}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormSelect
                          type="text"
                          label="Sales Return ID"
                          paddingY="4"
                          options={[]}
                          placeholder="Select invoice type"
                        />

                        <FormInput
                          type="text"
                          label="Invoice ID"
                          paddingY={"0.7rem"}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[30%] h-[40vh] md:block hidden">
                       <PurchaseInvoice/>
                </div>
              </div>
              {/* desktop */}
              <div className="w-[69%] md:block hidden">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                  <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                    PURCHASE INVOICE <span className="text-[red]"> *</span>
                  </h2>

                  <div className="mt-3">
                    <FileUpload />
                  </div>
                </div>
                <div className="bg-white p-6 mt-[2em]">
                  <h1 className="text-lg font-medium text-gray-800">
                    Others<span className="text-[red]"> *</span>
                  </h1>

                  <div className=" p-6 rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-[8em]  whitespace-nowrap">
                    {financeButtons.map((label, i) => (
                      <button
                        key={i}
                        className="w-full bg-orange-300 border border-orange-800 text-black py-2 pl-2 pr-14 rounded-md text-sm font-medium text-left"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* mobile */}

              <div className="w-full lg:hidden">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                  <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                    PURCHASE INVOICE <span className="text-[red]"> *</span>
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
                  Back
                </button>
                <button
                  className="bg-[#F16722] text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 cursor-pointer"
                  // onClick={handleView}
                  onClick={() => setShowAllocatedModal(true)}
                >
                  Save & Updat Changes
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
