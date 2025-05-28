import { useEffect, useRef, useState } from "react";
import PaymentDetails1 from "../../../components/dashboard/pointOfSales/salesProcessing/paymentDetails";
import SearchCustomer from "../../../components/dashboard/pointOfSales/salesProcessing/searchCustomer";
import SearchProduct from "../../../components/dashboard/pointOfSales/salesProcessing/searchProduct";
import { useCreateSales } from "../../../hooks/backendApis/pos/salesProcessing";

interface CreateOrderFormProps {
  registerSubmit: (handler: (status: string) => void) => void;
  paymentDetails: {
    method: string;
    amount: string;
    items: any[];
    customerId: string | null;
  };
  updatePaymentDetails: (details: {
    method: string;
    amount: string;
    items: any[];
    customerId: string | null;
  }) => void;
  paymentItems: { label: string; amount: string }[];
  total: string;
  
}
const CreateOrderForm: React.FC<CreateOrderFormProps> = ({
  registerSubmit,
  paymentDetails,
  updatePaymentDetails,
  paymentItems,
  total,
}) => {
  const [selectedItemsPayload, setSelectedItemsPayload] = useState(
    paymentDetails.items || []
  );
  const [selectedCustomerID, setSelectedCustomerID] = useState<string | null>(
    paymentDetails.customerId
  );
  const [paymentMethod, setPaymentMethod] = useState<string>(
    paymentDetails.method
  );
  const [amountCollected, setAmountCollected] = useState<string>(
    paymentDetails.amount
  );

  useEffect(() => {
    setPaymentMethod(paymentDetails.method);
    setAmountCollected(paymentDetails.amount);
  }, [paymentDetails.method, paymentDetails.amount]);

  // Your mutation hook (assuming it returns a mutate function)
  const createSalesOrder = useCreateSales();
  const handlerRef = useRef<(status: string) => void>(() => {});

  const handleSubmit = (status: string) => {
    if (!selectedCustomerID) {
      alert("Please select a customer.");
      return;
    }

    if (selectedItemsPayload.length === 0) {
      alert("Please select at least one item.");
      return;
    }

    const payload = {
      customerId: selectedCustomerID,
      status,
      payment_method: paymentMethod, 
      amount_collected: paymentMethod === "cash" ? amountCollected : "",
      items: selectedItemsPayload,
    };

    createSalesOrder.mutate(payload, {
      onSuccess: () => {
        alert("Sales order created successfully!");
      },
      onError: (error) => {
        alert("Error creating sales order.");
        console.error(error);
      },
    });
  };

  useEffect(() => {
    handlerRef.current = handleSubmit;
  }, [
    selectedCustomerID,
    selectedItemsPayload,
    paymentMethod,
    amountCollected,
  ]);

  // Register the submit handler once
  useEffect(() => {
    if (registerSubmit) {
      registerSubmit((status) => {
        if (handlerRef.current) {
          handlerRef.current(status);
        }
      });
    }
  }, [registerSubmit]);

  useEffect(() => {
    updatePaymentDetails({
      method: paymentMethod,
      amount: amountCollected,
      items: selectedItemsPayload,
      customerId: selectedCustomerID,
    });
  }, [
    paymentMethod,
    amountCollected,
    selectedItemsPayload,
    selectedCustomerID,
    updatePaymentDetails,
  ]);

  const handleSelectedItemsChange = (items: any[]) => {
    const payload = items
      .filter((item) => !item.custom && item.variationID && item.quantity)
      .map((item) => ({
        variationId: item.variationID,
        quantity: Number(item.quantity),
        price: Number(item.selling_price),
      }));

    setSelectedItemsPayload(payload);
  };

  return (
    <main className="flex flex-col gap-8">
      <SearchProduct
        onSelect={() => {}}
        onItemsChange={handleSelectedItemsChange}
      />
      <SearchCustomer onCustomerSelect={(id) => setSelectedCustomerID(id)} />

      <PaymentDetails1 items={paymentItems} total={total} />
    </main>
  );
};

export default CreateOrderForm;
