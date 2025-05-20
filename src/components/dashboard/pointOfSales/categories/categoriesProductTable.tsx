import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Text, Switch } from "@mantine/core";
import TanTable from "../../../General/table";
import { categoriesProductSingle } from "../../../../utils/mockData";
// import { Link } from "react-router";
// import { ROUTES } from "../../../../constants/routes";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { TableRowData } from "../../../../types";
import DeleteSubCategory from "./modals/deleteSubCategory";

const CategoriesProductTable = () => {
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false);
  const [tableData, setTableData] = useState(categoriesProductSingle);

  const handleToggle = (index: number) => {
    const updatedData = [...tableData];
    const currentStatus = updatedData[index].status;
    updatedData[index].status =
      currentStatus === "Active" ? "Inactive" : "Active";
    setTableData(updatedData);
  };

  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Product Name",
      accessorKey: "storeName",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.storeName}
          </Text>
          {/* <Text fw={400} className="text-sm">
            Store ID: {props.row.original.storeId}
          </Text> */}
        </div>
      ),
    },
    {
      header: "Quantity",
      accessorKey: "store",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.storeSizeA} left
          </Text>
          {/* <Text fw={400} className="text-sm">
            GSA: {props.row.original.storeSizeB}
          </Text> */}
        </div>
      ),
    },

    {
      header: "Date Modified",
      accessorKey: "dateCreated",
      cell: (props) => (
        <Text c="black" fw={500} className="text-sm font-medium">
          {props.row.original.dateCreated}
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
            <Switch
              checked={status === "Active"}
              onChange={() => handleToggle(rowIndex)}
              color="orange"
              size="md"
            />
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
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Text fw={600} c="black" className="cursor-pointer"  onClick={() => setIsDeleteCategoryOpen(true)}>
          Delete
        </Text>
      ),
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        // <Link to={ROUTES.viewStore}>
        <Text fw={600} c="customPrimary.10" className="cursor-pointer">
          View
        </Text>
        // </Link>
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
                Products
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">
                  {categoriesProductSingle.length}
                </Text>
              </div>
            </div>
          }
        />
        <DeleteSubCategory
          opened={isDeleteCategoryOpen}
          onClose={() => setIsDeleteCategoryOpen(false)}
        />
      </main>
    </div>
  );
};

export default CategoriesProductTable;
