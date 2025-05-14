import TanTable from "../../../General/table";
import { activeDepreciationTable } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const ActiveDepreciationTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Asset ID",
      accessorKey: "assetid",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.assetid}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Asset Name",
      accessorKey: "assetName",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.assetName}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Purchase Cost(#)",
      accessorKey: "cost",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.cost}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Useful Life (Years)",
      accessorKey: "usefulLife",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.cost}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Annual Depreciation",
      accessorKey: "annualDepreciation",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.method}
        </span>
      ),
    },
    {
      header: "Dep. Rate(%)",
      accessorKey: "rate",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.rate}
        </span>
      ),
    },
    {
      header: "Date of Purchase",
      accessorKey: "dateOfPurchase",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.dateOfPurchase}
        </span>
      ),
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.viewdepreciationState}>
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
        data={activeDepreciationTable}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Active Assets
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{activeDepreciationTable.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default ActiveDepreciationTable;
