
import { paymentOverviewItem} from "../../../../utils/mockData";
import DateFilterMenu from "../../../General/filterMenu";
import { Group, } from "@mantine/core";
import ItemAnalyticsCard from "../../../General/itemCard";

const ItemAnalysis = () => {
  return (
    <div className="bg-white p-[2em] rounded-t-lg">
          <div className="flex justify-between ">
 <div className="text-[#101828] font-medium mt-[0.5em]">Item Overview</div>
 <div>
 <Group className="mt-2 sm:mt-0">
          <DateFilterMenu
            defaultFilter="This Month"
            buttonVariant="subtle"
            buttonSize="md"
             showIconOnly="sm"
          />
        </Group> 
 </div>
    </div>
   
    <div className="flex flex-col sm:flex-row overflow-auto gap-6 md:gap-2">
      {paymentOverviewItem.map((card, index) => (
        <ItemAnalyticsCard
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
    </div>
  );
};

export default ItemAnalysis