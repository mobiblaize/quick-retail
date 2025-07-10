import { useState } from "react";
import { Text, Loader } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { useFetchProfile } from "../../../hooks/backendApis/admin/profile";
import ProfileSection from "../../../components/dashboard/adminPage/settings/accountInfo";
import SecurityPage from "../../../components/dashboard/adminPage/settings/securityPage";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<"account" | "security">("account");
  const { data, isLoading, error } = useFetchProfile();

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

  const fullName = data.data.name || "";
  const [first_name = "", last_name = ""] = fullName.split(" ");

  const profileWithNames = {
    ...data.data,
    first_name,
    last_name,
  };

  const subHeaders = [
    <div key="1" className="flex items-center gap-6">
      <Text
        unstyled
        fw={500}
        size="xl"
        c="#101928"
        onClick={() => setActiveTab("account")}
      >
        Settings
      </Text>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
   {activeTab === "account" && (
  <ProfileSection
    profile={{
      ...profileWithNames,
      activeTab,
      setActiveTab,
    }}
  />
)}
{activeTab === "security" && (
  <SecurityPage
    profile={{
      ...profileWithNames,
      activeTab,
      setActiveTab,
    }}
  />
)}

    </PageContainer>
  );
};

export default SettingsPage;
