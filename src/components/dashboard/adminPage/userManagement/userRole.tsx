import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { useToggleRoleStatus } from "../../../../hooks/useApis";
import { notifications } from "@mantine/notifications";

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
    initials,
    title,
    userCount,
    description,
    status: initialStatus,
    date,
    color = "#F9E0D7",
}) => {
    const [status, setStatus] = useState(initialStatus);

    const toggleRoleStatusMutation = useToggleRoleStatus();
    const isLoading = toggleRoleStatusMutation.status === "pending";

    const handleToggle = () => {
        toggleRoleStatusMutation.mutate(Number(id), {
            onSuccess: (data) => {
                const newStatus = data?.data?.is_active === 1;
                setStatus(newStatus); // ✅ update local state
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
            <div className="absolute top-3 right-3 text-gray-400 cursor-pointer">
                <MoreVertical size={18} />
            </div>

            {/* Badge + Title */}
            <div className="gap-3 mb-1">
                <div
                    className="w-10 h-10 border-1 border-[#E16635] rounded-full text-[#E16635] text-xs font-semibold flex items-center justify-center"
                    style={{ backgroundColor: color }}
                >
                    {initials}
                </div>
            </div>

            <h3 className="text-sm font-semibold text-[#48464E] mb-2">{title}</h3>

            <p className="text-[16px] text-[#908C9C] mb-2">
                User Count: <span className="font-semibold text-[#48464E]">{userCount} People</span>
            </p>

            <p className="text-[16px] text-[#908C9C] mb-4">{description}</p>

            {/* Status + Date */}
            <div className="flex justify-between items-center text-[16px] text-[#908C9C] mb-4">
                <div>
                    <p>Status:</p>
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
                <p className="text-[16px] text-[#908C9C]">Date Added:</p>
                <p className="text-[#48464E]">{date}</p>
            </div>
        </div>
    );
};

export default RoleCard;
