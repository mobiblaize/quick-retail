import TanTable from "../../../General/table";
import { invoiceVersionHistory } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const PurchaseInvoiceHistoryTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Purchase Invoice Details",
      accessorKey: "id",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.items}
          </Text>
          <Text fw={500}>
            <span className="ml-1 text-black">{props.row.original.id}</span>
          </Text>
        </div>
      ),
    },
    {
      header: "Edited By",
      accessorKey: "customer",
    },
    {
      header: "Date",
      accessorKey: "timestamp",
      cell: (props) => (
        <Text c="textSecondary.7">{props.row.original.timestamp}</Text>
      ),
    },
    {
      header: "Invoice Amount",
      accessorKey: "amount",
      cell: (props) => (
        <Text c="textSecondary.7">{props.row.original.amount}</Text>
      ),
    },
    {
      header: "Amount Status",
      accessorKey: "status",
      cell: (props) => {
        const status = props.row.original.status;
        return (
            <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Full Payment"
                ? "bg-[#ECFDF3] text-[#027A48]"
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
        <Link to={ROUTES.viewPurchaseOrderInvoicePage}>
          <Text fw={700} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        </Link>
      ),
    },
  ];

  return (
    <main className="w-full h-auto  py-8 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={invoiceVersionHistory}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        showFilter
        sortOptions={[
          {
            key: "products",
            label: "Sort By Recently Uploaded",
          },
          {
            key: "added_on",
            label: "Sort by Date Added",
          },
        ]}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Version History
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{invoiceVersionHistory.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default PurchaseInvoiceHistoryTable;
