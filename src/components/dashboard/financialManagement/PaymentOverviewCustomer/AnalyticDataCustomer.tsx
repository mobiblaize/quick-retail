import { paymentOverviewCustomer } from "../../../../utils/mockData";

import AnalyticsCard from "../../../General/card";

const AnalyticDataCustomer = () => {
  return (
    <div className="flex flex-col sm:flex-row overflow-auto gap-6 md:gap-2 mt-5">
      {paymentOverviewCustomer.map((card, index) => (
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
          percentageValue={card.percentageValue}
          borderColor={card.borderColor}
          lightColor={card.lightColor}
        />
      ))}
    </div>
  );
};

export default AnalyticDataCustomer;
