import { JSX } from "react";
import { Table } from "@tanstack/react-table";

interface PaginationProps {
  setPageIndex: (page: number) => void;
  buttons: JSX.Element[];
  table: Table<any>;
  // New props for server-side pagination
  canPreviousPage?: boolean;
  canNextPage?: boolean;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  serverSidePagination?: boolean;
}

const Pagination = ({
  buttons,
  table,
  canPreviousPage,
  canNextPage,
  onPreviousPage,
  onNextPage,
  serverSidePagination = false,
}: PaginationProps) => {
  // Use custom handlers for server-side pagination, fallback to table methods
  const handlePreviousPage = () => {
    if (serverSidePagination && onPreviousPage) {
      onPreviousPage();
    } else {
      table.previousPage();
    }
  };

  const handleNextPage = () => {
    if (serverSidePagination && onNextPage) {
      onNextPage();
    } else {
      table.nextPage();
    }
  };

  const prevDisabled = serverSidePagination
    ? !canPreviousPage
    : !table.getCanPreviousPage();

  const nextDisabled = serverSidePagination
    ? !canNextPage
    : !table.getCanNextPage();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end", // Moves content to the right
        padding: "1rem",
        gap: "2px", // Minimal gap for connected appearance
      }}
    >
      {/* Previous Arrow Button */}
      <button
        onClick={handlePreviousPage}
        disabled={prevDisabled}
        style={{
          backgroundColor: "#ffffff",
          // border: "1px solid #D1D5DB",
          borderRadius: "6px 0 0 6px",
          borderRight: "none",
          padding: "8px 12px",
          cursor: prevDisabled ? "not-allowed" : "pointer",
          opacity: prevDisabled ? 0.5 : 1,
          fontSize: "14px",
          color: "#6B7280",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "36px",
        }}
      >
        &#8249; {/* Left chevron */}
      </button>

      {/* Page Numbers Container */}
      <div style={{
        display: "flex",
        gap: "0px", // No gap between page buttons
      }}>
        {buttons.map((button, index) => {
          // Clone the button element and apply consistent styling
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
                // border: "1px solid #D1D5DB",
                borderLeft: index === 0 ? "1px solid #D1D5DB" : "none", // Only first button has left border
                borderRight: "none", // Remove right border for connected look
                height: "36px",
                minWidth: "36px",
                cursor: "pointer",
              }}
            >
              {button}
            </div>
          );
        })}
      </div>

      {/* Next Arrow Button */}
      <button
        onClick={handleNextPage}
        disabled={nextDisabled}
        style={{
          backgroundColor: "#ffffff",
          // border: "1px solid #D1D5DB",
          borderRadius: "0 6px 6px 0", // Only right corners rounded
          padding: "8px 12px",
          cursor: nextDisabled ? "not-allowed" : "pointer",
          opacity: nextDisabled ? 0.5 : 1,
          fontSize: "14px",
          color: "#6B7280",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "36px",
        }}
      >
        &#8250; {/* Right chevron */}
      </button>
    </div>
  );
};

export default Pagination;