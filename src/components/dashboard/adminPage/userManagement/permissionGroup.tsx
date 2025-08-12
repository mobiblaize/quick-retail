import { Stack, Text, Title } from "@mantine/core";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface PermissionGroupProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  collapsible?: boolean;
}

export default function PermissionGroup({
  title,
  description,
  children,
  collapsible = false,
}: PermissionGroupProps) {
  const [open, setOpen] = useState(!collapsible);

  return (
    <div className="border-b border-gray-200 py-4">
      <div
        onClick={() => collapsible && setOpen(!open)}
        className="cursor-pointer w-full"
      >
        <div className="flex justify-between items-center">
          <Stack gap={8}>
            <Title
              order={4}
              style={{
                fontSize: '0.875rem', // text-sm
                fontWeight: 500, // font-medium
                color: '#48464E',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {title}
            </Title>
            <Text
              style={{
                fontSize: '0.875rem', // text-sm
                color: '#908C9C',
              }}
            >
              {description}
            </Text>
          </Stack>
          {collapsible && (open ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </div>
      </div>

      {open && children && (
        <div className="mt-3 ml-1 bg-gray-100 p-4 rounded-xl space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}
