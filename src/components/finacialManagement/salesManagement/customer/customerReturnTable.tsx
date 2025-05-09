import { ColumnDef } from "@tanstack/react-table";

import { Avatar, Text } from "@mantine/core";
import imageSrc from "../../../../assets/images/productIMG.png";
import { Link } from "react-router";
import { TableRowData } from "../../../../types";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { ROUTES } from "../../../../constants/routes";
import TanTable from "../../../General/table";
import { customerReturn } from "../../../../utils/mockData";

const CustomerReturnsTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
      
        size: 50,
        enableSorting: false,
        enableHiding: false,
      },      
      
    {
      header: "Order ID",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={imageSrc}
            alt={row.original.name as string}
            radius="md"
            size={40}
          />
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.name}
            </Text>
            <Text fw={500} className="text-sm">
              {" "}
              <span className="">{row.original.productCode}</span>
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Return date",
      accessorKey: "dateReturned",
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.dateReturned}</Text>
      ),
    },
    {
      header: "Amount",
      accessorKey: "orderId",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.totalAmount}
          </Text>
          <Text fw={500} className="text-[#667185] text-sm">
          ₦ 32,000
            <span className="text-gray-500">
              {props.row.original.totalTransaction}
            </span>
          </Text>
        </div>
      ),
    },
    {
      header: "Return status",
      accessorKey: "customer",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Paid"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "Paid" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
      header: "Reason",
      accessorKey: "returnedReason",
    },
    {
      header: "Refund Status",
      accessorKey: "complaintStatus",
      cell: ({ row }) => {
        const status = row.original.complaintStatus;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Refunded"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "Refunded" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.viewReturns}>
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
        data={customerReturn}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div>
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                Returns
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{customerReturn.length}</Text>
              </div>
            </div>
            <div>
              {" "}
              <Text size="lg" c="textSecondary.9">
                These are items returned by the customer
              </Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default CustomerReturnsTable;
