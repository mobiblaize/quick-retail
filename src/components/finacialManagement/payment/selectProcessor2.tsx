import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { Paystack } from "../../../assets/svg";
import { ROUTES } from "../../../constants/routes";

export default function SelectProcessor2() {
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate(ROUTES.makePayment);
  };
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow py-10 px-8 md:px-12">
  <div className="md:col-span-2">
    <div className="bg-white pt-2 space-y-2">
      <h2 className="text-xl font-semibold text-gray-800">Pay via a Processor</h2>
      <Text fw={500} c="#475467">Select a processor of your choice to proceed</Text>

      <div className="flex flex-col gap-y-6 mt-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-md p-4">
            <label className="flex flex-col space-y-2 cursor-pointer">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-orange-500" />
                <Paystack />
                <Text fw={500} c="#003DAD">Paystack</Text>
              </div>
              <Text fw={300} c="#4E4B66" size="sm" className="ml-8">
                Pay vendor via Paystack through your Debit / Credit Card.
              </Text>
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="grid md:grid-cols-2 grid-cols-1 mt-10 gap-4 md:gap-10">
    <Button
      variant="outline"
      style={{
        color: "#475367",
        borderRadius: "0.4rem",
        padding: "0.6rem 1rem",
        fontWeight: 600,
        fontSize: "14px",
        width: "100%",
        border: "1px solid #475367",
      }}
    >
      Back
    </Button>
    <Button
      variant="filled"
      onClick={handleContinue}
      style={{
        backgroundColor: "#F16722",
        color: "white",
        borderRadius: "0.4rem",
        padding: "0.6rem 1rem",
        fontWeight: 600,
        fontSize: "14px",
        width: "100%",
      }}
    >
     Proceed to make payment
    </Button>
  </div>
</div>

  );
}
