import { useState } from 'react';

export interface FilterValues {
  startDate: string;
  endDate: string;
  location: string;
  stockFrom: string;
  stockTo: string;
  orderStatus: string;
  priceFrom?: string;
  priceTo?: string;
  paymentStatus?: string;
}

interface ReusableFilterComponentProps {
  onFilterChange: (filters: FilterValues) => void;
  locations?: string[];
  filterType: 'inventory' | 'product' | 'sales'; 
  showLocation?: boolean;
  showStockLevel?: boolean;
  showOrderStatus?: boolean;
  showPrice?: boolean;         
  showPaymentStatus?: boolean;
}

const ReusableFilterComponent: React.FC<ReusableFilterComponentProps> = ({
  onFilterChange,
  locations = [],
  showLocation,
  showStockLevel,
  showOrderStatus,
  showPrice = false,
  showPaymentStatus = false,
  filterType,
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    startDate: '',
    endDate: '',
    location: '',
    stockFrom: '',
    stockTo: '',
    orderStatus: 'All',
    priceFrom: '',
    priceTo: '',
    paymentStatus: 'All',
  });

  const handleClear = () => {
    const cleared: FilterValues = {
      startDate: '',
      endDate: '',
      location: '',
      stockFrom: '',
      stockTo: '',
      orderStatus: 'All',
      paymentStatus: 'All',
      priceFrom: '',
      priceTo: '',
    };
    setFilters(cleared);
    onFilterChange(cleared); 
  };
  

  return (
    <div className="w-80 bg-white rounded-lg">
      <h2 className="text-lg font-semibold mb-4">FILTER</h2>

      {/* Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date</label>
        <div className="flex gap-2">
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            className="flex-1 border rounded p-2 text-sm"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            className="flex-1 border rounded p-2 text-sm"
          />
        </div>
      </div>

      {/* Location */}
      {showLocation && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Location/Store</label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full border rounded p-2 text-sm"
          >
            <option value="">Choose location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Stock level */}
      {showStockLevel && (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">Stock level</label>
    <div className="flex gap-2">
      <input
        type="number"
        placeholder="From"
        value={filters.stockFrom}
        onChange={(e) => setFilters({ ...filters, stockFrom: e.target.value })}
        className="w-39 border rounded p-2 text-sm"
      />
      <input
        type="number"
        placeholder="To"
        value={filters.stockTo}
        onChange={(e) => setFilters({ ...filters, stockTo: e.target.value })}
        className="w-39 border rounded p-2 text-sm"
      />
    </div>
  </div>
)}


      {/* Price level */}
      {showPrice && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price (₦)</label>
          <div className="flex gap-2">
            <div className="relative ">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
              <input
                type="number"
                placeholder="From"
                value={filters.priceFrom}
                onChange={(e) => setFilters({ ...filters, priceFrom: e.target.value })}
                className="w-39 border rounded p-2 text-sm"
              />
            </div>
            <div className="relative w-24">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
              <input
                type="number"
                placeholder="To"
                value={filters.priceTo}
                onChange={(e) => setFilters({ ...filters, priceTo: e.target.value })}
                className="w-39 border rounded p-2 text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Order Status */}
      {showOrderStatus && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Order Status</label>
          <div className="flex flex-wrap gap-x-2 gap-y-2">
            {['All', 'Available', 'Low stock', 'Sold out'].map((status) => (
              <label key={status} className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="orderStatus"
                  value={status}
                  checked={filters.orderStatus === status}
                  onChange={() => setFilters({ ...filters, orderStatus: status })}
                />
                {status}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Payment Status */}
      {showPaymentStatus && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Payment Status</label>
          <div className="flex flex-wrap gap-x-2 gap-y-2">
            {['All', 'Pending', 'Paid'].map((status) => (
              <label key={status} className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="paymentStatus"
                  value={status}
                  checked={filters.paymentStatus === status}
                  onChange={() => setFilters({ ...filters, paymentStatus: status })}
                />
                {status}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleClear}
          className="border border-orange-500 text-orange-500 rounded py-1 px-4 text-sm hover:bg-orange-50"
        >
          Clear All
        </button>
        <button
          onClick={() => onFilterChange(filters)}
          className="bg-orange-500 text-white rounded py-1 px-4 text-sm hover:bg-orange-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ReusableFilterComponent;
