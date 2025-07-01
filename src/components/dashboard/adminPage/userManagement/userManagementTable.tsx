import TanTable from "../../../General/table";
import { tierOneData } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
// import { Link } from "react-router";
// import { ROUTES } from "../../../../constants/routes";

const UserManagementTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Use Name",
      accessorKey: "requestDetails",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.vendorName}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "User ID",
      accessorKey: "category",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.name}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Time Stamp",
      accessorKey: "dateReturned",
    },

    {
      header: "Role",
      accessorKey: "category",
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Active"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : status === "Inactive"
                ? "bg-[#FEF3F2] text-[#B42318]"
                : ""
            }`}
          >
            {status === "Active" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        // <Link to={ROUTES.tierOneVendors}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View User
          </Text>
        // </Link>
      ),
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={tierOneData}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Users
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{tierOneData.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default UserManagementTable;
