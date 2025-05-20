import { Card, Text, Group } from "@mantine/core";
//@ts-ignore
import clsx from "clsx";
import { Creditcard, MasterCard } from "../../../assets/svg";


interface CardComponentProps {
  bankName: string;
  cardHolder: string;
  expiry: string;
  cardNumber: string;
  active?: boolean;
  onClick?: () => void;
}

const CardComponent = ({
  bankName,
  cardHolder,
  expiry,
  cardNumber,
  active = false,
  onClick,
}: CardComponentProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-xl cursor-pointer transition-all duration-300 border",
        active ? "border-orange-500 shadow-md" : "border-transparent"
      )}
    >
      <Card
        shadow="sm"
        radius="md"
        padding="lg"
        className=" h-[180px] bg-gradient-to-br from-white to-gray-100 relative"
      >
        <Group justify="space-between">
          <Text fw={600}>{bankName}</Text>
          <Creditcard />
        </Group>

        <div className="mt-8 flex gap-6">
          <Text size="sm" className="tracking-widest uppercase text-gray-600">
            {cardHolder}
          </Text>
          <div className="flex items-center justify-between mt-1">
            <Text size="xs">{expiry}</Text>
          </div>
        </div>

        <div className="mt-6 flex gap-6">
          <Text size="md" className="tracking-wider">
            {cardNumber}
          </Text>
          <MasterCard />
        </div>
      </Card>
    </div>
  );
};

export default CardComponent;
