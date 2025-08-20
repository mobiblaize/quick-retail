import { MouseEvent } from "react";
import { TableTbody, TableTr, TableTd } from "@mantine/core";
import { flexRender, Row } from "@tanstack/react-table";
import { Table as ReactTable } from "@tanstack/react-table";

interface TanRowsProps<T extends Record<string, any>> {
  table: ReactTable<T>;
  onClick?: (event: MouseEvent<HTMLTableRowElement>, row?: Row<T>) => void;
}

const TanRows = <T extends Record<string, any>>({
  table,
  onClick,
}: TanRowsProps<T>) => {
  const handleRowClick = (
    event: MouseEvent<HTMLTableRowElement>,
    row: Row<T>
  ) => {
    if (onClick) {
      onClick(event, row);
    }
  };

  return (
    <TableTbody>
      {table.getRowModel().rows.map((row: Row<T>) => (
        <TableTr
          key={row.id}
          style={{
            cursor: onClick ? "pointer" : "default",
            backgroundColor: "white",
            borderBottom: "1px solid #e0e0e0",
          }}
          onClick={(e) => handleRowClick(e, row)}
        >
          {row.getVisibleCells().map((cell) => (
            <TableTd
              key={cell.id}
              style={{
                width: cell.column.getSize(),
                padding: "0.75rem",
                fontFamily: "inherit",
    fontSize: "0.875rem",
    color: "#333",
              }}
            >
              <div className="px-2">
                <span className="text-black whitespace-nowrap font-medium">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </span>
              </div>
            </TableTd>
          ))}
        </TableTr>
      ))}
    </TableTbody>
  );
};

export default TanRows;
