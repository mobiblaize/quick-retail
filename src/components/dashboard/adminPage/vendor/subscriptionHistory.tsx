import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { useFetchAllSub } from "../../../../hooks/backendApis/admin/profile";


const HistoryTable = () => {
  const { data, isLoading, error } = useFetchAllSub();

  const subscriptions = data?.data?.data || [];
  // const 

  const columns: ColumnDef<any>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <input
    //       type="checkbox"
    //       checked={table.getIsAllRowsSelected()}
    //       onChange={table.getToggleAllRowsSelectedHandler()}
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <input
    //       type="checkbox"
    //       checked={row.getIsSelected()}
    //       onChange={row.getToggleSelectedHandler()}
    //     />
    //   ),
    //   enableSorting: false,
    //   enableColumnFilter: false,
    //   size: 10,
    // },
    {
      header: "Transaction ID",
      accessorKey: "subscriptionID",
      enableSorting: false,
      cell: ({ row }) => (
        <Text fw={400} className="text-sm" c="#667185">
          {row.original.subscriptionID}
        </Text>
      ),
    },
    {
        header: "Plan",
        accessorKey: "billing_type",
        enableSorting: false,
        cell: ({ row }) => (
          <Text fw={400} c="#667185">
            {row.original.billing_type} Plan
          </Text>
        ),
      },
      {
        header: "Amount",
        accessorKey: "total_amount",
        enableSorting: false,
        sortingFn: "alphanumeric",
        cell: ({ row }) => (
          <Text fw={500} c="#667185">
            ₦{Number(row.original.total_amount).toLocaleString()}
          </Text>
        ),
      },
    {
      header: "Date",
      accessorKey: "billing_start",
      enableSorting: false, 
    sortingFn: "datetime",
      cell: ({ row }) => (
        <Text fw={400} className="text-sm" c="#667185">
          {new Date(row.original.billing_start).toLocaleDateString()}
        </Text>
      ),
    },
   
   
    {
        header: "Status",
        accessorKey: "status",
      enableSorting: false, 

        cell: ({ row }) => {
          const status = row.original.status;
      
          const statusMap: Record<
            string,
            { bg: string; text: string; dot: string }
          > = {
            Active: {
              bg: "bg-[#ECFDF3]",
              text: "text-[#027A48]",
              dot: "bg-[#12B76A]", 
            },
            Cancelled: {
              bg: "bg-[#FEF3F2]",
              text: "text-[#B42318]",
              dot: "bg-[#F04438]", 
            },
            Expired: {
              bg: "bg-[#F2F4F7]",
              text: "text-[#667085]",
              dot: "bg-[#D0D5DD]", 
            },
          };
      
          const { bg, text, dot } = statusMap[status] || {
            bg: "bg-gray-100",
            text: "text-gray-500",
            dot: "bg-gray-400",
          };
      
          return (
            <div className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${bg} ${text}`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${dot}`} />
              {status}
            </div>
          );
        },
      }
      
      
    
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text c="red">Failed to load subscriptions.</Text>
      ) : (
        <TanTable
        // @ts-ignore
          columnData={columns}
          data={subscriptions}
          showSearch
          showSortFilter
          searchPlaceholder="Search orders"
          length={10}
          tableTitle={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                All Subscriptions
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{subscriptions.length}</Text>
              </div>
            </div>
          }
        />
      )}
    </main>
  );
};

export default HistoryTable;
