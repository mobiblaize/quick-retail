import { useEffect, useMemo, useState, JSX, ReactNode } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import { Box, Text } from "@mantine/core";
import TanBody from "./body";
import Pagination from "./pagination";
import SearchComp from "./searchComp";
import SortFilter from "./sortFilter";
import { SortOption, TableRowData } from "../../../types";
import { Table as ReactTable } from "@tanstack/react-table";
import ReusableFilterComponent, { FilterValues } from "./reuseableFilter";
import EmptyStateImage from "../../../assets/images/Empty.png";

export type TableInstance = ReactTable<TableRowData>;

export interface TanTableProps<T extends Record<string, any>> {
  columnData: ColumnDef<T>[];
  data: T[];
  loadingState?: boolean;
  onClick?: (row?: T) => void;
  showSearch?: boolean;
  hidePaging?: boolean;
  length?: number;
  filterList?: string[];
  showFilter?: boolean;
  showDateFilter?: boolean;
  showSortFilter?: boolean;
  searchPlaceholder?: string;
  searchMaxWidth?: string;
  showBorder?: boolean;
  sortOptions?: SortOption[];
  dateField?: string;
  tableTitle?: ReactNode;
  showSeeAllToggle?: boolean;
  onFilterChange?: (filters: FilterValues) => void;
  locations?: string[];
  categories?: string[];
  roles?: string[];
  modules?: string[];
  reasons?: [];
  tableType?:
    | "inventory"
    | "sales"
    | "product"
    | "returns"
    | "discount"
    | "audit"
    | "transaction";
  onSortChange?: (sortKey: string) => void;
  activeSort?: string;
}

const TanTable = <T extends Record<string, any>>({
  columnData,
  data,
  loadingState,
  onClick,
  showSearch = false,
  hidePaging = false,
  length = 5,
  filterList = [],
  showSortFilter = false,
  searchPlaceholder,
  searchMaxWidth = "350px",
  showBorder = false,
  tableTitle = "Recent Orders",
  showSeeAllToggle = false,
  showFilter = false,
  onFilterChange,
  locations,
  categories,
  roles,
  modules,
  tableType,
  onSortChange,
  activeSort,
}: TanTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [, setFilteredData] = useState<T[]>(data);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);

  // const tableData = useMemo(() => filteredData, [filteredData]);
  const tableData = useMemo(() => data, [data]);

  const columns = useMemo(() => columnData, [columnData]);
  // const pageSize = length;
  const pageSize = showAll && showSeeAllToggle ? data.length : length;

  const pagination = useMemo<PaginationState>(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      globalFilter: searchTerm,
      sorting,
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setSearchTerm,
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;
      setPageIndex(newPagination.pageIndex);
    },
  });

  const startPage = useMemo(() => {
    const totalPages = table.getPageCount();
    return Math.max(
      0,
      Math.min(totalPages - 1, pageIndex - Math.floor(pageSize / 2))
    );
  }, [pageIndex, pageSize, table]);

  const endPage = useMemo(() => {
    const totalPages = table.getPageCount();
    return Math.min(totalPages - 1, startPage + pageSize - 1);
  }, [startPage, pageSize, table]);

  function isPageActive(pageIndex: number, currentPage: number) {
    return pageIndex === currentPage;
  }

  const currentPage = table.getState().pagination.pageIndex;

  const paginationButtons = useMemo(() => {
    const totalPages = table.getPageCount();
    if (totalPages <= 1) return [];
    const buttons: JSX.Element[] = [];
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => {
            table.setPageIndex(i);
            setPageIndex(i);
          }}
          style={{
            color: isPageActive(i, currentPage) ? "black" : "#98A2B3",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            fontSize: "1.2rem",
            fontWeight: "600",
            cursor: "pointer",
            marginLeft: "0.2rem",
            marginRight: "0.2rem",
          }}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  }, [startPage, endPage, currentPage, table]);

  const handleFilterChange = (selectedFilter: string) => {
    if (!selectedFilter || typeof selectedFilter !== "string") {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value)?.toLowerCase()?.includes(selectedFilter.toLowerCase())
      )
    );

    setFilteredData(filtered);
    setPageIndex(0);
  };

  useEffect(() => {
    setPageIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    setFilteredData(data);
    setPageIndex(0);
  }, [data]);

  // Define all possible sort options
const baseSortOptions: SortOption[] = [
  { label: "All", key: "" },
  { label: "Recent", key: "recent" },
  { label: "Oldest", key: "oldest" },
  { label: "A-Z", key: "a-z" },
  { label: "Z-A", key: "z-a" },
];

// Define table types that should exclude A-Z and Z-A
const tablesWithoutAZSort = ["transaction", "returns"];

const customSortOptions = tablesWithoutAZSort.includes(tableType ?? "")
  ? baseSortOptions.filter(opt => opt.key !== "a-z" && opt.key !== "z-a")
  : baseSortOptions;




  return (
    <Box className="font-sans">
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          ...(showBorder && {
            border: "1px solid var(--mantine-color-gray-3)",
            padding: "0.75rem 0rem 0",
          }),
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-[1rem] w-full px-[20px] gap-4">
          <div>
            <Text fw={500} c="textSecondary.9">
              {tableTitle}
            </Text>
          </div>

          <div className="lg:hidden flex md:flex-row  md:gap-[2rem] md:w-[600px] w-[300px] md:items-center gap-4 justify-between whitespace-nowrap">
            {showSearch && (
              <SearchComp
                setSearchTerm={setSearchTerm}
                setPageIndex={setPageIndex}
                searchTerm={searchTerm}
                handleFilterChange={handleFilterChange}
                filterList={filterList}
                placeholder={searchPlaceholder}
                maxWidth={searchMaxWidth}
              />
            )}

            {showSortFilter && (
              <SortFilter
                onSortChange={onSortChange!}
                activeSort={activeSort || ""}
                sortOptions={customSortOptions}
              />
            )}
          </div>
          <div className="hidden md:flex ml-auto ">
            <div className="flex flex-row items-center gap-4 flex-wrap">
              {showSearch && (
                <div className="min-w-[250px]">
                  <SearchComp
                    setSearchTerm={setSearchTerm}
                    setPageIndex={setPageIndex}
                    searchTerm={searchTerm}
                    handleFilterChange={handleFilterChange}
                    filterList={filterList}
                    placeholder={searchPlaceholder}
                    maxWidth={searchMaxWidth}
                  />
                </div>
              )}

              {showSortFilter && (
                <div className="min-w-[150px]">
                  <SortFilter
                    onSortChange={onSortChange!}
                    activeSort={activeSort || ""}
                    sortOptions={customSortOptions}
                  />
                </div>
              )}

              {showFilter && (
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => {
                      if (filtersApplied) {
                        // Reset filters
                        onFilterChange?.({
                          startDate: "",
                          endDate: "",
                          location: "",
                          category: "",
                          stockFrom: "",
                          stockTo: "",
                          orderStatus: "All",
                          priceFrom: "",
                          priceTo: "",
                          paymentStatus: "All",
                          productStatus: "All",
                          reason: "all",
                          type: "all",
                          discountStatus: "All",
                          returnStatus: "All",
                          role: "",
                          module: "",
                        });
                        setFiltersApplied(false);
                        setShowFilterDropdown(false);
                      } else {
                        setShowFilterDropdown((prev) => !prev);
                      }
                    }}
                    style={{
                      backgroundColor: "#F16722",
                      color: "white",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
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
                            display: "block",
                            width: "16px",
                            height: "2px",
                            background: "white",
                          }}
                        />
                        <span
                          style={{
                            display: "block",
                            width: "16px",
                            height: "2px",
                            background: "white",
                          }}
                        />
                        <span
                          style={{
                            display: "block",
                            width: "16px",
                            height: "2px",
                            background: "white",
                          }}
                        />
                      </div>
                    )}
                  </button>

                  {showFilterDropdown && (
                    <div
                      style={{
                        position: "absolute",
                        top: "110%",
                        right: 0,
                        backgroundColor: "#fff",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        borderRadius: "4px",
                        zIndex: 1000,
                        padding: "1rem",
                      }}
                    >
                      {tableType === "inventory" && (
                        <ReusableFilterComponent
                          onFilterChange={(filters) => {
                            onFilterChange?.(filters);
                            setShowFilterDropdown(false);
                            setFiltersApplied(true);
                          }}
                          locations={locations}
                          showLocation={true}
                          showStockLevel={true}
                          showOrderStatus={true}
                          filterType={"inventory"}
                        />
                      )}

                      {tableType === "product" && (
                        <ReusableFilterComponent
                          onFilterChange={(filters) => {
                            onFilterChange?.(filters);
                            setShowFilterDropdown(false);
                            setFiltersApplied(true);
                          }}
                          locations={locations}
                          categories={categories}
                          showCategory={true}
                          showLocation={true}
                          showPrice={true}
                          showProductStatus={true}
                          filterType={"product"}
                        />
                      )}

                      {tableType === "discount" && (
                        <ReusableFilterComponent
                          onFilterChange={(filters) => {
                            onFilterChange?.(filters);
                            setShowFilterDropdown(false);
                            setFiltersApplied(true);
                          }}
                          showDiscountType={true}
                          showDiscountStatus={true}
                          filterType={"discount"}
                        />
                      )}
                      {tableType === "returns" && (
                        <ReusableFilterComponent
                          onFilterChange={(filters) => {
                            onFilterChange?.(filters);
                            setShowFilterDropdown(false);
                            setFiltersApplied(true);
                          }}
                          locations={locations}
                          showReason={true}
                          showReturnStatus={true}
                          filterType={"returns"}
                        />
                      )}

                      {tableType === "sales" && (
                        <ReusableFilterComponent
                          onFilterChange={(filters) => {
                            onFilterChange?.(filters);
                            setShowFilterDropdown(false);
                            setFiltersApplied(true);
                          }}
                          showPrice={true}
                          showPaymentStatus={true}
                          filterType="sales"
                        />
                      )}
                      {tableType === "audit" && (
                        <ReusableFilterComponent
                          onFilterChange={(filters) => {
                            onFilterChange?.(filters);
                            setShowFilterDropdown(false);
                            setFiltersApplied(true);
                          }}
                          roles={roles}
                          modules={modules}
                          showRole={true}
                          showModule={true}
                          filterType="audit"
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="mb-4"></div>
        </div>
      </Box>
      <Box
        style={{
          backgroundColor: "var(--mantine-color-gray-0)",
          fontSize: "0.875rem",
          color: "var(--mantine-color-gray-7)",
        }}
      >
{loadingState ? (
  <Box
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2.5rem 0",
    }}
  >
    Loading...
  </Box>
) : table.getFilteredRowModel().rows.length === 0 ? (
  <Box
    style={{
      padding: "3rem 1rem",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.25rem",
    }}
  >
    <img
      src={EmptyStateImage}
      alt="No data"
      style={{ width: "160px", height: "auto", opacity: 0.8 }}
    />
    <Text fw={600} size="lg" c="#1D2739">
      Not found
    </Text>
    <Text fw={400} size="lg" c="#475367" ta="center" lh="sm">
      We couldn’t find what you are
    </Text>
    <Text fw={400} size="lg" c="#475367" ta="center" lh="sm">
      looking for. Try entering a correct
    </Text>
    <Text fw={400} size="lg" c="#475367" ta="center" lh="sm">
      order ID, name or amount
    </Text>
  </Box>
) : (
  <TanBody
    table={table}
    loadingState={loadingState}
    onClick={onClick}
  />
)}

      </Box>
      {showSeeAllToggle && !showAll && data.length > length && (
        <Box
          style={{
            textAlign: "center",
            marginTop: "1rem",
            cursor: "pointer",
          }}
          onClick={() => setShowAll(true)}
        >
          <Text color="red" fw={500}>
            See all
          </Text>
        </Box>
      )}

      {/* {!hidePaging && tableData.length > pageSize && (
        <Pagination
          setPageIndex={setPageIndex}
          buttons={paginationButtons}
          table={table}
        />
      )} */}

      {!hidePaging && table.getPageCount() > 1 && (
        <Pagination
          setPageIndex={setPageIndex}
          buttons={paginationButtons}
          table={table}
        />
      )}
    </Box>
  );
};

export default TanTable;
