import { useEffect, useRef, useState } from "react";
import PaymentDetails1 from "../../../components/dashboard/pointOfSales/salesProcessing/paymentDetails";
import SearchCustomer from "../../../components/dashboard/pointOfSales/salesProcessing/searchCustomer";
import SearchProduct from "../../../components/dashboard/pointOfSales/salesProcessing/searchProduct";
import { useCreateSales, useFetchSingleSale } from "../../../hooks/backendApis/pos/salesProcessing";

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
  orderId?: string | number;
}
const CreateOrderForm: React.FC<CreateOrderFormProps> = ({
  registerSubmit,
  paymentDetails,
  updatePaymentDetails,
  paymentItems,
  total,
  orderId,
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

  const createSalesOrder = useCreateSales();
  // const handlerRef = useRef<(status: string) => void>(() => {});
  const handlerRef = useRef<(payload: any, status: string) => void>(() => {});

  const safeOrderId = orderId ?? "";  

  const { data: saleData} = useFetchSingleSale(safeOrderId);


  useEffect(() => {
    if (saleData) {
      // 
  
      // Transform saleData.items
      const itemsPayload = saleData.data.sale_order_details.map((item: { product_variation: { variationID: any; name: any; sku: any; code: any; cost_price: any; selling_price: any; image_path: any; }; quantity_ordered: any; unit_price: any; }) => ({
        id: item.product_variation.variationID,
        name: item.product_variation.name,
        quantity: item.quantity_ordered,
        price: item.unit_price,
        sku: item.product_variation.sku,
        code: item.product_variation.code,
        cost_price: item.product_variation.cost_price,
        selling_price: item.product_variation.selling_price,
        image: item.product_variation.image_path
      }));
      
      
  
      setSelectedItemsPayload(itemsPayload);
      setSelectedCustomerID(saleData.data.customerId || null);
      setPaymentMethod(saleData.payment_method || "");
      setAmountCollected(saleData.amount_collected || "");
  
      updatePaymentDetails({
        method: saleData.payment_method || "",
        amount: saleData.amount_collected || "",
        items: itemsPayload,
        customerId: saleData.data.customerId || null,
      });
    }
  }, [saleData, updatePaymentDetails]);
  
  // const handleSubmit = (status: string) => {
  //   if (!selectedCustomerID) {
  //     alert("Please select a customer.");
  //     return;
  //   }

  //   if (selectedItemsPayload.length === 0) {
  //     alert("Please select at least one item.");
  //     return;
  //   }

  //   const payload = {
  //     customerId: selectedCustomerID,
  //     status,
  //     payment_method: paymentMethod, 
  //     amount_collected: paymentMethod === "cash" ? amountCollected : "",
  //     items: selectedItemsPayload,
  //   };

  //   createSalesOrder.mutate(payload, {
  //     onSuccess: () => {
  //       alert("Sales order created successfully!");
  //     },
  //     onError: (error) => {
  //       alert("Error creating sales order.");
  //       console.error(error);
  //     },
  //   });
  // };

  // useEffect(() => {
  //   handlerRef.current = handleSubmit;
  // }, [
  //   selectedCustomerID,
  //   selectedItemsPayload,
  //   paymentMethod,
  //   amountCollected,
  // ]);

  const handleSubmit = (payload: any, status: string) => {
    if (!payload.customerId) {
      alert("Please select a customer.");
      return;
    }
  
    if (!payload.items || payload.items.length === 0) {
      alert("Please select at least one item.");
      return;
    }
  
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
  }, []);
  

  // useEffect(() => {
  //   if (registerSubmit) {
  //     registerSubmit((status) => {
  //       if (handlerRef.current) {
  //         handlerRef.current(status);
  //       }
  //     });
  //   }
  // }, [registerSubmit]);
  useEffect(() => {
    if (registerSubmit) {
      registerSubmit((status) => {
        const payload = {
          customerId: selectedCustomerID,
          status,
          payment_method: paymentMethod, 
          amount_collected: paymentMethod === "cash" ? amountCollected : "",
          items: selectedItemsPayload,
        };
        handlerRef.current(payload, status);
      });
    }
  }, [registerSubmit, selectedCustomerID, selectedItemsPayload, paymentMethod, amountCollected]);
  
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
        initialItems={selectedItemsPayload}
      />
      <SearchCustomer onCustomerSelect={(id) => setSelectedCustomerID(id)} 
        initialCustomerId={selectedCustomerID}
        initialCustomerName={saleData?.data?.customer?.customer_name || ""}
        />

      <PaymentDetails1 items={paymentItems} total={total} />
    </main>
  );
};

export default CreateOrderForm;
