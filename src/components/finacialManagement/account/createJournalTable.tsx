import { useState } from 'react';

const initialRows = Array(5).fill({
  selected: false,
  date: '',
  accountType: '',
  account: '',
  referenceId: '',
  description: '',
});

export default function JournalEntryForm() {
  const [rows, setRows] = useState(initialRows);

  const handleChange = (index: number, key: string, value: any) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create A New Journal of Entry</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100 text-left text-sm text-gray-600">
            <tr>
              <th className="px-3 py-2">
                <input type="checkbox" />
              </th>
              <th className="px-3 py-2">Select Date</th>
              <th className="px-3 py-2">Account Code</th>
              <th className="px-3 py-2">Account</th>
              <th className="px-3 py-2">Reference ID</th>
              <th className="px-3 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={row.selected}
                    onChange={(e) => handleChange(index, 'selected', e.target.checked)}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) => handleChange(index, 'date', e.target.value)}
                    className="border border-gray-200 rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-3 py-2">
                  <select
                    value={row.accountType}
                    onChange={(e) => handleChange(index, 'accountType', e.target.value)}
                    className="border border-gray-200  rounded px-2 py-1 w-full"
                  >
                    <option value="">Select Account Type</option>
                    <option value="asset">Asset</option>
                    <option value="liability">Liability</option>
                    <option value="equity">Equity</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select
                    value={row.account}
                    onChange={(e) => handleChange(index, 'account', e.target.value)}
                    className="border border-gray-200  rounded px-2 py-1 w-full"
                  >
                    <option value="">Select Account</option>
                    <option value="cash">Cash</option>
                    <option value="bank">Bank</option>
                    <option value="sales">Sales</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    placeholder="Reference ID"
                    value={row.referenceId}
                    onChange={(e) => handleChange(index, 'referenceId', e.target.value)}
                    className="border border-gray-200  rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    placeholder="Enter Description"
                    value={row.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    className="border border-gray-200 rounded px-2 py-1 w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
