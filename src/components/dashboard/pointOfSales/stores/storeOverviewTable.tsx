import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Text, Switch } from "@mantine/core";
import TanTable from "../../../General/table";
import { storeOverviewData as initialData, storeTargetOrder } from "../../../../utils/mockData";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { TableRowData } from "../../../../types";

const StoreOverviewTable = () => {
  const [tableData, setTableData] = useState(initialData);

  const handleToggle = (index: number) => {
    const updatedData = [...tableData];
    const currentStatus = updatedData[index].status;
    updatedData[index].status = currentStatus === "Active" ? "Inactive" : "Active";
    setTableData(updatedData);
  };

  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Store Name",
      accessorKey: "storeName",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.storeName}
          </Text>
          <Text fw={400} className="text-sm">
            Store ID: {props.row.original.storeId}
          </Text>
        </div>
      ),
    },
    {
      header: "Store Size",
      accessorKey: "store",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            GLA: {props.row.original.storeSizeA}
          </Text>
          <Text fw={400} className="text-sm">
            GSA: {props.row.original.storeSizeB}
          </Text>
        </div>
      ),
    },
    {
      header: "Store Location",
      accessorKey: "location",
      cell: (props) => <Text>{props.row.original.location}</Text>,
    },
    {
      header: "Date Created",
      accessorKey: "dateCreated",
      cell: (props) => (
        <Text c="black" fw={500} className="text-sm font-medium">
          {props.row.original.dateCreated}
        </Text>
      ),
    },
    {
      header: "Total Customers",
      accessorKey: "totalCustomer",
      cell: (props) => (
        <Text c="black" fw={500} className="text-sm font-medium">
          {props.row.original.totalCustomer}
        </Text>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const rowIndex = props.row.index;
        const status = props.row.original.status;

        return (
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
                status === "Active"
                  ? "bg-[#ECFDF3] text-[#027A48]"
                  : "bg-[#F2F4F7] text-[#667085]"
              }`}
            >
              {status === "Active" ? <PaidDot /> : <UnpaidDot />}
              <span className="ml-2">{status}</span>
            </div>
            <Switch
              checked={status === "Active"}
              onChange={() => handleToggle(rowIndex)}
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
      cell: () => (
        <Link to={ROUTES.viewStore}>
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
          data={tableData}
          showSearch
          showSortFilter
          searchPlaceholder="Search orders"
          length={5}
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
