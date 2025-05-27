import { Divider, Text } from "@mantine/core";
import FormInput from "../../../components/General/formInput";
import FormSelect from "../../../components/General/select";




const NewInventoryDetails = ({
  current_level,
  new_stock_level,
  new_reorder_level,
  reason_for_update,
  locationID,
  setCurrentLevel,
  setNewStockLevel,
  setNewReorderLevel,
  setReasonForUpdate,
  setLocationID,
  locationOptions
}: any) => {

  console.log("location", locationID);
  

  return (
    <main className="w-full h-auto rounded-lg bg-white">
      <div className="px-6 py-2 ">
        <Text size="lg" fw={500} c="textSecondary.9" tt={"uppercase"}>
          new inventory details
        </Text>
      </div>
      <Divider size="sm" className="mt-3" color="#E4E7EC" />

      <section className="grid pt-8 pb-6 px-6 grid-cols-1 md:grid-cols-2 gap-8">
        <FormInput
          type="number"
          label="Current Level"
          paddingY={"0.7rem"}
          value={current_level}
          onChange={(e: any) => setCurrentLevel(Number(e.target.value))}
        />

        <FormInput
          type="number"
          label="New Stock Level"
          paddingY={"0.7rem"}
          value={new_stock_level}
          onChange={(e: any) => setNewStockLevel(Number(e.target.value))}
        />

        <FormInput
          type="number"
          label="New Reorder Level"
          placeholder="Enter reorder level"
          paddingY={"0.7rem"}
          value={new_reorder_level}
          onChange={(e: any) => setNewReorderLevel(Number(e.target.value))}
        />

        <FormSelect
          options={locationOptions}
          label="Location"
          placeholder="Enter Location"
          optional
          paddingY="4"
          value={locationID}
          onChange={(e: any) => setLocationID(e.target.value)}
        />

        <FormInput
          type="text"
          label="Reason for Update"
          placeholder="Enter reason for update"
          optional
          paddingY={"0.7rem"}
          value={reason_for_update}
          onChange={(e: any) => setReasonForUpdate(e.target.value)}
        />
      </section>
    </main>
  );
};

export default NewInventoryDetails;
