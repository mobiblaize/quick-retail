import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Text, Loader } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useFetchAllreturns } from "../../../../hooks/backendApis/pos/returns";

const ReturnsTable = () => {
  const { data, isLoading } = useFetchAllreturns();

  const returns = Array.isArray(data?.data?.returns?.data)
    ? data.data.returns.data
    : [];

  const mappedReturns: TableRowData[] = returns.map((item: any) => ({
    name: item.product_variation?.name || "N/A",
    productCode: item.product_variation?.sku || "N/A",
    dateReturned: item.date_returned || "N/A",
    orderId: item.sales_order?.orderID || "N/A",
    customer: item.customer?.customer_name || "N/A",
    returnedReason: item.return_reason || "N/A",
    complaintStatus: item.status === "approved" ? "Resolved" : "Pending",
     returnId: item.returnID || "N/A",
  }));
  

  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Name",
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
              ID:{" "}
              <span className="text-[#F16722]">{row.original.productCode}</span>
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Date Returned",
      accessorKey: "dateReturned",
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.dateReturned}</Text>
      ),
    },
    {
      header: "Order ID",
      accessorKey: "orderId",
    },
    {
      header: "Customer",
      accessorKey: "customer",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.customer}
        </span>
      ),
    },
    {
      header: "Returned Reason",
      accessorKey: "returnedReason",
    },
    {
      header: "Complaint Status",
      accessorKey: "complaintStatus",
      cell: ({ row }) => {
        const status = row.original.complaintStatus;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Resolved"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "Resolved" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
      cell: ({ row }: any) => (
        <Link 
           to={ROUTES.viewReturns} 
           state={{ 
             orderId: row.original.orderId,
             returnId: row.original.returnId
           }}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View Order
          </Text>
        </Link>
      ),
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader size="lg" />
        </div>
      ) : (
        <TanTable
          columnData={columns}
          data={mappedReturns}
          showSearch
          showSortFilter
          searchPlaceholder="Search orders"
          length={5}
          tableTitle={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                Logged Returns
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{mappedReturns.length}</Text>
              </div>
            </div>
          }
        />
      )}
    </main>
  );
};

export default ReturnsTable;
