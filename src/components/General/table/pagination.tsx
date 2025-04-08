import { FC, ReactNode } from "react";
import { Box, Button, Flex, Group } from "@mantine/core";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Table as ReactTable } from "@tanstack/react-table";
import { TableRowData } from "../../../types";

export type TableInstance = ReactTable<TableRowData>;

interface PaginationProps {
  table: TableInstance;
  buttons: ReactNode[];
  setPageIndex: (index: number) => void;
}

const Pagination: FC<PaginationProps> = ({ table, buttons, setPageIndex }) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const handlePreviousPage = () => {
    const newPageIndex = table.getState().pagination.pageIndex - 1;
    table.setPageIndex(newPageIndex);
    setPageIndex(newPageIndex);
  };

  const handleNextPage = () => {
    const newPageIndex = table.getState().pagination.pageIndex + 1;
    table.setPageIndex(newPageIndex);
    setPageIndex(newPageIndex);
  };

  const renderPageButtons = () => {
    if (totalPages <= 5) {
      return buttons;
    }

    const firstTwoButtons = buttons.slice(0, 2);
    const lastTwoButtons = buttons.slice(-2);

    return (
      <>
        {firstTwoButtons}
        {currentPage > 3 && <Box style={{ margin: "0 0.5rem" }}>...</Box>}
        {currentPage > 2 &&
          currentPage < totalPages - 1 &&
          buttons[currentPage - 1]}
        {currentPage < totalPages - 2 && (
          <Box style={{ margin: "0 0.5rem" }}>...</Box>
        )}
        {lastTwoButtons}
      </>
    );
  };

  return (
    <Box>
      <Flex
        style={{
          marginTop: "1.25rem",
          width: "fit-content",
          marginLeft: "auto",
          fontSize: "0.75rem",
        }}
      >
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={handlePreviousPage}
          style={{ background: "inherit" }}
        >
          <ChevronLeft color="black" />
        </Button>
        <Group>{renderPageButtons()}</Group>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={handleNextPage}
          style={{ background: "inherit" }}
        >
          <ChevronRight color="black" />
        </Button>
      </Flex>
    </Box>
  );
};

export default Pagination;
