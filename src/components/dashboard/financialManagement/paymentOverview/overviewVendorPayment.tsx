import PaymentTable from "../ReuseablePaymentTable";

const mockOutstanding = [
  { name: "Customer 1", amount: "₦ 31,000" },
  { name: "Customer 2", amount: "₦ 31,000" },
  { name: "Customer 3", amount: "₦ 31,000" },
  { name: "Customer 4", amount: "₦ 31,000" },
  { name: "Customer 5", amount: "₦ 31,000" },
];

const mockReceivable = [
  { name: "Customer 1", amount: "₦ 31,000" },
  { name: "Customer 2", amount: "₦ 31,000" },
  { name: "Customer 3", amount: "₦ 31,000" },
  { name: "Customer 4", amount: "₦ 31,000" },
  { name: "Customer 5", amount: "₦ 31,000" },
];

const VendorPaymentOverview = () => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-8 mt-[1.5em]">
      <div className="flex-1 min-w-[300px] max-w-full">
        <PaymentTable
          title="Top 5 Unpaid Vendors"
          data={mockOutstanding}
          name="Name"
          amount="Amount Due"
        />
      </div>
      <div className="flex-1 min-w-[300px] max-w-full">
        <PaymentTable
          title="Top 5 Overdue Payment"
          data={mockReceivable}
          name="Name"
          amount="Amount Due"
        />
      </div>
    </div>
  );
};

export default VendorPaymentOverview;
