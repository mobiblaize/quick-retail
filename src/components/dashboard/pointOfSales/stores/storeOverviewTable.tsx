import { FC } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Text, Switch, Loader } from "@mantine/core";
import TanTable, { PaginationData } from "../../../General/table";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { TableRowData } from "../../../../types";
import { useToggleStore } from "../../../../hooks/backendApis/pos/storeManagement";
import { shortenTransactionId } from "../../../../utils/helpers";
import { notifications } from '@mantine/notifications';

type StoreData = {
  id: string;
  name: string;
  isActive: boolean;
  // Add any other fields your store has
};

type StoreOverviewTableProps = {
  stores?: StoreData[];
  loading?: boolean;
  refetchStores?: () => void;
  onSortChange: (sortKey: string) => void;
  paginationData?: PaginationData;
  onPageChange: (page: number) => void;
  activeSort?: string;
};

const StoreOverviewTable: FC<StoreOverviewTableProps> = ({
  stores = [],
  loading = false,
  refetchStores,
  onSortChange,
  paginationData ,  
   onPageChange,
   activeSort
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader size="lg" variant="dots" />
        <Text ml={10} size="md" color="dimmed">
          Loading stores...
        </Text>
      </div>
    );
  }

  if (!stores.length) return <p>No stores available.</p>;


  const columns: ColumnDef<TableRowData>[] = [
   
    {
      header: "Store Name",
      accessorKey: "name",
      enableSorting: false, 
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.name}
          </Text>
          <Text fw={400} className="text-sm">
          Store ID: {shortenTransactionId(String(props.row.original.storeID ?? ""))}
          </Text>
        </div>
      ),
    },
   
    {
      header: "Store Location",
      accessorKey: "location",
      enableSorting: false, 
      cell: (props) => {
        const location = props.row.original.lga;
        return (
          <Text>
            {/* @ts-ignore */}
            {location && location.trim() !== "" ? location : "No location available"}
          </Text>
        );
      },
    },
    
    {
      header: "Date Created",
      accessorKey: "dateCreated",
      enableSorting: false, 
      cell: ({ row }) => {
        const createdAt = row.original.created_at;

        if (typeof createdAt === "string" || typeof createdAt === "number") {
          const dateObj = new Date(createdAt);
          const optionsDate = {
            day: "2-digit",
            month: "short",
            year: "numeric",
          } as const;

          const datePart = new Intl.DateTimeFormat("en-GB", optionsDate).format(
            dateObj
          );

          return <Text>{`${datePart}`}</Text>;
        }

        return <Text>Invalid date</Text>;
      },
    },
    {
      header: "Customers",
      accessorKey: "totalCustomer",
      enableSorting: false, 
      cell: (props) => {
        const totalCustomers = props.row.original.total_customers;
        return (
          <Text
            c={typeof totalCustomers === "number" ? "black" : "dimmed"}
            fw={500}
            className="text-sm font-medium"
          >
            {typeof totalCustomers === "number" ? totalCustomers : "No customers"}
          </Text>
        );
      },
    },    

    {
      header: "Status",
      accessorKey: "status",
      enableSorting: false, 
      cell: (props) => {
        const store = props.row.original;
        const locationId = store.locationID as string;
        const isActive = store.is_active === 1;
        // const [isActive, setIsActive] = useState(store.is_active === 1);

        const toggleMutation = useToggleStore(locationId);

        const handleSwitchToggle = () => {
          toggleMutation.mutate(undefined, {
            onSuccess: () => {
              const newStatus = isActive ? 0 : 1;
              props.row.original.is_active = newStatus;
              refetchStores?.();
        
              notifications.show({
                title: 'Store status updated',
                message: `Store ${newStatus === 1 ? 'Activated' : 'Deactivated'}.`,
                color: newStatus === 1 ? 'green' : 'red', 
              });
            },
            onError: (err) => {
              console.error("Toggle failed", err);
              notifications.show({
                title: 'Error',
                message: 'Failed to update store status. Please try again.',
                color: 'red',
              });
            },
          });
        };
        

        const dotClass = isActive ? "bg-[#27ae60]" : "bg-[#94a3b8]";
        const statusText = isActive ? "Active" : "Inactive";

        return (
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
                isActive
                  ? "bg-[#ECFDF3] text-[#027A48]"
                  : "bg-[#F2F4F7] text-[#667085]"
              }`}
            >
              <span
                className={`inline-block w-3 h-3 rounded-full ${dotClass}`}
              />
              <span className="ml-2">{statusText}</span>
            </div>

            <Switch
              checked={isActive}
              onChange={handleSwitchToggle}
              color="orange"
              size="md"
            />
          </div>
        );
      },
    },

    {
      header: "",
      accessorKey: "action",
      enableSorting: false, 
      cell: (props) => (
        <Link to={ROUTES.viewStore} state={{ store: props.row.original }}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <main className="w-full h-auto py-6 rounded-lg bg-white">
        <TanTable
          columnData={columns}
          data={stores}
          showSearch
          showSortFilter
          onSortChange={onSortChange}
          activeSort={activeSort} 
          searchPlaceholder="Search orders"
          serverSidePagination={true}
          paginationData={paginationData}
          onPageChange={onPageChange}
          length={8}
          tableTitle={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                Stores Overview
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{paginationData?.total}</Text>
              </div>
            </div>
          }
        />
      </main>
    </div>
  );
};

export default StoreOverviewTable;
