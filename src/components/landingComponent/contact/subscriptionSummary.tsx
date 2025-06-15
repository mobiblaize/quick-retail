const SubscriptionSummary = () => {
  const summary = [
    {
      label: "Point of Sales Management System",
      description: "3 Admin Seat (Free) | 2 Additional Seat",
      amount: "₦ 10,000",
    },
    {
      label: "Finance Management System",
      description: "3 Admin Seat (Free) | 2 Additional Seat",
      amount: "₦ 10,000",
    },
    {
      label: "Customer Management System",
      description: "3 Admin Seat (Free) | 2 Additional Seat",
      amount: "₦ 10,000",
    },
    {
      label: "Report System",
      description: "3 Admin Seat (Free) | 2 Additional Seat",
      amount: "₦ 10,000",
    },
  ];

  return (
    <div className="bg-white border font-sans border-[#D0D5DD] rounded-lg p-4 sm:p-6">
      <p className="text-sm sm:text-md font-semibold tracking-wider text-[#48464E]">
        Subscription Summary
      </p>
      <div className="grid mt-2 sm:mt-3 grid-cols-1 p-2 sm:p-3 gap-4 sm:gap-6">
        {summary.map((item, index) => (
          <div key={index} className="border border-[#D0D5DD] rounded-lg p-3">
            <div className="flex justify-between items-center">
              <p className="text-[#48464E] font-semibold text-sm sm:text-md">
                {item.label}
              </p>
              <p className="text-[#F16722] font-semibold text-sm sm:text-base">
                {item.amount}
              </p>
            </div>
            <p className="text-[#6C6975] text-xs sm:text-sm">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <hr className="text-gray-200 mt-3 sm:mt-4" />
      <p className="text-[#48464E] font-semibold my-6 sm:my-8 text-lg sm:text-xl">
        Other Details
      </p>
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h2 className="text-[#48464E] font-medium text-base sm:text-xl">
              Billing Type
            </h2>
            <p className="text-[#908C9C] font-normal text-xs sm:text-sm">
              Subscription Billing Type
            </p>
          </div>
          <p className="text-[#48464E] font-medium text-sm sm:text-base">
            Monthly (1 Month)
          </p>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h2 className="text-[#48464E] font-medium text-base sm:text-xl">
              Billing Start
            </h2>
            <p className="text-[#908C9C] font-normal text-xs sm:text-sm">
              Billing Start
            </p>
          </div>
          <p className="text-[#48464E] font-medium text-sm sm:text-base">
            April 11, 2025
          </p>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h2 className="text-[#48464E] font-medium text-base sm:text-xl">
              Billing End
            </h2>
            <p className="text-[#908C9C] font-normal text-xs sm:text-sm">
              When this plan would end
            </p>
          </div>
          <p className="text-[#48464E] font-medium text-sm sm:text-base">
            May 11, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSummary;
