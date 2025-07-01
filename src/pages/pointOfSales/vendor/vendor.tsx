import { useState } from "react";
import { Text } from "@mantine/core";
import ProfileHeader from "../../../components/vendor/profileHeader";
import ProfileDetails from "../../../components/vendor/vendorDetails";
import PageContainer from "../../../layout/pageContainer";
import SubscriptionPage from "../../../components/vendor/subcriptionPge";

const VendorPage = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "subscription">("profile");

  const subHeaders = [
    <div key="1" className="flex items-center gap-6">
      <Text
        fw={500}
        size="xl"
        className={`cursor-pointer border-b-2 pb-1 ${
          activeTab === "profile"
            ? "text-orange-500 border-orange-500"
            : "text-gray-400 border-transparent"
        }`}
        onClick={() => setActiveTab("profile")}
      >
        Profile Information
      </Text>
      <Text
        fw={500}
        size="xl"
        className={`cursor-pointer border-b-2 pb-1 ${
          activeTab === "subscription"
            ? "text-orange-500 border-orange-500"
            : "text-gray-400 border-transparent"
        }`}
        onClick={() => setActiveTab("subscription")}
      >
        Subscription
      </Text>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      {activeTab === "profile" && <ProfileHeader />}
      {activeTab === "profile" ? <ProfileDetails /> : <SubscriptionPage />}
    </PageContainer>
  );
};

export default VendorPage;
