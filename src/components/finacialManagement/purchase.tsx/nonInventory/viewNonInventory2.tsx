import { PlusIcon } from "lucide-react";
import { useState } from "react";
import FormInput from "../../../General/formInput";
import FormSelect from "../../../General/select";
import CreditNoteModal2 from "../../salesManagement/creditNote/creditNoteModal2";
import VendorPurchaseInvoices from "./allVendorPurchase";
import SupportingDoc from "./supportingDoc";


export default function ViewNonInventory2() {
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
                          label="Request Name"
                          paddingY={"0.7rem"}
                          placeholder="New Couch for Finance"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormInput
                          type="text"
                          label="Department"
                          paddingY={"0.7rem"}
                          placeholder="New Couch for Finance"
                        />
                        <FormInput
                          type="text"
                          label="Request ID"
                          paddingY={"0.7rem"}
                          placeholder="New Couch for Finance"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormInput
                          type="date"
                          label="Request Date"
                          paddingY={"0.7rem"}
                        />
                        <FormInput
                          type="text"
                          label="Request Details "
                          paddingY={"0.7rem"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                    <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                      Vendor Information <span className="text-[red]"> *</span>
                    </h2>

                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormSelect
                          type="text"
                          label="Vendor Name"
                          paddingY="4"
                          options={[]}
                        />
                        <FormSelect
                          type="text"
                          label="Vendor ID"
                          paddingY="4"
                          options={[]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                    <VendorPurchaseInvoices />
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
                          label="Request Name"
                          paddingY={"0.7rem"}
                          placeholder="New Couch for Finance"
                        />
                        <FormInput
                          type="text"
                          label="Department"
                          paddingY={"0.7rem"}
                          placeholder="New Couch for Finance"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormInput
                          type="text"
                          label="Request ID"
                          paddingY={"0.7rem"}
                          placeholder="New Couch for Finance"
                        />

                        <FormInput
                          type="date"
                          label="Request Date"
                          paddingY={"0.7rem"}
                        />

                        <FormInput
                          type="text"
                          label="Request Details "
                          paddingY={"0.7rem"}
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
                </div>

                <div className="w-[30%] h-[40vh] md:block hidden">
                  <SupportingDoc  />
                </div>
              </div>
            </div>

          
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
}
