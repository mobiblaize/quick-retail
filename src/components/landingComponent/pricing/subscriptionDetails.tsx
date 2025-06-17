// import { useState } from "react";
// import { Link } from "react-router";
// import { ROUTES } from "../../../constants/routes";
// import { Button } from "@mantine/core";
// import { useFetchTrialSubscriptions } from "../../../hooks/backendApis/authentication/signupAuth";

// const SubscriptionDetails = () => {
//   const [activeTabIndex, setActiveTabIndex] = useState(0);

//   const { data } = useFetchTrialSubscriptions();

//   const formatTrialPlans = (rawData: any[]) =>
//     rawData
//       .filter((item) => item.trial_period === "true")
//       .map((item) => ({
//         name: item.application.name,
//         description: item.application.description,
//         freeDays: `${item.trial_days} Days Free`,
//         userSeats: `${item.application.free_access_users} Seats`,
//         additionalSeatsCost: `₦${item.price_per_seat} per seat`,
//         additionalSeats: 0,
//       }));

//   const formatMonthlyPlans = (rawData: any[]) =>
//     rawData.map((item) => ({
//       name: item.application.name,
//       description: item.application.description,
//       price: `₦${Number(item.total_monthly_amount).toLocaleString()}`,
//       userSeats: `${item.application.free_access_users} Seats`,
//       additionalSeatsCost: `₦${item.price_per_seat} per seat`,
//       additionalSeats: 0,
//     }));

//   const formatYearlyPlans = (rawData: any[]) =>
//     rawData.map((item) => ({
//       name: item.application.name,
//       description: item.application.description,
//       price: `₦${Number(item.total_yearly_amount).toLocaleString()}`,
//       userSeats: `${item.application.free_access_users} Seats`,
//       additionalSeatsCost: `₦${item.price_per_seat} per seat`,
//       additionalSeats: 0,
//     }));

//   // const trialPlans = data?.data ? formatTrialPlans(data.data) : [];
//   const trialPlans = data?.data ? formatTrialPlans(data.data) : [];
//   const monthlyPlans = data?.data ? formatMonthlyPlans(data.data) : [];
//   const yearlyPlans = data?.data ? formatYearlyPlans(data.data) : [];

//   const subscriptionDetails = [
//     {
//       title: "Trial",
//       plans: trialPlans,
//       totalPrice: "FREE",
//     },
//     {
//       title: "Monthly",
//       plans: monthlyPlans,
//       totalPrice: "₦22,000 / Month",
//     },
//     {
//       title: "Yearly",
//       plans: yearlyPlans,
//       totalPrice: "₦220,000 / Year",
//     },
//   ];

//   return (
//     <main className="bg-white mt-4 px-4 sm:px-6 sm:mt-6 font-sans max-w-7xl p-4 w-full mx-auto rounded-xl border border-gray-200">
//       <header className="flex flex-col md:flex-row justify-between px-4 md:px-8 lg:px-0 gap-4">
//         <div>
//           <p className="font-medium text-[#48464E] text-xl">
//             Your Subscription Details
//           </p>
//         </div>
//         <div className="bg-[#F2F4F7] font-sans flex flex-row gap-2 items-center rounded-lg p-2 w-full md:w-auto">
//           {["Free trial", "Billed Monthly", "Billed Annually"].map(
//             (label, i) => (
//               <button
//                 key={i}
//                 className={`w-full sm:w-1/3 md:w-44 cursor-pointer normal-case py-3 rounded-md text-center ${
//                   activeTabIndex === i
//                     ? "bg-white shadow-md"
//                     : "shadow-none bg-inherit"
//                 }`}
//                 onClick={() => setActiveTabIndex(i)}
//               >
//                 <p
//                   className={`font-medium text-xs sm:text-sm ${
//                     activeTabIndex === i ? "text-[#344054]" : "text-[#667085]"
//                   }`}
//                 >
//                   {label}
//                 </p>
//               </button>
//             )
//           )}
//         </div>
//       </header>

//       {/* Mobile View */}
//       <section className="sm:hidden flex flex-col gap-4 p-4">
//         {subscriptionDetails[activeTabIndex].plans.map((plan, index) => (
//           <div
//             key={index}
//             className="border border-gray-200 rounded-lg p-4 bg-[#FCFCFD]"
//           >
//             <div className="flex items-start gap-2">
//               <input
//                 type="checkbox"
//                 id={`mobile-${plan.name}-${index}`}
//                 className="w-5 h-5 mt-0.5"
//                 aria-label={`Select ${plan.name}`}
//               />
//               <label
//                 htmlFor={`mobile-${plan.name}-${index}`}
//                 className="flex-1"
//               >
//                 <p className="text-[#48464E] font-semibold text-sm">
//                   {plan.name}
//                 </p>
//                 <p className="text-[#6C6975] text-xs mt-1 line-clamp-3">
//                   {plan.description.replace(/\n/g, " ")}
//                 </p>
//               </label>
//             </div>
//             <div className="mt-3 grid gap-3">
//               <div className="flex justify-between items-center">
//                 {"freeDays" in plan ? (
//                   <>
//                     <p className="text-[#6C6975] text-sm">Free Trial</p>
//                     <p className="text-[#48464E] font-medium text-base">
//                       {plan.freeDays}
//                     </p>
//                   </>
//                 ) : (
//                   <>
//                     <p className="text-[#6C6975] text-sm">Billed</p>
//                     <p className="text-[#48464E] font-medium text-base">
//                       {plan.price}
//                     </p>
//                   </>
//                 )}
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-[#6C6975] text-xs">User Seats</span>
//                 <span className="text-[#48464E] font-medium text-sm">
//                   {plan.userSeats}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-[#6C6975] text-xs">Additional Seats</span>
//                 <div className="flex gap-2 items-center">
//                   <button
//                     className="bg-[#FFF1F3] text-[#E31B54] w-10 h-10 rounded-full flex items-center justify-center text-lg"
//                     aria-label="Decrease seats"
//                   >
//                     -
//                   </button>
//                   <button
//                     className="bg-[#F9FAFB] border border-[#D0D5DD] w-10 text-[#F16722] h-10 rounded-md flex items-center justify-center text-base"
//                     aria-label="Current seats"
//                   >
//                     {plan.additionalSeats}
//                   </button>
//                   <button
//                     className="bg-[#F9FAFB] border border-[#D0D5DD] w-10 h-10 rounded-full flex items-center justify-center text-lg"
//                     aria-label="Increase seats"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-[#6C6975] text-xs">Seat Cost</span>
//                 <span className="text-[#48464E] font-medium text-sm">
//                   {plan.additionalSeatsCost}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Desktop View */}
//       <section className="hidden sm:block p-4">
//         {subscriptionDetails[activeTabIndex].plans.map((plan, index) => (
//           <div
//             key={index}
//             className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 py-6 sm:py-8 gap-4"
//           >
//             <div className="flex-1">
//               <div className="flex items-start gap-2">
//                 <input
//                   type="checkbox"
//                   id={`desktop-${plan.name}-${index}`}
//                   className="w-5 h-5 mt-0.5"
//                   aria-label={`Select ${plan.name}`}
//                 />
//                 <label
//                   htmlFor={`desktop-${plan.name}-${index}`}
//                   className="ml-2 font-semibold text-base"
//                 >
//                   {plan.name}
//                   <p className="text-sm text-[#6C6975] mt-2 font-normal whitespace-pre-line">
//                     {plan.description}
//                   </p>
//                 </label>
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row sm:gap-8 lg:gap-12 items-start">
//               <div className="flex flex-col mt-2 sm:mt-0">
//                 {"freeDays" in plan ? (
//                   <>
//                     <p className="text-[#6C6975] text-sm">Free Trial</p>
//                     <p className="text-[#48464E] font-medium text-base">
//                       {plan.freeDays}
//                     </p>
//                   </>
//                 ) : (
//                   <>
//                     <p className="text-[#6C6975] text-sm">Billed</p>
//                     <p className="text-[#48464E] font-medium text-base">
//                       {plan.price}
//                     </p>
//                   </>
//                 )}
//               </div>
//               <div className="flex flex-col mt-2 sm:mt-0">
//                 <p className="text-[#6C6975] text-sm">User Seats</p>
//                 <p className="text-[#48464E] font-medium text-base">
//                   {plan.userSeats}
//                 </p>
//               </div>
//               <div className="flex flex-col mt-2 sm:mt-0">
//                 <p className="text-[#6C6975] text-sm">Additional User Seat</p>
//                 <p className="text-[#48464E] font-medium text-base">
//                   ({plan.additionalSeatsCost})
//                 </p>
//                 <div className="flex gap-2 mt-1 items-center">
//                   <button
//                     className="bg-[#FFF1F3] text-[#E31B54] w-10 h-10 rounded-full flex items-center justify-center text-lg"
//                     aria-label="Decrease seats"
//                   >
//                     -
//                   </button>
//                   <button
//                     className="bg-[#F9FAFB] border border-[#D0D5DD] w-10 text-[#F16722] h-10 rounded-md flex items-center justify-center text-base"
//                     aria-label="Current seats"
//                   >
//                     {plan.additionalSeats}
//                   </button>
//                   <button
//                     className="bg-[#F9FAFB] border border-[#D0D5DD] w-10 h-10 rounded-full flex items-center justify-center text-lg"
//                     aria-label="Increase seats"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>

//       <section className="mt-4 p-4">
//         <div className="text-right border border-[#D0D5DD] py-6 px-4 sm:px-6 flex flex-col sm:flex-row sm:justify-between rounded-xl gap-4 sticky bottom-0 sm:static bg-[#FFF7F5]">
//           <div className="flex text-start flex-col">
//             <h1 className="text-[#48464E] font-bold text-base sm:text-lg">
//               Total Price
//             </h1>
//             <span className="text-[#6C6975] text-xs sm:text-sm">
//               Excluding V.A.T or related tax
//             </span>
//           </div>
//           <h1 className="uppercase font-bold font-sans text-[#F56630] text-base sm:text-lg">
//             {subscriptionDetails[activeTabIndex].totalPrice}
//           </h1>
//         </div>
//       </section>

//       <div className="flex justify-end">
//         <Link to={ROUTES.CONTACT}>
//           <Button variant="filled-primary">Continue</Button>
//         </Link>
//       </div>
//     </main>
//   );
// };

// export default SubscriptionDetails;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { Button } from "@mantine/core";
import { useFetchTrialSubscriptions } from "../../../hooks/backendApis/authentication/signupAuth";

type PlanType = {
  name: string;
  description: string;
  freeDays?: string;
  price?: string;
  userSeats: string;
  additionalSeatsCost: string;
  additionalSeats: number;
};

type SubscriptionItem = {
  trial_period: string;
  trial_days: number;
  price_per_seat: number;
  total_monthly_amount: number;
  total_yearly_amount: number;
  application: {
    name: string;
    description: string;
    free_access_users: number;
  };
};

type PlanTabKey = "trial" | "monthly" | "yearly";

const generateAndSaveSummary = (
  plans: Record<PlanTabKey, PlanType[]>,
  selectedPlans: Record<PlanTabKey, number[]>
) => {
  const summary: any[] = [];
  (Object.keys(selectedPlans) as PlanTabKey[]).forEach((tabKey) => {
    selectedPlans[tabKey].forEach((index) => {
      const plan = plans[tabKey][index];
      const basePrice = plan.price
        ? parseFloat(plan.price.replace(/[₦,]/g, ""))
        : 0;
      const perSeatCost = parseFloat(
        plan.additionalSeatsCost.replace(/[₦,]/g, "")
      );
      const extraSeatsCost = plan.additionalSeats * perSeatCost;
      const totalAmount = basePrice + extraSeatsCost;
      summary.push({
        label: plan.name,
        description: `${plan.userSeats} (Free) | ${plan.additionalSeats} Additional Seat`,
        amount: `₦${totalAmount.toLocaleString()}`,
      });
    });
  });
  localStorage.setItem("subscriptionSummary", JSON.stringify(summary));
};

const SubscriptionDetails = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const { data } = useFetchTrialSubscriptions();

  const [plans, setPlans] = useState({
    trial: [] as PlanType[],
    monthly: [] as PlanType[],
    yearly: [] as PlanType[],
  });

  const [selectedPlans, setSelectedPlans] = useState<
    Record<PlanTabKey, number[]>
  >({
    trial: [],
    monthly: [],
    yearly: [],
  });

  useEffect(() => {
    if (data?.data?.length) {
      const rawData = data.data;

      const formatTrialPlans = (rawData: SubscriptionItem[]): PlanType[] =>
        rawData
          .filter((item) => item.trial_period === "true")
          .map((item) => ({
            name: item.application.name,
            description: item.application.description,
            freeDays: `${item.trial_days} Days Free`,
            userSeats: `${item.application.free_access_users} Seats`,
            additionalSeatsCost: `₦${item.price_per_seat} per seat`,
            additionalSeats: 0,
          }));

      const formatMonthlyPlans = (rawData: SubscriptionItem[]): PlanType[] =>
        rawData.map((item) => ({
          name: item.application.name,
          description: item.application.description,
          price: `₦${Number(item.total_monthly_amount).toLocaleString()}`,
          userSeats: `${item.application.free_access_users} Seats`,
          additionalSeatsCost: `₦${item.price_per_seat} per seat`,
          additionalSeats: 0,
        }));

      const formatYearlyPlans = (rawData: SubscriptionItem[]): PlanType[] =>
        rawData.map((item) => ({
          name: item.application.name,
          description: item.application.description,
          price: `₦${Number(item.total_yearly_amount).toLocaleString()}`,
          userSeats: `${item.application.free_access_users} Seats`,
          additionalSeatsCost: `₦${item.price_per_seat} per seat`,
          additionalSeats: 0,
        }));

      setPlans({
        trial: formatTrialPlans(rawData),
        monthly: formatMonthlyPlans(rawData),
        yearly: formatYearlyPlans(rawData),
      });

      // Reset selection
      setSelectedPlans({
        trial: [],
        monthly: [],
        yearly: [],
      });
    }
  }, [data]);

  const handleSeatChange = (
    tabKey: keyof typeof plans,
    planIndex: number,
    increment: boolean
  ) => {
    setPlans((prev) => {
      const updatedTab = prev[tabKey].map((plan, i) => {
        if (i !== planIndex) return plan;
        const newSeats = plan.additionalSeats + (increment ? 1 : -1);
        return {
          ...plan,
          additionalSeats: Math.max(0, newSeats),
        };
      });

      const updatedPlans = {
        ...prev,
        [tabKey]: updatedTab,
      };

      // 🔥 Save updated summary
      generateAndSaveSummary(updatedPlans, selectedPlans);

      return updatedPlans;
    });
  };

  const handleCheckboxChange = (tabKey: PlanTabKey, index: number) => {
    setSelectedPlans((prev) => {
      const alreadySelected = prev[tabKey].includes(index);
      const updated = {
        ...prev,
        [tabKey]: alreadySelected
          ? prev[tabKey].filter((i) => i !== index)
          : [...prev[tabKey], index],
      };

      // 🔥 Save updated summary here
      generateAndSaveSummary(plans, updated);
      return updated;
    });
  };

  const subscriptionDetails = [
    {
      title: "Trial",
      plans: plans.trial,
      totalPrice: "FREE",
      tabKey: "trial",
    },
    {
      title: "Monthly",
      plans: plans.monthly,
      totalPrice: "₦22,000 / Month",
      tabKey: "monthly",
    },
    {
      title: "Yearly",
      plans: plans.yearly,
      totalPrice: "₦220,000 / Year",
      tabKey: "yearly",
    },
  ];

  const activeTab = subscriptionDetails[activeTabIndex];

  const calculateTotalPrice = () => {
    const plansForTab = plans[activeTab.tabKey as PlanTabKey];
    const selectedIndexes = selectedPlans[activeTab.tabKey as PlanTabKey];

    let total = 0;

    selectedIndexes.forEach((i) => {
      const plan = plansForTab[i];
      const basePrice = plan.price
        ? parseFloat(plan.price.replace(/[₦,]/g, ""))
        : 0;
      const perSeatCost = parseFloat(
        plan.additionalSeatsCost.replace(/[₦,]/g, "")
      );
      const extraSeatsCost = plan.additionalSeats * perSeatCost;

      total += basePrice + extraSeatsCost;
    });

    return total;
  };

  useEffect(() => {
    const dataToStore = {
      selectedPlans,
      plans,
      selectedType: ["trial", "monthly", "yearly"][activeTabIndex], // 👈 Add this
    };
    localStorage.setItem("subscriptionSelections", JSON.stringify(dataToStore));
  }, [selectedPlans, plans, activeTabIndex]);

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
    setPlans((prev) => ({
      trial: prev.trial.map((plan) => ({ ...plan, additionalSeats: 0 })),
      monthly: prev.monthly.map((plan) => ({ ...plan, additionalSeats: 0 })),
      yearly: prev.yearly.map((plan) => ({ ...plan, additionalSeats: 0 })),
    }));
    setSelectedPlans({
      trial: [],
      monthly: [],
      yearly: [],
    });
  };

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
                onClick={() => handleTabChange(i)}
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
        {activeTab.plans.map((plan, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-[#FCFCFD]"
          >
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={selectedPlans[
                  activeTab.tabKey as PlanTabKey
                ]?.includes(index)}
                onChange={() =>
                  handleCheckboxChange(activeTab.tabKey as PlanTabKey, index)
                }
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
                {"freeDays" in plan ? (
                  <>
                    <p className="text-[#6C6975] text-sm">Free Trial</p>
                    <p className="text-[#48464E] font-medium text-base">
                      {plan.freeDays}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[#6C6975] text-sm">Billed</p>
                    <p className="text-[#48464E] font-medium text-base">
                      {plan.price}
                    </p>
                  </>
                )}
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
                    onClick={() =>
                      handleSeatChange(activeTab.tabKey as any, index, false)
                    }
                    className="bg-[#FFF1F3] text-[#E31B54] w-10 h-10 rounded-full"
                  >
                    -
                  </button>
                  <button className="bg-[#F9FAFB] border border-[#D0D5DD] w-10 h-10 rounded-md text-[#F16722]">
                    {plan.additionalSeats}
                  </button>
                  <button
                    onClick={() =>
                      handleSeatChange(activeTab.tabKey as any, index, true)
                    }
                    className="bg-[#F9FAFB] border border-[#D0D5DD] w-10 h-10 rounded-full"
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
        {activeTab.plans.map((plan, index) => (
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
                {"freeDays" in plan ? (
                  <>
                    <p className="text-[#6C6975] text-sm">Free Trial</p>
                    <p className="text-[#48464E] font-medium text-base">
                      {plan.freeDays}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[#6C6975] text-sm">Billed</p>
                    <p className="text-[#48464E] font-medium text-base">
                      {plan.price}
                    </p>
                  </>
                )}
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
                    onClick={() =>
                      handleSeatChange(activeTab.tabKey as any, index, false)
                    }
                    className="bg-[#FFF1F3] text-[#E31B54] w-10 h-10 rounded-full"
                  >
                    -
                  </button>
                  <button className="bg-[#F9FAFB] border border-[#D0D5DD] w-10 h-10 rounded-md text-[#F16722]">
                    {plan.additionalSeats}
                  </button>
                  <button
                    onClick={() =>
                      handleSeatChange(activeTab.tabKey as any, index, true)
                    }
                    className="bg-[#F9FAFB] border border-[#D0D5DD] w-10 h-10 rounded-full"
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
            {activeTab.tabKey === "trial"
              ? "FREE"
              : `₦${calculateTotalPrice().toLocaleString()}`}
          </h1>
        </div>
      </section>

      <div className="flex justify-end mt-6">
        <Link to={ROUTES.CONTACT}>
          <Button variant="filled" color="orange">
            Continue
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default SubscriptionDetails;
