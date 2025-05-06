import { useRef, useState } from "react";
import { Button } from "@mantine/core";
import FormSelect from "../../../General/select";
import FormInput from "../../../General/formInput";
import { useNavigate } from "react-router";
import CreatePurchaseModal from "./modal/createPurchaseModal";

export default function CreatePurchaseOrderForm() {
  const navigate = useNavigate();

  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFileChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFileName(file.name);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left side */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              BASIC INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                label="Issued By"
                placeholder="Enter issued by"
                paddingY={"0.7rem"}
              />

              <FormSelect
                label="Purchase Order ID"
                placeholder="Select purchase ID"
                options={["09876467", "5678776", "324456"]}
                name="purchase"
                paddingY="4"
              />

              <FormInput
                type="date"
                label="Purchase Order Issue Date"
                placeholder="Enter order issue date"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="date"
                label="Purchase Order Due Date"
                placeholder="Enter order due date"
                paddingY={"0.7rem"}
              />
            </div>
          </div>

          {/* Vendor Info */}
          <div className="bg-white p-6 rounded-md shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Vendor Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                type="text"
                label="Vendor Name"
                placeholder="Enter vendor name"
                paddingY={"0.7rem"}
              />

              <FormSelect
                label="Vendor ID"
                placeholder="Select vendor ID"
                options={["98765443", "54rfet52", "u78667564"]}
                name="vendor"
                paddingY="4"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Purchase Order Document
            </h2>
            <FormInput
              type="number"
              label="Purchase Order Amount"
              placeholder="Enter order amount"
              paddingY={"0.7rem"}
            />

            <label htmlFor="">Purchase Order</label>
            <div className="border border-gray-200 rounded-md px-3 py-2 flex items-center gap-3 w-full">
              {/* Circular Image Preview Inside Box */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500">Img</span>
                )}
              </div>

              {/* File Name or Placeholder */}
              <div className="flex-1 text-sm text-gray-700 truncate">
                {preview ? fileName : "No Upload (max 5mb)"}
              </div>

              {/* Upload Button */}
              <button
                className="text-[#F16722] text-sm cursor-pointer"
                onClick={triggerFileInput}
              >
                Upload
              </button>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChangeImage}
                className="hidden"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Additional Document (Optional)
            </h2>

            <label htmlFor="">Document 1</label>
            <div className="border border-gray-200 rounded-md px-3 py-2 flex items-center gap-3 w-full">
              {/* Circular Image Preview Inside Box */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500">Img</span>
                )}
              </div>

              {/* File Name or Placeholder */}
              <div className="flex-1 text-sm text-gray-700 truncate">
                {preview ? fileName : "No Upload (max 5mb)"}
              </div>

              {/* Upload Button */}
              <button
                className="text-[#F16722] text-sm cursor-pointer"
                onClick={triggerFileInput}
              >
                Upload
              </button>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChangeImage}
                className="hidden"
              />
            </div>

            <label htmlFor="">Document 2</label>
            <div className="border border-gray-200 rounded-md px-3 py-2 flex items-center gap-3 w-full">
              {/* Circular Image Preview Inside Box */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500">Img</span>
                )}
              </div>

              {/* File Name or Placeholder */}
              <div className="flex-1 text-sm text-gray-700 truncate">
                {preview ? fileName : "No Upload (max 5mb)"}
              </div>

              {/* Upload Button */}
              <button
                className="text-[#F16722] text-sm cursor-pointer"
                onClick={triggerFileInput}
              >
                Upload
              </button>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChangeImage}
                className="hidden"
              />
            </div>

            <button
              className="flex items-center justify-center gap-2  text-orange-500"
              //   onClick={handleAddNewItem}
            >
              <span className="text-lg mr-2">+</span>
              <span className="font-medium">Add new</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Purchase Invoice Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="date"
                label="Purchase Invoice Issued Date"
                placeholder="Enter invoice issued date"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="date"
                label="Purchase Invoice Due Date"
                placeholder="Enter invoice due date"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Issued By"
                placeholder="Enter issued by"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Purchase Invoice ID"
                placeholder="Enter invoice ID"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="number"
                label="Purchase Invoice Amount"
                placeholder="Enter invoice amount"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="number"
                label="Amount Paid"
                placeholder="Enter amount paid"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="number"
                label="Amount Outstanding"
                placeholder="Enter amount outstanding"
                paddingY={"0.7rem"}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Purchase Invoice
            </h2>

            <label htmlFor="">Purchase Invoice</label>
            <div className="border border-gray-200 rounded-md px-3 py-2 flex items-center gap-3 w-full">
              {/* Circular Image Preview Inside Box */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500">Img</span>
                )}
              </div>

              {/* File Name or Placeholder */}
              <div className="flex-1 text-sm text-gray-700 truncate">
                {preview ? fileName : "No Upload (max 5mb)"}
              </div>

              {/* Upload Button */}
              <button
                className="text-[#F16722] text-sm cursor-pointer"
                onClick={triggerFileInput}
              >
                Upload
              </button>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChangeImage}
                className="hidden"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Additional Document (Optional)
            </h2>

            <label htmlFor="">Document 1</label>
            <div className="border border-gray-200 rounded-md px-3 py-2 flex items-center gap-3 w-full">
              {/* Circular Image Preview Inside Box */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500">Img</span>
                )}
              </div>

              {/* File Name or Placeholder */}
              <div className="flex-1 text-sm text-gray-700 truncate">
                {preview ? fileName : "No Upload (max 5mb)"}
              </div>

              {/* Upload Button */}
              <button
                className="text-[#F16722] text-sm cursor-pointer"
                onClick={triggerFileInput}
              >
                Upload
              </button>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChangeImage}
                className="hidden"
              />
            </div>

            <label htmlFor="">Document 2</label>
            <div className="border border-gray-200 rounded-md px-3 py-2 flex items-center gap-3 w-full">
              {/* Circular Image Preview Inside Box */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500">Img</span>
                )}
              </div>

              {/* File Name or Placeholder */}
              <div className="flex-1 text-sm text-gray-700 truncate">
                {preview ? fileName : "No Upload (max 5mb)"}
              </div>

              {/* Upload Button */}
              <button
                className="text-[#F16722] text-sm cursor-pointer"
                onClick={triggerFileInput}
              >
                Upload
              </button>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChangeImage}
                className="hidden"
              />
            </div>

            <button
              className="flex items-center justify-center gap-2  text-orange-500"
              //   onClick={handleAddNewItem}
            >
              <span className="text-lg mr-2">+</span>
              <span className="font-medium">Add new</span>
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="bg-white p-6 rounded-md shadow-sm space-y-4">
          <div>
            <h2 className="text-[20px] font-semibold text-[#101828]">
              Preview Purchase Order
            </h2>
            <p className="text-[16px] text-[#667085] mb-3">
              A live preview of Purchase Order
            </p>
            <div className="border border-[#E4E7EC] rounded-lg h-100 flex items-center justify-center overflow-hidden">
              <p className="text-gray-400 p-5">
                No Preview Available You need to add details to be able to
                generate a preview data.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-[20px] font-semibold text-[#101828]">
              Preview Purchase Order
            </h2>
            <p className="text-[16px] text-[#667085] mb-3">
              A live preview of Purchase Order
            </p>
            <div className="border border-[#E4E7EC] rounded-lg h-100 flex items-center justify-center overflow-hidden">
              <p className="text-gray-400 p-5">
                No Preview Available You need to add details to be able to
                generate a preview data.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom buttons */}
      <div key="search-product-buttons" className="flex gap-4 mt-[5em]">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Back
        </Button>

        <Button variant="filled-primary" onClick={() => setModalOpen(true)}>
            Create New
        </Button>
      </div>
      <CreatePurchaseModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
