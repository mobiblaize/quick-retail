

// import { FC, useState } from "react";
// import { ColumnDef } from "@tanstack/react-table";
// import { Text, Switch, Loader } from "@mantine/core";
// import { notifications } from "@mantine/notifications";
// import { Link } from "react-router";

// import TanTable, { PaginationData } from "../../../General/table";
// import { ROUTES } from "../../../../constants/routes";
// import { TableRowData } from "../../../../types";
// import { useToggleStore } from "../../../../hooks/backendApis/pos/storeManagement";
// import { shortenTransactionId } from "../../../../utils/helpers";
// import ConfirmStoreModal from "./modals/activateStore";


// type StoreData = {
//   id: string;
//   name: string;
//   isActive: boolean;
//   storeID?: string;
//   locationID?: string;
//   lga?: string;
//   created_at?: string | number;
//   registered_customers?: number;
//   is_active?: number;
// };

// type StoreOverviewTableProps = {
//   stores?: StoreData[];
//   loading?: boolean;
//   refetchStores?: () => void;
//   onSortChange: (sortKey: string) => void;
//   paginationData?: PaginationData;
//   onPageChange: (page: number) => void;
//   activeSort?: string;
//   onSearchChange?: (search: string) => void;
// };

// const StoreOverviewTable: FC<StoreOverviewTableProps> = ({
//   stores = [],
//   loading = false,
//   refetchStores,
//   onSortChange,
//   paginationData,
//   onPageChange,
//   activeSort,
//   onSearchChange,
// }) => {
//   // UI state for modal
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);
//   const [actionType, setActionType] = useState<"activate" | "deactivate" | null>(null);

//   // Mutation hook
//   const toggleMutation = useToggleStore(selectedStore?.locationID ?? "");

//   // Handles confirm inside modal
//   const handleConfirmAction = () => {
//     if (!selectedStore || !actionType) return;

//     toggleMutation.mutate(undefined, {
//       onSuccess: () => {
//         const newStatus = actionType === "activate" ? 1 : 0;
//         selectedStore.is_active = newStatus;
//         refetchStores?.();

//         notifications.show({
//           title: "Store status updated",
//           message: `Store ${newStatus === 1 ? "Activated" : "Deactivated"}.`,
//           color: newStatus === 1 ? "green" : "red",
//         });

//         setModalOpen(false);
//         setSelectedStore(null);
//       },
//       onError: () => {
//         notifications.show({
//           title: "Error",
//           message: "Failed to update store status. Please try again.",
//           color: "red",
//         });
//       },
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center p-10">
//         <Loader size="lg" variant="dots" />
//         <Text ml={10} size="md" color="dimmed">
//           Loading stores...
//         </Text>
//       </div>
//     );
//   }

//   if (!stores.length) return <p>No stores available.</p>;

//   const columns: ColumnDef<TableRowData>[] = [
//     {
//       header: "Store Name",
//       accessorKey: "name",
//       enableSorting: false,
//       cell: (props) => (
//         <div className="flex flex-col">
//           <Text fw={500} c="black">
//             {props.row.original.name}
//           </Text>
//           <Text fw={400} className="text-sm">
//             Store ID: {shortenTransactionId(String(props.row.original.storeID ?? ""))}
//           </Text>
//         </div>
//       ),
//     },
//     {
//       header: "Store Location",
//       accessorKey: "location",
//       enableSorting: false,
//       cell: (props) => {
//         const location = props.row.original.lga;
//         // @ts-ignore
//         return <Text>{location?.trim() ? location : "No location available"}</Text>;
//       },
//     },
//     {
//       header: "Date Created",
//       accessorKey: "dateCreated",
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

//           const datePart = new Intl.DateTimeFormat("en-GB", optionsDate).format(dateObj);

//           return <Text>{datePart}</Text>;
//         }

//         return <Text>Invalid date</Text>;
//       },
//     },
//     {
//       header: "Customers",
//       accessorKey: "totalCustomer",
//       enableSorting: false,
//       cell: (props) => {
//         const totalCustomers = props.row.original.registered_customers;
//         return (
//           <Text
//             c={typeof totalCustomers === "number" ? "black" : "dimmed"}
//             fw={500}
//             className="text-sm font-medium"
//           >
//             {typeof totalCustomers === "number" ? totalCustomers : "No customers"}
//           </Text>
//         );
//       },
//     },
//     {
//       header: "Status",
//       accessorKey: "status",
//       enableSorting: false,
//       cell: (props) => {
//         const store = props.row.original;
//         const isActive = store.is_active === 1;

//         const dotClass = isActive ? "bg-[#27ae60]" : "bg-[#94a3b8]";
//         const statusText = isActive ? "Active" : "Inactive";

//         return (
//           <div className="flex items-center gap-2">
//             <div
//               className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
//                 isActive
//                   ? "bg-[#ECFDF3] text-[#027A48]"
//                   : "bg-[#F2F4F7] text-[#667085]"
//               }`}
//             >
//               <span className={`inline-block w-3 h-3 rounded-full ${dotClass}`} />
//               <span className="ml-2">{statusText}</span>
//             </div>

//             <Switch
//               checked={isActive}
//               onChange={() => {
//                     // @ts-ignore
//                 setSelectedStore(store);
//                 setActionType(isActive ? "deactivate" : "activate");
//                 setModalOpen(true);
//               }}
//               color="orange"
//               size="md"
//             />
//           </div>
//         );
//       },
//     },
//     {
//       header: "",
//       accessorKey: "action",
//       enableSorting: false,
//       cell: (props) => (
//         <Link to={ROUTES.viewStore} state={{ store: props.row.original }}>
//           <Text fw={600} c="customPrimary.10" className="cursor-pointer">
//             View
//           </Text>
//         </Link>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <main className="w-full h-auto py-6 rounded-lg bg-white">
//         <TanTable
//           columnData={columns}
//           data={stores}
//           showSearch
//           showSortFilter
//           onSortChange={onSortChange}
//           activeSort={activeSort}
//           searchPlaceholder="Search stores"
//           serverSidePagination={true}
//           paginationData={paginationData}
//           onPageChange={onPageChange}
//           onSearchChange={onSearchChange}
//           length={8}
//           tableTitle={
//             <div className="flex gap-2.5">
//               <Text fw={500} size="xl" c="textSecondary.9">
//                 Stores Overview
//               </Text>
//               <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
//                 <Text c="customPrimary.10">{paginationData?.total}</Text>
//               </div>
//             </div>
//           }
//         />
//       </main>

//       {/* Confirmation modal */}
//       <ConfirmStoreModal
//         opened={modalOpen}
//         onClose={() => setModalOpen(false)}
//             // @ts-ignore
//         action={actionType}
//         onConfirm={handleConfirmAction}
//       />
//     </div>
//   );
// };

// export default StoreOverviewTable;



import { FC, useState } from "react";
import { Text, Switch, Loader, Badge } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Link } from "react-router";

import GenericTable from "../../../General/genericTable";
import { ROUTES } from "../../../../constants/routes";
import { useToggleStore } from "../../../../hooks/backendApis/pos/storeManagement";
import { shortenTransactionId } from "../../../../utils/helpers";
import ConfirmStoreModal from "./modals/activateStore";

type StoreData = {
  id: string;
  name: string;
  isActive: boolean;
  storeID?: string;
  locationID?: string;
  lga?: string;
  created_at?: string | number;
  registered_customers?: number;
  is_active?: number;
};

type StoreOverviewTableProps = {
  stores?: StoreData[];
  loading?: boolean;
  refetchStores?: () => void;
  // onSortChange: (sortKey: string) => void;
  paginationData?: {
    current_page: number;
    last_page: number;
    total: number;
  };
  onPageChange: (page: number) => void;
  activeSort?: string;
  onSearchChange?: (search: string) => void;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  setSort?: (sortBy: string) => void;
};

const StoreOverviewTable: FC<StoreOverviewTableProps> = ({
  stores = [],
  loading = false,
  refetchStores,
  paginationData,
  onPageChange,
  searchTerm,
  setSearchTerm,
  activeSort,
  setSort,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);
  const [actionType, setActionType] = useState<"activate" | "deactivate" | null>(null);

  const toggleMutation = useToggleStore(selectedStore?.locationID ?? "");

  const handleConfirmAction = () => {
    if (!selectedStore || !actionType) return;

    toggleMutation.mutate(undefined, {
      onSuccess: () => {
        const newStatus = actionType === "activate" ? 1 : 0;
        selectedStore.is_active = newStatus;
        refetchStores?.();

        notifications.show({
          title: "Store status updated",
          message: `Store ${newStatus === 1 ? "Activated" : "Deactivated"}.`,
          color: newStatus === 1 ? "green" : "red",
        });

        setModalOpen(false);
        setSelectedStore(null);
      },
      onError: () => {
        notifications.show({
          title: "Error",
          message: "Failed to update store status. Please try again.",
          color: "red",
        });
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" variant="dots" />
        <Text ml="sm" size="md" c="dimmed">
          Loading stores...
        </Text>
      </div>
    );
  }

  if (!stores.length) {
    return <Text c="dimmed">No stores available.</Text>;
  }

  const tableData = stores.map((store) => ({
    id: store.id,
    name: store.name,
    storeID: shortenTransactionId(String(store.storeID ?? "")),
    lga: store.lga,
    createdAt: store.created_at,
    customers: store.registered_customers,
    is_active: store.is_active,
    store,
  }));

  const columns = [
    {
      key: "name",
      header: "Store Name",
      render: (row: any) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {row.name}
          </Text>
          <Text fw={400} size="sm" c="dimmed">
            Store ID: {row.storeID}
          </Text>
        </div>
      ),
    },
    {
      key: "lga",
      header: "Store Location",
      render: (row: any) => (
        <Text c={row.lga?.trim() ? "black" : "dimmed"}>
          {row.lga?.trim() || "No location available"}
        </Text>
      ),
    },
    {
      key: "createdAt",
      header: "Date Created",
      render: (row: any) => {
        const createdAt = row.createdAt;
        if (typeof createdAt === "string" || typeof createdAt === "number") {
          const dateObj = new Date(createdAt);
          const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "short",
            year: "numeric",
          };
          return (
            <Text fw={400} size="sm">
              {new Intl.DateTimeFormat("en-GB", options).format(dateObj)}
            </Text>
          );
        }
        return <Text c="dimmed">Invalid date</Text>;
      },
    },
    {
      key: "customers",
      header: "Customers",
      render: (row: any) => (
        <Text fw={500} c={typeof row.customers === "number" ? "black" : "dimmed"}>
          {typeof row.customers === "number" ? row.customers : "No customers"}
        </Text>
      ),
    },
    {
      key: "is_active",
      header: "Status",
      render: (row: any) => {
        const isActive = row.is_active === 1;
        const statusText = isActive ? "Active" : "Inactive";

        return (
          <div className="flex items-center gap-2">
            <Badge
              color={isActive ? "green" : "gray"}
              variant="light"
              radius="lg"
              size="lg"
              style={{ textTransform: "none" }}
            >
              {statusText}
            </Badge>
            <Switch
              checked={isActive}
              onChange={() => {
                setSelectedStore(row.store);
                setActionType(isActive ? "deactivate" : "activate");
                setModalOpen(true);
              }}
              color="orange"
              size="md"
            />
          </div>
        );
      },
    },
    {
      key: "action",
      header: "",
      render: (row: any) => (
        <Link to={ROUTES.viewStore} state={{ store: row.store }}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <main className="w-full h-auto py-6">
        <GenericTable
             enableSearch ={true}
             enableSort={true}
          columns={columns}
          data={tableData}
          isLoading={loading}
          paginationData={paginationData}
          onPageChange={onPageChange}
          searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeSort={activeSort}
        onSortChange={setSort}
        showFilter={true}
        tableType="product"
        searchPlaceholder="search stores"
          titleSection={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                Stores Overview
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{paginationData?.total ?? stores.length}</Text>
              </div>
            </div>
          }
        />
      </main>

      <ConfirmStoreModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        // @ts-ignore
        action={actionType}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
};

export default StoreOverviewTable;

