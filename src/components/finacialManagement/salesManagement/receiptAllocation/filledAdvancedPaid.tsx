import { ColumnDef } from "@tanstack/react-table";
import { Box, Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { TableRowData } from "../../../../types";
import { advancedPaid, productTableData } from "../../../../utils/mockData";
import FormInput from "../../../General/formInput";

const FilledAdvancedPaidTable = () => {
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
      header: "Invoice ID",
      accessorKey: "id",
      cell: (props) => (
        <div className="flex gap-1">
          <Text fw={500} c="black">
            {props.row.original.id}
          </Text>
        </div>
      ),
    },
    {
      header: "Timestamp",
      accessorKey: "timeStamp",
      cell: ({ row }) => (
        <Text className="text-gray-900 text-sm font-medium">
          {row.original.timeStamp}
        </Text>
      ),
    },
    {
      header: "Receipt Values",
      accessorKey: "totalAmount",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.totalAmount}
          </Text>
        </div>
      ),
    },
    {
      header: "Amount to Allocate",
      accessorKey: "totalAmount",
      cell: () => (
        <div className="flex flex-col">
          <div className="space-y-4 grid grid-cols-1">
            <FormInput
              label=""
              placeholder="3000"
              paddingY={6}
              bgColor="#B5E3C4"
              className="w-[128px] rounded-lg text-[#0F973D]"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={advancedPaid}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={8}
        tableTitle={
          <div>
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                Partially Paid Invoices
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{productTableData.length}</Text>
              </div>
            </div>
            <div>
              <Text fw={500} size="sm" c="textSecondary.9">
                Select a an invoice (s) with the checkmark and correspond a
                receipt (s) for it
              </Text>
            </div>
          </div>
        }
      />
      <Box className="font-sans "style={{ backgroundColor: '#FFEBD8', padding: '0.5rem', borderRadius: '8px' }}>
        <Box mt="lg" px="md">
          <div className="flex justify-between bg-[#FFEBD8]">
            <div>
              <Text size="sm" color="dimmed">
                Total Invoice Amount.
              </Text>
              <Text size="md" color="black">
                ₦ 600,000
              </Text>
            </div>
            <div>
              <Text size="sm" color="dimmed">
                Total Allocation (Invoice Value)
              </Text>
              <Text size="md" color="black">
                ₦ 0000
              </Text>
            </div>
            <div>
              <Text size="sm" color="dimmed">
                Total Invoice Outstanding.
              </Text>
              <Text size="xl" color="red">
                ₦ 0000
              </Text>
            </div>
          </div>
        </Box>
      </Box>
    </main>
  );
};

export default FilledAdvancedPaidTable;
