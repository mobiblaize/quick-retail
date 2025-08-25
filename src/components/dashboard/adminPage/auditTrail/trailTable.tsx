
// import { ColumnDef } from "@tanstack/react-table";
// import { Text } from "@mantine/core";
// import TanTable from "../../../General/table";
// import { FilterValues } from "../../../General/table/reuseableFilter";
// import { ROUTES } from "../../../../constants/routes";
// import { useNavigate } from "react-router-dom";
// // import { useEffect } from "react";

// interface TrailTableProps {
//   logs: any[];
//   isLoading: boolean;
//   error: any;
//   onFilterChange?: (filters: FilterValues) => void;
//   onViewClick?: (uuid: string) => void;
// }

// const TrailTable = ({
//   logs,
//   isLoading,
//   error,
//   onFilterChange,
// }: TrailTableProps) => {
//     const navigate = useNavigate();    
//     const handleViewClick = (uuid: string) => {
//         navigate(ROUTES.viewTrail, { state: { uuid } }); 
//       };
//       // useEffect(() => { 
//       //     if (logs.length > 0) {
//       //       const locationID = logs[0]?.locationID;
//       //       if (locationID) {
//       //         localStorage.setItem("viewUserLocationID", locationID);
//       //       }
//       //     }
//       //   }, [logs]);

//       const roles = Array.from(
//         new Set(
//           logs
//             .flatMap((log) => {
//               const r = log.causer?.roles;
//               if (!r) return [];
//               if (Array.isArray(r)) return r.map((role: any) => role.name || role);
//               if (typeof r === "object") return [r.name || r];
//               return [r]; // for string
//             })
//             .filter(Boolean)
//         )
//       );
      

//       function formatTime(dateStr: string) {
//         if (!dateStr) return "";
//         const date = new Date(dateStr);
//         return new Intl.DateTimeFormat("en-US", {
//           dateStyle: "long",
//           timeStyle: "short",
//         }).format(date);
//       }
      
     
//       const modules = Array.from(
//         new Set(
//           logs
//             ?.map((log) => {
//               const fullPath = log?.action_type || "";
//               return fullPath.split("\\").pop(); 
//             })
//             ?.filter((module) => typeof module === "string")
//         )
//       );   
      
     

//   const columns: ColumnDef<any>[] = [
//     {
//       header: "Time stamp",
//       accessorKey: "date",
//       cell: (props) => (
//         <div className="text-gray-900 whitespace-nowrap text-sm">
//           {formatTime(props.row.original.created_at)}
//         </div>
//       ),
//     },
//     {
//       header: "User Details",
//       accessorKey: "causer",
//       cell: ({ row }) => {
//         const causer = row.original.causer;
//         const name = causer ? `${causer.firstname} ${causer.lastname}` : "N/A";
//         const email = causer?.email || "N/A";
//         return (
//           <div className="flex flex-col">
//             <Text fw={900} size="sm">{name}</Text>
//             <Text size="sm" c="dimmed" className="whitespace-normal">
//               {email}
//             </Text>
//           </div>
//         );
//       },
//     },
//     {
//       header: "Role",
//       accessorKey: "roles", 
//       cell: ({ row }) => {
//         const causer = row.original.causer;
//         let roleDisplay = "N/A";
    
//         if (Array.isArray(causer?.roles)) {
//           roleDisplay = causer.roles.map((r: any) => r.name || r).join(", ");
//         } else if (typeof causer?.roles === "object") {
//           roleDisplay = causer.roles.name || "N/A";
//         } else if (typeof causer?.roles === "string") {
//           roleDisplay = causer.roles;
//         }
    
//         return (
//           <div className="flex flex-col">
//             <Text size="sm" c="dimmed">
//               {roleDisplay}
//             </Text>
//           </div>
//         );
//       },
//     },
    
//     {
//       header: "Activity",
//       accessorKey: "description",
//       cell: ({ row }) => (
//         <Text fw={300} size="sm" className="text-sm " c="#667185">
//           {row.original.log_name}
//         </Text>
//       ),
//     },
//     {
//         header: "Module",
//         accessorKey: "action_type",
//         cell: ({ row }) => {
//           const modulePath = row.original.action_type || "";
//           const moduleName = modulePath.split("\\").pop(); 
//           return (
//             <Text fw={400} size="sm" className="text-sm" c="#667185">
//               {moduleName}
//             </Text>
//           );
//         },
//       },
      
//     {
//       header: "IP Address",
//       accessorKey: "description",
//       cell: ({ row }) => (
//         <Text fw={400} size="sm" className="text-sm" c="#667185">
//           {row.original.ip_address}
//         </Text>
//       ),
//     },
//     {
//         header: "Actions",
//         id: "actions",
//         cell: ({ row }) => {
//           const uuid = row.original.uuid;  
//           return (
//             <button
//               onClick={() => handleViewClick(uuid)}
//               className="text-[#F16722] hover:underline cursor-pointer text-sm"
//             >
//               View
//             </button>
//           );
//         },
//       }
      
//   ];

//   return (
//     <main className="w-full h-auto py-6 rounded-lg bg-white">
//       {isLoading ? (
//         <Text>Loading...</Text>
//       ) : error ? (
//         <Text c="red">Failed to load audit logs.</Text>
//       ) : (
//         <TanTable
//           // @ts-ignore
//           columnData={columns}
//           data={logs}
//           showSearch
//           showSortFilter
//           searchPlaceholder="Search logs"
//           length={8}
//           showFilter
//           roles={roles}
//           modules={modules}
//           tableType="audit"
//           onFilterChange={onFilterChange}
//           tableTitle={
//             <div className="flex gap-2.5">
//               <Text fw={500} size="xl" c="textSecondary.9">
//                 All User Trails
//               </Text>
//               <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
//                 <Text c="customPrimary.10">{logs.length}</Text>
//               </div>
//             </div>
//           }
//         />
//       )}
//     </main>
//   );
// };

// export default TrailTable;




import { Text, Badge } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import GenericTable, { PaginationData } from "../../../General/genericTable";
import UserFilters from "../userManagement/UserFilters";

interface TrailTableProps {
  logs: any[];
  isLoading: boolean;
  error: any;
  paginationData?: PaginationData;
  onPageChange: (page: number) => void;
  onFilterChange?: (filters: any) => void;
  // onFilterChange?: (filters: UserFilterValues) => void;
}

export default function TrailTable({
  logs,
  isLoading,
  paginationData,
  onPageChange,
  onFilterChange,
}: TrailTableProps) {
  const navigate = useNavigate();

  const handleViewClick = (uuid: string) => {
    navigate(ROUTES.viewTrail, { state: { uuid } });
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(date);
  };

  // ✅ Define columns in ProductTable style
  const columns = [
    {
      key: "timestamp",
      header: "Timestamp",
      render: (row: any) => (
        <Text size="sm" style={{ color: "#475569" }}>
          {formatTime(row.created_at)}
        </Text>
      ),
    },
    {
      key: "user",
      header: "User Details",
      render: (row: any) => {
        const causer = row.causer;
        const name = causer
          ? `${causer.firstname} ${causer.lastname}`
          : "N/A";
        const email = causer?.email || "N/A";
zz
        return (
          <div>
            <Text size="sm" fw={500}>
              {name}
            </Text>
            <Text size="xs" c="dimmed">
              {email}
            </Text>
          </div>
        );
      },
    },
    {
      key: "role",
      header: "Role",
      render: (row: any) => {
        const causer = row.causer;
        let roleDisplay = "N/A";

        if (Array.isArray(causer?.roles)) {
          roleDisplay = causer.roles.map((r: any) => r.name || r).join(", ");
        } else if (typeof causer?.roles === "object") {
          roleDisplay = causer.roles.name || "N/A";
        } else if (typeof causer?.roles === "string") {
          roleDisplay = causer.roles;
        }

        return (
          <Text size="sm" c="dimmed">
            {roleDisplay}
          </Text>
        );
      },
    },
    {
      key: "activity",
      header: "Activity",
      render: (row: any) => (
        <Text size="sm" style={{ color: "#667185" }}>
          {row.log_name}
        </Text>
      ),
    },
    {
      key: "module",
      header: "Module",
      render: (row: any) => {
        const modulePath = row.action_type || "";
        const moduleName = modulePath.split("\\").pop();
        return (
          <Text size="sm" style={{ color: "#667185" }}>
            {moduleName}
          </Text>
        );
      },
    },
    {
      key: "ip",
      header: "IP Address",
      render: (row: any) => (
        <Text size="sm" style={{ color: "#667185" }}>
          {row.ip_address}
        </Text>
      ),
    },
  ];

  const actions = (row: any) => (
    <button
      onClick={() => handleViewClick(row.uuid)}
      className="text-[#F16722] hover:underline cursor-pointer text-sm"
    >
      View
    </button>
  );

  return (
    <GenericTable
      data={logs}
      isLoading={isLoading}
      paginationData={paginationData}
      onPageChange={onPageChange}
      columns={columns}
      actions={actions}
      emptyMessage="No user trails found"
      titleSection={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "16px 24px",
            borderBottom: "1px solid #f1f5f9",
            backgroundColor: "white",
          }}
        >
          {/* Left: Title + Count */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Text size="xl" fw={600} style={{ color: "#1e293b" }}>
              All User Trails
            </Text>
            <Badge
              variant="filled"
              styles={{
                root: {
                  backgroundColor: "#fed7aa",
                  color: "#ea580c",
                  fontWeight: 600,
                  fontSize: "12px",
                  height: "20px",
                  minHeight: "20px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  textTransform: "none",
                },
              }}
            >
              {paginationData?.total ?? logs.length}
            </Badge>
          </div>

          {/* Right: Filters */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <UserFilters onFilterChange={onFilterChange || (() => {})} />
          </div>
        </div>
      }
    />
  );
}

