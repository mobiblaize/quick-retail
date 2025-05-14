import { VictoryPie } from "victory";

export default function IncomePieChart() {
  return (
    <div className="bg-white p-4 rounded-xl flex flex-col gap-4 w-full">
      <div className="flex items-center">
        <h3 className="text-sm font-medium">Top Income by Category</h3>
      </div>

      {/* Chart */}
      <div className="flex mt-[-5em] ml-[-3em]">
        <div className="flex justify-start">
        <VictoryPie
          data={[
            { x: "Sales", y: 60 },
            { x: "Deposit", y: 40 },
          ]}
          colorScale={["#F16722", "#FFE6D5"]}
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
            <span className="text-[#667085]">Sales</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFE6D5]"></span>
            <span className="text-[#667085]">Deposit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
