import TanTable from "../../../General/table";
import { productTableData } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import { useLocation } from "react-router";
import { useGenerateReportExport } from "../../../../hooks/backendApis/pos/reports";
import { useEffect, useState } from "react";
import { shortenTransactionId } from "../../../../utils/helpers";


const ProductManagementReport  = () => {
  const location = useLocation();
  const { reportData, startDate, endDate } = location.state || {};
  const [data, setData] = useState<TableRowData[]>([]);
  const { mutateAsync: exportReport, isPending: isExporting } =
    useGenerateReportExport();

  function formatDate(dateStr: string | Date | undefined) {
    if (!dateStr) return "";
    const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-GB");
  }


  useEffect(() => {
    console.log("reportData:", reportData);
    if (Array.isArray(reportData?.data)) {
      const formattedData = reportData.data.map((item: any) => ({
        category: item["Category"],
        productCode: item["SKU"],
        product: item["Product Name"],
        stockLevel: item["Stock"],
        Amount: item["Price"],
        location:item["location"],
        discountStatus: item["Status"] === "Active" ? "Active" : "Draft",
      }));
      console.log("formattedData:", formattedData);
      setData(formattedData);
    } else {
      console.log("reportData.data is not an array or is missing");
    }
  }, [reportData]);
    const handleExport = async () => {
    const exportPayload = {
      start_date: startDate || "",
      end_date: endDate || "",
      report_type: "returns",
      export_format: "csv",
    };
  
    try {
      const blob = await exportReport(exportPayload);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `sales-report.${exportPayload.export_format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export report:", error);
    }
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
               {props.row.original.product}
             </Text>
             {/* <Text fw={500} className="text-[#667185] text-sm">
               {props.row.original.items}
             </Text> */}
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
       cell: (props) => (
        <Text c="textSecondary.7">{props.row.original.location}</Text>
      ),
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
       accessorKey: "Amount",
       cell: ({ row }) => (
        <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
          {row.original.Amount}
        </span>
      ),
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
               status === "Active"
                 ? "bg-[#ECFDF3] text-[#027A48]"
                 : "bg-[#FFFAEB] text-[#B54708]"
             }`}
           >
             {status === "Active" ? <PaidDot /> : <UnpaidDot />}
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
      data={data}
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
              <Text c="customPrimary.10">{data.length}</Text>
              </div>
            </div>
        
          
            <div className="flex items-center gap-3">
              <div className="border border-[#E0E0E0] rounded-lg px-4 py-2 flex items-center text-sm text-[#344054] min-w-[230px]">
                {formatDate(startDate)} – {formatDate(endDate)}
              </div>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className={`bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-md font-medium text-sm ${
                  isExporting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isExporting ? "Exporting..." : "Export"}
              </button>
            </div>
          </div>
        }
                 
    />
  </main>
   );
 };

export default ProductManagementReport 