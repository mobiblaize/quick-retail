import TanTable from "../../../General/table";
import { nonInventoryData } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const NonInventoryTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Purchase Return  Details",
      accessorKey: "requestDetails",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.name}
            </Text>
            <Text fw={500} className="text-sm">
              ID:{" "}
              <span className="text-[#F16722]">{row.original.productCode}</span>
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Vendor Details",
      accessorKey: "vendorDetails",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.vendorName}
            </Text>
            <Text fw={500} className="text-sm">
              ID:{" "}
              <span className="text-[#F16722]">{row.original.productCode}</span>
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Date Issued",
      accessorKey: "dateReturned",
    },
    {
      header: "Purchase Return Value ",
      accessorKey: "requestValue",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Approved"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : status === "Pending"
                ?  "bg-[#FFFAEB] text-[#B54708]"
                : status === "Rejected"
                ? "bg-red-100 text-red-500" 
                : ""
            }`}
          >
            {status === "Approved" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.approveReturns}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
       </Link>
      ),
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={nonInventoryData}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Requests
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{nonInventoryData.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default NonInventoryTable;
