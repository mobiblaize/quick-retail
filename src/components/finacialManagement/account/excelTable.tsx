import { useState } from "react";

const headers = [
  "Parent Unique ID",
  "Unique ID",
  "UPC",
  "Merchant Name",
  "Product Name",
  "Color",
  "Size",
  "Quantity",
  "Tags",
  "Description",
  "MSRP",
  "Price",
  "Shipping",
  "Product Page URL",
  "Main Image URL",
  "Extra Image URL(s)",
];

const rowsCount = 5; // You can make this dynamic later

export default function ExcelTable() {
  const [data, setData] = useState(
    Array(rowsCount)
    //@ts-ignore
      .fill()
      .map(() => Array(headers.length).fill(""))
  );

  const handleChange = (rowIdx: number, colIdx: number, value: string) => {
    const newData = [...data];
    newData[rowIdx][colIdx] = value;
    setData(newData);
  };

  return (
    <div className="overflow-auto border rounded-lg">
      <table className="min-w-[1000px] w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="border border-gray-300 px-3 py-2 text-left font-medium"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => (
                <td key={colIdx} className="border border-gray-300 p-1">
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) =>
                      handleChange(rowIdx, colIdx, e.target.value)
                    }
                    className="w-full px-2 py-1 text-sm border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
