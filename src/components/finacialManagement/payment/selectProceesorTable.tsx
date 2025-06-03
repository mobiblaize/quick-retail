import { ColumnDef } from "@tanstack/react-table";
import { Box, Button, Text } from "@mantine/core";
import TanTable from "../../General/table";
import { advancedPaid, productTableData } from "../../../utils/mockData";
import { TableRowData } from "../../../types";
import FormInput from "../../General/formInput";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../constants/routes";


const SelectProcessorTable = () => {
    const navigate = useNavigate();
    const handleContinue = () => {
        navigate(ROUTES.selectProceesor2)
            };
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
              All Vendor (Bills) Purchase Invoice
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{productTableData.length}</Text>
              </div>
            </div>
            <div>
              <Text fw={500} size="sm" c="textSecondary.9">
              Make Payment to Vendors and other deliverables in simple ways
              </Text>
            </div>
          </div>
        }
      />
      <Box className="font-sans "style={{ backgroundColor: '#FFEBD8', padding: '0.5rem', borderRadius: '8px' }}>
        <Box mt="lg" px="md">
          <div className="grid grid-cols-1 lg:grid-cols-4 bg-[#FFEBD8]">
          <div>
              <Text size="sm" color="dimmed">
  
              </Text>
              <Text size="md" color="black">
             
              </Text>
            </div>
            <div>
              <Text size="sm" color="dimmed">
              No. of Invoice Selected
              </Text>
              <Text size="md" color="black">
              Five (5P)
              </Text>
            </div>
            <div>
              <Text size="sm" color="dimmed">
              Total Outstanding Selected
              </Text>
              <Text size="md" color="black">
                ₦ 100,000
              </Text>
            </div>
            <div>
              <Text size="sm" color="dimmed">
              Total Amount Payable for Receipt 
              </Text>
              <Text size="xl" color="red">
                ₦ 100,000
              </Text>
            </div>
          </div>
        </Box>
      </Box>
      <div className="sticky bottom-0 right-0 bg-white py-6 border-t border-gray-200 mt-12">
  <div className="flex justify-end gap-4 px-8">
    <Button
      variant="outline"
      style={{
        color: "#475367",
        borderRadius: "0.375rem",
        height: "2.5rem",
        padding: "0.5rem 2.8rem",
        fontWeight: 500,
        fontSize: "14px",
        border: "1px solid #475367",
        width: "fit-content",
      }}
    >
      Back
    </Button>

    <Button
      variant="filled"
      style={{
        backgroundColor: "#F16722",
        color: "white",
        borderRadius: "0.375rem",
        height: "2.5rem",
        padding: "0.5rem 2.8rem",
        fontWeight: 500,
        fontSize: "14px",
        width: "fit-content",
      }}
      onClick={handleContinue}
    >
      Continue
    </Button>
  </div>
</div>

    </main>
  );
};

export default SelectProcessorTable;
