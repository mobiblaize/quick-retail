import { FC, useEffect, useMemo, useState, JSX, ReactNode } from "react";
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

export type TableInstance = ReactTable<TableRowData>;

interface TanTableProps {
  columnData: ColumnDef<TableRowData>[];
  data: TableRowData[];
  loadingState?: boolean;
  onClick?: (row?: TableRowData) => void;
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
}

const TanTable: FC<TanTableProps> = ({
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
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filteredData, setFilteredData] = useState<TableRowData[]>(data);

  const tableData = useMemo(() => filteredData, [filteredData]);
  const columns = useMemo(() => columnData, [columnData]);
  const pageSize = length;

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

  const handleSort = (sortedData: TableRowData[]) => {
    setFilteredData(sortedData);
  };

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
    if (selectedFilter === "") {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value)?.toLowerCase()?.includes(selectedFilter?.toLowerCase())
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
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            width: "100%",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <div>
            <Text fw={500} c="textSecondary.9">
              {tableTitle}
            </Text>
          </div>

          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
              alignItems: "center",
              width: "600px",
            }}
          >
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

            {showSortFilter && <SortFilter data={data} onSort={handleSort} />}
          </Box>
        </Box>
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
        ) : data.length < 1 ? (
          <Box style={{ padding: "2rem", textAlign: "center" }}>
            No data to display
          </Box>
        ) : (
          <TanBody
            table={table}
            loadingState={loadingState}
            onClick={onClick}
          />
        )}
      </Box>

      {!hidePaging && tableData.length > pageSize && (
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
