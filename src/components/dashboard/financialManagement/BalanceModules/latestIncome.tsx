

const LatestIncome = () => {
  return (
    <div className="lg:w-[334px] lg:h-[223px]">
   <div className="bg-white rounded-lg shadow-md flex-1 lg:h-[223px]">
      <div className="bg-blue-700 text-white text-lg font-semibold p-4 rounded-t-lg">
        Latest Income
      </div>
      <div className=" pb-[em]">
        <table className="w-full text-sm">
        <thead className="text-gray-800 bg-gray-50">
            <tr>
            <th className="text-left p-2 border-b border-gray-200"><input type="checkbox" /></th>
            <th className="text-left p-3 border-b border-gray-200">Name</th>
            <th className="text-left p-3 border-b border-gray-200">Category</th>
            <th className="text-left p-3 border-b border-gray-200">Amount</th>
            </tr>
          </thead>
          <tbody>
             <tr>
                  <td className="p-2"></td>
                  <td className="p-3 text-sm">No Records</td>
                  <td className="text-right p-3 text-sm"></td>
                </tr>
                <tr>
                  <td className="p-2"></td>
                  <td className="p-3 text-sm"></td>
                  <td className="text-right p-3 text-sm"></td>
                </tr>
                <tr>
                  <td className="p-2"></td>
                  <td className="p-3 text-sm"></td>
                  <td className="text-right p-3 text-sm"></td>
                </tr>
          </tbody>
        </table>
      </div>
    </div>

        
        </div>
  )
}

export default LatestIncome