// historyFilters.tsx
import { useState } from "react"
import { TextInput, Select, Group, Text } from "@mantine/core"
import { Search } from "lucide-react"

export interface HistoryFilters {
  searchTerm: string
  sortBy: "All" | "Recent" | "Oldest" | "A-Z" | "Z-A"
}

interface Props {
  onFilterChange: (filters: HistoryFilters) => void
}

export default function HistoryFilters({ onFilterChange }: Props) {
  const [filters, setFilters] = useState<HistoryFilters>({
    searchTerm: "",
    sortBy: "All",
  })

  const handleChange = (updated: Partial<HistoryFilters>) => {
    const newFilters = { ...filters, ...updated }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <Group gap="md" mb="md">
      {/* Search bar */}
      <TextInput
        placeholder="Search history..."
        value={filters.searchTerm}
        onChange={(e) => handleChange({ searchTerm: e.currentTarget.value })}
        leftSection={<Search size={16} />}
      />

      {/* Sort options */}
      <div className="flex gap-1 items-center">
        <Text>Sort By:</Text>
        <Select
          data={["All", "Recent", "Oldest", "A-Z", "Z-A"]}
          value={filters.sortBy}
          onChange={(value) =>
            handleChange({ sortBy: value as HistoryFilters["sortBy"] })
          }
        />
      </div>
    </Group>
  )
}
