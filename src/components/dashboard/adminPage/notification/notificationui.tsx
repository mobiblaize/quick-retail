import { Badge, Paper, Text, Group, Stack, Loader } from "@mantine/core";
import { Circle } from "lucide-react";
import { useNotifications } from "../../../../hooks/backendApis/admin/settings";
import { useMarkAllNotificationsAsRead } from "../../../../hooks/backendApis/admin/settings";
import { showNotification } from "@mantine/notifications";

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Finance":
      return "cyan";
    case "Inventory":
      return "orange";
    case "Sales":
      return "pink";
    default:
      return "gray";
  }
};

const getIndicatorColor = (category: string) => {
  switch (category) {
    case "Finance":
      return "text-red-500";
    case "Inventory":
      return "text-orange-500";
    case "Sales":
      return "text-pink-500";
    default:
      return "text-gray-500";
  }
};

export default function NotificationsPanel() {
  const { data: notifications = [], isLoading, isError } = useNotifications();
  const markAllRead = useMarkAllNotificationsAsRead();

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
                showNotification({
                  title: "Success",
                  message: "All notifications marked as read",
                  color: "green",
                });
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
                {!notification.isRead && (
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
                  {notification.timestamp}
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

