import { useState } from "react";
import { Text, Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import ProfileHeader from "../../../components/dashboard/adminPage/vendor/profileHeader";
import ProfileDetails from "../../../components/dashboard/adminPage/vendor/vendorDetails";
import PageContainer from "../../../layout/pageContainer";
import SubscriptionPage from "../../../components/dashboard/adminPage/vendor/subcriptionPge";
import { useFetchProfile, useUpdateProfile } from "../../../hooks/backendApis/admin/profile";

const VendorPage = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "subscription">(
    "profile"
  );
  const { data, isLoading, error, refetch } = useFetchProfile();
  const { mutate: updateProfile } = useUpdateProfile();

  const handleSave = (updatedData: { firstName: string; lastName: string }) => {
    updateProfile(
      {
        firstname: updatedData.firstName,
        lastname: updatedData.lastName,
      },
      {
        onSuccess: () => {
          showNotification({
            title: "Profile Updated",
            message: "Your profile has been updated successfully.",
            color: "green",
          });
          refetch(); // Refetch profile data after save
        },
        onError: (err) => {
          console.error("Error updating profile:", err);
        },
      }
    );
  };

  // ✅ Centralized loader
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader color="orange" size="lg" />
      </div>
    );
  }

  if (error || !data || !data.data) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader color="orange" size="lg" />
      </div>
    );
  }

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

      {/* <Text
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
      </Text> */}
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      {activeTab === "profile" && (
        <>
          <ProfileHeader profile={data.data} onSave={handleSave} />
          <ProfileDetails profile={data.data}  />
        </>
      )}
      {activeTab === "subscription" && <SubscriptionPage />}
    </PageContainer>
  );
};

export default VendorPage;
