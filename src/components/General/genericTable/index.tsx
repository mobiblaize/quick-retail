import { Table, Box, Loader, Pagination } from "@mantine/core";
import type { ReactNode } from "react";
import * as React from "react";
import EmptyState from "../EmptyState";
import ReusableFilterComponent, {
  FilterValues,
} from "../table/reuseableFilter";
import SearchComp from "../table/searchComp";
import SortFilter from "../table/sortFilter";

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
  showFilter?: boolean;
  tableType?:
    | "inventory"
    | "sales"
    | "product"
    | "returns"
    | "discount"
    | "audit"
    | "transaction";
  locations?: string[];
  categories?: string[];
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
  onFilterChange,
}: GenericTableProps<T>) {
  if (isLoading) {
    return (
      <Box
        style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
      >
        <Loader size="lg" />
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  const initialFilters: FilterValues = {
    startDate: "",
    endDate: "",
    location: "",
    stockFrom: "",
    stockTo: "",
    orderStatus: "",
    role: "",
    module: "",
  };

  const [appliedFilters, setAppliedFilters] =
    React.useState<FilterValues>(initialFilters);
  const [showFilterPanel, setShowFilterPanel] = React.useState(false);

  const filtersApplied = React.useMemo(() => {
    return Object.values(appliedFilters).some((val) =>
      Array.isArray(val) ? val.length > 0 : !!val
    );
  }, [appliedFilters]);

  const handleFilterChange = (filters: FilterValues) => {
    setAppliedFilters(filters);
    onFilterChange?.(filters);
    setShowFilterPanel(false);
  };

  const handleResetFilters = () => {
    setAppliedFilters(initialFilters);
    onFilterChange?.(initialFilters);
    setShowFilterPanel(false);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        marginTop: "2em",
      }}
    >
      {/* Title Section + Search */}
      {(titleSection || setSearchTerm || onSortChange || showFilter) && (
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {titleSection}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
                sortOptions={sortOptions}
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
                        showCategory={true}
                        showLocation={true}
                        showPrice={true}
                        showProductStatus={true}
                        filterType="product"
                      />
                    )}
                    {tableType === "inventory" && (
                      <ReusableFilterComponent
                        onFilterChange={handleFilterChange}
                        locations={locations}
                        showStockLevel={true}
                        filterType="inventory"
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <Box>
        <Table.ScrollContainer minWidth={800}>
          <Table striped={false} highlightOnHover withTableBorder={false}>
            <Table.Thead>
              <Table.Tr style={{ backgroundColor: "#f8fafc" }}>
                {columns.map((col) => (
                  <Table.Th
                    key={col.key}
                    style={{
                      fontWeight: 500,
                      color: "#64748b",
                      padding: "12px 16px",
                      fontSize: "13px",
                      width: col.width,
                    }}
                  >
                    {col.header}
                  </Table.Th>
                ))}
                {actions && (
                  <Table.Th
                    style={{
                      fontWeight: 500,
                      color: "#64748b",
                      fontSize: "13px",
                    }}
                  >
                    Action
                  </Table.Th>
                )}
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {data.map((row, idx) => (
                <Table.Tr
                  key={idx}
                  styles={{
                    tr: {
                      "&:hover": { backgroundColor: "#f8fafc" },
                      borderBottom: "1px solid #f1f5f9",
                    },
                  }}
                >
                  {columns.map((col) => (
                    <Table.Td key={col.key} style={{ padding: "12px 16px" }}>
                      {col.render(row)}
                    </Table.Td>
                  ))}
                  {actions && <Table.Td>{actions(row)}</Table.Td>}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        {paginationData && paginationData.last_page > 1 && onPageChange && (
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
              styles={{
                root: { border: "none" },
                control: {
                  border: "none",
                  "&[data-active]": {
                    backgroundColor: "#f97316",
                    borderColor: "#f97316",
                    color: "white",
                  },
                  "&:hover:not([data-active])": { backgroundColor: "#f8fafc" },
                },
              }}
            />
          </Box>
        )}
      </Box>
    </div>
  );
}
