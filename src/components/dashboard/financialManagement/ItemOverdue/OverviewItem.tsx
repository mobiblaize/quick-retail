import PaymentTable from "../ReuseablePaymentTable";

const mockOutstanding = [
  { name: "Customer 1", amount: "₦ 31,000" },
  { name: "Customer 2", amount: "₦ 31,000" },
  { name: "Customer 3", amount: "₦ 31,000" },
  { name: "Customer 4", amount: "₦ 31,000" },
  { name: "Customer 5", amount: "₦ 31,000" },
];

const mockReceivable = [
  { name: "Item Name", amount: "₦ 31,000" },
  { name: "Item Name", amount: "₦ 31,000" },
  { name: "Item Name", amount: "₦ 31,000" },
  { name: "Item Name", amount: "₦ 31,000" },
  { name: "Item Name", amount: "₦ 31,000" },
];

const ItemPaymentOverview = () => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-8 mt-[1.5em]">
      <div className="flex-1 min-w-[300px] max-w-full">
        <PaymentTable
          title="Warehouse List"
          name="Name"
          amount="Total Item"
          data={mockOutstanding}
        />
      </div>
      <div className="flex-1 min-w-[300px] max-w-full">
        <PaymentTable
          title="Top Selling Item"
          data={mockReceivable}
          name="Name"
          amount="Total Value Sold"
        />
      </div>
    </div>
  );
};

export default ItemPaymentOverview;
