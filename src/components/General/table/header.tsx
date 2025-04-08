import { FC } from "react";
import { TableThead, TableTr, TableTh } from "@mantine/core";
import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { Table as ReactTable } from "@tanstack/react-table";
import { TableRowData } from "../../../types";

export type TableInstance = ReactTable<TableRowData>;

interface HeaderProps {
  table: TableInstance;
}

const TanHeader: FC<HeaderProps> = ({ table }) => {
  return (
    <TableThead
      style={{
        backgroundColor: "#F0F2F5",
        padding: "0.75rem",
        margin: "0 0.5rem",
      }}
    >
      {table
        ?.getHeaderGroups()
        .map((headerGroup: HeaderGroup<TableRowData>) => (
          <TableTr key={headerGroup?.id}>
            {headerGroup?.headers?.map((header) => (
              <TableTh
                key={header.id}
                style={{
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  fontWeight: 500,
                  color: "black",
                }}
                onClick={header?.column?.getToggleSortingHandler()}
              >
                {header?.isPlaceholder ? null : (
                  <div style={{ padding: "0.75rem" }}>
                    {flexRender(
                      header?.column?.columnDef.header,
                      header?.getContext()
                    )}
                  </div>
                )}
              </TableTh>
            ))}
          </TableTr>
        ))}
    </TableThead>
  );
};

export default TanHeader;
