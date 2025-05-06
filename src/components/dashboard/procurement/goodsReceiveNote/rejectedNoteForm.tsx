import { useState } from "react";
import { Button } from "@mantine/core";
import { Upload } from "lucide-react";
import requestimg from "../../../../assets/images/requestimg.png";
import FormSelect from "../../../General/select";
import FormInput from "../../../General/formInput";
import { useNavigate } from "react-router";

export default function RejectedNoteForm() {
  const [items, setItems] = useState([
    {
      name: "Microwave",
      description: "This is short description",
      quantity: 2,
      unitPrice: 31000000,
    },
    {
      name: "Microwave",
      description: "This is short description",
      quantity: 2,
      unitPrice: 31000000,
    },
    {
      name: "Microwave",
      description: "This is short description",
      quantity: 2,
      unitPrice: 31000000,
    },
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddNewItem = () => {
    setItems([
      ...items,
      { name: "", description: "", quantity: 1, unitPrice: 0 },
    ]);
  };

  const grandTotal = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

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
                type="text"
                label="Request Name"
                placeholder="Enter request name"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Department"
                placeholder="Enter department"
                paddingY={"0.7rem"}
              />

              <FormSelect
                label="Request ID"
                placeholder="Select request ID"
                options={["Category 1", "Category 2", "Category 3"]}
                name="category"
                paddingY="4"
              />

              <FormInput
                type="date"
                label="Request Date"
                placeholder="Enter request date"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Request Details"
                placeholder="Enter request details"
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

          {/* Add Items */}
          <div className="bg-white p-6 rounded-md shadow-sm space-y-4">
            <h2 className="text-xl font-semibold mb-4">Add Items</h2>
            <table className="w-full text-md text-left text-gray-600">
              <thead className="text-md text-[#101323] uppercase bg-[#D0D5DD]">
                <tr>
                  <th className="p-4">
                    <input type="checkbox" />
                  </th>
                  <th className="p-4">Item Name</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Unit Price</th>
                  <th className="p-4">Total Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx} className="border-t border-[#E5E7EB]">
                    <td className="p-4">
                      <input type="checkbox" />
                    </td>
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.description}</td>
                    <td className="p-4">{item.quantity}</td>
                    <td className="p-4">₦ {item.unitPrice.toLocaleString()}</td>
                    <td className="p-4">
                      ₦ {(item.unitPrice * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="justify-center mt-4">
              <div className="text-center font-semibold text-lg">
                Grand Total = ₦ {grandTotal.toLocaleString()}
              </div>
            </div>
            <button
              className="flex items-center justify-center gap-2 border-2 border-dashed border-orange-500 text-orange-500 rounded-md px-6 py-4 hover:bg-orange-50"
              onClick={handleAddNewItem}
            >
              <span className="text-lg mr-2">+</span>
              <span className="font-medium">Add new items row</span>
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="bg-white p-6 rounded-md shadow-sm space-y-4">
          <h2 className="text-[20px] font-semibold text-[#101828]">
            Supporting Documents
          </h2>
          <p className="text-[16px] text-[#667085] mb-3">
            A live preview of your purchase order.
          </p>
          <div className="border border-[#E4E7EC] rounded-lg h-100 flex items-center justify-center overflow-hidden">
            {selectedFile ? (
              <img
                src={requestimg}
                alt="newrequestimg"
                className="object-cover"
                height={200}
                width={400}
              />
            ) : (
              <p className="text-gray-400">No document uploaded</p>
            )}
          </div>
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Change Button */}
            <button className="flex items-center justify-center border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 text-sm hover:bg-gray-50 w-full">
              <Upload size={16} className="mr-1" />
              <span className="font-medium">
                Change <input type="file" hidden onChange={handleFileChange} />
              </span>
            </button>

            {/* Add New Dashed Box */}
            <button className="flex items-center justify-center w-full border-2 border-dashed border-orange-500 text-orange-500 rounded-md px-6 py-4 hover:bg-orange-50">
              <span className="text-lg mr-2">+</span>
              <span className="font-medium">Add new</span>
            </button>
          </div>
        </div>
      </div>
      {/* Bottom buttons */}
      <div key="search-product-buttons" className="flex gap-4 mt-[5em]">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="filled-primary">Save and Update Changes</Button>
      </div>
    </div>
  );
}
