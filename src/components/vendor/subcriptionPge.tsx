import ManageSubscription from "./manageSubcription";
import SubscriptionComponent from "./subscriptionComponent";


export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        <SubscriptionComponent />
        <ManageSubscription />
      </div>
    </div>
  );
}
