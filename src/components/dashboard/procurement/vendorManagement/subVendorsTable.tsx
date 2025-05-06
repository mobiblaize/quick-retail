import TanTable from "../../../General/table";
import { subVendorsData } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/pdfimage.png";

const SubVendorsTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Vendor Name/ID",
      accessorKey: "requestDetails",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.vendorName}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Name of Project",
      accessorKey: "projectname",
    },
    {
      header: "Date Created",
      accessorKey: "dateReturned",
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.category}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "No. of Sub-vendor",
      accessorKey: "subVendor",
      cell: (props) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={imageSrc}
            alt={props.row.original.pdfname as string}
            radius="md"
            size={40}
          />

          <div className="flex flex-col">
            <Text fw={500} c="black">
              {props.row.original.pdfname}
            </Text>
            <Text fw={500} className="text-[#667185] text-sm">
              {props.row.original.items}
            </Text>
          </div>
        </div>
      ),
    },

    {
      header: "Amount Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
                status === "Completed"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : status === "Pending"
                ? "bg-[#FFFAEB] text-[#B54708]"
                : status === "Cancelled"
                ? "bg-red-100 text-red-500"
                : ""
            }`}
          >
            {status === "Completed" ? <PaidDot /> : <UnpaidDot />}
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
        data={subVendorsData}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Sub Vendors
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{subVendorsData.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default SubVendorsTable;
