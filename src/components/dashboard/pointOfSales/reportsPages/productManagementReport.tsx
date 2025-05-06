import TanTable from "../../../General/table";
import { productTableData } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
// import { Menu, Button } from "@mantine/core";
// import { MoreVertical } from "lucide-react";


const ProductManagementReport  = () => {
  const columns: ColumnDef<TableRowData>[] = [
     {
       header: "Name",
       accessorKey: "name",
       cell: (props) => (
         <div className="flex items-center gap-3">
           <Avatar
             src={imageSrc}
             alt={props.row.original.name as string}
             radius="md"
             size={40}
           />
 
           <div className="flex flex-col">
             <Text fw={500} c="black">
               {props.row.original.name}
             </Text>
             <Text fw={500} className="text-[#667185] text-sm">
               {props.row.original.items}
             </Text>
           </div>
         </div>
       ),
     },
     {
       header: "Product Code",
       accessorKey: "productCode",
       cell: (props) => (
         <Text c="textSecondary.7">{props.row.original.productCode}</Text>
       ),
     },
     {
       header: "Location",
       accessorKey: "location",
     },
     {
       header: "Category",
       accessorKey: "category",
       cell: ({ row }) => (
         <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
           {row.original.category}
         </span>
       ),
     },
     {
       header: "Selling Price",
       accessorKey: "sellingPrice",
     },
     {
       header: "Stock Level",
       accessorKey: "stockLevel",
       cell: (props) => (
         <span className="font-medium text-center">
           {props.row.original.stockLevel}
         </span>
       ),
     },
     {
       header: "Discount Status",
       accessorKey: "discountStatus",
       cell: (props) => {
         const status = props.row.original.discountStatus;
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
   ];
   return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
    <TanTable
      columnData={columns}
      data={productTableData}
      showSearch={false}     
      showSortFilter={false}  
      length={5}
      tableTitle={
          <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      
            <div className="flex gap-2.5 items-center">
              <Text fw={500} size="xl" c="textSecondary.9">
                Products
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{productTableData.length}</Text>
              </div>
            </div>
        
          
            <div className="flex items-center gap-3">
              <div className="border border-[#E0E0E0] rounded-lg px-4 py-2 flex items-center text-sm text-[#344054] min-w-[230px]">
                14/01/2025 – 14/02/2025
              </div>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-md font-medium text-sm">
                Export
              </button>
            </div>
          </div>
        }
                 
    />
  </main>
   );
 };

export default ProductManagementReport 