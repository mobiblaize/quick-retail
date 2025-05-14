

const AccountBalance = () => {
    return (
      <div className="lg:w-[334px] lg:h-[223px]">
        <div className="bg-white rounded-lg shadow-md flex-1">
          <div className="bg-green-700 text-white text-lg font-semibold p-4 rounded-t-lg">
            Account Balance
          </div>
          <div className=" pb-[em]">
            <table className="w-full text-sm ">
              <thead className="text-gray-800 bg-gray-50">
                <tr>
                  <th className="text-left p-2 border-b border-gray-200"><input type="checkbox" /></th>
                  <th className="text-left p-2 border-b border-gray-200">Name</th>
                  <th className="text-right p-2 border-b border-gray-200">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-2"><input type="checkbox" /></td>
                  <td className="p-3 text-sm">Cash Price</td>
                  <td className="text-right p-3 text-sm">₦ 31,000</td>
                </tr>
                <tr>
                  <td className="p-2"><input type="checkbox" /></td>
                  <td className="p-3 text-sm">Cheque</td>
                  <td className="text-right p-3 text-sm">₦ 31,000</td>
                </tr>
                <tr>
                  <td className="p-2"><input type="checkbox" /></td>
                  <td className="p-3 text-sm">Draft</td>
                  <td className="text-right p-3 text-sm">₦ 31,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  

export default AccountBalance