import { Button } from "@mantine/core";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../constants/routes";

export default function PaymentReceipt() {
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate(ROUTES.allPayment);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white rounded-sm shadow py-12 px-12">
        <div className="md:col-span-2">
          <div className="bg-white pt-2 px-8">
            <h2 className="text-lg font-medium text-gray-800 text-center">
              This would just be a document view since receipt is auto-generated
              by the Payment processor”
            </h2>
          </div>
        </div>
      </div>

      {/* Centralized Buttons */}
      <div className="flex justify-center mt-10">
        <div className="flex gap-4 md:gap-10 w-full max-w-md px-4">
          <Button
            variant="outline"
            style={{
              color: "#F16722",
              borderRadius: "0.4rem",
              padding: "0.6rem 0.4rem",
              fontWeight: 600,
              fontSize: "14px",
              width: "100%",
              border: "1px solid #F16722",
            }}
          >
            Download Receipt
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
            View all Transactions
          </Button>
        </div>
      </div>
    </>
  );
}
