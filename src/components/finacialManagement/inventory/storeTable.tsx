import { ColumnDef } from "@tanstack/react-table";
import { Avatar, Text } from "@mantine/core";
import imageSrc from "../../../assets/images/productIMG.png";
import { Link } from "react-router";
import { TableRowData } from "../../../types";
import { PaidDot, UnpaidDot } from "../../../assets/svg";
import TanTable from "../../General/table";
import { customerReturn, warehouseDetails } from "../../../utils/mockData";
import { ROUTES } from "../../../constants/routes";


const StoreTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
      
        size: 50,
        enableSorting: false,
        enableHiding: false,
      },      
      
    {
      header: "Description & Code",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={imageSrc}
            alt={row.original.name as string}
            radius="md"
            size={40}
          />
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.name}
            </Text>
            <Text fw={500} className="text-sm">
              {" "}
              <span className="">{row.original.productCode}</span>
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Division",
      accessorKey: "dateReturned",
      cell: ({ row }) => (
        <Text c="black" className="inline-flex bg-gray-200 items-center px-6 py-4 rounded-full font-medium text-sm ">{row.original.division}</Text>
      ),
    },
    {
      header: "Group & Quantity",
      accessorKey: "orderId",
      cell: (props) => (
        <div className="flex gap-4">Men 
          <Text fw={500} c="green">
           <span className="text-gray"></span>{props.row.original.productCode}
          </Text>
         
        </div>
      ),
    },
    {
      header: "Shipment Tag",
      accessorKey: "orderId",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
         {props.row.original.orderId}
          </Text>
         
        </div>
      ),
    },
    {
      header: "EAN",
      accessorKey: "orderId",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
         {props.row.original.ean}
          </Text>
         
        </div>
      ),
    },
    {
      header: "Lead Time",
      accessorKey: "orderId",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="gray-200">
         {props.row.original.dateReturned}
          </Text>
         
        </div>
      ),
    }, 
    {
      header: "Status",
      accessorKey: "customer",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Paid"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "Paid" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
   
   
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.viewReturns}>
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
        data={warehouseDetails}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={8}
        tableTitle={
          <div>
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
            All Products
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{customerReturn.length}</Text>
              </div>
            </div>
           
          </div>
        }
      />
    </main>
  );
};

export default StoreTable;
