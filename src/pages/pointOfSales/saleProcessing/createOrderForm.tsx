import { useEffect, } from "react";
import PaymentDetails1 from "../../../components/dashboard/pointOfSales/salesProcessing/paymentDetails";
import SearchCustomer from "../../../components/dashboard/pointOfSales/salesProcessing/searchCustomer";
import SearchProduct from "../../../components/dashboard/pointOfSales/salesProcessing/searchProduct";
import {
  useFetchSingleSale,
} from "../../../hooks/backendApis/pos/salesProcessing";

interface CreateOrderFormProps {
  registerSubmit: (handler: (payload: any) => void) => void;
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
  const safeOrderId = orderId ?? "";
  const { data: saleData } = useFetchSingleSale(safeOrderId);

  useEffect(() => {
    if (saleData) {
      const itemsPayload = saleData.data.sale_order_details.map((item: any) => ({
        variationId: item.product_variation?.variationID || null,
        quantity: item.quantity_ordered,
        price: Number(item.unit_price),
        name: item.product_variation?.name || "Unknown Product",
        selling_price: Number(item.unit_price),
        image_path: item.product_variation?.image_path || "",
        custom: false,
      }));

      updatePaymentDetails({
        method: saleData.data.payment_method || "",
        amount: saleData.data.amount_collected || "",
        items: itemsPayload,
        customerId: saleData.data.customer?.customerID || null,
      });
    }
  }, [saleData, updatePaymentDetails]);

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
    console.log("Customer ID selected:", id);
    updatePaymentDetails({
      ...paymentDetails,
      customerId: id,
    });
  };

  useEffect(() => {
    if (registerSubmit) {
      registerSubmit((status: string) => {
        const payload = {
          customerId: paymentDetails.customerId,
          status,
          payment_method: paymentDetails.method,
          amount_collected:
            paymentDetails.method === "cash" ? paymentDetails.amount : "",
          items: paymentDetails.items.map((item) => ({
            variationId: item.variationId || item.variationID,
            quantity: Number(item.quantity),
            price: Number(item.selling_price || item.price),
          })),
        };

        if (!payload.customerId) {
          alert("Please select a customer.");
          return;
        }

        if (!payload.items || payload.items.length === 0) {
          alert("Please select at least one item.");
          return;
        }

        // console.log("Submitting payload:", payload);
        // Now parent can handle the mutation / API call
        // because CreateOrderForm guarantees the payload is complete
        // The parent (CreateOrderPageContent) will pass this to the API
        return payload;
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

