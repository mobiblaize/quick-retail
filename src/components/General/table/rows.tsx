import { FC, MouseEvent } from "react";
import { TableTbody, TableTr, TableTd } from "@mantine/core";
import { flexRender, Row } from "@tanstack/react-table";
import { TableRowData } from "../../../types";
import { Table as ReactTable } from "@tanstack/react-table";

export type TableInstance = ReactTable<TableRowData>;
interface TanRowsProps {
  table: TableInstance;
  onClick?: (
    event: MouseEvent<HTMLTableRowElement>,
    row?: Row<TableRowData>
  ) => void;
}

const TanRows: FC<TanRowsProps> = ({ table, onClick }) => {
  const handleRowClick = (
    event: MouseEvent<HTMLTableRowElement>,
    row: Row<TableRowData>
  ) => {
    if (onClick) {
      onClick(event, row);
    }
  };

  return (
    <TableTbody>
      {table.getRowModel().rows.map((row: Row<TableRowData>) => (
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
