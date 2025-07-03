interface SubscriptionItemProps {
    title: string;
    description: string;
    price: number;
    checked: boolean;
    onChecked: (checked: boolean) => void;
    onSeatChange: (count: number) => void;
    seatCount: number;
  }
  
  export default function SubscriptionItem({
    title,
    description,
    price,
    checked,
    onChecked,
    seatCount,
    onSeatChange,
  }: SubscriptionItemProps) {
    return (
      <div className="flex items-start justify-between p-5 mb-4 bg-white">
        {/* Column 1: Checkbox + Text */}
        <div className="flex gap-3 ">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChecked(e.target.checked)}
            className="mt-1 accent-orange-500"
          />
          <div>
            <h4 className="text-base font-medium text-gray-900">{title}</h4>
            <p className="text-sm text-gray-500 w-[350px]">{description}</p>
          </div>
        </div>
  
        {/* Column 2: Price Info */}
        <div className="text-sm text-right min-w-[120px]">
          <p className="text-xs text-gray-500">Billed / Month</p>
          <p className="font-medium text-gray-800">₦{price.toLocaleString()}</p>
        </div>
  
        {/* Column 3: Free Admin Seats */}
        <div className="text-sm text-right min-w-[120px]">
          <p className="text-xs text-gray-500">Admin Seat (Free)</p>
          <p className="font-medium text-gray-800">2 Seats</p>
        </div>
  
        {/* Column 4: Additional Seats */}
        <div className="text-sm text-right min-w-[160px]">
          <p className="text-xs text-gray-500 mb-1">Additional Admin Seat</p>
          <div className="flex items-center justify-center px-2 py-1 gap-4">
            <button
              className="text-orange-500 px-2 font-bold text-lg border border-gray-300 rounded-full p-3"
              onClick={() => onSeatChange(Math.max(0, seatCount - 1))}
            >
              −
            </button>
            <span className="px-3 border border-gray-300 rounded-lg p-3 text-orange-500">{seatCount}</span>
            <button
              className="text-orange-500 px-2 font-bold text-lg border border-gray-300 rounded-full p-3 "
              onClick={() => onSeatChange(seatCount + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
  