import { useEffect, useState } from "react";
import {
  Paper,
  Title,
  Text,
  Stack,
  Group,
  TextInput,
  Select,
  Radio,
  Button,
  Divider,
} from "@mantine/core";

export type DiscountType = "" | "amount" | "percentage";
export type Reason = "all" | "damaged" | "mistaken" | "size issue" | "others";

export interface FilterValues {
  startDate: string;
  endDate: string;
  location: string;
  category?: string;
  stockFrom: string;
  stockTo: string;
  orderStatus: string;
  priceFrom?: string;
  priceTo?: string;
  paymentStatus?: string;
  auditStatus?: string;
  productStatus?: string;
  reason?: Reason;
  type?: DiscountType;
  discountStatus?: string;
  returnStatus?: string;
  role: string;
  module: string;
  [key: string]: string | undefined;
}

export interface ReusableFilterComponentProps {
  onFilterChange: (filters: FilterValues) => void;
  locations?: string[];
  categories?: string[];
  reasons?: string[];
  roles?: string[];
  modules?: string[];
  types?: string[];
  filterType: "inventory" | "product" | "sales" | "returns" | "discount" | "audit";
  showLocation?: boolean;
  showCategory?: boolean;
  showStockLevel?: boolean;
  showOrderStatus?: boolean;
  showPrice?: boolean;
  showPaymentStatus?: boolean;
  showProductStatus?: boolean;
  showReason?: boolean;
  showDiscountType?: boolean;
  showDiscountStatus?: boolean;
  showReturnStatus?: boolean;
  showRole?: boolean;
  showModule?: boolean;
  setFiltersApplied?: (value: boolean) => void;
  setAppliedFilters?: (filters: FilterValues) => void;
  onResetFilter?: () => void;
}

const inputStyles = {
  input: {
    borderColor: "#E5E7EB",
    padding: "8px 12px",
    fontSize: 14,
    borderRadius: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 4,
  },
} as const;

const ReusableFilterComponent: React.FC<ReusableFilterComponentProps> = ({
  onFilterChange,
  locations = [],
  categories = [],
  roles = [],
  modules = [],
  showLocation,
  showCategory,
  showStockLevel,
  showOrderStatus,
  showPrice = false,
  showPaymentStatus = false, // ✅ used here
  showProductStatus = false,
  showReason = false,
  showDiscountType = false,
  showDiscountStatus = false,
  showReturnStatus = false,
  showRole = false,
  showModule = false,
  setFiltersApplied,
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    startDate: '',
    endDate: '',
    location: '',
    category: '',
    reason:'all',
    stockFrom: '',
    stockTo: '',
    orderStatus: 'All',
    priceFrom: '',
    priceTo: '',
    paymentStatus: 'All',
    auditStatus: "All",
    productStatus: 'All',
    type: '',
    discountStatus: 'All',
     returnStatus: 'All',
    role: '',
    module: '',
  });

  const handleClear = () => {
    const cleared: FilterValues = {
      startDate: '',
      endDate: '',
      location: '',
      category: '',
      reason: 'all',
      stockFrom: '',
      stockTo: '',
      orderStatus: 'All',
      paymentStatus: 'All',
      priceFrom: '',
      priceTo: '',
      productStatus: '',
      type: '',
      discountStatus: 'All',
      returnStatus: 'All',
      role: '',
      module: '',
    };

    setFilters(cleared);
  };

  useEffect(() => {
    const hasFilters = Object.entries(filters).some(
      ([, val]) => val && val !== "" && val !== "All" && val !== "all"
    );
    setFiltersApplied?.(hasFilters);
  }, [filters, setFiltersApplied]);

  return (
    <Paper
      w={320}
      bg="white"
      radius="lg"
      p="md"
      withBorder={false}
    >
      <Title
        order={4}
        style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: 16 }}
      >
        FILTER
      </Title>

      {/* Date */}
      <Stack gap={8} mb={16}>
        <Text fz="sm" fw={500}>
          Date
        </Text>
        <Group gap="sm" grow>
          <TextInput
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.currentTarget.value })}
            styles={inputStyles}
          />
          <TextInput
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.currentTarget.value })}
            styles={inputStyles}
          />
        </Group>
      </Stack>

      {/* Location */}
      {showLocation && (
        <Stack gap={8} mb={16}>
          <Text fz="sm" fw={500}>
            Store
          </Text>
          <Select
            placeholder="Choose location"
            value={filters.location || null}
            onChange={(val) => setFilters({ ...filters, location: val ?? "" })}
            data={locations}
            styles={inputStyles}
            allowDeselect
            clearable
          />
        </Stack>
      )}

      {/* Category */}
      {showCategory && (
        <Stack gap={8} mb={16}>
          <Text fz="sm" fw={500}>
            Category
          </Text>
          <Select
            placeholder="Choose category"
            value={filters.category || null}
            onChange={(val) => setFilters({ ...filters, category: val ?? "" })}
            data={categories}
            styles={inputStyles}
            allowDeselect
            clearable
          />
        </Stack>
      )}

      {/* Reason */}
      {showReason && (
        <Stack gap={8} mb={16}>
          <Text fz="sm" fw={500}>
            Reason
          </Text>
          <Select
            value={filters.reason || "all"}
            onChange={(val) =>
              setFilters({ ...filters, reason: (val as Reason) ?? "all" })
            }
            data={["all", "damaged", "mistaken", "size issue", "others"]}
            styles={inputStyles}
          />
        </Stack>
      )}

      {/* Discount Type */}
      {showDiscountType && (
        <Stack gap={8} mb={16}>
          <Text fz="sm" fw={500}>
            Discount Type
          </Text>
          <Select
            value={filters.type || "all"}
            onChange={(val) =>
              setFilters({ ...filters, type: (val as DiscountType) ?? "all" })
            }
            data={[
              { value: "all", label: "All" },
              { value: "amount", label: "Amount Off" },
              { value: "percentage", label: "Percentage Off" },
            ]}
            styles={inputStyles}
          />
        </Stack>
      )}

      {/* Stock level */}
      {showStockLevel && (
        <Stack gap={8} mb={16}>
          <Text fz="sm" fw={500}>
            Stock level
          </Text>
          <Group gap="sm">
            <TextInput
              type="number"
              placeholder="From"
              value={filters.stockFrom}
              onChange={(e) =>
                setFilters({ ...filters, stockFrom: e.currentTarget.value })
              }
              styles={inputStyles}
              style={{ width: 156 }}
            />
            <TextInput
              type="number"
              placeholder="To"
              value={filters.stockTo}
              onChange={(e) =>
                setFilters({ ...filters, stockTo: e.currentTarget.value })
              }
              styles={inputStyles}
              style={{ width: 156 }}
            />
          </Group>
        </Stack>
      )}

      {/* Price level */}
      {showPrice && (
        <Stack gap={8} mb={16}>
          <Text fz="sm" fw={500}>
            Price (₦)
          </Text>
          <Group gap="sm" grow>
            <TextInput
              type="number"
              placeholder="From"
              value={filters.priceFrom}
              onChange={(e) =>
                setFilters({ ...filters, priceFrom: e.currentTarget.value })
              }
              styles={inputStyles}
            />
            <TextInput
              type="number"
              placeholder="To"
              value={filters.priceTo}
              onChange={(e) =>
                setFilters({ ...filters, priceTo: e.currentTarget.value })
              }
              styles={inputStyles}
            />
          </Group>
        </Stack>
      )}

      {/* Role */}
      {showRole && (
        <Stack gap={8} mb={16}>
          <Text fz="sm" fw={500}>
            Role
          </Text>
          <Select
            placeholder="Select Role"
            value={filters.role || null}
            onChange={(val) => setFilters({ ...filters, role: val ?? "" })}
            data={roles}
            styles={inputStyles}
            allowDeselect
            clearable
          />
        </Stack>
      )}

      {/* Module */}
      {showModule && (
        <Stack gap={8} mb={16}>
          <Text fz="sm" fw={500}>
            Module
          </Text>
          <Select
            placeholder="Select Module"
            value={filters.module || null}
            onChange={(val) => setFilters({ ...filters, module: val ?? "" })}
            data={modules}
            styles={inputStyles}
            allowDeselect
            clearable
          />
        </Stack>
      )}

      {/* Order Status */}
      {showOrderStatus && (
        <Stack gap={8} mb={16}>
          <Text fz="sm" fw={500}>
            Order Status
          </Text>

          <Radio.Group
            name="orderStatus"
            value={filters.orderStatus}
            onChange={(val) => setFilters({ ...filters, orderStatus: val })}
          >
            <Group justify="space-around" gap="xs" wrap="wrap">
              {[
                { value: "All", label: "All" },
                { value: "available", label: "Available" },
                { value: "low_stock", label: "Low Stock" },
                { value: "sold_out", label: "Sold Out" },
              ].map((status) => (
                <Radio
                  key={status.value}
                  value={status.value}
                  label={status.label}
                  size="sm"
                />
              ))}
            </Group>
          </Radio.Group>
        </Stack>
      )}


      {/* ✅ Payment Status */}
      {showPaymentStatus && (
        <Stack gap={8} mb={16}>
          <Text fz="sm" fw={500}>
            Payment Status
          </Text>
          <Radio.Group
            name="paymentStatus"
            value={filters.paymentStatus}
            onChange={(val) => setFilters({ ...filters, paymentStatus: val })}
          >
            <Group justify="space-around" gap="xs" wrap="wrap">
              {["All", "Paid", "Unpaid"].map((status) => (
                <Radio key={status} value={status} label={status} size="sm" />
              ))}
            </Group>
          </Radio.Group>
        </Stack>
      )}

      {/* Product Status */}
      {showProductStatus && (
        <Stack gap={8} mb={16}>
          <Text fz="sm" fw={500}>
            Status
          </Text>
          <Radio.Group
            name="productStatus"
            value={filters.productStatus}
            onChange={(val) => setFilters({ ...filters, productStatus: val })}
          >
            <Group justify="space-around" gap="xs" wrap="wrap">
              {["All", "Active", "Inactive"].map((status) => (
                <Radio key={status} value={status} label={status} size="sm" />
              ))}
            </Group>
          </Radio.Group>
        </Stack>
      )}

      {/* Discount Status */}
      {showDiscountStatus && (
        <Stack gap={8} mb={16}>
          <Text fz="sm" fw={500}>
            Order Status
          </Text>
          <Radio.Group
            name="discountStatus"
            value={filters.discountStatus}
            onChange={(val) => setFilters({ ...filters, discountStatus: val })}
          >
            <Group justify="space-around" gap="xs" wrap="wrap">
              {["All", "Active", "Inactive", "Expired"].map((status) => (
                <Radio key={status} value={status} label={status} size="sm" />
              ))}
            </Group>
          </Radio.Group>
        </Stack>
      )}

      {/* Return Status */}
      {showReturnStatus && (
        <Stack gap={8} mb={16}>
          <Text fz="sm" fw={500}>
            Return Status
          </Text>
          <Radio.Group
            name="returnStatus"
            value={filters.returnStatus}
            onChange={(val) => setFilters({ ...filters, returnStatus: val })}
          >
            <Group justify="space-around" gap="xs" wrap="wrap">
              {["All", "Resolved", "Pending", "Declined"].map((status) => (
                <Radio key={status} value={status} label={status} size="sm" />
              ))}
            </Group>
          </Radio.Group>
        </Stack>
      )}

      <Divider my="sm" />

      {/* Buttons */}
      <Group gap="sm" grow mt="sm">
        <Button
          variant="outline"
          color="orange"
          radius="lg"
          onClick={handleClear}
        >
          <Text fz="sm" fw={500} c="textSecondary.9">Clear All</Text>
        </Button>
        <Button
          color="orange"
          radius="lg"
          onClick={() => onFilterChange(filters)}
        >
          <Text fz="sm" fw={500} c="#fff">Filter</Text>
        </Button>
      </Group>
    </Paper>
  );
};

export default ReusableFilterComponent;
