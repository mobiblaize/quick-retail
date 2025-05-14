import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import { Link } from "react-router";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import TanTable from "../../../General/table";
import { salesManagementData } from "../../../../utils/mockData";
import { TableRowData } from "../../../../types";
import { ROUTES } from "../../../../constants/routes";


const ViewCustomerOrder = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
        id: 'select',
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
      header: "Order ID",
      accessorKey: "requestDetails",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.name}
            </Text>
            <Text fw={500} className="text-sm">
              {" "}
              <span className="text-[#667185]">{row.original.productCode}</span>
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Time stamp",
      accessorKey: "vendorDetails",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={300} c="black" className="text-[#667185] font-normal">
              {row.original.dateReturned}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Customer",
      accessorKey: "requestValue",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={400} c="black" className="text-[#667185] font-normal">
              {row.original.customer}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Amount",
      accessorKey: "numberOfItems",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.requestValue}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
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
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.viewOrders}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View order
          </Text>
        </Link>
      ),
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={salesManagementData}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={100}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
            Customer Orders
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{salesManagementData.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default ViewCustomerOrder;


