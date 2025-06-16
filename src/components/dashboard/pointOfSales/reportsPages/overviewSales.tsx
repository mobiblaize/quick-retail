// components/SalesOverview.tsx
import {  Text } from "@mantine/core";
import AnalyticsCard from "../../../General/card";
import dollar from "../../../../assets/images/dollarSign.png";
import greenOrders from "../../../../assets/images/greenOrders.png";
import orangePeople from "../../../../assets/images/orangePeople.png";


interface TransactionData {
  total_sales_value: string;
  completed_orders: number;
  pending_orders?: any;
}



const SalesOverviewReport= () => { 

//   const currencySymbol = "₦";

//   const formattedValue = data?.total_sales_value
//     ? `${currencySymbol}${Number(data.total_sales_value).toLocaleString()}`
//     : `${currencySymbol}0`;

  const cards = [
    {
      title: "TOTAL SALES VALUE ",
    //   value: formattedValue,
      icon: dollar,
      iconColor: "#E17036",
      textColor: "white",
      cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
      altText: "dollar-sign",
    },
    {
      title: "TOTAL COMPLETED ORDERS",
    //   value: data?.completed_orders ?? "0",
      icon: greenOrders,
      iconColor: "#E17036",
      cardBgColor: "#E7F6EC",
      borderColor: "#98A2B3",
      altText: "orders-icon",
    },
    {
      title: "TOTAL DRAFTS (PENDING)",
    //   value: data?.pending_orders ?? "0",
      icon: orangePeople,
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
       
      </header>

      <section className="flex md:flex-row flex-col gap-4 overflow-auto gap-2 mt-2.5">
        {cards.map((card, index) => (
          <AnalyticsCard
                key={index}
                title={card.title}
                // value={card.value}
                icon={<img src={card.icon} alt={card.altText} />}
                iconColor={card.iconColor}
                textColor={card.textColor}
                cardBgColor={card.cardBgColor}
                borderColor={card.borderColor} value={""}          />
        ))}
      </section>
    </main>
  );
};

export default SalesOverviewReport;

