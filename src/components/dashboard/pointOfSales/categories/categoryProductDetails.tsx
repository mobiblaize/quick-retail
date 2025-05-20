import { Switch, Text } from "@mantine/core";
import { useState } from "react";

type TableData = {
  status: "Active" | "Inactive";
};

const initialData: TableData[] = [
  { status: "Active" }
];

const CategoryProductDetails = () => {
  const [tableData, setTableData] = useState(initialData);

  const handleToggle = (index: number) => {
    const updatedData = [...tableData];
    const currentStatus = updatedData[index].status;
    updatedData[index].status =
      currentStatus === "Active" ? "Inactive" : "Active";
    setTableData(updatedData);
  };

  return (
    <main className="w-full h-auto rounded-lg bg-[#FFF]  px-6 py-8">
      <section className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 w-full gap-4 md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Sub-category Name</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Puma Bag
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Product</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              42
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Date Created</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              April 29, 2025 12:00:21 PM
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Last Modified Date</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              April 29, 2025 12:00:21 PM
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 mt-6 w-full md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Product Brand</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Puma
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>In Stock</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              110 Items
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Created By</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Xavier Ayeni
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Status</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              <div className="flex items-center gap-2">
                <Switch
                //   checked={}
                  onChange={() => handleToggle(0)}
                  color="orange"
                  size="md"
                />
                <div className="text-[#12B76A]">Active</div>
              </div>
            </Text>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoryProductDetails;
