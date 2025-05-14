import { Button } from "@mantine/core";
import FormSelect from "../../../General/select";
import FormInput from "../../../General/formInput";
import { useNavigate } from "react-router";

const CreateNewDepreciationForm = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
      <div className="md:grid-cols-3 gap-8">
        {/* Left side */}
        <div className="md:col-span-2 space-y-8 w-full m-auto">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                type="text"
                label="Asset ID"
                placeholder="Enter Asset ID"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Asset Name"
                placeholder="Enter Asset Name"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="number"
                label="Serial Number"
                placeholder="Enter serial number"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Brand"
                placeholder="Enter Brand name"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Color"
                placeholder="Enter Color"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Year of Manufacture"
                placeholder="Enter Year of Manufacture"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Vendor"
                placeholder="Enter Vendor"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="text"
                label="Cost"
                placeholder="Enter cost"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="date"
                label="Date Purchased"
                placeholder="Enter date Purchased"
                paddingY={"0.7rem"}
              />

              <FormInput
                type="date"
                label="Assigned Date"
                placeholder="Enter assigned date"
                paddingY={"0.7rem"}
              />

              <FormSelect
                label="Asset Group"
                placeholder="Select asset group"
                options={["Category 1", "Category 2", "Category 3"]}
                name="category"
                paddingY="4"
              />

              <FormSelect
                label=" Sub Asset Group"
                placeholder="Select sub asset group"
                options={["Category 1", "Category 2", "Category 3"]}
                name="category"
                paddingY="4"
              />

              <FormSelect
                label="Depression Method"
                placeholder="Select depression method"
                options={["Category 1", "Category 2", "Category 3"]}
                name="category"
                paddingY="4"
              />

              <FormInput
                type="text"
                label="Useful Life"
                placeholder="Enter useful life"
                paddingY={"0.7rem"}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Bottom buttons */}
      <div key="search-product-buttons" className="flex gap-4 mt-[5em]">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="filled-primary">
          Submit Request
        </Button>
      </div>
    </div>
  );
};

export default CreateNewDepreciationForm;
