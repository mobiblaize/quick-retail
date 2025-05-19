import { useState } from "react";
import FormInput from "../../../General/formInput";
import FormSelect from "../../../General/select";
import CreditNoteModal2 from "../../salesManagement/creditNote/creditNoteModal2";
import SupportingDoc from "./supportingDoc";
import VendorPurchaseInvoices from "./allVendorPurchase";

export default function ViewNonInventory() {
  const [showAllocatedModal, setShowAllocatedModal] = useState(false);

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
                </div>

                {/* mobile */}
                <div className="flex flex-col w-full lg:hidden">
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                      Basic information<span className="text-[red]"> *</span>
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

                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                      Vendor Information<span className="text-[red]"> *</span>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"></div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                    <VendorPurchaseInvoices />
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
                  <SupportingDoc />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
