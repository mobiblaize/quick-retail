import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { useState } from "react";
import DeleteSubCategory from "./modals/deleteSubCategory";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { subCategoriesData } from "../../../../utils/mockData";

const SubCategoryTable = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Division",
      accessorKey: "division",
      cell: ({ row }) => (
        <Text fw={700} c="#101928">
          {row.original.division}
        </Text>
      ),
    },
    {
      header: "Total Product",
      accessorKey: "totalProduct",
    },
    {
      header: "Date Modified",
      accessorKey: "dateModified",
      cell: ({ row }) => <Text>{row.original.dateModified}</Text>,
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <button onClick={() => setIsDeleteOpen(true)}>
          <Text fw={600} c="#1D2939" className="cursor-pointer">
            Delete
          </Text>
        </button>
      ),
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.categoryCollection}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        </Link>
      ),
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={subCategoriesData}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Sub-categories
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{subCategoriesData.length}</Text>
            </div>
          </div>
        }
      />
      <DeleteSubCategory
        opened={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      />
    </main>
  );
};

export default SubCategoryTable;
