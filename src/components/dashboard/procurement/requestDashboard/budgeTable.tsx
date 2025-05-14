import TanTable from "../../../General/table";
import { allRequest } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";

const BudgetTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Date Issued & ID",
      accessorKey: "requestDetails",
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
      header: "Vendor Details",
      accessorKey: "vendorDetails",
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
      header: "Invoice Amount",
      accessorKey: "requestorDetails",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.requestValue}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Amount Paid",
      accessorKey: "requestValue",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.requestValue}
        </span>
      ),
    },
    {
      header: "Amount Due",
      accessorKey: "numberOfItems",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.requestValue}
        </span>
      ),
    },
    
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        // <Link to={ROUTES.summaryPage}>
          <Text fw={700} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        // </Link>
      ),
    },     
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={allRequest}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Budget
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{allRequest.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default BudgetTable;
