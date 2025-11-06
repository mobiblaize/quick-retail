import { Table, Box, Pagination, Text } from "@mantine/core";
import type { ReactNode } from "react";
import * as React from "react";
import EmptyState2 from "../table/EmptyStte2";
import ReusableFilterComponent, {
  FilterValues,
} from "../table/reuseableFilter";
import SearchComp from "../table/searchComp";
import SortFilter from "../table/sortFilter";
import TableSkeleton from "../../../pages/TableSkeleton";

export interface PaginationData {
  current_page: number;
  last_page: number;
  per_page?: number;
  total?: number;
}

interface GenericTableProps<T> {
  enableSearch?: boolean;
  enableSort?: boolean;
  data: T[];
  isLoading: boolean;
  paginationData?: PaginationData;
  onPageChange?: (page: number) => void;
  columns: {
    key: string;
    header: string;
    render: (row: T) => ReactNode;
    width?: string | number;
  }[];
  actions?: (row: T) => ReactNode;
  emptyMessage?: string;
  titleSection?: ReactNode;

  // Search props
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  searchPlaceholder?: string;
  debounceDelay?: number;

  // Sort props
  sortOptions?: { label: string; key: string }[];
  activeSort?: string;
  onSortChange?: (sortBy: string) => void;

  // Filter props
  onFilterChange?: (filters: FilterValues) => void;
  filters?: FilterValues;
  showFilter?: boolean;
  tableType?:
    | "inventory"
    | "sales"
    | "product"
    | "returns"
    | "discount"
    | "audit"
    | "transaction"
    | "userManagement";
  locations?: string[];
  categories?: string[];
  roles?: string[];
  modules?: string[];
}

export default function GenericTable<T>({
  enableSearch,
  enableSort,
  data,
  isLoading,
  paginationData,
  onPageChange,
  columns,
  actions,
  titleSection,
  searchTerm,
  setSearchTerm,
  searchPlaceholder,
  debounceDelay = 2000,
  sortOptions,
  activeSort,
  onSortChange,
  showFilter,
  tableType,
  locations,
  categories,
  roles,
  modules,
  onFilterChange,
  filters = {
    startDate: "",
    endDate: "",
    location: "",
    stockFrom: "",
    stockTo: "",
    orderStatus: "",
    role: "",
    module: "",
  },
}: GenericTableProps<T>) {
  const [showFilterPanel, setShowFilterPanel] = React.useState(false);

  const DEFAULT_FILTER_VALUES = ["All", "", "all"];

  const defaultSortOptions = [
    { label: "All", key: "" },
    { label: "Recent", key: "recent" },
    { label: "Oldest", key: "oldest" },
    { label: "A-Z", key: "a-z" },
    { label: "Z-A", key: "z-a" },
];

const sortOptionsToUse = sortOptions ?? defaultSortOptions;


  const isValueSet = (v: unknown) => {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === "object" && v !== null) return Object.keys(v).length > 0;
    return (
      v !== undefined &&
      v !== null &&
      v !== "" &&
      !DEFAULT_FILTER_VALUES.includes(v as string)
    );
  };

  const filtersApplied = React.useMemo(
    () => Object.values(filters).some(isValueSet),
    [filters]
  );

  const handleResetFilters = () => {
    onFilterChange?.({
      startDate: "",
      endDate: "",
      location: "",
      stockFrom: "",
      stockTo: "",
      orderStatus: "",
      role: "",
      module: "",
    });
    setSearchTerm?.("");
    onSortChange?.("");
    onPageChange?.(1);
    setShowFilterPanel(false);
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    onFilterChange?.(newFilters);
    setShowFilterPanel(false);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        marginTop: "2em",
        position: "relative",
      }}
    >
      {/* Header Section: Title + Search + Sort + Filter */}
      {(titleSection || setSearchTerm || onSortChange || showFilter) && (
        <div
        className="py-[16px] px-[24px] border-b border-[#f1f5f9] flex lg:flex-row flex-col items-base lg:items-start justify-between gap-4 "
          // style={{
          //   padding: "16px 24px",
          //   borderBottom: "1px solid #f1f5f9",
          //   display: "flex",
          //   justifyContent: "space-between",
          //   alignItems: "center",
          //   gap: "1rem",
          // }}
        >
          {titleSection}
          <div className="flex items-center gap-4" >
            {enableSearch && setSearchTerm && (
              <SearchComp
                searchTerm={searchTerm || ""}
                setSearchTerm={setSearchTerm}
                placeholder={searchPlaceholder}
                debounceDelay={debounceDelay}
                maxWidth="250px"
              />
            )}
            {enableSort && onSortChange && (
              <SortFilter
                onSortChange={onSortChange}
                activeSort={activeSort || ""}
                sortOptions={sortOptionsToUse}
              />
            )}
            {showFilter && onFilterChange && (
              <div style={{ position: "relative" }}>
                <button
                  onClick={
                    filtersApplied
                      ? handleResetFilters
                      : () => setShowFilterPanel((prev) => !prev)
                  }
                  className="flex items-center justify-center p-2 bg-orange-500 rounded-lg text-white"
                >
                  {filtersApplied ? (
                    <span className="whitespace-nowrap">Reset Filter</span>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <span
                        style={{
                          width: "16px",
                          height: "2px",
                          background: "white",
                        }}
                      />
                      <span
                        style={{
                          width: "16px",
                          height: "2px",
                          background: "white",
                        }}
                      />
                      <span
                        style={{
                          width: "16px",
                          height: "2px",
                          background: "white",
                        }}
                      />
                    </div>
                  )}
                </button>

                {showFilterPanel && (
                  <div
                    style={{
                      position: "absolute",
                      top: "40px",
                      right: 0,
                      zIndex: 100,
                      background: "white",
                      padding: "16px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    {tableType === "product" && (
                      <ReusableFilterComponent
                        onFilterChange={handleFilterChange}
                        locations={locations}
                        categories={categories}
                        showCategory
                        showLocation
                        showPrice
                        showProductStatus
                        filterType="product"
                      />
                    )}
                    {tableType === "inventory" && (
                      <ReusableFilterComponent
                        onFilterChange={handleFilterChange}
                        showLocation
                        showStockLevel
                        showOrderStatus
                        locations={locations}
                        filterType="inventory"
                      />
                    )}
                    {tableType === "sales" && (
                      <ReusableFilterComponent
                        onFilterChange={handleFilterChange}
                        showPrice
                        showPaymentStatus
                        filterType="sales"
                      />
                    )}
                    {tableType === "discount" && (
                      <ReusableFilterComponent
                        onFilterChange={handleFilterChange}
                        showDiscountType
                        showDiscountStatus
                        filterType="discount"
                      />
                    )}
                    {tableType === "returns" && (
                      <ReusableFilterComponent
                        onFilterChange={handleFilterChange}
                        locations={locations}
                        showReason
                        showReturnStatus
                        filterType="returns"
                      />
                    )}
                    {tableType === "audit" && (
                      <ReusableFilterComponent
                        onFilterChange={handleFilterChange}
                        roles={roles}
                        modules={modules}
                        showRole
                        showModule
                        filterType="audit"
                      />
                    )}
                    {tableType === "userManagement" && (
                      <ReusableFilterComponent
                        onFilterChange={handleFilterChange}
                        roles={roles}
                        showRole
                        showUserStatus
                        filterType="userManagement"
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table Section */}
      {isLoading ? (
        <Box style={{ padding: "16px" }}>
          <TableSkeleton columns={columns.length + (actions ? 1 : 0)} />
        </Box>
      ) : (
        <Box style={{ position: "relative", minHeight: "300px" }}>
          <Table.ScrollContainer minWidth={800}>
            <Table
              striped={false}
              highlightOnHover
              withTableBorder={false}
              withColumnBorders={false}
              styles={(theme) => ({
                thead: {
                  backgroundColor: theme.colors.gray[0],
                },
                th: {
                  fontWeight: 600,
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.gray[7],
                  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                  textAlign: "left",
                  fontFamily: "DM Sans, sans-serif",
                },
                td: {
                  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                  fontSize: theme.fontSizes.sm,
                  borderBottom: `1px solid ${theme.colors.gray[2]}`,
                  fontFamily: "DM Sans, sans-serif",
                },
                tr: {
                  "&:hover": {
                    backgroundColor: theme.colors.gray[0],
                  },
                },
              })}
            >
              <Table.Thead>
                <Table.Tr>
                  {columns.map((col) => (
                    <Table.Th key={col.key} style={{ width: col.width }}>
                      {col.header}
                    </Table.Th>
                  ))}
                  {actions && <Table.Th>Action</Table.Th>}
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {data.map((row, idx) => (
                  <Table.Tr key={idx}>
                    {columns.map((col) => (
                      <Table.Td key={col.key}>{col.render(row)}</Table.Td>
                    ))}
                    {actions && <Table.Td>{actions(row)}</Table.Td>}
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>

          {/* Empty State Overlay (doesn't remove filters/search/sort) */}
          {(!data || data.length === 0) && (
            <Box
              style={{
                position: "absolute",
                top: "75%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                hight: "auto",
                textAlign: "center",
                background: "rgba(255,255,255,0.8)",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <EmptyState2
                onReset={handleResetFilters}
                setSearchTerm={setSearchTerm}
                onFilterChange={onFilterChange}
                onSortChange={onSortChange}
                onPageChange={onPageChange}
              />
            </Box>
          )}
        </Box>
      )}

      {/* Pagination */}
      {!isLoading &&
        paginationData &&
        paginationData.last_page > 1 &&
        onPageChange && (
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "16px 24px",
              borderTop: "1px solid #f1f5f9",
            }}
          >
            <Pagination
              total={paginationData.last_page}
              value={paginationData.current_page}
              onChange={onPageChange}
              size="sm"
              getControlProps={(control) => ({
                children:
                  typeof control === "number" ? (
                    <Text fz="sm" fw={500} c="gray.7">
                      {control}
                    </Text>
                  ) : undefined,
              })}
              styles={(theme) => ({
                control: {
                  border: "none",
                  "&[data-active]": {
                    backgroundColor: "transparent",
                    border: `1px solid ${theme.colors.orange[6]}`,
                    color: theme.colors.orange[6],
                  },
                  "&:hover:not([data-active])": {
                    backgroundColor: theme.colors.gray[0],
                  },
                },
              })}
            />
          </Box>
        )}
    </div>
  );
}
