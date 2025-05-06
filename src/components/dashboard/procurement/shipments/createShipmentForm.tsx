import { Button } from "@mantine/core";
import FormSelect from "../../../General/select";
import FormInput from "../../../General/formInput";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import ShipmentCreatedModal from "./modal/shipmentCreated";

const CreateShipmentForm = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
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
      <div className="md:grid-cols-3 gap-8">
        {/* Left side */}
        <div className="md:col-span-2 space-y-8 w-[90%] m-auto">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Purchase Order Information
            </h2>

            <div className="md:grid-cols-2 gap-6 mb-5">
              <FormSelect
                label="Select Vendor"
                placeholder="Select Vendor"
                options={["Category 1", "Category 2", "Category 3"]}
                name="category"
                paddingY="4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="number"
                label="Purchase Order No."
                placeholder="Enter Purchase Order No."
                paddingY={"0.7rem"}
              />

              <FormInput
                type="number"
                label="Purchase invoice No."
                placeholder="Enter Purchase invoice No."
                paddingY={"0.7rem"}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
              Shipment Details
            </h2>

            <div className="md:grid-cols-2 gap-6 mb-5">
              <FormInput
                type="number"
                label="Shipment ID"
                placeholder="Enter Shipment ID"
                paddingY={"0.7rem"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="date"
                label="Start Date"
                placeholder="Enter start date"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="date"
                label="End Date"
                placeholder="Enter end date"
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
        </div>
      </div>
      {/* Bottom buttons */}
      <div key="search-product-buttons" className="flex gap-4 mt-[5em]">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="filled-primary"  onClick={() => setModalOpen(true)}>Create Shipments</Button>
      </div>

      <ShipmentCreatedModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default CreateShipmentForm;
