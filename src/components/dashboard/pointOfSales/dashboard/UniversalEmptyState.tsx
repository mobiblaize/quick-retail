import Univers from "../../../../assets/images/univers.png"

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      {/* Illustration / Icon */}
      <div>
        <img src={Univers} alt="Empty State" />
      </div>

      {/* Text */}
      <h3 className="text-[20px] font-semibold text-[#1D2739] mb-1">
        No data yet.
      </h3>
      <p className="text-sm text-[#475367] max-w-xs">
        Add product and make a sale to start viewing data.
      </p>
    </div>
  );
}
