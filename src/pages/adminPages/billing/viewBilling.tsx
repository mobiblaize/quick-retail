/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, Card } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import PageContainer from "../../../layout/pageContainer";
import GenericTable from "../../../components/General/genericTable";
import { useState } from "react";
import { FilterValues } from "../../../components/General/table/reuseableFilter";

const ViewBilling = () => {
  const navigate = useNavigate();
  // const { billingId } = useParams<{ billingId: string }>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeSort, setActiveSort] = useState<string>("");
  const [filters, setFilters] = useState<FilterValues>({
    startDate: "",
    endDate: "",
    location: "",
    stockFrom: "",
    stockTo: "",
    orderStatus: "",
    role: "",
    module: "",
  });

  const handleBack = () => {
    navigate(-1);
  };

  const backButton = (
    <button
      onClick={handleBack}
      className="flex cursor-pointer gap-2 items-center"
    >
      <ChevronLeft />
      <Text fw={500} c="black">
        Back
      </Text>
    </button>
  );

  // Mock data for billing history
  const billingData = [
    {
      id: 1,
      orderId: "ORD-28401",
      date: "13 Jun 2024 4:20 PM",
      items: "12 items",
      orderValue: "₦ 256,000",
      feeCharges: "₦ 100",
    },
    {
      id: 2,
      orderId: "ORD-28401",
      date: "13 Jun 2024 4:20 PM",
      items: "5 items",
      orderValue: "₦ 256,000",
      feeCharges: "₦ 100",
    },
    {
      id: 3,
      orderId: "ORD-28401",
      date: "13 Jun 2024 4:20 PM",
      items: "12 items",
      orderValue: "₦ 256,000",
      feeCharges: "₦ 100",
    },
    {
      id: 4,
      orderId: "ORD-28401",
      date: "13 Jun 2024 4:20 PM",
      items: "12 items",
      orderValue: "₦ 256,000",
      feeCharges: "₦ 100",
    },
    {
      id: 5,
      orderId: "ORD-28401",
      date: "13 Jun 2024 4:20 PM",
      items: "13 items",
      orderValue: "₦ 256,000",
      feeCharges: "₦ 100",
    },
  ];

  const columns = [
    {
      key: "orderId",
      header: "Order ID",
      render: (row: any) => (
        <Text c="#101828" fw={600}>
          {row.orderId}
        </Text>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (row: any) => (
        <Text c="#667085" size="sm">
          {row.date}
        </Text>
      ),
    },
    {
      key: "items",
      header: "Items",
      render: (row: any) => (
        <Text c="#667085" size="sm">
          {row.items}
        </Text>
      ),
    },
    {
      key: "orderValue",
      header: "Order Value",
      render: (row: any) => (
        <Text c="#101828" size="sm">
          {row.orderValue}
        </Text>
      ),
    },
    {
      key: "feeCharges",
      header: "Fee charges",
      render: (row: any) => (
        <Text c="#F16722" size="sm" fw={600}>
          {row.feeCharges}
        </Text>
      ),
    },
  ];

  const subHeaders = [
    <>
      <div key="1" className="py-2.5">
        <div className="hidden sm:flex gap-8 items-center">{backButton}</div>
        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>
    </>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      {/* Summary Cards */}
      <Card padding="xl" radius="md" withBorder className=" shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col gap-1">
            <Text size="xs" c="#667085" fw={500}>
              Total orders
            </Text>
            <Text size="lg" c="#101828" fw={700}>
              2,840
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Text size="xs" c="#667085" fw={500}>
              Fee Rate
            </Text>
            <Text size="lg" c="#101828" fw={700}>
              100 / order
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Text size="xs" c="#667085" fw={500}>
              Total Fee
            </Text>
            <Text size="lg" c="#101828" fw={700}>
              286,000
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Text size="xs" c="#667085" fw={500}>
              Period
            </Text>
            <Text size="lg" c="#101828" fw={700}>
              01 Jun - 30 Jun 2026
            </Text>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <GenericTable
        enableSort={true}
        enableSearch={true}
        emptyMessage="No billing history found"
        searchTerm={searchTerm}
        data={billingData}
        isLoading={false}
        columns={columns}
        activeSort={activeSort}
        onSortChange={setActiveSort}
        searchPlaceholder="Search billing history"
        filters={filters}
        onFilterChange={setFilters}
        setSearchTerm={setSearchTerm}
        paginationData={{
          current_page: 3,
          last_page: 14,
        }}
        onPageChange={() => {}}
        titleSection={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="#101828">
              Billing History
            </Text>
            <div className="bg-[#FEF0E9] rounded-full flex items-center py-0.5 px-3">
              <Text c="#F16722">Kenge stores ltd • Order Break down</Text>
            </div>
          </div>
        }
      />
    </PageContainer>
  );
};

export default ViewBilling;
