import { useEffect, useState } from 'react';


export type DiscountType = 'all' | 'amount' | 'percentage';
export type Reason = 'all' | 'damaged' | 'mistaken' | 'size issue' | 'others';

export interface FilterValues {
  startDate: string;
  endDate: string;
  location: string;
  category?: string;
  stockFrom: string;
  stockTo: string;
  orderStatus: string;
  priceFrom?: string;
  priceTo?: string;
  paymentStatus?: string;
  productStatus?:string;
  reason?: Reason ;
  type?: DiscountType;
   discountStatus?: string
   returnStatus?: string;
   role: string;
   module: string;
   [key: string]: string | undefined; 
}

interface ReusableFilterComponentProps {
  onFilterChange: (filters: FilterValues) => void;
  locations?: string[];
  categories?: string[];
  reasons?:string[];
  roles?: string[];
  modules?: string[];
  types?: string[];
  filterType: 'inventory' | 'product' | 'sales' | 'returns' | 'discount' | 'audit' ;
  showLocation?: boolean;
  showCategory?:boolean;
  showStockLevel?: boolean;
  showOrderStatus?: boolean;
  showPrice?: boolean;         
  showPaymentStatus?: boolean;
  showProductStatus?: boolean;
  showReason?:boolean;
  showDiscountType?:boolean;
  showDiscountStatus ?:boolean;
  showReturnStatus?: boolean;
  showRole?: boolean;
  showModule?: boolean;
  setFiltersApplied?: (value: boolean) => void;
  setAppliedFilters?: (filters: FilterValues) => void;
  onResetFilter?: () => void;
}

const ReusableFilterComponent: React.FC<ReusableFilterComponentProps> = ({
  onFilterChange,
  locations = [],
  categories =[],
  roles = [],
  modules = [],
  showLocation,
  showCategory,
  showStockLevel,
  showOrderStatus,
  showPrice = false,
  showPaymentStatus = false,
  showProductStatus = false,
  showReason = false,
  showDiscountType  = false,
  showDiscountStatus  = false,
  showReturnStatus = false,
  showRole = false,
  showModule = false,
  setFiltersApplied,
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    startDate: '',
    endDate: '',
    location: '',
    category: '',
    reason:'all',
    stockFrom: '',
    stockTo: '',
    orderStatus: 'All',
    priceFrom: '',
    priceTo: '',
    paymentStatus: 'All',
    productStatus: 'All',
    type: 'all',
    discountStatus: 'All',
     returnStatus: 'All',
    role: '',
    module: '',
  });

  const handleClear = () => {
    const cleared: FilterValues = {
      startDate: '',
      endDate: '',
      location: '',
      category: '',
      reason: 'all',
      stockFrom: '',
      stockTo: '',
      orderStatus: 'All',
      paymentStatus: 'All',
      priceFrom: '',
      priceTo: '',
      productStatus: '',
      type: 'all',
      discountStatus: 'All',
      returnStatus: 'All',
      role: '',
      module: '',
    };
  
    setFilters(cleared);

    // onFilterChange(cleared); 
  };
  
  useEffect(() => {
    const hasFilters = Object.entries(filters).some(
      ([ val]) => val && val !== '' && val !== 'All' && val !== 'all'
    );
  
    setFiltersApplied?.(hasFilters);
  }, [filters]);
  

  
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
            className="flex-1 border rounded p-2 text-sm border-gray-200"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            className="flex-1 border rounded p-2 text-sm border-gray-200 "
          />
        </div>
      </div>

      {/* Location */}
      {showLocation && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Store</label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full border rounded p-2 text-sm border-gray-200"
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

       {/* Category */}
       {showCategory && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full border rounded p-2 text-sm border-gray-200"
          >
            <option value="">Choose category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}

           {/* Reason */}
          {/* Reason */}
{showReason && (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">Reason</label>
    <select
      value={filters.reason}
      onChange={(e) => setFilters({ ...filters, reason: e.target.value as Reason })}
      className="w-full border rounded p-2 text-sm border-gray-200"
    >
      <option value="all">All</option>
      <option value="damaged">Damaged</option>
      <option value="mistaken">Mistaken</option>
      <option value="size issue">Size Issue</option>
      <option value="others">Others</option>
    </select>
  </div>
)}
 
       {/* Discount Type */}
       {showDiscountType && (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">Discount Type</label>
    <select
      value={filters.type}
      onChange={(e) => setFilters({ ...filters, type: e.target.value as DiscountType })}
      className="w-full border rounded p-2 text-sm border-gray-200"
    >
      <option value="all">All</option>
      <option value="amount">Amount Off</option>
      <option value="percentage">Percentage Off</option>
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
        className="w-39 border rounded p-2 text-sm border-gray-200" 
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
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"></span>
              <input
                type="number"
                placeholder="From"
                value={filters.priceFrom}
                onChange={(e) => setFilters({ ...filters, priceFrom: e.target.value })}
                className="w-39 border rounded p-2 text-sm pl border-gray-200"
              />
            </div>
            <div className="relative w-24">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"></span>
              <input
                type="number"
                placeholder="To"
                value={filters.priceTo}
                onChange={(e) => setFilters({ ...filters, priceTo: e.target.value })}
                className="w-39 border rounded p-2 text-sm pl-4 border-gray-200"
              />
            </div>
          </div>
        </div>
      )}

       {/* Role */}
       {showRole && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            className="w-full border rounded p-2 text-sm border-gray-200"
          >
            <option value="">Select Role</option>
            {roles.map((rol) => (
              <option key={rol} value={rol}>
                {rol}
              </option>
            ))}
          </select>
        </div>
      )}


       {/* Module*/}
       {showModule && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Module</label>
          <select
            value={filters.module}
            onChange={(e) => setFilters({ ...filters, module: e.target.value })}
            className="w-full border rounded p-2 text-sm border-gray-200"
          >
            <option value="">Select Module</option>
            {modules.map((mod) => (
              <option key={mod} value={mod}>
                {mod}
              </option>
            ))}
          </select>
        </div>
      )}


      {/* Order Status */}
      {showOrderStatus && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Order Status</label>
          <div className="flex justify-around  gap-x-2 gap-y-2">
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

      {showProductStatus && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1"> Status</label>
          <div className="flex justify-around gap-x-2 gap-y-2">
            {['All', 'Active', 'Inactive', ].map((status) => (
              <label key={status} className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="productStatus"
                  value={status}
                  checked={filters.productStatus === status}
                  onChange={() => setFilters({ ...filters, productStatus: status })}
                />
                {status}
              </label>
            ))}
          </div>
        </div>
      )}

{showDiscountStatus && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Order Status</label>
          <div className="flex justify-around gap-x-2 gap-y-2">
            {['All', 'Active', 'Inactive', 'Expired', ].map((status) => (
              <label key={status} className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="discountStatus"
                  value={status}
                  checked={filters.discountStatus === status}
                  onChange={() => setFilters({ ...filters, discountStatus: status })}
                />
                {status}
              </label>
            ))}
          </div>
        </div>
      )}


{showReturnStatus && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Return Status</label>
          <div className="flex justify-around gap-x-2 gap-y-2">
            {['All', 'Resolved', 'Pending', 'Declined', ].map((status) => (
              <label key={status} className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="returnStatus"
                  value={status}
                  checked={filters.returnStatus === status}
                  onChange={() => setFilters({ ...filters, returnStatus: status })}
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
          <label className="block text-sm font-medium mb-1">Order Status</label>
          <div className="flex justify-around  gap-x-2 gap-y-2">
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
      <div className="flex justify-between gap-3 mt-4">
        <button
          onClick={handleClear}
          className="border border-orange-500 text-orange-500 py-1 px-4 text-sm hover:bg-orange-50 rounded-lg  w-full"
        >
          Clear All
        </button>
        <button
          onClick={() => onFilterChange(filters)}
          // // onClick={() => {
          // //   console.log("Submitting filters:", filters);
          // //   onFilterChange(filters);
          // // }}
          // // onClick={() => {
          // //   const hasFilters = Object.entries(filters).some(
          // //     ([key, val]) =>
          // //       val && val !== '' && val !== 'All' && val !== 'all'
          // //   );
          
          // //   if (hasFilters) {
          // //     setFiltersApplied?.(true); // ✅ Notifies parent to show "Reset Filter"
          // //   }
          
          // //   setAppliedFilters?.(filters); // Optional if you're tracking filters
          // //   onFilterChange(filters);      // Pass current filters to parent
          // // }}
          // onClick={handleApplyFilters}
          className="bg-orange-500 text-white py-1 px-4 text-sm hover:bg-orange-600 rounded-lg  w-full"
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default ReusableFilterComponent;
