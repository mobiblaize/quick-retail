import { Divider, Text } from "@mantine/core";
import FormInput from "../../../components/General/formInput";

const NewInventoryDetails = ({
  current_level,
  new_stock_level,
  reason_for_update,
  setCurrentLevel,
  setNewStockLevel,
  setReasonForUpdate,
}: any) => {
  return (
    <main className="w-full h-auto rounded-lg bg-white">
      {/* Header */}
      <div className="px-6 py-2">
        <Text size="lg" fw={500} c="gray.7" tt="uppercase">
          new inventory details
        </Text>
      </div>

      <Divider size="sm" className="mt-3" color="#E4E7EC" />

      {/* Form Section */}
      <section className="grid pt-8 pb-6 px-6 grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Level */}
        <FormInput
          type="number"
          label={
            <Text size="sm" fw={500} c="gray.7">
              Current Level
            </Text>
          }
          paddingY={"0.7rem"}
          value={current_level}
          onChange={(e: any) => setCurrentLevel(Number(e.target.value))}
          readOnly
        />

        {/* New Stock Level */}
        <FormInput
          type="number"
          label={
            <Text size="sm" fw={500} c="gray.7">
              Restock Quantity
            </Text>
          }
          paddingY={"0.7rem"}
          value={new_stock_level.toString()}
          onChange={(value: string) => setNewStockLevel(Number(value))}
        />

        {/* Reason for Reorder */}
        <FormInput
          type="text"
          label={
            <Text size="sm" fw={500} c="gray.7">
              Reason for Restocking
            </Text>
          }
          placeholder="Enter reason for reorder"
          optional
          paddingY={"0.7rem"}
          value={reason_for_update}
          onChange={(e: any) => {
            const input = e.target.value;
            const onlyLetters = input.replace(/[^A-Za-z\s]/g, "");
            setReasonForUpdate(onlyLetters);
          }}
        />
      </section>
    </main>
  );
};

export default NewInventoryDetails;
