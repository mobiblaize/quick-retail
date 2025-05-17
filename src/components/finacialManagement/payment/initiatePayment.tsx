import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../constants/routes";

export default function Payment() {
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate(ROUTES.selectProceesor);
  };
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow py-6 px-12">
      <div className="md:col-span-2">
        <div className="bg-white pt-2 ">
          <h2 className="text-lg font-medium text-gray-800  cursor-pointer">
            Select Option
          </h2>
          <Text fw={500} c="#475467">
            Selectfrom the options listed below
          </Text>
          <div className="flex flex-col gap-4 mt-6">
            <label className="inline-flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-orange-500"
              />
              <Text fw={500} c="#475467">
                Pay Vendor
              </Text>
            </label>

            <label className="inline-flex items-center space-x-2 cursor-pointer mt-4">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-orange-500"
              />
              <Text fw={500} c="#475467">
                Other / General Payment
              </Text>
            </label>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 md:mt-7 gap-3 md:gap-14">
        <div className="">
          <Button
            variant="outline"
            style={{
              color: "#475367",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 1.5rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%",
              border: "1px solid #475367",
            }}
          >
            Back
          </Button>
        </div>
        <div className="" onClick={handleContinue}>
          <Button
            variant="filled"
            style={{
              backgroundColor: "#F16722",
              color: "white",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 1.5rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%",
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
