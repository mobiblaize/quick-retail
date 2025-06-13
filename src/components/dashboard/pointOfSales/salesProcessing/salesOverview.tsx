// import { Group, Text } from "@mantine/core";
// import AnalyticsCard from "../../../General/card";
// import dollar from "../../../../assets/images/dollarSign.png";
// import orders from "../../../../assets/images/orders.png";
// import DateFilterMenu from "../../../General/filterMenu";
// import { useState } from "react";

// interface TransactionData {
//   total_sales_value: string;
//   completed_orders: number;
//   pending_orders?: any;
// }

// interface TransactionOverviewProps {
//   data: TransactionData;
//   isLoading: boolean;
// }

// const SalesOverview: React.FC<TransactionOverviewProps> = ({
//   data,
//   // isLoading,
// }) => {
//   const currencySymbol = "₦";

//   const formattedValue = data?.total_sales_value
//     ? `${currencySymbol}${Number(data.total_sales_value).toLocaleString()}`
//     : `${currencySymbol}0`;

//   const cards = [
//     {
//       title: "TOTAL SALES VALUE ",
//       value: formattedValue,
//       icon: dollar,
//       iconColor: "#E17036",
//       textColor: "white",
//       cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
//       // percentageValue: 0,
//       altText: "dollar-sign",
//     },

//     {
//       title: "TOTAL COMPLETED ORDERS",
//       value: data?.completed_orders ?? "0",
//       icon: orders,
//       iconColor: "#E17036",
//       cardBgColor: "#E7F6EC",
//       // percentageValue: 0,
//       borderColor: "#98A2B3",
//       altText: "orders-icon",
//     },
//     {
//       title: "TOTAL DRAFTS (PENDING)",
//       value: data?.pending_orders ?? "0",
//       icon: orders,
//       iconColor: "#E17036",
//       cardBgColor: "#FEF6E7",
//       // percentageValue: 0,
//       borderColor: "#98A2B3",
//       altText: "orders-icon",
//     },
//   ];
//   return (
//     <main className="w-full h-auto overflow-auto px-6 py-8 rounded-lg bg-white">
//       <header className="flex justify-between items-center">
//         <div className="flex flex-col">
//           <Text size="xl" fw={600} c="textSecondary.9">
//             Transaction overview
//           </Text>
//           <Text size="sm">An overview of transaction of sales</Text>
//         </div>
//         <Group>
//           <DateFilterMenu
//             //@ts-ignore
//             defaultFilter="This Month"
//             buttonVariant="subtle"
//             buttonSize="md"
//             showIconOnly="sm"
//             onDateFilterChange={({ startDate, endDate }) =>
//               setDateRange({
//                 //@ts-ignore
//                 start_date: startDate.toISOString().split("T")[0],
//                 //@ts-ignore
//                 end_date: endDate.toISOString().split("T")[0],
//               })
//             }
//           />
//         </Group>
//       </header>
//       <section className="flex md:flex-row flex-col gap-4 overflow-auto gap-2 mt-2.5">
//         {cards.map((card, index) => (
//           <AnalyticsCard
//             key={index}
//             title={card.title}
//             value={card.value}
//             icon={
//               <div>
//                 <img src={card.icon} alt={card.altText} />
//               </div>
//             }
//             iconColor={card.iconColor}
//             textColor={card.textColor}
//             cardBgColor={card.cardBgColor}
//             // percentageValue={card.percentageValue}
//             borderColor={card.borderColor}
//           />
//         ))}
//       </section>
//     </main>
//   );
// };

// export default SalesOverview;

// components/SalesOverview.tsx
import { Group, Text } from "@mantine/core";
import AnalyticsCard from "../../../General/card";
import dollar from "../../../../assets/images/dollarSign.png";
import orders from "../../../../assets/images/orders.png";
import DateFilterMenu from "../../../General/filterMenu";

interface TransactionData {
  total_sales_value: string;
  completed_orders: number;
  pending_orders?: any;
}

interface TransactionOverviewProps {
  data: TransactionData;
  isLoading: boolean;
  setDateRange: (range: { startDate: string; endDate: string }) => void;
}

const SalesOverview: React.FC<TransactionOverviewProps> = ({
  data,
  setDateRange,
}) => {
  const currencySymbol = "₦";

  const formattedValue = data?.total_sales_value
    ? `${currencySymbol}${Number(data.total_sales_value).toLocaleString()}`
    : `${currencySymbol}0`;

  const cards = [
    {
      title: "TOTAL SALES VALUE ",
      value: formattedValue,
      icon: dollar,
      iconColor: "#E17036",
      textColor: "white",
      cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
      altText: "dollar-sign",
    },
    {
      title: "TOTAL COMPLETED ORDERS",
      value: data?.completed_orders ?? "0",
      icon: orders,
      iconColor: "#E17036",
      cardBgColor: "#E7F6EC",
      borderColor: "#98A2B3",
      altText: "orders-icon",
    },
    {
      title: "TOTAL DRAFTS (PENDING)",
      value: data?.pending_orders ?? "0",
      icon: orders,
      iconColor: "#E17036",
      cardBgColor: "#FEF6E7",
      borderColor: "#98A2B3",
      altText: "orders-icon",
    },
  ];

  return (
    <main className="w-full h-auto overflow-auto px-6 py-8 rounded-lg bg-white">
      <header className="flex justify-between items-center">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
         Sales overview
          </Text>
          <Text size="sm">This is an overview summarizing sales</Text>
        </div>
        <Group>
          <DateFilterMenu
            onDateFilterChange={({ startDate, endDate }) =>
              setDateRange({
                startDate: startDate?.toISOString().split("T")[0] || "",
                endDate: endDate?.toISOString().split("T")[0] || "",
              })
            }
          />
        </Group>
      </header>

      <section className="flex md:flex-row flex-col gap-4 overflow-auto gap-2 mt-2.5">
        {cards.map((card, index) => (
          <AnalyticsCard
            key={index}
            title={card.title}
            value={card.value}
            icon={<img src={card.icon} alt={card.altText} />}
            iconColor={card.iconColor}
            textColor={card.textColor}
            cardBgColor={card.cardBgColor}
            borderColor={card.borderColor}
          />
        ))}
      </section>
    </main>
  );
};

export default SalesOverview;

