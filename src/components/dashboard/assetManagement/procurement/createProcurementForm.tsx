import { Button } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { useNavigate } from "react-router";
import { Download, FileText } from "lucide-react";
import { Text } from "@mantine/core";

const CreateProcurementForm = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
      <div className="md:grid-cols-3 gap-8">
        {/* Left side */}
        <div className="md:col-span-2 space-y-8 w-full m-auto">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                label="Asset Description"
                placeholder="Enter Asset Description"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Asset Name"
                placeholder="Enter Asset Name"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Asset Category"
                placeholder="Enter asset category"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Quantity"
                placeholder="Enter quantity"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Estimated Cost"
                placeholder="Enter estimated cost"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Reason For Procurement"
                placeholder="Enter reason for procurement"
                paddingY={"0.7rem"}
              />
            </div>
          </div>
        </div>
      </div>

      <main className="w-full h-auto rounded-lg bg-[#FFF] px-6 md:py-8 mt-[3em]">
        <div>
          <Text fw={500} size="xl" c="black">
            Supporting Document
          </Text>
          <Text className="text-[#667085] text-[16px]">
            You're viewing additional information below
          </Text>
        </div>

        <div className="flex gap-8 items-center mt-[3em]">
          <div className="flex items-center justify-between bg-[#EFF0F6] rounded-xl p-4 w-full max-w-md">
            {/* Left circle with PDF icon */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <FileText className="text-blue-600 w-6 h-6" />
              </div>

              <div>
                <div className="text-lg font-medium text-[#262338]">
                  Product Details.pdf
                </div>
                {/* Download link */}
                <a
                  href="#"
                  className="flex items-center text-[#2E5CB2] text-sx font-medium"
                  download
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#EFF0F6] rounded-xl p-4 w-full max-w-md">
            {/* Left circle with PDF icon */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <FileText className="text-blue-600 w-6 h-6" />
              </div>

              <div>
                <div className="text-lg font-medium text-[#262338]">
                  Quotation.pdf
                </div>
                {/* Download link */}
                <a
                  href="#"
                  className="flex items-center text-[#2E5CB2] text-sx font-medium"
                  download
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Bottom buttons */}
      <div key="search-product-buttons" className="flex gap-4 mt-[5em]">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="filled-primary">Submit Request</Button>
      </div>
    </div>
  );
};

export default CreateProcurementForm;
