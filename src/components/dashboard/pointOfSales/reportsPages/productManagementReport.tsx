/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Avatar, Text, Badge } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { TableRowData } from "../../../../types";
import { useGenerateReport } from "../../../../hooks/backendApis/pos/reports";
import GenericTable from "../../../General/genericTable";

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

  const [rows, setRows] = useState<TableRowData[]>([]);
  const [paginationData, setPaginationData] = useState<any>(initialSection);
  const [loading, setLoading] = useState(false);

  // format incoming data into table rows
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

  useEffect(() => {
    if (Array.isArray(initialSection?.data)) {
      setRows(formatProducts(initialSection.data));
      setPaginationData(initialSection);
    }
  }, [initialSection]);

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
      setRows(Array.isArray(section?.data) ? formatProducts(section.data) : []);
    } catch (err) {
      console.error("Pagination fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "product",
      header: "Name",
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={
              Array.isArray(row.imageUrl)
                ? row.imageUrl[0] ?? ""
                : row.imageUrl
            }
            alt={row.product}
            radius="md"
            size={40}
          />
          <Text fw={500} c="black">
            {row.product}
          </Text>
        </div>
      ),
    },
    {
      key: "productCode",
      header: "Product Code",
      render: (row: any) => <Text c="gray.7">{row.productCode}</Text>,
    },
    {
      key: "location",
      header: "Location",
      render: (row: any) => <Text c="gray.7">{row.location}</Text>,
    },
    {
      key: "category",
      header: "Category",
      render: (row: any) => (
        <Badge color="gray" variant="light" radius="lg">
          {row.category}
        </Badge>
      ),
    },
    {
      key: "costPrice",
      header: "Cost Price",
      render: (row: any) => (
        <Text fw={500} c="black">
          ₦{row.costPrice}
        </Text>
      ),
    },
    {
      key: "Amount",
      header: "Selling Price",
      render: (row: any) => (
        <Text fw={500} c="black">
          ₦{row.Amount}
        </Text>
      ),
    },
    {
      key: "margin",
      header: "Margin",
      render: (row: any) => (
        <Text fw={500} c="black">
          ₦{row.margin}
        </Text>
      ),
    },
    {
      key: "stockLevel",
      header: "Stock Level",
      render: (row: any) => <Text fw={500}>{row.stockLevel}</Text>,
    },
    {
      key: "discountStatus",
      header: "Status",
      render: (row: any) => {
        const status = row.discountStatus;
        const isActive = status.toLowerCase() === "active";
        return (
          <Badge
            leftSection={isActive ? <PaidDot /> : <UnpaidDot />}
            color={isActive ? "green" : "orange"}
            variant="light"
            radius="lg"
            style={{ textTransform: "none" }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </Badge>
        );
      },
    },
  ];

  return (
    <main className="w-full h-auto">
      <GenericTable
        columns={columns}
        data={rows}
        isLoading={loading}
        paginationData={{
          current_page: paginationData?.current_page,
          last_page: paginationData?.last_page,
          per_page: paginationData?.per_page,
          total: paginationData?.total,
        }}
        onPageChange={fetchPage}
        titleSection={
          <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex gap-2.5 items-center">
              <Text fw={500} size="xl" c="textSecondary.9">
                Products
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{paginationData?.total}</Text>
              </div>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default ProductManagementReport;
