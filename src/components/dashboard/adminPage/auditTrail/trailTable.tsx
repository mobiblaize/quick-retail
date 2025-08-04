
import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { FilterValues } from "../../../General/table/reuseableFilter";
import { ROUTES } from "../../../../constants/routes";
import { useNavigate } from "react-router-dom";

interface TrailTableProps {
  logs: any[];
  isLoading: boolean;
  error: any;
  onFilterChange?: (filters: FilterValues) => void;
  onViewClick?: (uuid: string) => void;
}

const TrailTable = ({
  logs,
  isLoading,
  error,
  onFilterChange,
}: TrailTableProps) => {
    const navigate = useNavigate();
    
    const handleViewClick = (uuid: string) => {
        navigate(ROUTES.viewTrail, { state: { uuid } }); 
      };


      const roles = Array.from(
        new Set(
          logs
            .flatMap((log) => {
              const r = log.causer?.roles;
              if (!r) return [];
              if (Array.isArray(r)) return r.map((role: any) => role.name || role);
              if (typeof r === "object") return [r.name || r];
              return [r]; // for string
            })
            .filter(Boolean)
        )
      );
      

      function formatTime(dateStr: string) {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
          timeStyle: "short",
        }).format(date);
      }
      
     
      const modules = Array.from(
        new Set(
          logs
            ?.map((log) => {
              const fullPath = log?.action_type || "";
              return fullPath.split("\\").pop(); 
            })
            ?.filter((module) => typeof module === "string")
        )
      );   
      
     

  const columns: ColumnDef<any>[] = [
    {
      header: "Time stamp",
      accessorKey: "date",
      cell: (props) => (
        <div className="text-gray-900 whitespace-nowrap text-sm">
          {formatTime(props.row.original.created_at)}
        </div>
      ),
    },
    {
      header: "User Details",
      accessorKey: "causer",
      cell: ({ row }) => {
        const causer = row.original.causer;
        const name = causer ? `${causer.firstname} ${causer.lastname}` : "N/A";
        const email = causer?.email || "N/A";
        return (
          <div className="flex flex-col">
            <Text fw={900} size="sm">{name}</Text>
            <Text size="sm" c="dimmed" className="whitespace-normal">
              {email}
            </Text>
          </div>
        );
      },
    },
    {
      header: "Role",
      accessorKey: "roles",
      cell: ({ row }) => {
        const causer = row.original.causer;
        let roleDisplay = "N/A";
    
        if (Array.isArray(causer?.roles)) {
          roleDisplay = causer.roles.map((r: any) => r.name || r).join(", ");
        } else if (typeof causer?.roles === "object") {
          roleDisplay = causer.roles.name || "N/A";
        } else if (typeof causer?.roles === "string") {
          roleDisplay = causer.roles;
        }
    
        return (
          <div className="flex flex-col">
            <Text size="sm" c="dimmed">
              {roleDisplay}
            </Text>
          </div>
        );
      },
    },
    
    {
      header: "Activity",
      accessorKey: "description",
      cell: ({ row }) => (
        // <Text fw={400} className="text-sm whitespace-normal" c="#667185">
                   <Text fw={300} size="sm" className="text-sm " c="#667185">
          {row.original.log_name}
        </Text>
      ),
    },
    {
        header: "Module",
        accessorKey: "action_type",
        cell: ({ row }) => {
          const modulePath = row.original.action_type || "";
          const moduleName = modulePath.split("\\").pop(); 
          return (
            <Text fw={400} size="sm" className="text-sm" c="#667185">
              {moduleName}
            </Text>
          );
        },
      },
      
    {
      header: "IP Address",
      accessorKey: "description",
      cell: ({ row }) => (
        <Text fw={400} size="sm" className="text-sm" c="#667185">
          {row.original.ip_address}
        </Text>
      ),
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
          const uuid = row.original.uuid;  
          return (
            <button
              onClick={() => handleViewClick(uuid)}
              className="text-[#F16722] hover:underline cursor-pointer text-sm"
            >
              View
            </button>
          );
        },
      }
      
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text c="red">Failed to load audit logs.</Text>
      ) : (
        <TanTable
          // @ts-ignore
          columnData={columns}
          data={logs}
          showSearch
          showSortFilter
          searchPlaceholder="Search logs"
          length={8}
          showFilter
          roles={roles}
          modules={modules}
          tableType="audit"
          onFilterChange={onFilterChange}
          tableTitle={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                All User Trails
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{logs.length}</Text>
              </div>
            </div>
          }
        />
      )}
    </main>
  );
};

export default TrailTable;
