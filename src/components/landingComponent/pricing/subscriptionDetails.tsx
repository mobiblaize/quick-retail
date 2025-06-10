import { useState } from "react";
import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";
import { Button } from "@mantine/core";

const SubscriptionDetails = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const subscriptionDetails = [
    {
      // Free Trial
      plans: [
        {
          name: "Point of Sales Management System",
          description:
            "Manage sales transactions, Inventory tracking,\nCustomer engagement,and reporting analytics with \ninstant updates.",
          freeDays: "60 Days Free",
          userSeats: "2 Seats",
          additionalSeatsCost: "N 2500 per seat",
          additionalSeats: 0,
        },
        {
          name: "Finance Management System",
          description:
            "Manage, evaluate, and control your business finance \non the finance management system.",
          freeDays: "60 Days Free",
          userSeats: "2 Seats",
          additionalSeatsCost: "N 2500 per seat",
          additionalSeats: 0,
        },
        {
          name: "Procurement Management",
          description:
            "Track inventory and product restocking on \nthe procurement system.",
          freeDays: "60 Days Free",
          userSeats: "2 Seats",
          additionalSeatsCost: "N 2500 per seat",
          additionalSeats: 0,
        },
        {
          name: "Asset Management",
          description:
            "Track inventory and product restocking on the procurement system.",
          freeDays: "60 Days Free",
          userSeats: "2 Seats",
          additionalSeatsCost: "N 2500 per seat",
          additionalSeats: 0,
        },
      ],
      totalPrice: "FREE",
    },
    {
      // Billed Monthly
      plans: [
        {
          name: "Point of Sales Management System",
          description:
            "Manage sales transactions, Inventory tracking,\nCustomer engagement,and reporting analytics with \ninstant updates.",
          freeDays: "₦7,000 / Month",
          userSeats: "2 Seats",
          additionalSeatsCost: "₦2,500 per seat",
          additionalSeats: 0,
        },
        {
          name: "Finance Management System",
          description:
            "Manage, evaluate, and control your business finance \non the finance management system.",
          freeDays: "₦6,000 / Month",
          userSeats: "2 Seats",
          additionalSeatsCost: "₦2,500 per seat",
          additionalSeats: 0,
        },
        {
          name: "Procurement Management",
          description:
            "Track inventory and product restocking on \nthe procurement system.",
          freeDays: "₦5,000 / Month",
          userSeats: "2 Seats",
          additionalSeatsCost: "₦2,500 per seat",
          additionalSeats: 0,
        },
        {
          name: "Asset Management",
          description:
            "Track inventory and product restocking on the procurement system.",
          freeDays: "₦4,000 / Month",
          userSeats: "2 Seats",
          additionalSeatsCost: "₦2,500 per seat",
          additionalSeats: 0,
        },
      ],
      totalPrice: "₦22,000 / Month",
    },
    {
      // Billed Annually
      plans: [
        {
          name: "Point of Sales Management System",
          description:
            "Manage sales transactions, Inventory tracking,\nCustomer engagement,and reporting analytics with \ninstant updates.",
          freeDays: "₦70,000 / Year",
          userSeats: "2 Seats",
          additionalSeatsCost: "₦2,000 per seat",
          additionalSeats: 0,
        },
        {
          name: "Finance Management System",
          description:
            "Manage, evaluate, and control your business finance \non the finance management system.",
          freeDays: "₦60,000 / Year",
          userSeats: "2 Seats",
          additionalSeatsCost: "₦2,000 per seat",
          additionalSeats: 0,
        },
        {
          name: "Procurement Management",
          description:
            "Track inventory and product restocking on \nthe procurement system.",
          freeDays: "₦50,000 / Year",
          userSeats: "2 Seats",
          additionalSeatsCost: "₦2,000 per seat",
          additionalSeats: 0,
        },
        {
          name: "Asset Management",
          description:
            "Track inventory and product restocking on the procurement system.",
          freeDays: "₦40,000 / Year",
          userSeats: "2 Seats",
          additionalSeatsCost: "₦2,000 per seat",
          additionalSeats: 0,
        },
      ],
      totalPrice: "₦220,000 / Year",
    },
  ];

  return (
    <main className="bg-white mt-4 px-4 sm:px-6 sm:mt-6 font-sans max-w-7xl p-4 w-full mx-auto rounded-xl border border-gray-200">
      <header className="flex flex-col md:flex-row justify-between px-4 md:px-8 lg:px-0 gap-4">
        <div>
          <p className="font-medium text-[#48464E] text-xl">
            Your Subscription Details
          </p>
        </div>
        <div className="bg-[#F2F4F7] font-sans flex flex-row gap-2 items-center rounded-lg p-2 w-full md:w-auto">
          {["Free trial", "Billed Monthly", "Billed Annually"].map(
            (label, i) => (
              <button
                key={i}
                className={`w-full sm:w-1/3 md:w-44 cursor-pointer normal-case py-3 rounded-md text-center ${
                  activeTabIndex === i
                    ? "bg-white shadow-md"
                    : "shadow-none bg-inherit"
                }`}
                onClick={() => setActiveTabIndex(i)}
              >
                <p
                  className={`font-medium text-xs sm:text-sm ${
                    activeTabIndex === i ? "text-[#344054]" : "text-[#667085]"
                  }`}
                >
                  {label}
                </p>
              </button>
            )
          )}
        </div>
      </header>

      {/* Mobile View */}
      <section className="sm:hidden flex flex-col gap-4 p-4">
        {subscriptionDetails[activeTabIndex].plans.map((plan, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-[#FCFCFD]"
          >
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id={`mobile-${plan.name}-${index}`}
                className="w-5 h-5 mt-0.5"
                aria-label={`Select ${plan.name}`}
              />
              <label
                htmlFor={`mobile-${plan.name}-${index}`}
                className="flex-1"
              >
                <p className="text-[#48464E] font-semibold text-sm">
                  {plan.name}
                </p>
                <p className="text-[#6C6975] text-xs mt-1 line-clamp-3">
                  {plan.description.replace(/\n/g, " ")}
                </p>
              </label>
            </div>
            <div className="mt-3 grid gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[#6C6975] text-xs">Billing</span>
                <span className="text-[#48464E] font-medium text-sm">
                  {plan.freeDays}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6C6975] text-xs">User Seats</span>
                <span className="text-[#48464E] font-medium text-sm">
                  {plan.userSeats}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6C6975] text-xs">Additional Seats</span>
                <div className="flex gap-2 items-center">
                  <button
                    className="bg-[#FFF1F3] text-[#E31B54] w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    aria-label="Decrease seats"
                  >
                    -
                  </button>
                  <button
                    className="bg-[#F9FAFB] border border-[#D0D5DD] w-10 text-[#F16722] h-10 rounded-md flex items-center justify-center text-base"
                    aria-label="Current seats"
                  >
                    {plan.additionalSeats}
                  </button>
                  <button
                    className="bg-[#F9FAFB] border border-[#D0D5DD] w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    aria-label="Increase seats"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6C6975] text-xs">Seat Cost</span>
                <span className="text-[#48464E] font-medium text-sm">
                  {plan.additionalSeatsCost}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Desktop View */}
      <section className="hidden sm:block p-4">
        {subscriptionDetails[activeTabIndex].plans.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 py-6 sm:py-8 gap-4"
          >
            <div className="flex-1">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id={`desktop-${plan.name}-${index}`}
                  className="w-5 h-5 mt-0.5"
                  aria-label={`Select ${plan.name}`}
                />
                <label
                  htmlFor={`desktop-${plan.name}-${index}`}
                  className="ml-2 font-semibold text-base"
                >
                  {plan.name}
                  <p className="text-sm text-[#6C6975] mt-2 font-normal whitespace-pre-line">
                    {plan.description}
                  </p>
                </label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-8 lg:gap-12 items-start">
              <div className="flex flex-col mt-2 sm:mt-0">
                <p className="text-[#6C6975] text-sm">Billed/Month</p>
                <p className="text-[#48464E] font-medium text-base">
                  {plan.freeDays}
                </p>
              </div>
              <div className="flex flex-col mt-2 sm:mt-0">
                <p className="text-[#6C6975] text-sm">User Seats</p>
                <p className="text-[#48464E] font-medium text-base">
                  {plan.userSeats}
                </p>
              </div>
              <div className="flex flex-col mt-2 sm:mt-0">
                <p className="text-[#6C6975] text-sm">Additional User Seat</p>
                <p className="text-[#48464E] font-medium text-base">
                  ({plan.additionalSeatsCost})
                </p>
                <div className="flex gap-2 mt-1 items-center">
                  <button
                    className="bg-[#FFF1F3] text-[#E31B54] w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    aria-label="Decrease seats"
                  >
                    -
                  </button>
                  <button
                    className="bg-[#F9FAFB] border border-[#D0D5DD] w-10 text-[#F16722] h-10 rounded-md flex items-center justify-center text-base"
                    aria-label="Current seats"
                  >
                    {plan.additionalSeats}
                  </button>
                  <button
                    className="bg-[#F9FAFB] border border-[#D0D5DD] w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    aria-label="Increase seats"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-4 p-4">
        <div className="text-right border border-[#D0D5DD] py-6 px-4 sm:px-6 flex flex-col sm:flex-row sm:justify-between rounded-xl gap-4 sticky bottom-0 sm:static bg-[#FFF7F5]">
          <div className="flex text-start flex-col">
            <h1 className="text-[#48464E] font-bold text-base sm:text-lg">
              Total Price
            </h1>
            <span className="text-[#6C6975] text-xs sm:text-sm">
              Excluding V.A.T or related tax
            </span>
          </div>
          <h1 className="uppercase font-bold font-sans text-[#F56630] text-base sm:text-lg">
            {subscriptionDetails[activeTabIndex].totalPrice}
          </h1>
        </div>
      </section>

      <div className="flex justify-end">
        <Link to={ROUTES.CONTACT}>
          <Button variant="filled-primary">Continue</Button>
        </Link>
      </div>
    </main>
  );
};

export default SubscriptionDetails;
