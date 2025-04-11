import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import TanTable from "../../../General/table";
import { allSalesReport, discountProduct } from "../../../../utils/mockData";

const SalesProcessingReport = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Order ID",
      accessorKey: "id",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.id}
          </Text>
          <Text fw={500}>
            Total Items:
            <span className="ml-1 text-black">{props.row.original.items}</span>
          </Text>
        </div>
      ),
    },
    {
      header: "Time stamp",
      accessorKey: "timeStamp",
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.timeStamp}</Text>
      ),
    },
    {
      header: "Customer",
      accessorKey: "customer",
    },
    {
      header: "Total Amount",
      accessorKey: "Amount",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.Amount}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.paymentStatus;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Paid"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FEF3F2] text-[#B42318]"
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
        <Text fw={700} c="customPrimary.10" className="cursor-pointer">
          View order
        </Text>
      ),
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={allSalesReport}
        showSearch={false}     
        showSortFilter={false}  
        length={5}
        tableTitle={
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
              <div className="flex gap-2.5 items-center">
                <Text fw={500} size="xl" c="textSecondary.9">
                  Sales Processing
                </Text>
                <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                  <Text c="customPrimary.10" size="sm">{discountProduct.length}</Text>
                </div>
              </div>
          
            
              <div className="flex items-center gap-3">
                <div className="border border-[#E0E0E0] rounded-lg px-4 py-2 flex items-center text-sm text-[#344054] min-w-[230px]">
                  14/01/2025 – 14/02/2025
                </div>
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-md font-medium text-sm">
                  Export
                </button>
              </div>
            </div>
          }
                   
      />
    </main>
  );
};

export default SalesProcessingReport;
