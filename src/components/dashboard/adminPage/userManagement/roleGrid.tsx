import { useFetchAllRoles } from "../../../../hooks/backendApis/admin/userManagement";
import RoleCard from "./userRole";

export default function RoleGrid() {
  const { data, isLoading, isError } = useFetchAllRoles();

  if (isLoading) return <p>Loading roles...</p>;
  if (isError || !data?.data) return <p>Failed to load roles</p>;

  const roles = data.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
      {roles.map((role: any) => (
        <RoleCard
          key={role.id}
          id={role.id}
          initials={role.display_name
            .split(" ")
            .map((word: string) => word[0])
            .join("")
            .toUpperCase()}
          title={`${role.display_name} Role`}
          userCount={Math.floor(Math.random() * 10) + 1} 
          description={role.description}
          status={true} 
          date={new Date(role.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
      ))}
    </div>
  );
}
