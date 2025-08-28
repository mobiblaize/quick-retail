import { useState } from "react";
// import { MoreVertical } from "lucide-react";
import { useToggleRoleStatus } from "../../../../hooks/useApis";
import { notifications } from "@mantine/notifications";
import { useFetchRoleUserCount } from "../../../../hooks/backendApis/admin/userManagement";
import { Text } from "@mantine/core";

interface RoleCardProps {
    initials: string;
    title: string;
    userCount: number;
    description: string;
    status: boolean;
    date: string;
    color?: string;
}

const RoleCard: React.FC<RoleCardProps & { id: string }> = ({
    id,
    // initials,
    title,
    description,
    status: initialStatus,
    date,
    color = "#F9E0D7",
}) => {
    const [status, setStatus] = useState(initialStatus);

    // Fetch all role data
    const { data: rolesData, isLoading: loadingCount } = useFetchRoleUserCount();

    // Find this role's user count
    const userCount =
        rolesData?.data?.find((role: any) => role.id === Number(id))?.users_count ?? 0;

    const toggleRoleStatusMutation = useToggleRoleStatus();
    const isLoading = toggleRoleStatusMutation.status === "pending";

    const handleToggle = () => {
        toggleRoleStatusMutation.mutate(Number(id), {
            onSuccess: (data) => {
                const newStatus = data?.data?.is_active === 1;
                setStatus(newStatus);
                notifications.show({
                    title: "Success",
                    message: data.message || "Role status updated successfully.",
                    color: "green",
                });
            },
            onError: (error: any) => {
                notifications.show({
                    title: "Error",
                    message: error?.response?.data?.message || "Failed to update status.",
                    color: "red",
                });
            },
        });
    };

    return (
        <div className="bg-[#F9F9FB] rounded-lg p-4 shadow-sm relative">
            {/* 3-dot menu */}
            {/* <div className="absolute top-3 right-3 text-gray-400 cursor-pointer">
                <MoreVertical size={18} />
            </div> */}

            {/* Badge + Title */}
            <div className="gap-3 mb-1">
                <div
                    className="w-10 h-10 border-1 border-[#E16635] rounded-full text-[#E16635] text-xs font-semibold flex items-center justify-center"
                    style={{ backgroundColor: color }}
                >
                    {title
                        .split(" ")
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()
                        .padEnd(2, title[0]?.toUpperCase())}
                </div>
            </div>

            <Text
                component="h3"
                size="lg"
                fw={700}
                c="#48464E"
                mb="xs"
            >
                {title}
            </Text>

            {/* <p className="text-[16px] text-[#908C9C] mb-2">
                User Count: <span className="font-semibold text-[#48464E]">{userCount} People</span>
            </p> */}
            <Text className="!inline" fz="16px" c="#908C9C" size="md" fw={400}>
                User Count:{" "}
                <span className="text-[#48464E]">
                {loadingCount ? "..." : `${userCount} People`}
                </span>
            </Text>

            <div className="mt-2">
                <Text fz="16px" c="#908C9C" mb="md">
                    {description}
                </Text>
            </div>


            {/* Status + Date */}
            <div className="flex justify-between items-center text-[16px] text-[#908C9C] mb-4">
                <div>
                    <Text size="md" c="#B4AFC3" mb={2}>Status:</Text>
                </div>
                <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={status}
                            onChange={handleToggle}
                            disabled={isLoading}
                        />
                        <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#F57C51] transition-all"></div>
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md transform peer-checked:translate-x-4 transition-all"></div>
                    </label>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <Text fz="16px" c="#B4AFC3">
                    Date Added:
                </Text>
                <Text c="#48464E">
                    {date}
                </Text>
            </div>
        </div>
    );
};

export default RoleCard;
