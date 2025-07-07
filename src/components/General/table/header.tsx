import { TableThead, TableTr, TableTh } from "@mantine/core";
import { flexRender, HeaderGroup, Table as ReactTable } from "@tanstack/react-table";

interface HeaderProps<T extends Record<string, any>> {
  table: ReactTable<T>;
}

const TanHeader = <T extends Record<string, any>>({ table }: HeaderProps<T>) => {
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
        .map((headerGroup: HeaderGroup<T>) => (
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
