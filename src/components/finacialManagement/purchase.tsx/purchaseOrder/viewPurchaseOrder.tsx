import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import FormInput from "../../../General/formInput";
import FormSelect from "../../../General/select";
import FileUpload from "../../salesManagement/receipts/fileUpload";
import SaveModal from "../purchaseInvoice/saveModal";
import PurchaseOrder from "./purchaseOrder";

export default function ViewPurchaseOrderForm() {
  const [showAllocatedModal, setShowAllocatedModal] = useState(false);
  const navigate = useNavigate();
 const handlePreview = () => {
        navigate(ROUTES.previewPurchaseOrder)
       };

  const financeButtons = [
    "₦ Purchase Order Version History",

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
                      Basic information<span className="text-[red]"> *</span>
                    </h2>

                    <div>
                      <div className="grid grid-cols-1  mt-6">
                        <FormInput
                          type="text"
                          label="Vendor Name"
                          paddingY={"0.7rem"}
                        />
                        {/* <FormInput
                          type="text"
                          label="Purchase Order ID"
                          paddingY={"0.7rem"}
                        /> */}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormInput
                          type="date"
                          label="Purchase Order Issue Date "
                          paddingY={"0.7rem"}
                        />

                        <FormInput
                          type="date"
                          label="Purchase Order Issue Date "
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
                    <h2 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 uppercase">
                      Purchase Invoice Details
                      <span className="text-[red]"> *</span>
                    </h2>

                    <div className="text-gray-900">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormInput
                          type="date"
                          label="Purchase Invoice Issued Date"
                          paddingY={"0.7rem"}
                        />

                        <FormInput
                          type="date"
                          label=" Purchase Invoice Due Date"
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
                      Basic information<span className="text-[red]"> *</span>
                    </h2>

                    <div>
                      <div className="grid grid-cols-1  mt-6">
                        <FormInput
                          type="text"
                          label="Vendor Name"
                          paddingY={"0.7rem"}
                        />
                        {/* <FormInput
                          type="text"
                          label="Purchase Order ID"
                          paddingY={"0.7rem"}
                        /> */}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormInput
                          type="date"
                          label="Purchase Order Issue Date "
                          paddingY={"0.7rem"}
                        />

                        <FormInput
                          type="date"
                          label="Purchase Order Issue Date "
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
                    <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                      Purchase Invoice Details
                      <span className="text-[red]"> *</span>
                    </h2>

                    <div className="text-gray-400">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <FormInput
                          type="date"
                          label="Purchase Invoice Issued Date"
                          paddingY={"0.7rem"}
                        />

                        <FormInput
                          type="date"
                          label=" Purchase Invoice Due Date"
                          paddingY={"0.7rem"}
                        />
                      </div>
                    </div>
                  </div>{" "}
                </div>

                <div className="w-[30%] h-[40vh] md:block hidden">
                  <PurchaseOrder />
                </div>
              </div>
              {/* desktop */}
              <div className="w-[69%] md:block hidden">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[2em]">
                  <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 uppercase">
                    PURCHASE ORDER <span className="text-[red]"> *</span>
                  </h2>

                  <div className="mt-3">
                    <FileUpload />
                  </div>
                </div>
                <div className="bg-white p-6 mt-[2em]">
                  <h1 className="text-lg font-medium text-gray-800">
                    Others<span className="text-[red]"> *</span>
                  </h1>

                  <div className=" p-6 rounded-md grid grid-cols-1  whitespace-nowrap">
                    {financeButtons.map((label, i) => (
                      <button
                        key={i}
                        className="w-full bg-orange-100 border border-orange-800 text-black py-2 pl-2 pr-14 rounded-md text-sm font-medium text-left"
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
                    PURCHASE ORDER <span className="text-[red]"> *</span>
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
                  onClick={handlePreview}
                //   onClick={() => setShowAllocatedModal(true)}
                >
                  Continue
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
