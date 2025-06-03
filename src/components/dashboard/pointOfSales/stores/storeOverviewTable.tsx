import { FC } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Text, Switch, Loader } from "@mantine/core";
import TanTable from "../../../General/table";
import { storeTargetOrder } from "../../../../utils/mockData";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { TableRowData } from "../../../../types";
import { useToggleStore } from "../../../../hooks/backendApis/pos/storeManagement";
import { shortenTransactionId } from "../../../../utils/helpers";

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
};

const StoreOverviewTable: FC<StoreOverviewTableProps> = ({
  stores = [],
  loading = false,
  refetchStores,
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
      header: "Store Name",
      accessorKey: "name",
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
    // {
    //   header: "Store Size",
    //   accessorKey: "store",
    //   cell: (props) => (
    //     <div className="flex flex-col">
    //       <Text fw={500} c="black">
    //         GLA: {props.row.original.gla}
    //       </Text>
    //       <Text fw={400} className="text-sm">
    //         GSA: {props.row.original.gsa}
    //       </Text>
    //     </div>
    //   ),
    // },
    {
      header: "Store Location",
      accessorKey: "location",
      cell: (props) => <Text>{props.row.original.lga}</Text>,
    },
    {
      header: "Date Created",
      accessorKey: "dateCreated",
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
      header: "Total Customers",
      accessorKey: "totalCustomer",
      cell: (props) => (
        <Text c="black" fw={500} className="text-sm font-medium">
          {props.row.original.total_customers}
        </Text>
      ),
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const store = props.row.original;
        const locationId = store.locationID as string;
        const isActive = store.is_active === 1;
        // const [isActive, setIsActive] = useState(store.is_active === 1);

        const toggleMutation = useToggleStore(locationId);

        const handleSwitchToggle = () => {
          toggleMutation.mutate(undefined, {
            onSuccess: () => {
              props.row.original.is_active = isActive ? 0 : 1;

              refetchStores?.();
            },
            onError: (err) => {
              console.error("Toggle failed", err);
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
          searchPlaceholder="Search orders"
          length={8}
          tableTitle={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                Stores Overview
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{storeTargetOrder.length}</Text>
              </div>
            </div>
          }
        />
      </main>
    </div>
  );
};

export default StoreOverviewTable;
