/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Text, Group, Card, Badge, Box, Button } from "@mantine/core";
import { Calendar } from "lucide-react";
import PageContainer from "../../../layout/pageContainer";
import { DateInput } from "@mantine/dates";
import GenericTable from "../../../components/General/genericTable";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../constants/routes";

const BillingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"current">("current");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeSort, setActiveSort] = useState<string>("");

  const billingHistoryData = [
    {
      id: 1,
      period: "01 May - 31 May 2026",
      orders: "1,205",
      amount: "120,000",
      status: "Paid",
      statusColor: "green",
    },
    {
      id: 2,
      period: "01 Apr - 30 Apr 2026",
      orders: "988",
      amount: "99,000",
      status: "Paid",
      statusColor: "green",
    },
    {
      id: 3,
      period: "01 Mar - 31 Mar 2026",
      orders: "499",
      amount: "56,999",
      status: "Invoiced",
      statusColor: "blue",
    },
    {
      id: 4,
      period: "01 Mar - 31 Mar 2026",
      orders: "687",
      amount: "78,000",
      status: "Invoiced",
      statusColor: "blue",
    },
    {
      id: 5,
      period: "01 Mar - 28 Feb 2026",
      orders: "897",
      amount: "90,000",
      status: "Paid",
      statusColor: "green",
    },
    {
      id: 6,
      period: "02 Feb - 3 Mar 2026",
      orders: "202",
      amount: "37,000",
      status: "Invoiced",
      statusColor: "blue",
    },
    {
      id: 7,
      period: "4 Mar - 4 Apr 2026",
      orders: "677",
      amount: "87,000",
      status: "Paid",
      statusColor: "green",
    },
  ];

  const columns = [
    {
      key: "period",
      header: "Period",
      render: (row: any) => (
        <Text c="#101828" fw={500}>
          {row.period}
        </Text>
      ),
    },
    {
      key: "orders",
      header: "Total orders",
      render: (row: any) => <Text c="#667085">{row.orders}</Text>,
    },
    {
      key: "amount",
      header: "Fee Amount",
      render: (row: any) => <Text c="#667085">{row.amount}</Text>,
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <Group gap={6}>
          <Box
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor:
                row.statusColor === "green" ? "#12B76A" : "#2E90FA",
            }}
          />
          <Text
            size="sm"
            fw={500}
            c={row.statusColor === "green" ? "#12B76A" : "#2E90FA"}
          >
            {row.status}
          </Text>
        </Group>
      ),
    },
    {
      key: "invoice",
      header: "Invoice",
      render: (row: any) => (
        <Button
          variant="subtle"
          onClick={() => navigate(ROUTES.viewBillingPage(String(row.id)))}
          size="sm"
          className="cursor-pointer font-medium hover:underline"
          p={0}
          c="#F16722"
        >
          View Invoice
        </Button>
      ),
    },
  ];

  const subHeaders = [
    <Group justify="space-between" key="1" className="w-full">
      <Text fw={600} size="xl" c="black">
        Billing
      </Text>
      {/* "Add New User" button removed as requested */}
    </Group>,
    <Group gap={6} key="2" className="w-full mt-2">
      <Box
        style={{
          borderBottom: activeTab === "current" ? "2px solid #F16722" : "none",
          paddingBottom: "8px",
        }}
      >
        <Text
          unstyled
          fw={500}
          size="lg"
          className={`cursor-pointer ${
            activeTab === "current" ? "text-[#F16722]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("current")}
        >
          Current period
        </Text>
      </Box>
      {/* "Billing History" tab removed as requested */}
    </Group>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      {activeTab === "current" && (
        <div className="flex flex-col gap-8">
          {/* Transactions Overview */}
          <Card padding="xl" radius="md" withBorder className="shadow-xs">
            <Group justify="space-between" mb="xl">
              <div>
                <Text fw={600} size="lg" c="#101828">
                  Transactions Overview
                </Text>
                <Text size="sm" c="#667085">
                  This is an overview summarizing users
                </Text>
              </div>
              <Group gap="xs">
                <DateInput
                  placeholder="Start date"
                  value={startDate}
                  onChange={setStartDate}
                  leftSection={<Calendar size={16} />}
                  styles={{
                    input: { width: 140 },
                  }}
                />
                <Text c="#667085">-</Text>
                <DateInput
                  placeholder="End date"
                  value={endDate}
                  onChange={setEndDate}
                  leftSection={<Calendar size={16} />}
                  styles={{
                    input: { width: 140 },
                  }}
                />
              </Group>
            </Group>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card p="lg" radius="md" bg="#E6F4EA" withBorder={false}>
                <Text size="xs" c="#137333" fw={600}>
                  Billing Period
                </Text>
                <Text fw={700} size="xl" mt="xs" c="#101828">
                  01 Jun - 30 Jun 2026
                </Text>
                <Text size="xs" c="#667085" mt={4}>
                  30-day billing cycle
                </Text>
              </Card>

              <Card p="lg" radius="md" bg="#E8F0FE" withBorder={false}>
                <Text size="xs" c="#1967D2" fw={600}>
                  Total order Processed
                </Text>
                <Text fw={700} size="xl" mt="xs" c="#101828">
                  900
                </Text>
                <Text size="xs" c="#667085" mt={4}>
                  Orders this period
                </Text>
              </Card>

              <Card p="lg" radius="md" bg="#FEEFF0" withBorder={false}>
                <Text size="xs" c="#D93025" fw={600}>
                  Fee Acquired
                </Text>
                <Text fw={700} size="xl" mt="xs" c="#101828">
                  ₦ 70,000
                </Text>
                <Text size="xs" c="#667085" mt={4}>
                  700 orders X ₦ 100
                </Text>
              </Card>
            </div>
          </Card>

          {/* Period Status */}
          <div className="flex flex-col gap-2 p-5 bg-white rounded-lg">
            <Group gap="xs">
              <Text size="sm" fw={600} c="#344054">
                Period status
              </Text>
              <Badge
                color="orange"
                variant="light"
                size="sm"
                radius="xl"
                styles={{
                  label: { textTransform: "capitalize", fontWeight: 600 },
                }}
              >
                • Accruing
              </Badge>
            </Group>
            <Text size="sm" c="#667085">
              ₦ 100 is charged for every order processed on quick retail, your
              invoice is generated at the end of each billing period
            </Text>
          </div>

          {/* Billing History Section */}
          <GenericTable
            enableSearch
            enableSort
            data={billingHistoryData}
            isLoading={false}
            columns={columns}
            titleSection={
              <Group gap="sm">
                <Text fw={600} size="lg" c="#101828">
                  Billing history
                </Text>
                <Badge
                  color="orange"
                  variant="filled"
                  radius="xl"
                  size="sm"
                  bg="#FEF0E9"
                  c="#F16722"
                >
                  15
                </Badge>
              </Group>
            }
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchPlaceholder="Search users"
            activeSort={activeSort}
            onSortChange={setActiveSort}
          />
        </div>
      )}
    </PageContainer>
  );
};

export default BillingPage;
