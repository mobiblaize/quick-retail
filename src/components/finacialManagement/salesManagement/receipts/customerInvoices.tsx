import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { TableRowData } from "../../../../types";
import { allCustomersInvoices } from "../../../../utils/mockData";

const CustomerInvoice = () => {
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
      accessorKey: "invoiceId",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.name}
          </Text>
          <Text fw={400} className="text-sm">
            {""} {props.row.original.date}
          </Text>
        </div>
      ),
    },
    {
      header: "Invoice Amount",
      accessorKey: "invoice amount",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.contact}
          </Text>
        </div>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => (
        <Text c="red" className="text-[#D42620] text-sm font-medium">
          {row.original.timeStamp}
        </Text>
      ),
    },
    {
      header: "Amount to be paid now",
      accessorKey: "amount to be paid now",
      cell: (props) => (
        <div className="flex flex-col bg-[#E7F6EC] rounded-lg pl-2 w-[40%]">
          <Text fw={500} c="black">
            {props.row.original.totalAmount}
          </Text>
        </div>
      ),
    },
  ];
  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={allCustomersInvoices}
        length={8}
        showSeeAllToggle
      />
    </main>
  );
};

export default CustomerInvoice;
