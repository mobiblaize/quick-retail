import { Card, Text, Button } from "@mantine/core";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const NoSubCard = () => {
  return (
    <div className="flex flex-col min-h-[50vh] justify-center items-center ">
      <Card
        shadow="sm"
        radius="lg"
        p={32}
        withBorder
        className="!bg-white max-w-md w-full text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <Text fw={700} size="xl" c="#48464E">
            No Subscription Selected
          </Text>
          <Text c="#6C6975">
            Please select at least one subscription to proceed with payment.
          </Text>
          <Link to="/payment-summary">
            <Button
              color="#F56630"
              radius="xl"
              size="md"
              className="mt-4"
              rightSection={<ArrowUpRight size={16} />}
            >
              Go Back
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default NoSubCard;
