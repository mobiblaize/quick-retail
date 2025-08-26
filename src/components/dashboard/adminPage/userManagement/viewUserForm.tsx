import { useParams } from "react-router-dom";
import FormInput from "../../../General/formInput";
import {  UserIcon } from "lucide-react";
import { useFetchSingleUser } from "../../../../hooks/backendApis/admin/userManagement";
import { useEffect } from "react";
import { Badge, Box, Group, Paper, SimpleGrid, Text, ThemeIcon } from "@mantine/core";

const ViewUserForm = ({ setUser }: { setUser: (user: any) => void }) => {
    const { userId } = useParams();
    const { data, isLoading, isError } = useFetchSingleUser(userId || "");

    const user = data?.data;

    useEffect(() => {
        if (user) {
            setUser(user);
        }
    }, [user, setUser]);

    if (isLoading) return <p>Loading user...</p>;
    if (isError || !user) return <p>No user found</p>;

    return (
        <div>
            <div className="md:grid-cols-3 gap-8">
                {/* Left side */}
                <div className="md:col-span-2 space-y-8 w-full">
                   <Paper bg="white" radius="xl" p="xl" shadow="md" w="100%">
  {/* Profile Details (p-4) */}
  <Box p="md">
    {/* Row: icon + content (flex items-center gap-3 mb-4) */}
    <Group align="center" gap={12} mb={16}>
      {/* Icon circle (w-20 h-20, bg-gray-100, text-gray-600, p-2, border-2 #FA9874, rounded-full) */}
      <ThemeIcon
        size={80}
        radius="xl"
        variant="light"
        color="gray"
        style={{ backgroundColor: "#F3F4F6", border: "2px solid #FA9874" }}
      >
        <UserIcon size={56} color="#4B5563" />
      </ThemeIcon>

      {/* Right side */}
      <div>
        {/* Pills row (gap-3 mb-2) */}
        <Group gap={12} mb={8} align="center">
          {/* UUID pill (#FFECE5 / #AD3307) */}
          <Badge
            size="xs"
            radius="xl"
            styles={{
              root: {
                backgroundColor: "#FFECE5",
                color: "#AD3307",
                fontWeight: 500,
              },
            }}
          >
            #{user.user_uuid}
          </Badge>

          {/* Status pill: active -> green, pending -> orange, else gray */}
          {(() => {
            const status = user.status?.toLowerCase();
            const statusLabel = user.status
              ? user.status.charAt(0).toUpperCase() + user.status.slice(1).toLowerCase()
              : "—";

            const styleMap: Record<string, { bg: string; color: string }> = {
              active:  { bg: "#DCFCE7", color: "#16A34A" }, // green-100 / green-600
              pending: { bg: "#FFECE5", color: "#AD3307" }, // same as uuid pill
              default: { bg: "#F3F4F6", color: "#4B5563" }, // gray-100 / gray-600
            };

            const { bg, color } =
              status === "active"
                ? styleMap.active
                : status === "pending"
                ? styleMap.pending
                : styleMap.default;

            return (
              <Badge
                size="xs"
                radius="xl"
                styles={{
                  root: {
                    backgroundColor: bg,
                    color,
                    fontWeight: 500,
                  },
                }}
              >
                {statusLabel}
              </Badge>
            );
          })()}
        </Group>

        {/* Name (text-base font-medium text-gray-800) */}
        <Text fz="md" fw={500} c="gray.8">
          {user.firstname} {user.lastname}
        </Text>

        {/* Email (text-sm #667085) */}
        <Text fz="sm" c="#667085">
          {user.email}
        </Text>
      </div>
    </Group>
  </Box>
</Paper>

                    {/* Details Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <Text
                            size="lg"
                            fw={600}
                            c="gray.9"
                            mb="md"
                            style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}
                        >
                            USER DETAILS
                        </Text>

                       <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
  <div>
    <Text size="sm" fw={500} c="gray.7" mb={4}>
      First Name
    </Text>
    <FormInput type="text" value={user.firstname} paddingY="0.7rem" />
  </div>

  <div>
    <Text size="sm" fw={500} c="gray.7" mb={4}>
      Last Name
    </Text>
    <FormInput type="text" value={user.lastname} paddingY="0.7rem" />
  </div>

  <div>
    <Text size="sm" fw={500} c="gray.7" mb={4}>
      Email
    </Text>
    <FormInput type="email" value={user.email} paddingY="0.7rem" />
  </div>

  <div>
    <Text size="sm" fw={500} c="gray.7" mb={4}>
      Phone Number
    </Text>
    <FormInput type="number" value={user.phone_number || ""} paddingY="0.7rem" />
  </div>

  <div>
    <Text size="sm" fw={500} c="gray.7" mb={4}>
      Role
    </Text>
    <FormInput type="text" value={user.roles?.[0]?.name || "—"} paddingY="0.7rem" />
  </div>

  <div>
    <Text size="sm" fw={500} c="gray.7" mb={4}>
      Store
    </Text>
    <FormInput type="text" value={user.locations?.[0]?.name || "—"} paddingY="0.7rem" />
  </div>
</SimpleGrid>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewUserForm;
