
import { paymentOverviewVendor } from "../../../../utils/mockData";
import AnalyticsCard from "../../../General/card";

const AnalyticDataVendor = () => {
  return (
    <div className="flex flex-col sm:flex-row overflow-auto gap-6 md:gap-2 mt-5">
      {paymentOverviewVendor.map((card, index) => (
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

export default AnalyticDataVendor;
