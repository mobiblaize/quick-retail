import { Text } from "@mantine/core";
import PermissionGroup from "./permissionGroup";
import { useFetchAllPermissions } from "../../../../hooks/backendApis/admin/userManagement";

interface PointOfSalesPermissionsProps {
  selectedPermissions: number[];
  setSelectedPermissions: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function PointOfSalesPermissions({
  selectedPermissions,
  setSelectedPermissions,
}: PointOfSalesPermissionsProps) {
  const { data, isLoading, error } = useFetchAllPermissions();

  const permissionsData = data?.data?.["Point of Sales"] || {};

  const togglePermission = (id: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <>
      {isLoading && <Text>Loading permissions...</Text>}
      {error && <Text color="red">Failed to load permissions</Text>}

      {!isLoading &&
        Object.entries(permissionsData).map(([groupName, permissions]) => (
          <PermissionGroup
            key={groupName}
            title={groupName}
            description={`Permissions related to ${groupName}`}
            collapsible
          >
            {(permissions as any[]).map((perm) => (
              <div
                key={perm.id}
                className="flex justify-between items-center py-2 border-b border-gray-200"
              >
                <div>
                  <p className="font-medium text-sm">{perm.display_name}</p>
                  <p className="text-xs text-gray-500">{perm.description}</p>
                </div>
                <input
                  type="checkbox"
                   className="accent-orange-500 h-4 w-4"
                  checked={selectedPermissions.includes(perm.id)}
                  onChange={() => togglePermission(perm.id)}
                />
              </div>
            ))}
          </PermissionGroup>
        ))}
    </>
  );
}

