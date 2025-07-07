import { Button, Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import PageContainer from "../../../layout/pageContainer";
import { useOrderCreation } from "../../../components/General/orderContext/orderCreationContext";

import CustomerReceipt from "./customerReceipt";
import { OrderCreationStep } from "../../../utils/orderCreationTypes";
import { motion, AnimatePresence } from "framer-motion";
import CreateOrderForm from "./createOrderForm";
import { useEffect, useState } from "react";
import PaymentDetails2 from "../../../components/dashboard/pointOfSales/salesProcessing/confirmPayment/paymentDetails";
import {
  useCreateSales,
  useUpdateDraft,
} from "../../../hooks/backendApis/pos/salesProcessing";
import { notifications } from "@mantine/notifications";
import { ROUTES } from "../../../constants/routes";

const slideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween" as const,
      duration: 0.3,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: {
      type: "tween" as const,
      duration: 0.3,
    },
  }),
};

const CreateOrderPageContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const saleData = location.state?.saleData;
  const orderId = location.state?.saleData?.data?.orderID;

  useEffect(() => {
    if (saleData) {
      const items = (saleData.data.items || []).map((item: any) => ({
        variationId: item.variationId || item.variation_id,
        quantity: item.quantity || 1,
        selling_price: item.price || item.selling_price || 0,
        name: item.name,
        image_path: item.image_path,
        sku: item.sku,
        ean: item.ean,
      }));

      setPaymentDetails({
        method: saleData.data.payment_method || "",
        amount: saleData.data.amount_collected || "",
        customerId: saleData.data.customer.customerID || null,
        items,
      });
    }
  }, [saleData]);

  const [paymentDetails, setPaymentDetails] = useState<{
    method: string;
    amount: string;
    items: any[];
    customerId: string | null;
  }>({
    method: "",
    amount: "",
    items: [],
    customerId: null,
  });

  const { currentStep, nextStep, prevStep } = useOrderCreation();

  const handleBack = () => {
    if (currentStep === OrderCreationStep.SEARCH_PRODUCT) {
      navigate(-1);
    } else {
      prevStep();
    }
  };

  const [submitHandler, setSubmitHandler] = useState<
    ((status: string) => void) | null
  >(null);

  const createSaleMutation = useCreateSales();
  const updateDraftMutation = useUpdateDraft(orderId);
  const handleSubmit = async (status: "draft" | "completed") => {
    // const payload = {
    //   status,
    //   customerId: paymentDetails.customerId,
    //   payment_method: paymentDetails.method,
    //   amount_collected: paymentDetails.amount,
    //   items: paymentDetails.items.map(
    //     (item: { variationId: any; quantity: any; selling_price: any }) => ({
    //       variationId: item.variationId,
    //       quantity: Number(item.quantity),
    //       price: item.selling_price,
    //     })
    //   ),
    // };
    const currentDetails = paymentDetails; // always use latest
    const payload = {
      status,
      customerId: currentDetails.customerId,
      payment_method: currentDetails.method,
      amount_collected: currentDetails.amount,
      items: currentDetails.items.map(item => ({
        variationId: item.variationId,
        quantity: Number(item.quantity),
        price: item.selling_price,
      })),
    };
    try {
      if (orderId) {
        await updateDraftMutation.mutateAsync(payload);
      } else {
        await createSaleMutation.mutateAsync(payload);
      }

      notifications.show({
        title: "Success",
        message:
          status === "completed"
            ? "Payment confirmed"
            : "Draft saved successfully",
        color: "green",
      });
      navigate(ROUTES.sales);
    } catch (error) {
      notifications.show({
        title: "Error",
        //@ts-ignore
        message: error?.message || "Failed to save order",
        color: "red",
      });
    }
  };

  useEffect(() => {
    console.log("🟢 Updated paymentDetails:", paymentDetails);
  }, [paymentDetails]);
  

  useEffect(() => {
    registerSubmitHandler((status: string) => {
      if (status === "draft" || status === "completed") {
        handleSubmit(status);
      } else {
        console.warn(`Invalid status: ${status}`);
      }
    });
  }, [paymentDetails]);

  const registerSubmitHandler = (handler: (status: string) => void) => {
    setSubmitHandler(() => handler);
  };

  // const updatePaymentDetails = (details: {
  //   method: string;
  //   amount: string;
  //   items: any[];
  //   customerId: string | null;
  // }) => {
  //   setPaymentDetails(details);
  // };

  // const updatePaymentDetails = (
  //   updater: (prev: {
  //     method: string;
  //     amount: string;
  //     items: any[];
  //     customerId: string | null;
  //   }) => any
  // ) => {
  //   setPaymentDetails((prev) => {
  //     const next = typeof updater === 'function' ? updater(prev) : updater;
  //     return next;
  //   });
  // };
  
  const updatePaymentDetails = (updater: (arg0: { method: string; amount: string; items: any[]; customerId: string | null; }) => any) => {
    setPaymentDetails((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return next;
    });
  };
  

  const handlePaymentChange = (method: string, amount: string) => {
    setPaymentDetails((prev) => ({
      ...prev,
      method,
      amount,
    }));
  };

  // Inside component
  const handleSubmitRef = useRef(handleSubmit);

  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [paymentDetails]);

  useEffect(() => {
    registerSubmitHandler((status: string) => {
      if (status === "draft" || status === "completed") {
        handleSubmitRef.current(status);
      } else {
        console.warn(`Invalid status: ${status}`);
      }
    });
  }, []); // Register once

  const formatCurrency = (amount: number) => {
    if (isNaN(amount)) return "₦ 0";
    return `₦ ${amount.toLocaleString()}`;
  };

  const subtotal = paymentDetails.items.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return acc + price * quantity;
  }, 0);

  const tax = subtotal * 0.075;
  const service_fee = 1000;

  const subtotalFromSaleData = saleData?.data?.fees
    ? JSON.parse(saleData.data.fees).sub_total
    : subtotal;

  const taxFromSaleData = saleData?.data?.fees
    ? JSON.parse(saleData.data.fees).tax
    : tax;

  const serviceFeeFromSaleData = saleData?.data?.fees
    ? JSON.parse(saleData.data.fees).service_fee
    : service_fee;

  const paymentItems = [
    {
      label: `Subtotal (${paymentDetails.items.length} items)`,
      amount: formatCurrency(subtotalFromSaleData),
    },
    {
      label: "Discount",
      amount: "-",
    },
    {
      label: "Tax (7.5% VAT)",
      amount: formatCurrency(taxFromSaleData),
    },
    {
      label: "Service (1000)",
      amount: formatCurrency(serviceFeeFromSaleData),
    },
  ];

  const totalAmount = saleData?.data?.order_total
    ? Number(saleData.data.order_total)
    : subtotalFromSaleData + taxFromSaleData + serviceFeeFromSaleData;

  const total = formatCurrency(totalAmount);

  const getSubHeaders = () => {
    const backButton = (
      <button
        onClick={handleBack}
        className="flex cursor-pointer gap-2 items-center"
      >
        <ChevronLeft />
        <Text fw={500} c="black">
          Back
        </Text>
      </button>
    );

    const subHeaders = [
      <div key="1" className="py-2.5">
        <div className="hidden sm:flex gap-8 items-center">
          {backButton}
          <div className="flex items-center">
            <Text>Sales processing</Text>
            <span className="mx-2">/</span>
            <Text
              c={
                currentStep === OrderCreationStep.SEARCH_PRODUCT
                  ? "black"
                  : "inherit"
              }
            >
              Create Order
            </Text>
            {(currentStep === OrderCreationStep.CONFIRM_PAYMENT ||
              currentStep === OrderCreationStep.CUSTOMER_RECEIPT) && (
              <>
                <span className="mx-2">/</span>
                <Text c="black" fw={500}>
                  {currentStep === OrderCreationStep.CONFIRM_PAYMENT
                    ? "Confirm Payment"
                    : "Customer Receipt"}
                </Text>
              </>
            )}
          </div>
        </div>

        <div className="flex sm:hidden">{backButton}</div>
      </div>,
      <div key="2">
        <Text fw={500} size="xl" c="black">
          {currentStep === OrderCreationStep.SEARCH_PRODUCT
            ? "Create Order"
            : currentStep === OrderCreationStep.CONFIRM_PAYMENT
            ? "Confirm Payment"
            : "Customer Receipt"}
        </Text>
      </div>,
    ];

    return subHeaders;
  };

  const getBottomButtons = () => {
    switch (currentStep) {
      case OrderCreationStep.SEARCH_PRODUCT:
        return [
          <div key="search-product-buttons" className="flex gap-4 justify-end">
            <Button variant="outline-primary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button variant="filled-primary" onClick={nextStep}>
              Confirm Order
            </Button>
          </div>,
        ];
      case OrderCreationStep.CONFIRM_PAYMENT:
        return [
          <div key="confirm-payment-buttons" className="flex gap-4 justify-end">
            <Button
              variant="outline-primary"
              onClick={() => {
                if (submitHandler) submitHandler("draft");
              }}
              className="btn btn-secondary"
            >
              Save as Draft
            </Button>

            <Button
              variant="filled-primary"
              onClick={() => {
                if (submitHandler) submitHandler("completed");
              }}
            >
              Confirm Payment
            </Button>
          </div>,
        ];
      case OrderCreationStep.CUSTOMER_RECEIPT:
        return [
          <div
            key="customer-receipt-buttons"
            className="flex gap-4 justify-end"
          >
            <Button variant="filled-primary">Download Receipt</Button>
          </div>,
        ];
      default:
        return [];
    }
  };

  const renderStepContent = () => {

    switch (currentStep) {
      case OrderCreationStep.SEARCH_PRODUCT:
        return (
          <motion.div
            key={OrderCreationStep.SEARCH_PRODUCT}
            custom={-1}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col gap-4"
          >
            <CreateOrderForm
              registerSubmit={registerSubmitHandler}
              paymentDetails={paymentDetails}
              //@ts-ignore
              updatePaymentDetails={updatePaymentDetails}
              paymentItems={paymentItems}
              total={total}
              orderId={orderId}
            />
          </motion.div>
        );
      case OrderCreationStep.CONFIRM_PAYMENT:
        return (
          <motion.div
            key={OrderCreationStep.CONFIRM_PAYMENT}
            custom={currentStep > OrderCreationStep.SEARCH_PRODUCT ? 1 : -1}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PaymentDetails2
              method={paymentDetails.method}
              amount={paymentDetails.amount}
              onPaymentChange={handlePaymentChange}
              items={paymentItems}
              total={total}
              orderId={orderId}
            />
          </motion.div>
        );
      case OrderCreationStep.CUSTOMER_RECEIPT:
        return (
          <motion.div
            key={OrderCreationStep.CUSTOMER_RECEIPT}
            custom={1}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <CustomerReceipt />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer
      subHeaders={getSubHeaders()}
      subHeaderButtom={getBottomButtons()}
    >
      <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
    </PageContainer>
  );
};

export default CreateOrderPageContent;
