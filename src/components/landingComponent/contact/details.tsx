import FormInput from "../../General/formInput";

const Details = () => {
  return (
    <div className="bg-white border border-[#D0D5DD] rounded-lg p-6 mt-4">
      <h3 className="text-md font-medium text-gray-900 mb-6">Your Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
        <FormInput label="First Name" placeholder="Enter your first name" />
        <FormInput label="Last Name" placeholder="Enter your last name" />
        <FormInput label="Phone Number" placeholder="Enter your phone number" />
        <FormInput label="Email" placeholder="Enter your email" />
        <FormInput label="Company's name" placeholder="Enter company's name" />
        <FormInput label="Company's size" placeholder="Enter company's size" />
      </div>
    </div>
  );
};

export default Details;
