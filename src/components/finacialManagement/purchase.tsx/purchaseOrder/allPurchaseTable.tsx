import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { TableRowData } from "../../../../types";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { allPurchaseOrder, productTableData } from "../../../../utils/mockData";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const AllPurchaseOrderTable = () => {
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
      header: "Vendor Name & ID",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.name}
          </Text>
          <Text fw={400} className="text-sm">
            {""} {props.row.original.id}
          </Text>
        </div>
      ),
    },
    {
      header: "Total Bills",
      accessorKey: "contact",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.amountDue}
          </Text>
          
        </div>
      ),
    },
    {
      header: "Date",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={400} c="gray">
            {props.row.original.timeStamp}
          </Text>
        </div>
      ),
    },
    {
      header: "Purchase ID",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={400} c="gray">
            {props.row.original.purchaseID}
          </Text>
        </div>
      ),
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: (props) => {
          const status = props.row.original.status;
          return (
              <div
              className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
                status === "Full Payment"
                  ? "bg-[#ECFDF3] text-[#027A48]"
                  : status === "Partial Payment"
                  ? "bg-[#FFFAEB] text-[#B54708]" 
                  : status === "Pending Payment"
                  ? "bg-red-100 text-red-500" 
                  : ""
              }`}
            >
              {status === "Full Payment" ? <PaidDot /> : <UnpaidDot />}
              <span className="ml-2">{status}</span>
            </div>
          );
        },
      },

    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.viewPurchaseOrder}>
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
        data={allPurchaseOrder}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={8}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Purchase Invoice
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

export default AllPurchaseOrderTable;
