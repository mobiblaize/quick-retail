import { Button, FileButton, Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { useNavigate } from "react-router";
import { useState } from "react";
import { FileText, Plus, UploadCloud } from "lucide-react";

const EditVendorForm = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);

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
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Company Information
            </h2>

            <div className="md:grid-cols-2 gap-6 mb-[2em]">
              <FormInput
                type="text"
                label="Project Name"
                placeholder="Enter project name"
                paddingY={"0.7rem"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                label="Project Currency"
                placeholder="Enter project currency"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Project Amount"
                placeholder="Enter project amount"
                paddingY={"0.7rem"}
              />

              <div className="md:grid-cols-2 gap-6 mb-[2em]">
                <FormInput
                  type="text"
                  label="Project Description"
                  placeholder="Enter project description"
                  paddingY={"0.7rem"}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Contact (Personal) Information
            </h2>

            <div className="md:grid-cols-2 gap-6 mb-5">
              <FormInput
                type="text"
                label="Vendor Name"
                placeholder="Enter vendor name"
                paddingY={"0.7rem"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                label="Email Address"
                placeholder="Enter email address"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Vendor ID"
                placeholder="Enter vendor id"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Role"
                placeholder="Enter role"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Phone Number"
                placeholder="Enter phone number"
                paddingY={"0.7rem"}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Financial Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                label="Sub Vendor Name"
                placeholder="Enter sub vendor name"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Due Date"
                placeholder="Enter due date"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Invoice ID"
                placeholder="Enter invoice id"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Amount"
                placeholder="Enter amount"
                paddingY={"0.7rem"}
              />

              <div className="md:grid-cols-2 gap-6 mb-5">
                <FormInput
                  type="text"
                  label="Description/Note"
                  placeholder="Enter description/note"
                  paddingY={"0.7rem"}
                />
              </div>
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
        <Button variant="filled-primary">Save & Update Changes</Button>
      </div>
    </div>
  );
};

export default EditVendorForm;
