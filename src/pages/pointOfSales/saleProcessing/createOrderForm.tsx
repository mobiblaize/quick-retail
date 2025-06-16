import { useEffect, useRef } from "react";
import PaymentDetails1 from "../../../components/dashboard/pointOfSales/salesProcessing/paymentDetails";
import SearchCustomer from "../../../components/dashboard/pointOfSales/salesProcessing/searchCustomer";
import SearchProduct from "../../../components/dashboard/pointOfSales/salesProcessing/searchProduct";
import {
  useCreateSales,
  useFetchSingleSale,
} from "../../../hooks/backendApis/pos/salesProcessing";

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
  const createSalesOrder = useCreateSales();
  const handlerRef = useRef<(payload: any, status: string) => void>(() => {});

  const safeOrderId = orderId ?? "";
  const { data: saleData } = useFetchSingleSale(safeOrderId);

  useEffect(() => {
    if (saleData) {
      const itemsPayload = saleData.data.sale_order_details.map(
        (item: any) => ({
          variationId: item.product_variation?.variationID || null,
          quantity: item.quantity_ordered,
          price: Number(item.unit_price),
          name: item.product_variation?.name || "Unknown Product",
          selling_price: Number(item.unit_price),
          image_path: item.product_variation?.image_path || "",
          custom: false,
        })
      );

      updatePaymentDetails({
        method: saleData.data.payment_method || "",
        amount: saleData.data.amount_collected || "",
        items: itemsPayload,
        customerId: saleData.data.customer?.customerID || null,
      });
    }
  }, [saleData, updatePaymentDetails]);

  // HANDLERS
  const handleSelectedItemsChange = (items: any[]) => {
    const payloadItems = items
      .filter((item) => !item.custom && item.variationID && item.quantity)
      .map((item) => ({
        variationId: item.variationID,
        quantity: Number(item.quantity),
        price: Number(item.selling_price),
      }));

    updatePaymentDetails({
      ...paymentDetails,
      items: payloadItems,
    });
  };

  const handleCustomerChange = (id: string | null) => {
    updatePaymentDetails({
      ...paymentDetails,
      customerId: id,
    });
  };

  const handleSubmit = (payload: any, ) => {
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

  useEffect(() => {
    if (registerSubmit) {
      registerSubmit((status) => {
        const payload = {
          customerId: paymentDetails.customerId,
          status,
          payment_method: paymentDetails.method,
          amount_collected:
            paymentDetails.method === "cash" ? paymentDetails.amount : "",
          items: paymentDetails.items,
        };

        handlerRef.current(payload, status);
      });
    }
  }, [registerSubmit, paymentDetails]);

  return (
    <main className="flex flex-col gap-8">
      <SearchProduct
        onSelect={() => {}}
        onItemsChange={handleSelectedItemsChange}
        initialItems={paymentDetails.items}
      />
      <SearchCustomer
        onCustomerSelect={handleCustomerChange}
        initialCustomerId={paymentDetails.customerId}
        initialCustomerName={saleData?.data?.customer?.customer_name || ""}
      />
      <PaymentDetails1 items={paymentItems} total={total} />
    </main>
  );
};

export default CreateOrderForm;
