import { Text } from "@mantine/core";

const InventoryOverviewTop = () => {
  return (
    <main>
      <header>
        <div className="flex justify-around bg-gray-200 p-6 rounded-lg">
          <div className="flex flex-col">
            <Text fw={600} className="text-sm text-gray-400">
              Warehouse Name
            </Text>
            <Text fw={600} className="text-sm text-gray-400">
              Quick retail
            </Text>
          </div>
          <div className="flex flex-col">
            {" "}
            <Text fw={600}  className="text-sm text-gray-400">
              Warehouse ID
            </Text>
            <Text fw={600} className="text-sm text-gray-400">
              2345123
            </Text>{" "}
          </div>
          <div className="flex flex-col">
            {" "}
            <Text fw={600} className="text-sm text-gray-400">
              Warehouse Manager
            </Text>
            <Text fw={600}className="text-sm text-gray-400">
              Victoria Erhis
            </Text>{" "}
          </div>
          <div className="flex flex-col">
            {" "}
            <Text fw={600} className="text-sm text-gray-400">
              Date Registered
            </Text>
            <Text fw={600} className="text-sm text-gray-400">
              April 29, 2025 12:00:21 PM
            </Text>{" "}
          </div>
        </div>
      </header>
    </main>
  );
};

export default InventoryOverviewTop;
