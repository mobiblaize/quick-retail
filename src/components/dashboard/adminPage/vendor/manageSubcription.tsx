
import { useState } from "react";
import { Link } from "react-router-dom";
import CancelSubscriptionModal from "./cancelSubscription";
import changeSub from "../../../../assets/images/changeSub.png";
import { Flex, Text } from "@mantine/core";

export default function ManageSubscription() {
  const [showCancel, setShowACancel] = useState(false);

  const actions = [
    {
      label: "Change Subscription Plan",
      icon: <img src={changeSub} alt="Settings" className="w-[18px] h-[18px]" />,
      path: "/dashboard/subscription-plan",
      onClick: null,
    },
    {
      label: "Subscription History",
      icon: <img src={changeSub} alt="Settings" className="w-[18px] h-[18px]" />,
      path: "/dashboard/subscription-history",
      onClick: null,
    },
    {
      label: "Cancel Subscription",
      icon: <img src={changeSub} alt="Settings" className="w-[18px] h-[18px]" />,
      path: null,
      onClick: () => setShowACancel(true),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full lg:w-1/2">
      <div className="mb-4">
        <Text size="lg" fw={600} c="secondary.9">MANAGE SUBSCRIPTION</Text>
      </div>

      <div className="mb-4">
        <Text size="sm" fw={600} c="secondary.9">Manage your subscription plans here</Text>
      </div>

      <div className="space-y-4">
        {actions.map((action) =>
          action.path ? (
            <Link
              key={action.label}
              to={action.path}
              className="flex items-center w-full border border-gray-300 px-4 py-3 rounded hover:bg-gray-50 text-left"
            >
              {/* <span className="mr-3 text-orange-500">{action.icon}</span>
              <span className="text-sm text-gray-800">{action.label}</span> */}
              <Flex align="center">
                <Text c="#F97316" mr={12}>
                  {action.icon}
                </Text>
                <Text size="sm" c="#1F2937">
                  {action.label}
                </Text>
              </Flex>
            </Link>
          ) : (
            <button
              key={action.label}
              //   @ts-ignore
              onClick={action.onClick}
              className="flex items-center w-full border border-gray-300 px-4 py-3 rounded hover:bg-gray-50 text-left"
            >
              <Text mr="sm" c="orange.5">
                {action.icon}
              </Text>
              <Text size="sm" c="gray.8">
                {action.label}
              </Text>
            </button>
          )
        )}
      </div>

      {showCancel && (
        <CancelSubscriptionModal
          opened={showCancel}
          onClose={() => setShowACancel(false)}
        />
      )}
    </div>
  );
}
