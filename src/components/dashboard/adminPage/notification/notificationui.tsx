import { Badge, Paper, Text, Group, Stack, Loader } from "@mantine/core";
import { Circle } from 'lucide-react';
import { useNotifications } from "../../../../hooks/backendApis/admin/settings";
import { useMarkAllNotificationsAsRead } from "../../../../hooks/backendApis/admin/settings";
import { showNotification } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import * as dayjs from "dayjs"; 
import * as relativeTimeModule from "dayjs/plugin/relativeTime"; 


const relativeTimePlugin = (relativeTimeModule as any).default || relativeTimeModule;


const dayjsInstance = (dayjs as any).default || dayjs;
dayjsInstance.extend(relativeTimePlugin);


const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "user":
      return "cyan";
    case "inventory":
      return "orange";
    case "sales":
      return "pink";
    case "role":
      return "blue";
    default:
      return "gray";
  }
};

const getIndicatorColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "user":
      return "text-red-500";
    case "inventory":
      return "text-orange-500";
    case "sales":
      return "text-pink-500";
    case "role":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};

export default function NotificationsPanel() {
  const { data: notifications = [], isLoading, isError, refetch: refetchNotifications } = useNotifications();
  const markAllRead = useMarkAllNotificationsAsRead();
  const queryClient = useQueryClient();

  return (
    <Paper className="w-full max-w-6xl bg-white" shadow="sm" radius="md" p="lg">
      {/* Header */}
      <Group justify="space-between" mb="lg">
        <Text size="lg" fw={600} c="dark">
          All Notifications
        </Text>
        <Text
          size="sm"
          c="orange"
          className="cursor-pointer hover:underline"
          onClick={() => {
            markAllRead.mutate(undefined, {
              onSuccess: () => {
                // Update local cache so all dots disappear
                queryClient.setQueryData(["notifications/all", undefined], (old: any) =>
                  Array.isArray(old)
                    ? old.map((n: any) => ({ ...n, is_read: 1 }))
                    : old
                );

                showNotification({
                  title: "Success",
                  message: "All notifications marked as read",
                  color: "green",
                });
                refetchNotifications();
              },
              onError: () => {
                showNotification({
                  title: "Error",
                  message: "Failed to mark all notifications as read",
                  color: "red",
                });
              },
            });
          }}
        >
          Mark all as read
        </Text>
      </Group>

      {/* Loading or Error States */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader size="md" />
        </div>
      ) : isError ? (
        <Text c="red">Failed to load notifications.</Text>
      ) : (
        <Stack gap="md">
          {notifications.map((notification: any) => (
            <Group key={notification.id} align="flex-start" gap="sm" className="py-2">
              {/* Status Indicator */}
              <div className="flex items-center justify-center w-4 h-4 mt-1">
                {!notification.is_read && (
                  <Circle
                    size={8}
                    className={`fill-current ${getIndicatorColor(notification.category)}`}
                  />
                )}
              </div>

              {/* Notification Content */}
              <div className="flex-1 min-w-0">
                <Text size="sm" c="dark" className="leading-5">
                  {notification.title}
                </Text>
                <Text size="xs" c="dimmed" mt={2}>
                  {dayjsInstance(notification.created_at).fromNow()}
                </Text>
              </div>

              {/* Category Badge */}
              <Badge
                size="sm"
                color={getCategoryColor(notification.category)}
                variant="light"
                className="shrink-0"
              >
                {notification.category}
              </Badge>
            </Group>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
