import FormInput from "../../../General/formInput";

export default function ViewCustomer() {
  return (
    <div className="">
      <div className="md:col-span-2 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 cursor-pointer ">
            Basic information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput type="text" label="Name" paddingY="4" />

            <FormInput type="text" label="Email" paddingY="4" />

            <FormInput type="text" label="Phone Number" paddingY="4" />

            <FormInput type="text" label="Address" paddingY="4" />
          </div>
        </div>
      </div>
    </div>


  );
}
