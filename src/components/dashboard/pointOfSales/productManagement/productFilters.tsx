// productFilters.tsx
import { useState } from "react"
import { TextInput, Select, Group, Text } from "@mantine/core"
import { Search } from "lucide-react"

export interface Filters {
    searchTerm: string
    sortBy: "A-Z" | "Z-A" | "All" | "Recent" | "Oldest"
}

interface Props {
    onFilterChange: (filters: Filters) => void
}

export default function ProductFilters({ onFilterChange }: Props) {
    const [filters, setFilters] = useState<Filters>({ searchTerm: "", sortBy: "All" })

    const handleChange = (updated: Partial<Filters>) => {
        const newFilters = { ...filters, ...updated }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    return (
        <Group gap="md" mb="md">
            <TextInput
                placeholder="Search products..."
                value={filters.searchTerm}
                onChange={(e) => handleChange({ searchTerm: e.currentTarget.value })}
                leftSection={<Search size={16} />}
            />

            <div className="flex gap-1 items-center">
                <Text>Sort By:</Text>
                <Select
                    data={["All", "A-Z", "Z-A", "Recent", "Oldest"]}
                    value={filters.sortBy}
                    onChange={(value) => handleChange({ sortBy: value as Filters["sortBy"] })}
                />
            </div>
            
        </Group>
    )
}
