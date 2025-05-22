import { Button } from "@mantine/core";
import FormInput from "../../General/formInput";
import FormSelect from "../../General/select";

export default function EditAccountChart() {
//   const navigate = useNavigate();
//   const handlePreview = () => {
//     navigate(ROUTES.allocateReceipt);
//   };

  return (
    <div className="">
      <div className="max-w-xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            New Account
          </h2>
          <p className="text-sm text-gray-700 mb-4">Create a New Account</p>

          {/* Dropdown */}
          <div className="relative">
            <FormSelect
              label="Accunt Name"
              placeholder="Search or select customer"
              options={["Category 1", "Category 2", "Category 3"]}
              name="category"
              paddingY="4"
            />
          </div>
          <div className="relative mt-3">
            <FormSelect
              label="Acocunt Type"
              placeholder="Search or select customer"
              options={["Category 1", "Category 2", "Category 3"]}
              name="category"
              paddingY="4"
            />
          </div>
          <div className="relative mt-3">
            <FormInput
              type="text"
              label="Account ID"
              placeholder="Search or select customer"
              paddingY={"0.7rem"}
            />
          </div>
          <div className="relative mt-3">
            <FormInput
              type="text"
              label="Reference Code"
              placeholder="Search or select customer"
              paddingY={"0.7rem"}
            />
          </div>
          <div className="relative mt-3">
            <FormInput
              type="type"
              label="Description"
              placeholder="Search or select customer"
              paddingY={"0.7rem"}
            />
          </div>
          <div className="mt-8 flex gap-6">
            <Button
              variant="filled"
              style={{
                backgroundColor: "#FFFFFF", 
                color: "#F16722", 
                borderRadius: "0.4rem",
                height: "auto",
                padding: "0.9rem 1.1rem",
                fontWeight: 600,
                fontSize: "16px",
                width: "100%",
                border: "2px solid #F16722", 
              }}
            >
              Back
            </Button>

            <Button
              variant="filled"
              style={{
                backgroundColor: "#F16722",
                color: "white",
                borderRadius: "0.4rem",
                height: "auto",
                padding: "0.9rem 1.1rem",
                fontWeight: 600,
                fontSize: "16px",
                width: "100%",
              }}
            >
              Save and Update Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
