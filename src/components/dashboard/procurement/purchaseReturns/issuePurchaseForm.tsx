import { useState } from "react";
import { Button, FileButton, Text } from "@mantine/core";
import { Upload, UploadCloud } from "lucide-react";
import requestimg from "../../../../assets/images/requestimg.png";
import FormSelect from "../../../General/select";
import FormInput from "../../../General/formInput";
import { useNavigate } from "react-router";

export default function IssuePurchaseForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const navigate = useNavigate();

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
                type="date"
                label="Purchase Return Date"
                placeholder="Enter purchase return date"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Purchase Return ID"
                placeholder="Enter purchase return ID"
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
                options={["Category 1", "Category 2", "Category 3"]}
                name="category"
                paddingY="4"
              />
            </div>
          </div>

          <div className="bg-white rounded-md shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Invoice Information
            </h2>
            <div className=" md:grid-cols-2 gap-4">
              <FormSelect
                label="Select Invoice"
                placeholder="Select vendor name"
                options={["Category 1", "Category 2", "Category 3"]}
                name="category"
                paddingY="4"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Reason For Return
            </h2>
            <div className=" md:grid-cols-2 gap-4">
              <FormInput
                type="text"
                label="Reason For Return"
                placeholder="Enter reason for return"
                paddingY={"0.7rem"}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Value Of Return
            </h2>
            <div className=" md:grid-cols-2 gap-4">
              <FormInput
                type="text"
                label="Value of Return"
                placeholder="Enter value of return"
                paddingY={"0.7rem"}
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-4">
          <h2 className="text-[20px] font-semibold text-[#101828]">
            Supporting Documents <span className="text-red-500">*</span>
          </h2>
          <p className="text-[16px] text-[#667085] mb-3">
            Select or upload documents image below
          </p>
          <div className="border border-gray-200 rounded-md p-4 text-center h-80 flex items-center justify-center overflow-hidden">
            <div className="flex flex-col items-center gap-2">
              <UploadCloud className="h-8 w-8 text-gray-400" />
              <Text size="sm" className="text-blue-600 cursor-pointer">
                Click to upload
              </Text>
              <Text size="xs" c="dimmed">
                or drag and drop SVG, PNG, JPG or GIF (max. 800x400px)
              </Text>
              <FileButton onChange={() => {}} accept="image/png,image/jpeg">
                {(props) => (
                  <Button {...props} variant="outline">
                    Upload
                  </Button>
                )}
              </FileButton>
            </div>
          </div>
          <Button variant="light" fullWidth>
            Add more documents
          </Button>
        </div>
      </div>
      {/* Bottom buttons */}

      <div key="search-product-buttons" className="flex gap-4 mt-[5em]">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Back
        </Button>

        <Button variant="filled-primary">
          Issue Purchase Return
        </Button>
      </div>
    </div>
  );
}
