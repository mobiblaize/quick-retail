import { Paper, Text, SimpleGrid, Box } from "@mantine/core";

interface CauserProfile {
  store_name: string;
  roles: [];
  id: string;
  created_at: string;
  log_name: string;
  action_module: string;
  ip_address: string;
  store_address: string;
  action_type: string;
  browser: string;
}

interface ProfileHeaderProps {
  profile: CauserProfile;
}

export default function ViewDetails({ profile }: ProfileHeaderProps) {
  const {
    store_name,
    id,
    created_at,
    log_name,
    ip_address,
    store_address,
    browser,
    action_type
  } = profile;

  // format timestamp nicely
  const formattedTimestamp = created_at
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",  // Sep 12, 2025
        timeStyle: "medium",  // 6:46:19 PM
      }).format(new Date(created_at))
    : "—";

  const profileInfo: { label: string; value: React.ReactNode }[] = [
    { label: "Audit ID", value: id || "—" },
    { label: "Timestamp", value: formattedTimestamp },
    { label: "Activity", value: log_name || "—" },
    { label: "Module", value: action_type || "—" },
    { label: "Store/Warehouse", value: store_name || "—" },
    { label: "IP Address", value: ip_address || "—" },
    { label: "Location", value: store_address || "—" },
    { label: "Browser", value: browser || "—" },
  ];

  return (
    <Paper radius="lg" shadow="sm" withBorder={false} style={{ marginTop: 16 }}>
      <Box px="md" py="sm">
        <Text component="h3" size="sm" fw={500} c="gray.7">
          AUDIT TRAIL DETAILS
        </Text>
      </Box>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" p="md">
        {profileInfo.map(({ label, value }) => (
          <Box key={label}>
            <Text c="dimmed" size="sm" className="!capitalize">
              {label}
            </Text>
            <Text fw={600} c="dark" size="sm" className="!capitalize">
              {String(value ?? "—")}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Paper>
  );
}
