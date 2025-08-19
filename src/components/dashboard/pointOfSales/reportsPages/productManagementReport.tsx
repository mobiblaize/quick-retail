import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { useEffect, useState, useMemo } from "react";
import { useGenerateReport } from "../../../../hooks/backendApis/pos/reports";

const ProductManagementReport = ({ reportInfo }: { reportInfo: any }) => {
  const { reportData, startDate, endDate, locationId, reportType, per_page = 10 } =
    reportInfo || {};
  const generateReport = useGenerateReport();


  const getProductsSection = (obj: any) =>
    obj?.data?.data?.data?.products ??
    obj?.data?.data?.products ??
    obj?.data?.products;


  const initialSection = useMemo(
    () => getProductsSection(reportData),
    [reportData]
  );

  const [data, setData] = useState<TableRowData[]>([]);
  const [paginationData, setPaginationData] = useState<any>(initialSection);
  const [, setLoading] = useState(false);


  const formatProducts = (list: any[]) =>
    list.map((item: any) => ({
      category: item["Category"],
      costPrice: item["Cost price"],
      margin: item["Margin"],
      productCode: item["SKU"],
      product: item["Product Name"],
      stockLevel: item["Stock"],
      Amount: item["Selling price"],
      location: item["Location"],
      discountStatus: item["Status"] === "Active" ? "Active" : "Inactive",
      imageUrl: item["Image"],
    }));

  // Load page 1 from passed-in data
  useEffect(() => {
    if (Array.isArray(initialSection?.data)) {
      setData(formatProducts(initialSection.data));
      setPaginationData(initialSection);
    }
  }, [initialSection]);

  // Fetch and update for a specific page
  const fetchPage = async (page: number) => {
    setLoading(true);
    try {
      const payload = {
        start_date: startDate,
        end_date: endDate,
        report_type: reportType || "products",
        locationId,
        paginate: true,
        per_page,
        page,
      };

      const res = await generateReport.mutateAsync(payload);
      const section = getProductsSection(res);

      setPaginationData(section);
      setData(Array.isArray(section?.data) ? formatProducts(section.data) : []);
    } catch (err) {
      console.error("Pagination fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Name",
      accessorKey: "name",
      enableSorting: false,
      cell: (props) => (
        <div className="flex items-center gap-3">
          <Avatar
                   /* @ts-ignore */
            src={props.row.original.imageUrl ?? undefined}
            alt={props.row.original.product as string}
            radius="md"
            size={40}
          />
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {props.row.original.product}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Product Code",
      accessorKey: "productCode",
      enableSorting: false,
      cell: (props) => <Text c="textSecondary.7">{props.row.original.productCode}</Text>,
    },
    {
      header: "Location",
      accessorKey: "location",
      enableSorting: false,
      cell: (props) => <Text c="textSecondary.7">{props.row.original.location}</Text>,
    },
    {
      header: "Category",
      accessorKey: "category",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
          {row.original.category}
        </span>
      ),
    },
    {
      header: "Cost Price",
      accessorKey: "cost price",
      enableSorting: false,
      cell: ({ row }) => (
        <span className=" text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
          ₦{row.original.costPrice}
        </span>
      ),
    },
    {
      header: "Selling Price",
      accessorKey: "Amount",
      enableSorting: false,
      cell: ({ row }) => (
        <span className=" text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
          ₦{row.original.Amount}
        </span>
      ),
    },
    {
      header: "Margin",
      accessorKey: "margin",
      enableSorting: false,
      cell: ({ row }) => (
        <span className=" text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
          ₦{row.original.margin}
        </span>
      ),
    },
    {
      header: "Stock Level",
      accessorKey: "stockLevel",
      enableSorting: false,
      cell: (props) => (
        <span className="font-medium text-center">
          {props.row.original.stockLevel}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "discountStatus",
      enableSorting: false,
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
        serverSidePagination={true}
        paginationData={{
          current_page: paginationData?.current_page,
          last_page: paginationData?.last_page,
          per_page: paginationData?.per_page,
          total: paginationData?.total,
          from: paginationData?.from,
          to: paginationData?.to,
          next_page_url: paginationData?.next_page_url,
          prev_page_url: paginationData?.prev_page_url,
        }}
        onPageChange={fetchPage} // <-- real API call
        length={8}
        // loading={loading}
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
          </div>
        }
        tableType={"product"}
      />
    </main>
  );
};

export default ProductManagementReport;
