import { useState } from "react";
import { Text } from "@mantine/core";
import ProfileHeader from "../../../components/vendor/profileHeader";
import ProfileDetails from "../../../components/vendor/vendorDetails";
import PageContainer from "../../../layout/pageContainer";
import SubscriptionPage from "../../../components/vendor/subcriptionPge";
import { useFetchProfile } from "../../../hooks/backendApis/admin/profile";

const VendorPage = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "subscription">(
    "profile"
  );
  const { data, isLoading, error } = useFetchProfile();
  if (isLoading) return <div>Loading profile...</div>;
  if (error || !data || !data.data) return <div>Loading profile.</div>;

  const subHeaders = [
    <div key="1" className="flex items-center gap-6">
      <Text
        unstyled
        fw={500}
        size="xl"
        className={`cursor-pointer border-b-2 pb-1 ${
          activeTab === "profile"
            ? "text-[#F16722] border-orange-500"
            : "text-gray-400 border-transparent"
        }`}
        onClick={() => setActiveTab("profile")}
      >
        Profile Information
      </Text>

      <Text
        unstyled
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

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Loading profile.</div>;

  return (
    <PageContainer subHeaders={subHeaders}>
      {activeTab === "profile" && (
        <>
          <ProfileHeader profile={data.data} />
          <ProfileDetails profile={data.data} />
        </>
      )}
      {activeTab === "subscription" && <SubscriptionPage />}
    </PageContainer>
  );
};

export default VendorPage;
