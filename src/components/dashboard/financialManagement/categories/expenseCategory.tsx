import { VictoryPie } from "victory";

export default function ExpensePieChart() {
  return (
    <div className="bg-white p-4 rounded-xl flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Top 5 Expenses by Category</h3>
      </div>

      {/* Chart */}
      <div className="flex mt-[-5em] ml-[-3em]">
        <div className="flex justify-start">
          <VictoryPie
            data={[
              { x: "Category 1", y: 30 },
              { x: "Category 2", y: 20 },
              { x: "Reoccuring", y: 40 },
              { x: "Others", y: 10 },
            ]}
            colorScale={["#F16722", "#FFE6D5", "#BB3713", "#F8B079"]}
            radius={100}
            innerRadius={50}
            labels={() => null}
            style={{
              parent: { maxWidth: "100%", height: "auto" },
            }}
          />
        </div>
        <div className="flex  flex-col gap-4 text-xs mt-[10em] ml-[-5em]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F16722]"></span>
            <span className="text-[#667085]">Category 1</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFE6D5]"></span>
            <span className="text-[#667085]">Category 2</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BB3713]"></span>
            <span className="text-[#667085]">Reocurring</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F8B079]"></span>
            <span className="text-[#667085]">Others</span>
          </div>
        </div>
      </div>
    </div>
  );
}
