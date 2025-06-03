import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import { Link } from "react-router";
import { TableRowData } from "../../../types";
import { ROUTES } from "../../../constants/routes";
import TanTable from "../../General/table";
import { allJournal, productTableData } from "../../../utils/mockData";
import { UnpaidDot, PaidDot } from "../../../assets/svg";

const JournalTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting: false,
      enableColumnFilter: false,
      size: 10,
    },
    {
      header: "Invoice ID",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={400} className="text-sm" c="#667185">
            {""} {props.row.original.id}
          </Text>
        </div>
      ),
    },
    {
        header: "Date",
        accessorKey: "name",
        cell: (props) => (
          <div className="flex flex-col">
            <Text fw={400} className="text-sm" c="#667185">
              {""} {props.row.original.date}
            </Text>
          </div>
        ),
      },
    {
      header: "Total Debit",
      accessorKey: "contact",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="#667185">
            {props.row.original.balancePY}
          </Text>
        </div>
      ),
    },
    {
      header: "Description",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={400} c="#667185">
            {props.row.original.description}
          </Text>
        </div>
      ),
    },
    {
        header: "Status",
        accessorKey: "customer",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
                status === "Successful"
                  ? "bg-[#ECFDF3] text-[#027A48]"
                  : "bg-[#FFFAEB] text-[#B54708]"
              }`}
            >
              {status === "Successful" ? <PaidDot /> : <UnpaidDot />}
              <span className="ml-2">{status}</span>
            </div>
          );
        },
      },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.viewAccountChart}>
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
        data={allJournal }
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={10}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
            All Journal Entry 
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{productTableData.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default JournalTable;
