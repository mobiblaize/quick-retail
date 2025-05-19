import { useState } from "react";

const VendorInvoice = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [amountToPay, setAmountToPay] = useState<{ [key: number]: string }>({})
  const items = [
    {
      id: 1,
      name: "#123456778",
      totalItems:"Total Items: 10",
      description: "This is short description",
      quantity: 2,
      unitPrice: 31000000,
    },
   
  ];
  // @ts-ignore
  const toggleSelectItem = (id) => {
    // @ts-ignore
    setSelectedItems((prev) =>
    // @ts-ignore
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };
// @ts-ignore
  const formatCurrency = (value) =>
    `₦${value.toLocaleString(undefined, { minimumFractionDigits: 0 })}`;

  const grandTotal = selectedItems.reduce((acc, id) => {
    const item = items.find((i) => i.id === id);
    // @ts-ignore
    return acc + item.unitPrice;
  }, 0);

  return (
    <div className="bg-white rounded-md shadow p-4 w-full max-w-4xl mx-auto mt-10">
      <h2 className="font-semibold text-sm text-gray-700 mb-3">
        ALL VENDOR PURCHASE INVOICES (SINGLE){" "}
        <span className="text-red-500">*</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-6">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="pl-2">
                <input type="checkbox" disabled />
              </th>
              <th>Purchase Invoice ID</th>
              <th>Invoice Amount</th>
              <th>Amount Due</th>
              <th>Amount to be paid now</th>
          
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="bg-gray-100 rounded-md shadow-sm">
                <td className="pl-2 align-top">
                  <input
                    type="checkbox"
                    // @ts-ignore
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                  />
                </td>
                <div className="flex flex-col">
                <td className="py-2 font-medium">{item.name}</td>
                <td className="text-sm text-gray-500">{item.totalItems}</td>
                </div>
                <td className="">{formatCurrency(item.unitPrice)}</td>
                <td className="text-[red]">{formatCurrency(item.unitPrice)}</td>
                <td>
                  <input
                    type="number"
                    className="border border-gray-300 rounded px-2 py-1 text-sm w-36 text-green"
                    placeholder="Enter amount"
                    value={amountToPay[item.id] || ""}
                    onChange={(e) =>
                      setAmountToPay((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 border-t pt-4 text-center">
        <span className="font-semibold text-lg">Grand Total = </span>
        <span className="font-bold text-xl text-gray-800">
          {formatCurrency(grandTotal)}
        </span>
      </div>
    </div>
  );
};

export default VendorInvoice;
