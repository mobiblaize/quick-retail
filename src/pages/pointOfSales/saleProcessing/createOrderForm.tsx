/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import PaymentDetails1 from "../../../components/dashboard/pointOfSales/salesProcessing/paymentDetails";
import SearchCustomer from "../../../components/dashboard/pointOfSales/salesProcessing/searchCustomer";
import SearchProduct from "../../../components/dashboard/pointOfSales/salesProcessing/searchProduct";
import { useFetchSingleSale } from "../../../hooks/backendApis/pos/salesProcessing";

interface CreateOrderFormProps {
  paymentDetails: {
    method: string;
    amount: string;
    items: any[];
    customerId: string | null;
  };
  updatePaymentDetails: (details:
    | {
        method: string;
        amount: string;
        items: any[];
        customerId: string | null;
      }
    | ((
        prev: {
          method: string;
          amount: string;
          items: any[];
          customerId: string | null;
        }
      ) => {
        method: string;
        amount: string;
        items: any[];
        customerId: string | null;
      })
  ) => void;
  paymentItems: { label: string; amount: string }[];
  total: string;
  orderId?: string | number;
}

const CreateOrderForm: React.FC<CreateOrderFormProps> = ({
  paymentDetails,
  updatePaymentDetails,
  paymentItems,
  total,
  orderId,
}) => {
  const safeOrderId = orderId ?? "";

  // ✅ Only fetch when we actually have an orderId to avoid bad requests
  // If your hook supports an "enabled" flag (react-query style), pass it:
  // const { data: saleData } = useFetchSingleSale(safeOrderId as any, !!safeOrderId as any);
  const { data: saleData } = useFetchSingleSale(safeOrderId);

  // Prefill from server order (only once when saleData arrives)
  useEffect(() => {
    if (!saleData?.data) return;

    const itemsPayload = (saleData.data.sale_order_details || []).map((item: any) => ({
      variationId: item.product_variation?.variationID || null,
      quantity: Number(item.quantity_ordered || 0),
      price: Number(item.unit_price || 0),
      name: item.product_variation?.name || "Unknown Product",
      selling_price: Number(item.unit_price || 0),
      image_path: item.product_variation?.image_path || "",
      custom: false,
      sku: item.product_variation?.sku || "",
      ean: item.product_variation?.ean || "",
    }));

    // avoid resetting to identical values (prevents render loops)
    updatePaymentDetails((prev) => {
      const sameCustomer = (saleData.data.customer?.customerID || null) === prev.customerId;
      const prevKey = JSON.stringify(
        (prev.items || []).map((i: any) => ({
          v: i.variationId || i.variationID,
          q: Number(i.quantity || 0),
          p: Number(i.selling_price ?? i.price ?? 0),
        }))
      );
      const nextKey = JSON.stringify(
        itemsPayload.map((i: any) => ({
          v: i.variationId,
          q: Number(i.quantity || 0),
          p: Number(i.selling_price ?? i.price ?? 0),
        }))
      );

      if (sameCustomer && prevKey === nextKey) return prev;

      return {
        method: saleData.data.payment_method || prev.method || "",
        amount: saleData.data.amount_collected || prev.amount || "",
        items: itemsPayload,
        customerId: saleData.data.customer?.customerID || prev.customerId || null,
      };
    });
  }, [saleData, updatePaymentDetails]);

  const handleSelectedItemsChange = (items: any[]) => {
    const payloadItems = items
      .filter((item) => !item.custom && (item.variationID || item.variationId) && item.quantity)
      .map((item) => ({
        variationId: item.variationId || item.variationID,
        quantity: Number(item.quantity),
        price: Number(item.selling_price ?? item.price ?? 0),
      }));

    updatePaymentDetails((prev) => ({
      ...prev,
      items: payloadItems,
    }));
  };

  const handleCustomerChange = (id: string | null) => {
    updatePaymentDetails((prev) => ({
      ...prev,
      customerId: id,
    }));
  };

  return (
    <main className="flex flex-col gap-8">
      <SearchProduct
        onSelect={() => { }}
        onItemsChange={handleSelectedItemsChange}
        initialItems={paymentDetails.items}
      />
      <SearchCustomer
        // collapsible={false}
        onCustomerSelect={handleCustomerChange}
        initialCustomerId={paymentDetails.customerId}
        initialCustomerName={saleData?.data?.customer?.customer_name || ""}
      />
      <PaymentDetails1  items={paymentItems} total={total} />
    </main>
  );
};

export default CreateOrderForm;
