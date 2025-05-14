

interface TableData {
  name: string;
  amount: string;
}

interface CustomerPaymentTableProps {
  title: string;
  data: TableData[];
  name: string;
  amount:string;
}

const PaymentTable: React.FC<CustomerPaymentTableProps> = ({ title, data, name, amount }) => {
  return (
    <div className="bg-white rounded-lg shadow-md flex-1">
      <div className="text-[#101828] text-lg font-medium p-4 rounded-t-lg">{title}</div>
      <div className="pb-4">
        <table className="w-full text-sm">
          <thead className="text-gray-800 bg-gray-200">
            <tr>
              <th className="text-left p-2 border-b border-gray-200">
                <input type="checkbox" />
              </th>
              <th className="text-left p-2 border-b border-gray-200 text-[#101928] font-medium text-[12px]">
                {name}
              </th>
              <th className="text-right py-2 px-[4em] border-b border-gray-200 text-[#101928] font-medium text-[12px]">
                {amount}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index}>
                <td className="p-2">
                  <input type="checkbox" />
                </td>
                <td className="p-3 text-sm">{row.name}</td>
                <td className="text-right p-3 text-sm px-[4em]">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
