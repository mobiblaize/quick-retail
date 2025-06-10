const PaymentSummary = () => {
  const summary = [
    {
      label: "Number of Apps",
      description: "Three (3)",
    },
    {
      label: "Total Cost",
      description: "₦ 30,000.00",
    },
    {
      label: "VAT (7.5%)",
      description: "₦ 32,250.00",
    },
  ];

  return (
    <div className="bg-white border border-[#D0D5DD] rounded-lg p-4 sm:p-6 lg:p-8 h-fit">
      <p className="text-base sm:text-lg font-semibold tracking-wider text-[#48464E] leading-6">
        Payment Summary
      </p>

      <div className="mt-4 sm:mt-6 flex flex-col gap-4 sm:gap-6">
        {summary.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 border-b border-[#E4E7EC]"
          >
            <span className="text-sm sm:text-base text-[#48464E] font-normal">
              {item.label}
            </span>
            <span className="text-sm sm:text-base text-[#F16722] font-semibold">
              {item.description}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8">
        <h2 className="text-base sm:text-lg mb-4 font-semibold tracking-wider text-[#48464E] leading-6">
          Add Your Card
        </h2>
        <p className="font-sans text-[#48464E] text-sm sm:text-base leading-relaxed">
          You will be charged when you exceed your 60 days free trial period.
          You can choose to cancel or upgrade your plan before the free trial
          expires.
        </p>

        <div className="mt-5 sm:mt-6 flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="cardName"
              className="text-[#48464E] font-normal mb-2 text-sm sm:text-base"
            >
              Card Name <span className="text-red-500">*</span>
            </label>
            <input
              id="cardName"
              type="text"
              placeholder="Enter cardholder name"
              className="border px-3 sm:px-4 shadow-sm rounded-md py-2 sm:py-3 border-[#D0D5DD] text-sm sm:text-base focus:ring-2 focus:ring-[#F16722] focus:border-[#F16722] transition-colors"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="cardNumber"
              className="text-[#48464E] font-normal mb-2 text-sm sm:text-base"
            >
              Card Number <span className="text-red-500">*</span>
            </label>
            <input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              className="border px-3 sm:px-4 shadow-sm rounded-md py-2 sm:py-3 border-[#D0D5DD] text-sm sm:text-base focus:ring-2 focus:ring-[#F16722] focus:border-[#F16722] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="expiration"
                className="text-[#48464E] font-normal mb-2 text-sm sm:text-base"
              >
                Expiration <span className="text-red-500">*</span>
              </label>
              <input
                id="expiration"
                type="text"
                placeholder="MM/YY"
                className="border px-3 sm:px-4 shadow-sm rounded-md py-2 sm:py-3 border-[#D0D5DD] text-sm sm:text-base focus:ring-2 focus:ring-[#F16722] focus:border-[#F16722] transition-colors"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="cvv"
                className="text-[#48464E] font-normal mb-2 text-sm sm:text-base"
              >
                CVV <span className="text-red-500">*</span>
              </label>
              <input
                id="cvv"
                type="text"
                placeholder="123"
                className="border px-3 sm:px-4 shadow-sm rounded-md py-2 sm:py-3 border-[#D0D5DD] text-sm sm:text-base focus:ring-2 focus:ring-[#F16722] focus:border-[#F16722] transition-colors"
              />
            </div>
          </div>

          <button
            type="button"
            className="bg-[#F16722] hover:bg-[#E55A1A] rounded-md mt-4 py-3 sm:py-4 text-white font-sans font-semibold text-sm sm:text-base transition-colors duration-200 focus:ring-2 focus:ring-[#F16722] focus:ring-offset-2"
          >
            Pay ₦ 32,250.00
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
