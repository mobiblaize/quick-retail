import UserManagementTable from "./userManagementTable";
import RoleGrid from "./roleGrid";
import UserAnalyticsOverview from "./userAnalyticsOverview";
import { Group, Text, UnstyledButton } from "@mantine/core";

type Props = {
  activeTab: "userManage" | "roleGrid";
  onTabChange: (tab: "userManage" | "roleGrid") => void;
};

const UserManagementComp = ({ activeTab, onTabChange }: Props) => {
  return (
    <div className="w-full bg-white p-8">
      {/* Tabs with border-bottom */}
      <Group gap="sm" pb="md" mb="lg" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <UnstyledButton
          onClick={() => onTabChange("userManage")}
          style={(theme) => ({
            padding: "6px 16px",
            borderRadius: theme.radius.md,
            fontWeight: 500,
            backgroundColor: activeTab === "userManage" ? theme.colors.orange[0] : "transparent",
            color: activeTab === "userManage" ? theme.colors.orange[9] : theme.colors.gray[7],
            transition: "color 150ms ease, background-color 150ms ease",
            "&:hover": {
              color: theme.colors.orange[9],
            },
          })}
        >
          <Text size="sm">User Management</Text>
        </UnstyledButton>

        <UnstyledButton
          onClick={() => onTabChange("roleGrid")}
          style={(theme) => ({
            padding: "6px 16px",
            borderRadius: theme.radius.md,
            fontWeight: 500,
            backgroundColor: activeTab === "roleGrid" ? theme.colors.orange[0] : "transparent",
            color: activeTab === "roleGrid" ? theme.colors.orange[9] : theme.colors.gray[7],
            transition: "color 150ms ease, background-color 150ms ease",
            "&:hover": {
              color: theme.colors.orange[9],
            },
          })}
        >
          <Text size="sm">User Role</Text>
        </UnstyledButton>
      </Group>

      <UserAnalyticsOverview />

      {/* Tab content */}
      {activeTab === "userManage" && <UserManagementTable />}
      {activeTab === "roleGrid" && <RoleGrid />}
    </div>
  );
};

export default UserManagementComp;
