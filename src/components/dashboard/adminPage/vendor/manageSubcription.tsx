
import { useState } from "react";
import { Link } from "react-router-dom";
import CancelSubscriptionModal from "./cancelSubscription";
import changeSub from "../../../../assets/images/changeSub.png";

export default function ManageSubscription() {
  const [showCancel, setShowACancel] = useState(false);

  const actions = [
    {
      label: "Change Subscription Plan",
      icon: <img src={changeSub} alt="Settings" className="w-[18px] h-[18px]" />,
      path: "/dashboard/subscriptionPlan",
      onClick: null,
    },
    {
      label: "Subscription History",
      icon: <img src={changeSub} alt="Settings" className="w-[18px] h-[18px]" />,
      path: "/dashboard/subscriptionHistory",
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
      <h2 className="text-lg font-medium mb-4">MANAGE SUBSCRIPTION</h2>
      <p className="text-sm text-gray-500 mb-4">
        Manage your subscription plans here
      </p>
      <div className="space-y-4">
        {actions.map((action) =>
          action.path ? (
            <Link
              key={action.label}
              to={action.path}
              className="flex items-center w-full border border-gray-300 px-4 py-3 rounded hover:bg-gray-50 text-left"
            >
              <span className="mr-3 text-orange-500">{action.icon}</span>
              <span className="text-sm text-gray-800">{action.label}</span>
            </Link>
          ) : (
            <button
              key={action.label}
            //   @ts-ignore
              onClick={action.onClick}
              className="flex items-center w-full border border-gray-300 px-4 py-3 rounded hover:bg-gray-50 text-left"
            >
              <span className="mr-3 text-orange-500">{action.icon}</span>
              <span className="text-sm text-gray-800">{action.label}</span>
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
