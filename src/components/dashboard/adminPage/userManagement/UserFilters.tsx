// UserFilters.tsx
import { useState } from "react"
import { TextInput, Select, Group, Text } from "@mantine/core"
import { Search } from "lucide-react"

export interface UserFiltersValue {
  searchTerm: string
  sortBy: "All" | "A-Z" | "Z-A" | "Recent" | "Oldest"
}

interface Props {
  userFilterValue?: UserFiltersValue
  onFilterChange: (filters: UserFiltersValue) => void
}

export default function UserFilters({ userFilterValue, onFilterChange }: Props) {
  const [filters, setFilters] = useState<UserFiltersValue>(
    userFilterValue || { searchTerm: "", sortBy: "All" }
  )

  const handleChange = (updated: Partial<UserFiltersValue>) => {
    const newFilters = { ...filters, ...updated }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <Group gap="md" mb="md">
      <TextInput
        placeholder="Search users..."
        value={filters.searchTerm}
        onChange={(e) => handleChange({ searchTerm: e.currentTarget.value })}
        leftSection={<Search size={16} />}
      />

      <div className="flex gap-1 items-center">
        <Text>Sort By:</Text>
        <Select
          data={["All", "A-Z", "Z-A", "Recent", "Oldest"]}
          value={filters.sortBy}
          onChange={(value) =>
            handleChange({ sortBy: value as UserFiltersValue["sortBy"] })
          }
        />
      </div>
    </Group>
  )
}
