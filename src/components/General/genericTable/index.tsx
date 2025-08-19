import { Table, Box, Loader, Text, Pagination } from "@mantine/core"
import type { ReactNode } from "react"

export interface PaginationData {
    current_page: number
    last_page: number
    per_page?: number
    total?: number
}

interface GenericTableProps<T> {
    data: T[]
    isLoading: boolean
    paginationData?: PaginationData
    onPageChange?: (page: number) => void
    columns: {
        key: string
        header: string
        render: (row: T) => ReactNode
        width?: string | number
    }[]
    actions?: (row: T) => ReactNode
    emptyMessage?: string
    titleSection?: ReactNode
}

export default function GenericTable<T>({
    data,
    isLoading,
    paginationData,
    onPageChange,
    columns,
    actions,
    emptyMessage = "No data found",
    titleSection,
}: GenericTableProps<T>) {
    if (isLoading) {
        return (
            <Box style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
                <Loader size="lg" />
            </Box>
        )
    }

    if (!data || data.length === 0) {
        return (
            <Box style={{ textAlign: "center", padding: "2rem" }}>
                <Text size="lg" c="dimmed">
                    {emptyMessage}
                </Text>
            </Box>
        )
    }

    return (
        <div
            style={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
                marginTop: "2em",
            }}
        >
            {/* Render titleSection if passed */}
            {titleSection && <div style={{ padding: "16px 24px", borderBottom: "1px solid #f1f5f9" }}>{titleSection}</div>}

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
                                    <Table.Th style={{ fontWeight: 500, color: "#64748b", fontSize: "13px" }}>
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
                                root: {
                                    border: "none", 
                                },
                                control: {
                                    border: "none", 
                                    "&[data-active]": {
                                        backgroundColor: "#f97316",
                                        borderColor: "#f97316",
                                        color: "white",
                                    },
                                    "&:hover:not([data-active])": {
                                        backgroundColor: "#f8fafc",
                                    },
                                },
                            }}
                        />

                    </Box>
                )}
            </Box>
        </div>
    )
}
