import { Button, Modal, Text } from "@mantine/core";
import FormSelect from "../../../../General/select";
import FormInput from "../../../../General/formInput";
import {
  useFetchAllOrders,
  useLogComplain,
} from "../../../../../hooks/backendApis/pos/returns";
import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useFetchAllCustomers } from "../../../../../hooks/backendApis/pos/customersManagement";

interface LogComplaintsProps {
  opened: boolean;
  onClose: () => void;
}

const LogComplaints = ({ opened, onClose }: LogComplaintsProps) => {
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState<string>();
  const [orderNo, setOrderNo] = useState("");
  const [productNo, setProductNo] = useState("");
  const [reasonForRefund, setReasonForRefund] = useState("");
  const [description, setDescription] = useState("");
  const { mutate, isPending } = useLogComplain();

  const [productOptions, setProductOptions] = useState<
    {
      label: string;
      value: string;
      product_code: string;
      order_detail_id: string;
    }[]
  >([]);

  const { data: customersData } = useFetchAllCustomers();

  const {
    mutate: fetchOrders,
    data: allOrdersByCustomer,
    // isLoading: isOrdersLoading,
  } = useFetchAllOrders(customerId ?? "");

  useEffect(() => {
    if (customerId) {
      fetchOrders();
    }
  }, [customerId, fetchOrders]);

  const customers = Array.isArray(customersData?.data?.customers?.data)
    ? customersData.data.customers.data
    : [];

  const customerNames = customers.map((c: any) => ({
    label: c.customer_name,
    value: c.customerID,
  }));

  const orderOptions = Array.isArray(allOrdersByCustomer?.data)
    ? allOrdersByCustomer.data.map((order: any) => ({
        label: order.orderID,
        value: order.orderID,
      }))
    : [];

  useEffect(() => {
    if (!orderNo || !Array.isArray(allOrdersByCustomer?.data)) {
      setProductOptions([]);
      return;
    }

    const selectedOrder = allOrdersByCustomer.data.find(
      (order: any) => order.orderID === orderNo
    );

    if (selectedOrder) {
      const products =
        selectedOrder.sale_order_details?.map((detail: any) => {
          const productCode =
            detail.product_code || detail.product_variation?.code;
          const label =
            detail.product_variation?.name ||
            detail.product_variation?.sku ||
            productCode ||
            "Unnamed Product";

          return {
            label,
            value: productCode, 
            product_code: productCode,
            order_detail_id: detail.id, 
          };
        }) ?? [];

      setProductOptions(products);
    } else {
      setProductOptions([]);
    }
  }, [orderNo, allOrdersByCustomer]);

  // when productNo changes, set orderDetailId as well
  useEffect(() => {
    if (!orderNo || !Array.isArray(allOrdersByCustomer?.data)) {
      setProductOptions([]);
      return;
    }

    const selectedOrder = allOrdersByCustomer.data.find(
      (order: any) => order.orderID === orderNo
    );

    if (selectedOrder) {
      const products =
        selectedOrder.sale_order_details?.map((detail: any) => {
          const productCode =
            detail.product_code || detail.product_variation?.code;
          const label =
            detail.product_variation?.name ||
            detail.product_variation?.sku ||
            productCode ||
            "Unnamed Product";

          return {
            label,
            value: productCode,
            product_code: productCode,
            order_detail_id: detail.id || detail.order_detail_id || "", // <-- fix here
          };
        }) ?? [];

      setProductOptions(products);
    } else {
      setProductOptions([]);
    }
  }, [orderNo, allOrdersByCustomer]);

  const handleSave = () => {
    if (!customerId || !orderNo || !productNo || !reasonForRefund) {
      notifications.show({
        title: "Validation Error",
        message: "Please fill all required fields",
        color: "red",
      });
      return;
    }

    const selectedProduct = productOptions.find((p) => p.value === productNo);

    if (!selectedProduct) {
      notifications.show({
        title: "Validation Error",
        message: "Invalid product selected",
        color: "red",
      });
      return;
    }

    console.log("Payload:", {
      customerId,
      customer_name: customerName,
      order_id: orderNo,
      order_detail_id: selectedProduct.order_detail_id,
      product_code: selectedProduct.product_code,
      return_reason: reasonForRefund,
      description: description || null,
    });

    mutate(
      {
        customerId,
        customer_name: customerName,
        order_id: orderNo,
        order_detail_id: selectedProduct.order_detail_id,
        product_code: selectedProduct.product_code,
        return_reason: reasonForRefund,
        description: description || null,
      },
      {
        onSuccess: () => {
          notifications.show({
            title: "Complaint Logged!",
            message: "Customer complaint successfully logged.",
            color: "green",
          });
          // reset states and close modal here
          setCustomerName("");
          setCustomerId(undefined);
          setOrderNo("");
          setProductNo("");
          setReasonForRefund("");
          setDescription("");
          onClose();
        },
        onError: (error: any) => {
          notifications.show({
            title: "Error",
            message:
              error?.response?.data?.message || "Failed to log complaint",
            color: "red",
          });
        },
      }
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <div>
          <Text size="1.5rem" c="black" fw={700}>
            Log in Complaint
          </Text>
          <Text mt="5">Fill the details below.</Text>
        </div>
      }
      centered
      size="lg"
      radius={10}
      padding="xl"
    >
      <div className="space-y-4 grid grid-cols-1">
        <FormSelect
          label="Select or Search Customer's Name"
          options={customerNames}
          placeholder="Enter customer"
          paddingY="3"
          value={customerId}
          onSelect={(id: string) => {
            setCustomerId(id);
            const sel = customerNames.find((c: any) => c.value === id);
            setCustomerName(sel?.label || "");
            setOrderNo("");
            setProductNo("");
          }}
        />

        <FormSelect
          label="Order No"
          options={orderOptions}
          placeholder="Select order"
          paddingY="3"
          value={orderNo}
          onSelect={(value: string) => {
            setOrderNo(value);
            setProductNo(""); // reset product selection on order change
          }}
        />

        <FormSelect
          label="Product No"
          options={productOptions.map((opt) => ({
            label: opt.label,
            value: opt.value,
          }))}
          placeholder="Select product"
          paddingY="3"
          value={productNo}
          onSelect={setProductNo}
        />

        <FormSelect
          label="Reason for Refund"
          options={[
            { label: "Damaged item", value: "damaged" },
            { label: "Wrong item", value: "wrong_item" },
            { label: "Not as described", value: "not_as_described" },
            { label: "Other", value: "other" },
          ]}
          placeholder="Select reason"
          paddingY="3"
          value={reasonForRefund}
          onSelect={setReasonForRefund}
        />

        <FormInput
          label="Description (optional)"
          placeholder="Enter description"
          paddingY="3"
          value={description}
          onChange={(e: any) => setDescription(e.currentTarget.value)}
        />

        <div className="flex mt-7 justify-between">
          <Button variant="outline-primary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="filled-primary"
            loading={isPending}
            onClick={handleSave}
          >
            Log Complaint
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogComplaints;
