import { Info } from "lucide-react";
import { useState } from "react";
import PermissionsTab from "./permissionTab";
import PointOfSalesPermissions from "./pointofSalesPermision";
import { Flex, Text, ThemeIcon } from "@mantine/core";

interface PermissionsPanelProps {
  selectedPermissions: number[];
  setSelectedPermissions: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function PermissionsPanel({
  selectedPermissions,
  setSelectedPermissions,
}: PermissionsPanelProps) {
  const [activeTab, setActiveTab] = useState("Point of Sales");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Point of Sales":
        return (
          <PointOfSalesPermissions
            selectedPermissions={selectedPermissions}
            setSelectedPermissions={setSelectedPermissions}
          />
        );

      // Add other modules below when ready:
      // case "Finance Management":
      //   return <FinancePermissions />;
      // case "Procurement":
      //   return <ProcurementPermissions />;
      // case "Asset Management":
      //   return <AssetPermissions />;
      // case "Reports":
      //   return <ReportsPermissions />;

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <PermissionsTab active={activeTab} onChange={setActiveTab} />

      {activeTab === "Point of Sales" && (
        <Flex mt="md" align="flex-start" gap="xs">
          <ThemeIcon variant="light" color="blue" size={24} radius="xl">
            <Info size={16} />
          </ThemeIcon>
          <Text size="sm" color="dark.7">
            Features with heavy and important data should be restricted to administrative roles
          </Text>
        </Flex>
      )}

      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
}
