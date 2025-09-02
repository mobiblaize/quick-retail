// import { Pill, Text } from "@mantine/core";

// interface CauserProfile {
//   store_name: string;
//   roles: [];
//   id: string;
//   created_at: string;
//   log_name: string;
//   action_module: string;
//   ip_address: string;
//   store_address: string;
//   action_type: string;
// }

// interface ProfileHeaderProps {
//   profile: CauserProfile;
// }

// export default function ViewDetails({ profile }: ProfileHeaderProps) {
//   const {
//     store_name,
//     id,
//     created_at,
//     log_name,
//     action_module,
//     ip_address,
//     store_address,
//     action_type,
//   } = profile;

//   // Detect color dynamically from API value
//   const getColor = (status: string = ""): string => {
//     const normalized = status.trim().toLowerCase();

//     if (normalized.includes("success") || normalized.includes("completed")) {
//       return "green";
//     }
//     if (normalized.includes("fail") || normalized.includes("error")) {
//       return "red";
//     }
//     if (normalized.includes("pending") || normalized.includes("waiting")) {
//       return "yellow";
//     }
//     if (normalized.includes("code") || normalized.includes("generate")) {
//       return "blue";
//     }

//     return "gray"; // default for unknown statuses
//   };

//   const status = (
//     <Pill color={getColor(log_name)}>
//       {log_name}
//     </Pill>
//   );

//   const profileInfo = [
//     { label: "Audit ID", value: id },
//     { label: "Timestamp", value: created_at },
//     { label: "Activity", value: log_name },
//     { label: "Activity Status", value: status },
//     { label: "Module", value: action_module },
//     { label: "Store/Warehouse", value: store_name },
//     { label: "IP Address", value: ip_address },
//     { label: "Location", value: store_address },
//     { label: "Browser", value: action_type },
//   ];

//   return (
//     <div className="bg-white rounded-lg shadow mt-6">
//       <div className="border-b px-6 py-3 border-gray-200">
//         <Text
//           component="h3"
//           size="sm"
//           fw={500}
//           c="gray.7"
//         >
//           AUDIT TRAIL DETAILS
//         </Text>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 text-sm">
//         {profileInfo.map(({ label, value }) => (
//           <div key={label}>
//             <p className="text-gray-500">{label}</p>
//             <p className="font-medium text-gray-800">{value}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { Paper, Text, SimpleGrid, Badge, Box } from "@mantine/core";

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
    action_module,
    ip_address,
    store_address,
    action_type,
  } = profile;

  // Detect color dynamically from API value
  const getColor = (status: string = ""): string => {
    const normalized = status.trim().toLowerCase();

    if (normalized.includes("success") || normalized.includes("completed")) {
      return "green";
    }
    if (normalized.includes("fail") || normalized.includes("error")) {
      return "red";
    }
    if (normalized.includes("pending") || normalized.includes("waiting")) {
      return "yellow";
    }
    if (normalized.includes("code") || normalized.includes("generate")) {
      return "blue";
    }

    return "gray"; // default for unknown statuses
  };

  const statusBadge = (
    <Badge color={getColor(log_name)} variant="light" radius="sm">
      {log_name || "—"}
    </Badge>
  );

  const profileInfo: { label: string; value: React.ReactNode }[] = [
    { label: "Audit ID", value: id || "—" },
    { label: "Timestamp", value: created_at || "—" },
    { label: "Activity", value: log_name || "—" },
    { label: "Activity Status", value: statusBadge },
    { label: "Module", value: action_module || "—" },
    { label: "Store/Warehouse", value: store_name || "—" },
    { label: "IP Address", value: ip_address || "—" },
    { label: "Location", value: store_address || "—" },
    { label: "Browser", value: action_type || "—" },
  ];

  return (
    <Paper radius="lg" shadow="sm" withBorder={false} style={{ marginTop: 16 }}>
      {/* header with border bottom */}
      <Box
        px="md"
        py="sm"
      >
        <Text component="h3" size="sm" fw={500} c="gray.7">
          AUDIT TRAIL DETAILS
        </Text>
      </Box>

      {/* content grid */}
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" p="md">
        {profileInfo.map(({ label, value }) => (
          <Box key={label}>
            <Text c="dimmed" size="sm" className="!capitalize">
              {label}
            </Text>

            {/* <Box mt={6}>
              {React.isValidElement(value) ? (
                value
              ) : ( */}
            <Text fw={600} c="dark" size="sm" className="!capitalize">
              {String(value ?? "—")}
            </Text>
            {/* )}
            </Box> */}
          </Box>
        ))}
      </SimpleGrid>
    </Paper>
  );
}
