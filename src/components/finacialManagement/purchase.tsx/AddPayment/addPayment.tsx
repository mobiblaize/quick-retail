import { useState } from "react";
import { Download, Upload } from "lucide-react"; 
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../constants/routes";

export default function PaymentOption() {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const handleContinue= () => {
    navigate(ROUTES.addPayment2);
  };
 

  return (
    <>
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow py-6 px-8">
      <h2 className="text-gray-700 font-semibold mb-4">Add Payment Option</h2>

      {/* Single Payment */}
      <label className="flex items-start space-x-3 mb-4 cursor-pointer">
        <input
          type="radio"
          name="paymentOption"
          value="single"
          checked={selectedOption === "single"}
          onChange={() => setSelectedOption("single")}
          className="mt-1"
        />
        <div>
          <p className="font-medium text-gray-800">Single Payment</p>
          <p className="text-sm text-gray-500">Perform Single Payment for Multiple Invoices</p>
        </div>
      </label>

      {/* Divider */}
      <hr className="my-4 mt-[3em]" />

      {/* Multiple Payment */}
      <label className="flex items-start space-x-3 mb-4 cursor-pointer">
        <input
          type="radio"
          name="paymentOption"
          value="multiple"
          checked={selectedOption === "multiple"}
          onChange={() => setSelectedOption("multiple")}
          className="mt-1"
        />
        <div>
          <p className="font-medium text-gray-800">Multiple Payment</p>
          <p className="text-sm text-gray-500">Perform Multiple Payment for Multiple vendors</p>
        </div>
      </label>

      {/* Key Actions */}
      <div className="flex mt-6 gap-3 justify-center">
        <p className="text-gray-600 font-medium mb-2 whitespace-nowrap">Key Action:</p>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 whitespace-nowrap">
            <Download className="w-4 h-4 mr-2 " />
            Download Template
          </button>
          <button className="flex items-center px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300  whitespace-nowrap">
            <Upload className="w-4 h-4 mr-2" />
            Upload Template
          </button>
        </div>
      </div>

      {/* Bottom Button */}
     
    </div>
    <div className="flex justify-center ml-[4em] mt-6" onClick={handleContinue}>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
          Download
        </button>
      </div>
    </>
  );
}
