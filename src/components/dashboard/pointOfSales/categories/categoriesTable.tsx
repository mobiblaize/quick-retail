// import TanTable, { PaginationData } from "../../../General/table";
// import { ColumnDef } from "@tanstack/react-table";
// import { TableRowData } from "../../../../types";
// import { Loader, Text } from "@mantine/core";
// import { useNavigate } from "react-router";
// import { ROUTES } from "../../../../constants/routes";


// interface CategoriesTableProps {
//   categories: Array<any>;
//   isLoading: boolean;
//   onSortChange: (sortKey: string) => void;
//   paginationData?: PaginationData;
//   onPageChange: (page: number) => void;
//   activeSort?: string;
//   onSearchChange?: (search: string) => void; 
// }

// const CategoriesTable = ({ categories, isLoading,   onSortChange,   paginationData ,   onPageChange,   activeSort,   onSearchChange,}: CategoriesTableProps) => {


//   const columns: ColumnDef<TableRowData>[] = [
//     // {
//     //   id: "select",
//     //   header: ({ table }) => (
//     //     <input
//     //       type="checkbox"
//     //       checked={table.getIsAllRowsSelected()}
//     //       onChange={table.getToggleAllRowsSelectedHandler()}
//     //     />
//     //   ),
//     //   cell: ({ row }) => (
//     //     <input
//     //       type="checkbox"
//     //       checked={row.getIsSelected()}
//     //       onChange={row.getToggleSelectedHandler()}
//     //     />
//     //   ),
//     //   enableSorting: false,
//     //   enableColumnFilter: false,
//     //   size: 10,
//     // },
//     {
//       header: "Category",
//       accessorKey: "name",
//       enableSorting: false,
//       cell: ({ row }) => (
//         <Text c="textSecondary.9" fw={500}>
//           {row.original.name}
//         </Text>
//       ),
//     },
//     {
//       header: "Total Products",
//       accessorKey: "totalProduct",
//         enableSorting: false,
//       cell: ({ row }) => (
//         <Text c="textSecondary.9" fw={500}>
//           {row.original.total_products}
//         </Text>
//       ),
//     },
//     {
//       header: "Total Amount",
//       accessorKey: "totalAmount",
//       enableSorting: false,
//       cell: ({ row }) => (
//         <span className="text-gray-900 text-sm font-medium">
//   ₦{Number(row.original.total_amount ?? 0).toFixed(2)}
// </span>

//       ),
//     },
//     {
//       header: "Date Modified",
//       accessorKey: "created_at",
//       enableSorting: false,
//       cell: ({ row }) => {
//         const createdAt = row.original.created_at;

//         if (typeof createdAt === "string" || typeof createdAt === "number") {
//           const dateObj = new Date(createdAt);
//           const optionsDate = {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           } as const;
//           const optionsTime = {
//             hour: "numeric",
//             minute: "2-digit",
//             hour12: true,
//           } as const;

//           const datePart = new Intl.DateTimeFormat("en-GB", optionsDate).format(
//             dateObj
//           );
//           const timePart = new Intl.DateTimeFormat("en-GB", optionsTime).format(
//             dateObj
//           );

//           return <Text>{`${datePart}  ${timePart}`}</Text>;
//         }

//         return <Text>Invalid date</Text>;
//       },
//     },
//     // {
//     //   header: "Status",
//     //   accessorKey: "status",
//     //   cell: (props) => {
//     //     const status = props.row.original.status;
//     //     const isActive = typeof status === "string" && status.toLowerCase() === "active";

//     //     return (
//     //       <div
//     //         className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
//     //           isActive
//     //             ? "bg-[#ECFDF3] text-[#027A48]"
//     //             : "bg-[#FFFAEB] text-[#B54708]"
//     //         }`}
//     //       >
//     //         {isActive ? <PaidDot /> : <UnpaidDot />}
//     //         <span className="ml-2 capitalize">{String(status)}</span>
//     //       </div>
//     //     );
//     //   },
//     // },
//     {
//       header: "",
//       accessorKey: "action",
//       enableSorting: false,
//       cell: ({ row }) => {
//         const navigate = useNavigate();
//         const category = row.original;

//         return (
//           <Text
//             fw={600}
//             c="customPrimary.10"
//             className="cursor-pointer"
//             onClick={() =>
//               navigate(ROUTES.subCategory, { state: { category } })
//             }
//           >
//             View
//           </Text>
//         );
//       },
//     },
//   ];

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center p-10">
//         <Loader size="lg" variant="dots" />
//         <Text ml={10} size="md" color="dimmed">
//           Loading categories...
//         </Text>
//       </div>
//     );
//   }

//   return (
//     <main className="w-full h-auto py-6 rounded-lg bg-white">
//       <TanTable
//         columnData={columns}
//         data={categories}
//         showSearch
//         showSortFilter
//         onSortChange={onSortChange}
//         activeSort={activeSort} 
//         searchPlaceholder="Search categories"
//         length={8}
//         serverSidePagination={true}
//         onSearchChange={onSearchChange}
//         paginationData={paginationData}
//         onPageChange={onPageChange}
//          tableTitle={
//           <div className="flex gap-2.5">
//             <Text fw={500} size="xl" c="textSecondary.9">
//               All Categories
//             </Text>
//             <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
//             <Text c="customPrimary.10">{paginationData?.total}</Text>
//             </div>
//           </div>
//         }
//       />
//     </main>
//   );
// };

// export default CategoriesTable;


import { Text, Loader } from "@mantine/core";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import GenericTable from "../../../General/genericTable";


interface CategoryRow {
  name: string;
  total_products: number;
  total_amount: number;
  created_at: string | number;
}

interface CategoriesTableProps {
  categories: CategoryRow[];
  isLoading: boolean;
  onSortChange: (sortKey: string) => void;
  paginationData?: {
    current_page: number;
    last_page: number;
    total: number;
  };
  onPageChange: (page: number) => void;
  activeSort?: string;
  onSearchChange?: (search: string) => void;
}

const CategoriesTable = ({
  categories,
  isLoading,
  paginationData,
  onPageChange,
}: CategoriesTableProps) => {
  const navigate = useNavigate();

  const columns = [
    {
      key: "name",
      header: "Category",
      render: (row: any) => (
        <Text c="textSecondary.9" fw={500}>
          {row.name}
        </Text>
      ),
    },
    {
      key: "total_products",
      header: "Total Products",
      render: (row: any) => (
        <Text c="textSecondary.9" fw={500}>
          {row.total_products}
        </Text>
      ),
    },
    {
      key: "total_amount",
      header: "Total Amount",
      render: (row: any) => (
        <Text c="gray.9" fz="sm" fw={500}>
          ₦{Number(row.total_amount ?? 0).toFixed(2)}
        </Text>
      ),
    },
    {
      key: "created_at",
      header: "Date Modified",
      render: (row: any) => {
        const createdAt = row.created_at;

        if (typeof createdAt === "string" || typeof createdAt === "number") {
          const dateObj = new Date(createdAt);
          const optionsDate = {
            day: "2-digit",
            month: "short",
            year: "numeric",
          } as const;
          const optionsTime = {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          } as const;

          const datePart = new Intl.DateTimeFormat("en-GB", optionsDate).format(
            dateObj
          );
          const timePart = new Intl.DateTimeFormat("en-GB", optionsTime).format(
            dateObj
          );

          return <Text>{`${datePart}  ${timePart}`}</Text>;
        }

        return <Text>Invalid date</Text>;
      },
    },
    {
      key: "action",
      header: "",
      render: (row: any) => (
        <Text
          fw={600}
          c="customPrimary.10"
          className="cursor-pointer"
          onClick={() =>
            navigate(ROUTES.subCategory, { state: { category: row } })
          }
        >
          View
        </Text>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader size="lg" variant="dots" />
        <Text ml={10} size="md" color="dimmed">
          Loading categories...
        </Text>
      </div>
    );
  }

  return (
    <GenericTable<CategoryRow>
      columns={columns}
      data={categories}
      isLoading={isLoading}
      paginationData={paginationData}
      onPageChange={onPageChange}
      titleSection={
        <div className="flex gap-2.5">
          <Text fw={500} size="xl" c="textSecondary.9">
            All Categories
          </Text>
          <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
            <Text c="customPrimary.10">{paginationData?.total}</Text>
          </div>
        </div>
      }
    />
  );
};

export default CategoriesTable;
