import { Button, Modal, Text } from "@mantine/core";
import FormSelect from "../../../../General/select";
import FormInput from "../../../../General/formInput";
import {
  // useFetchAllCustomers,
  useFetchOrdersByCustomer,
  useLogComplain,
} from "../../../../../hooks/backendApis/pos/returns";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useFetchAllCustomers } from "../../../../../hooks/backendApis/pos/customersManagement";

interface LogComplaintsProps {
  opened: boolean;
  onClose: () => void;
}

const LogComplaints = ({ opened, onClose }: LogComplaintsProps) => {
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState<string | undefined>();
  const [orderNo, setOrderNo] = useState("");
  const [productNo, setProductNo] = useState("");
  const [reasonForRefund, setReasonForRefund] = useState("");
  const [description, setDescription] = useState("");
  const { mutate, isPending } = useLogComplain();
  
  const { data: customersData } = useFetchAllCustomers();
  const {
    data: customerOrders,
    // isLoading: ordersLoading,
  } = useFetchOrdersByCustomer(customerId);


  const orderOptions = Array.isArray(customerOrders)
    ? customerOrders.map((order) => ({
        label: order.order_no,
        value: order.order_no,
      }))
    : [];

  console.log("customerOrders", customerOrders);
  console.log("orderOptions", orderOptions);

  const customers = Array.isArray(customersData?.data?.customers?.data)
    ? customersData.data.customers.data
    : [];

  const customerNames = customers.map((customer: any) => ({
    label: customer.customer_name,
    value: customer.customerID,
  }));

  const handleSave = () => {
    if (!customerName.trim() || !orderNo || !productNo || !reasonForRefund) {
      notifications.show({
        title: "Validation Error",
        message: "Please fill all required fields",
        color: "red",
      });
      return;
    }

    const payload = {
      customer_name: customerName,
      order_no: orderNo,
      product_no: productNo,
      reason_for_refund: reasonForRefund,
      description: description || null,
    };

    mutate(payload, {
      onSuccess: () => {
        notifications.show({
          title: "Complaint Logged!",
          message: "Customer complaint successfully logged.",
          color: "green",
        });
        // Reset form
        setCustomerName("");
        setOrderNo("");
        setProductNo("");
        setReasonForRefund("");
        setDescription("");
        onClose();
      },
      onError: (error: any) => {
        notifications.show({
          title: "Error",
          message: error?.response?.data?.message || "Failed to log complaint",
          color: "red",
        });
      },
    });
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
          onSelect={(selectedCustomerId: any) => {
            setCustomerId(selectedCustomerId);
            const selected = customerNames.find(
              (c: any) => c.value === selectedCustomerId
            );
            setCustomerName(selected?.label || "");
          }}
        />

        <FormInput
          label="Order No"
          placeholder="Select order"
          paddingY="3"
          value={orderNo}
          // onSelect={setOrderNo}
          // loading={ordersLoading}
        />

        <FormInput
          label="Product No"
          placeholder="Enter product no"
          paddingY="6px"
          value={productNo}
          onChange={(e: any) => setProductNo(e.target.value)}
        />
        <FormSelect
          label="Reason for Refund"
          options={[
            { label: "Damaged item", value: "damaged" },
            { label: "Wrong item", value: "wrong" },
            { label: "Other", value: "other" },
          ]}
          placeholder="Enter reason"
          paddingY="3"
          value={reasonForRefund}
          onSelect={setReasonForRefund}
        />
        <FormInput
          label="Description"
          placeholder="Optional description"
          optional
          paddingY="6px"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />
      </div>

      {/* <div className="flex mt-7 justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="filled" loading={isPending} onClick={handleSave}>
          Log Complaint
        </Button>
      </div> */}

      <div key="confirm-payment-buttons" className="flex mt-7 justify-between">
        <Button variant="outline-primary">Cancel</Button>
        <Button
          variant="filled-primary"
          loading={isPending}
          onClick={handleSave}
        >
          Log Complaint
        </Button>
      </div>
    </Modal>
  );
};

export default LogComplaints;
