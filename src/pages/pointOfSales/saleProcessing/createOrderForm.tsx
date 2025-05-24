import { useEffect, useState } from "react";
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
  const [selectedItemsPayload, setSelectedItemsPayload] = useState(paymentDetails.items || []);
  const [selectedCustomerID, setSelectedCustomerID] = useState<string | null>(paymentDetails.customerId);
  const [paymentMethod, setPaymentMethod] = useState<string>(paymentDetails.method);
  const [amountCollected, setAmountCollected] = useState<string>(paymentDetails.amount);
  // Your mutation hook (assuming it returns a mutate function)
  const createSalesOrder = useCreateSales();


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
    console.log("Status received:", status); 
    createSalesOrder.mutate(payload, {
      onSuccess: () => {
        alert("Sales order created successfully!");
        // after success navigate to receipt or next step
        // Ideally, you want to move to receipt step here.
      },
      onError: (error) => {
        alert("Error creating sales order.");
        console.error(error);
      },
    });
  };

  useEffect(() => {
    registerSubmit(handleSubmit);
  }, [handleSubmit, registerSubmit]);

  useEffect(() => {
    updatePaymentDetails({
      method: paymentMethod,
      amount: amountCollected,
      items: selectedItemsPayload,
      customerId: selectedCustomerID,
    });
  }, [paymentMethod, amountCollected, selectedItemsPayload, selectedCustomerID, updatePaymentDetails]);


  
  const handleSelectedItemsChange = (items: any[]) => {
    console.log("Raw items received:", items);
  
    const payload = items
  .filter(item => !item.custom && item.variationID && item.quantity)
  .map(item => ({
    variationId: item.variationID,
    quantity: Number(item.quantity),
    price: Number(item.selling_price),  // convert string to number here
  }));

  
    console.log("Payload after mapping:", payload);
  
    setSelectedItemsPayload(payload);
  };
  
  
  // const subtotal = selectedItemsPayload.reduce((acc, item) => {
  //   const price = Number(item.price) || 0;
  //   const quantity = Number(item.quantity) || 0;
  //   return acc + price * quantity;
  // }, 0);
  
  // const tax = subtotal * 0.075;
  
  // const paymentItems = [
  //   { label: `Subtotal (${selectedItemsPayload.length} items)`, amount: formatCurrency(subtotal) },
  //   { label: "Discount", amount: "-" },
  //   { label: "Tax (7.5% VAT)", amount: formatCurrency(tax) },
  // ];
  
  // const totalAmount = subtotal + tax;
  // const total = formatCurrency(totalAmount);
  


  
  // PaymentDetails should call this to update method and amount collected
  const handlePaymentChange = (method: string, amount: string) => {
    setPaymentMethod(method);
    setAmountCollected(amount);
  };


 

  return (
    <main className="flex flex-col gap-8">
      <SearchProduct onSelect={() => {}} onItemsChange={handleSelectedItemsChange} />
      <SearchCustomer onCustomerSelect={(id) => setSelectedCustomerID(id)} />

      <PaymentDetails1 items={paymentItems} total={total}  />

    </main>
  );
};

export default CreateOrderForm;
