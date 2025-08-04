import {  Text } from "@mantine/core";
import AnalyticsCard from "../../../General/card";
import orangeBox from "../../../../assets/images/orangeBox.png";
import goldBox from "../../../../assets/images/goldBox.png";
import greenBox from "../../../../assets/images/greenBox.png";

interface SalesOverviewReportProps {
  reportInfo: {
    startDate: string;
    endDate: string;
    locationId: string;
    reportData: {
      data: {
        stats: {
          total_refund_value: number;
          total_pending_complaints: number;
          total_resolved_complaints: string;
          total_declined_complaints
:string;
        };
      };
    };
  };
}

const ReturnsReportAnalytics = ({ reportInfo }: SalesOverviewReportProps) => {
  const stats = reportInfo?.reportData?.data?.stats;
 
  
  const cards = [
    {
      title: "Total Returned Value",
      value: `₦${Number(stats?.total_refund_value ?? 0).toLocaleString()}`,
      icon: orangeBox,
    iconColor: "#E17036",
    textColor: "white",
    cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
    altText: "dollar-sign",
    },
    {
      title: "Pending Complaints",
      value: stats?.total_pending_complaints ?? 0,
      icon: goldBox,
    iconColor: "#E17036",
    cardBgColor: "#FEF6E7",
    borderColor: "#98A2B3",
    altText: "orders-icon",
    },
    {
      title: "Resolved Complaints",
      value: stats?.total_resolved_complaints ?? 0,
      icon: greenBox,
      iconColor: "#E17036",
      cardBgColor: "#F0FDF9",
      borderColor: "#98A2B3",
      altText: "customer-icon",
    },
    {
      title: "COMPLAINTS DECLINED",
      value: stats?.total_declined_complaints      ?? 0,
      icon: greenBox,
      iconColor: "#E17036",
      cardBgColor: "#FBEAE9",
      borderColor: "#98A2B3",
      altText: "customer-icon",
    },
    
  ];

  return (
    <main className="w-full h-auto overflow-auto px-6 py-8 rounded-lg bg-white">
      <header className="flex justify-between items-center">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Returns overview
          </Text>
          <Text size="sm" className="text-gray-600 font-normal mb-4">An overview of returns and refunds</Text>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 overflow-auto gap-4 md:gap-2 mt-2.5">
        {cards.map((card, index) => (
          <AnalyticsCard
            key={index}
            title={card.title}
            value={card.value}
            icon={
              <div>
                <img src={card.icon} alt={card.altText} />
              </div>
            }
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

export default ReturnsReportAnalytics;
