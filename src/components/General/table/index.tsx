import { useEffect, useMemo, useState, JSX, ReactNode } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
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

// Add interface for server-side pagination data
export interface PaginationData {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

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
  // Add server-side pagination props
  paginationData?: PaginationData;
  onPageChange?: (page: number) => void;
  serverSidePagination?: boolean;
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
  paginationData,
  onPageChange,
  serverSidePagination = false,
}: TanTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const tableData = useMemo(() => data, [data]);
  const columns = useMemo(() => columnData, [columnData]);

  const currentPage = serverSidePagination 
    ? (paginationData?.current_page || 1) - 1 
    : pageIndex;
    
  const totalPages = serverSidePagination 
    ? paginationData?.last_page || 1 
    : Math.ceil(data.length / length);



  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      globalFilter: searchTerm,
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setSearchTerm,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // Disable built-in pagination for server-side
    manualPagination: serverSidePagination,
    pageCount: serverSidePagination ? totalPages : undefined,
  });

  // Generate pagination buttons based on server or client pagination
  const paginationButtons = useMemo(() => {
    if (totalPages <= 1) return [];
    
    const buttons: JSX.Element[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => {
            if (serverSidePagination) {
              onPageChange?.(i + 1); 
            } else {
              table.setPageIndex(i);
              setPageIndex(i);
            }
          }}
          style={{
            color: i === currentPage ? "black" : "#98A2B3",
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
  }, [currentPage, totalPages, serverSidePagination, onPageChange, table]);

  const handleFilterChange = (selectedFilter: string) => {
    if (!selectedFilter || typeof selectedFilter !== "string") {
      return;
    }
    // For server-side pagination, you might want to trigger a search API call here
    setPageIndex(0);
  };

  useEffect(() => {
    setPageIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    setPageIndex(0);
  }, [data]);

  // Custom pagination controls for server-side pagination
  const handlePrevPage = () => {
    if (serverSidePagination) {
      if (paginationData?.prev_page_url) {
        onPageChange?.(currentPage); // currentPage is already 0-based, so this goes to previous page
      }
    } else {
      table.previousPage();
    }
  };

  const handleNextPage = () => {
    if (serverSidePagination) {
      if (paginationData?.next_page_url) {
        onPageChange?.(currentPage + 2); // +2 because currentPage is 0-based and we want next page
      }
    } else {
      table.nextPage();
    }
  };

  const canPreviousPage = serverSidePagination 
    ? !!paginationData?.prev_page_url 
    : table.getCanPreviousPage();
    
  const canNextPage = serverSidePagination 
    ? !!paginationData?.next_page_url 
    : table.getCanNextPage();
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

  // useEffect(() => {
  //   console.log("filtersApplied changed:", filtersApplied);
  // }, [filtersApplied]);
  
  const isFilterActive = (filters: FilterValues): boolean => {
    return Object.entries(filters).some(([ value]) => {
      if (typeof value === "string") {
        return value.trim() !== "" && value !== "All" && value !== "all";
      }
      return !!value;
    });
  };
  
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
                    {(!filtersApplied || !["inventory", "product", "sales", "returns", "discount", "audit"].includes(tableType || "")) ? (
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
) : (
  <span className="whitespace-nowrap">Reset Filter</span>
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
                       {tableType === "sales" && (
                        <ReusableFilterComponent
                          // onFilterChange={(filters) => {
                          //   onFilterChange?.(filters);
                          //   setShowFilterDropdown(false);
                          //   console.log("Filter salesapplied:", filters);
                          //   setFiltersApplied(true);
                          // }}
                          onFilterChange={(filters) => {
                            onFilterChange?.(filters);
                            setShowFilterDropdown(false);
                        
                            const hasFilters = isFilterActive(filters);
                            console.log("Filter sales applied:", filters, hasFilters);
                            setFiltersApplied(hasFilters);
                          }}
                          showPrice={true}
                          showPaymentStatus={true}
                          filterType={"sales"}
                        />
                      )}
                      
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
                            console.log("Filter productapplied:", filters);
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
        ) : (serverSidePagination ? data.length === 0 : table.getFilteredRowModel().rows.length === 0) ? (
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
              We couldn't find what you are
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

      {!hidePaging && totalPages > 1 && (
        <Pagination
          setPageIndex={setPageIndex}
          buttons={paginationButtons}
          table={table}
          // Pass custom handlers for server-side pagination
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          onPreviousPage={handlePrevPage}
          onNextPage={handleNextPage}
          serverSidePagination={serverSidePagination}
        />
      )}
    </Box>
  );
};

export default TanTable;