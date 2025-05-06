import { Button, FileButton, Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { FileText, Plus, UploadCloud } from "lucide-react";
import CreateVendorModal from "./modal/createVendorModal";

const CreateTierOneForm = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
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

  const handleFileUpload = (file: File | null) => {
    if (file) {
      setFiles((prev) => [...prev, file]);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
      <div className="md:grid-cols-3 gap-8">
        {/* Left side */}
        <div className="md:col-span-2 space-y-8 w-[90%] m-auto">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="md:grid-cols-2 gap-6 mb-[2em]">
              <FormInput
                type="number"
                label="Vendor ID"
                placeholder="Enter vendor id"
                paddingY={"0.7rem"}
              />
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Company Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                label="Vendor Name"
                placeholder="Enter vendor name"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Vendor Category"
                placeholder="Enter vendor category"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Tax Identification Number (TIN)"
                placeholder="Enter Tax Identification Number (TIN)"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="State/City"
                placeholder="Enter State/City"
                paddingY={"0.7rem"}
              />
            </div>

            <div className="md:grid-cols-2 gap-6 mb-5 mt-5">
              <FormInput
                type="text"
                label="Company Address"
                placeholder="Enter Company Address"
                paddingY={"0.7rem"}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Contact (Personal) Information
            </h2>

            {/* <div className="md:grid-cols-2 gap-6 mb-5">
              <FormInput
                type="number"
                label="Shipment ID"
                placeholder="Enter Shipment ID"
                paddingY={"0.7rem"}
              />
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                label="Name"
                placeholder="Enter Name"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Phone Number"
                placeholder="Enter phone number"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Other Phone Number"
                placeholder="Enter other phone number"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Other Phone Number"
                placeholder="Enter other phone number"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Email Address"
                placeholder="Enter email address"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Website"
                placeholder="Enter website"
                paddingY={"0.7rem"}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="">Proof Of Payment </label>
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
                <div className="flex gap-3">
                  <button className="text-[#5F6368] text-sm cursor-pointer">
                    View
                  </button>
                  <button
                    className="text-[#F16722] text-sm cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    Change
                  </button>
                </div>

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
                className="flex items-center justify-center gap-2  text-orange-500 mt-3"
                //   onClick={handleAddNewItem}
              >
                <span className="text-lg mr-2">+</span>
                <span className="font-medium">Add new</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Financial Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                label="Currency Preference"
                placeholder="Enter Currency preferrence"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Discount Structure"
                placeholder="Enter discount structure"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Account Number"
                placeholder="Enter account number"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Receiving Bank Name"
                placeholder="Enter receiving bank name"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Min. Order Quantity"
                placeholder="Enter Min. Order Quantity"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Max. Order Quantity"
                placeholder="Enter Max. Order Quantity"
                paddingY={"0.7rem"}
              />
            </div>

            <div className=" mx-auto space-y-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
                Supporting Document
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Render Uploaded Files */}
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 flex items-start gap-4"
                  >
                    <FileText className="text-orange-500 w-6 h-6 mt-1" />
                    <div>
                      <Text fw={500} size="sm">
                        {file.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {(file.size / 1024).toFixed(0)} KB – 100% uploaded
                      </Text>
                    </div>
                  </div>
                ))}

                {/* Upload Box */}
                <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center h-full">
                  <UploadCloud className="h-6 w-6 text-gray-500 mb-2" />
                  <FileButton onChange={handleFileUpload} accept="image/*,.pdf">
                    {(props) => (
                      <button {...props} className="text-blue-600 text-sm">
                        Click to upload
                      </button>
                    )}
                  </FileButton>
                  <Text size="xs" c="dimmed">
                    or drag and drop
                    <br />
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Text>
                </div>
              </div>

              {/* Add New */}
              <div>
                <button
                  onClick={() => {}}
                  className="flex items-center gap-2 text-orange-500 text-sm"
                >
                  <Plus size={16} /> Add new
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom buttons */}
      <div key="search-product-buttons" className="flex gap-4 mt-[5em]">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="filled-primary" onClick={() => setModalOpen(true)}>Create Vendor</Button>
      </div>

      <CreateVendorModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default CreateTierOneForm;
