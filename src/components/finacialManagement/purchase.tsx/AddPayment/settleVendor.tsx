import { useState } from "react";
import { Calendar, Plus } from "lucide-react";
import CustomDropdown from "../../../General/customDropdown";

const banks = ["GTBank", "Access Bank", "Zenith Bank"];
const invoices = ["POI 18191", "POI 12345", "POI 18191"];

export default function VendorInvoiceSettleTable() {
  const [rows, setRows] = useState([
    {
      transactionId: "",
      paymentId: "",
      bank: "",
      invoice: "",
      invoiceAmount: "",
      amountToPay: "",
    },
    {
      transactionId: "",
      paymentId: "",
      bank: "",
      invoice: "",
      invoiceAmount: "",
      amountToPay: "",
    },
  ]);

  const handleChange = (index: number, field: string, value: string) => {
    const newRows = [...rows];
    //@ts-ignore
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        transactionId: "",
        paymentId: "",
        bank: "",
        invoice: "",
        invoiceAmount: "",
        amountToPay: "",
      },
    ]);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            All Vendor Purchase Invoice
          </h2>
          <p className="text-sm text-gray-500">
            Below are available Vendor bills that payment can be made on.
          </p>
        </div>
        <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700 border border-gray-300">
          Select Date
          <Calendar className="w-4 h-4 ml-2" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full mt-4 border border-gray-200 rounded-md text-sm">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3">Transaction ID</th>
              <th className="p-3">Payment ID</th>
              <th className="p-3">Add to Bank</th>
              <th className="p-3">Purchase Invoice</th>
              <th className="p-3">Invoice Amount</th>
              <th className="p-3">Amount to Pay Now</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Enter Transaction ID"
                    value={row.transactionId}
                    onChange={(e) =>
                      handleChange(index, "transactionId", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-400 rounded-md text-sm"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Enter Payment ID"
                    value={row.paymentId}
                    onChange={(e) =>
                      handleChange(index, "paymentId", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-400 rounded-md text-sm"
                  />
                </td>
                <td className="p-3">
                  <CustomDropdown
                    options={banks}
                    value={row.bank}
                    onChange={(val) => handleChange(index, "bank", val)}
                    placeholder="Select Bank"
                    inputSizeClass="py-1"
                    fieldColorClass="bg-white"
                    required={false}
                    textColorClass="text-gray-400"
                  />
                </td>
                <td className="p-3">
                  <CustomDropdown
                    options={invoices}
                    value={row.bank}
                    onChange={(val) => handleChange(index, "invoice", val)}
                    placeholder="Purchase Invoice"
                    inputSizeClass="py-1"
                    fieldColorClass="bg-white"
                    required={false}
                    textColorClass="text-gray-400"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="₦"
                    value={row.invoiceAmount}
                    onChange={(e) =>
                      handleChange(index, "invoiceAmount", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-400 rounded-md text-sm text-right"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="₦"
                    value={row.amountToPay}
                    onChange={(e) =>
                      handleChange(index, "amountToPay", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-400 rounded-md text-sm text-right"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Button */}
      <button
        onClick={addRow}
        className="mt-4 text-orange-600 hover:text-orange-800 flex items-center text-sm font-medium"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add new
      </button>
    </div>
  );
}
