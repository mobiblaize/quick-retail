/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import PageContainer from "../../../layout/pageContainer";
import { useOrderCreation } from "../../../components/General/orderContext/orderCreationContext";
import CustomerReceipt from "./customerReceipt";
import { OrderCreationStep } from "../../../utils/orderCreationTypes";
import { motion, AnimatePresence } from "framer-motion";
import PaymentDetails2 from "../../../components/dashboard/pointOfSales/salesProcessing/confirmPayment/paymentDetails";
import {
  useCreateSales,
  useUpdateDraft,
  usePaymentDetails,
} from "../../../hooks/backendApis/pos/salesProcessing";
import { notifications } from "@mantine/notifications";
import { ROUTES } from "../../../constants/routes";
import CreateOrderForm from "./createOrderForm";

const slideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: "tween" as const, duration: 0.3 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { type: "tween" as const, duration: 0.3 },
  }),
};

const CreateOrderPageContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const saleData = location.state?.saleData;
  const orderId = location.state?.saleData?.data?.orderID;

  // ---- Payment details state ----
  const [paymentDetails, setPaymentDetails] = useState<{
    method: string;
    amount: string;
    items: any[];
    customerId: string | null;
  }>({ method: "", amount: "", items: [], customerId: null });

  console.log("Create Order Page Content");

  useEffect(() => {
    if (!saleData) return;

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
      customerId: saleData.data.customer?.customerID || null,
      items,
    });
  }, [saleData]);

  // ---- Step navigation ----
  const { currentStep, nextStep, prevStep } = useOrderCreation();
  const handleBack = () =>
    currentStep === OrderCreationStep.SEARCH_PRODUCT
      ? navigate(-1)
      : prevStep();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isConfirmingOrder, setIsConfirmingOrder] = useState(false);
  const [isConfirmingPayment, setIsConfirmingPayment] = useState(false);
  const handleBack2 = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      window.location.href = ROUTES.sales;
    }, 500);
  };

  // ---- Backend breakdown (subtotal/discount/tax/total/etc) ----
  const [breakdown, setBreakdown] = useState<{
    originalAmount: number;
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    itemCount: number;
    taxRate: number;
  }>({
    originalAmount: 0,
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
    itemCount: 0,
    taxRate: 7.5,
  });

  const { mutateAsync: postPaymentBreakdown } = usePaymentDetails();

  const itemsKey = useMemo(
    () =>
      JSON.stringify(
        (paymentDetails.items || [])
          .map((i: any) => ({
            variationId: i.variationId || i.variationID,
            quantity: Number(i.quantity || 0),
          }))
          .filter((i: any) => i.variationId && i.quantity > 0)
      ),
    [paymentDetails.items]
  );

  useEffect(() => {
    if (!paymentDetails.customerId) return;
    const parsed = JSON.parse(itemsKey || "[]");
    if (!parsed.length) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await postPaymentBreakdown({
          customerId: paymentDetails.customerId!,
          items: parsed,
        });

        // { error:false, message:"Payment Details", data:{ originalAmount, subtotal, itemCount, discount, taxRate, taxValue, total } }
        const envelope = (res as any)?.data ?? res;
        const apiData = envelope?.data ?? envelope;

        if (!cancelled) {
          setBreakdown({
            originalAmount: Number(apiData?.originalAmount ?? 0),
            subtotal: Number(
              apiData?.subtotal ?? apiData?.subTotal ?? apiData?.sub_total ?? 0
            ),
            discount: Number(apiData?.discount ?? 0),
            tax: Number(apiData?.taxValue ?? apiData?.tax ?? 0),
            total: Number(apiData?.total ?? 0),
            itemCount: Number(apiData?.itemCount ?? parsed.length ?? 0),
            taxRate: Number(apiData?.taxRate ?? 7.5),
          });
        }
      } catch {
        // swallow; we'll use local fallback below
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [paymentDetails.customerId, itemsKey, postPaymentBreakdown]);

  // ---- Display helpers & fallbacks ----
  const formatCurrency = (n: number) => `₦ ${Number(n || 0).toLocaleString()}`;

  const localSubtotal = useMemo(
    () =>
      paymentDetails.items.reduce((acc, item) => {
        const unit = Number(item.selling_price ?? item.price ?? 0);
        const qty = Number(item.quantity ?? 0);
        return acc + unit * qty;
      }, 0),
    [paymentDetails.items]
  );

  const localTaxRate = 7.5;
  const localTax = useMemo(
    () => localSubtotal * (localTaxRate / 100),
    [localSubtotal]
  );
  const localTotal = useMemo(
    () => localSubtotal + localTax,
    [localSubtotal, localTax]
  );

  const usingApi =
    breakdown.originalAmount > 0 ||
    breakdown.subtotal > 0 ||
    breakdown.discount > 0 ||
    breakdown.tax > 0 ||
    breakdown.total > 0;

  const effective = {
    originalAmount: usingApi ? breakdown.originalAmount : localSubtotal,
    subtotal: localSubtotal,
    discount: usingApi ? breakdown.discount : 0,
    tax: usingApi ? breakdown.tax : localTax,
    total: usingApi ? breakdown.total : localTotal,
    itemCount: usingApi
      ? breakdown.itemCount || paymentDetails.items.length
      : paymentDetails.items.length,
    taxRate: usingApi ? breakdown.taxRate || localTaxRate : localTaxRate,
  };

  const paymentItems = [
    // { label: "Items", amount: String(effective.itemCount) },
    // { label: "Original Amount", amount: formatCurrency(effective.originalAmount) },
    { label: "Subtotal", amount: formatCurrency(effective.subtotal) },
    {
      label: "Discount",
      amount:
        effective.discount > 0
          ? `- ${formatCurrency(effective.discount)}`
          : formatCurrency(0),
    },
    // { label: `Tax (${effective.taxRate}% VAT)`, amount: formatCurrency(effective.tax) },
  ];

  const total = formatCurrency(effective.total);

  // ---- Mutations ----
  const createSaleMutation = useCreateSales();
  const updateDraftMutation = useUpdateDraft(orderId);

  // ---- Validation ----
  const hasCustomer = Boolean(paymentDetails.customerId);

  const validItems = useMemo(
    () =>
      (paymentDetails.items || []).filter(
        (i) => (i.variationId || i.variationID) && Number(i.quantity) > 0
      ),
    [paymentDetails.items]
  );

  const hasProducts = validItems.length > 0;

  const isOrderValid = hasProducts;

  const numericTotal = Number(effective.total || 0);
  const numericAmount = Number(paymentDetails.amount || 0);

  const canConfirmPayment =
    isOrderValid &&
    !!paymentDetails.method &&
    (paymentDetails.method === "cash" ? numericAmount >= numericTotal : true);

  // ---- Submit ----
  const handleSubmit = async (status: "draft" | "completed") => {
    if (!isOrderValid) {
      notifications.show({
        title: "Incomplete Order",
        message: "Add at least one item.",
        color: "red",
      });
      return;
    }
    if (
      status === "completed" &&
      (!paymentDetails.method ||
        (paymentDetails.method === "cash" && numericAmount < numericTotal))
    ) {
      notifications.show({
        title: "Payment Incomplete",
        message:
          paymentDetails.method === "cash"
            ? "Collected cash cannot be less than total."
            : "Select a payment method.",
        color: "red",
      });
      return;
    }

    const payload = {
      status,
      customerId: paymentDetails.customerId,
      payment_method: paymentDetails.method,
      amount_collected:
        paymentDetails.method === "cash" ? paymentDetails.amount : "",
      items: paymentDetails.items.map((item) => ({
        variationId: item.variationId || item.variationID,
        quantity: Number(item.quantity),
        price: Number(item.selling_price ?? item.price ?? 0),
      })),
    };

    try {
      let orderResponse:any;
      if (orderId) orderResponse = await updateDraftMutation.mutateAsync(payload);
      else orderResponse = await createSaleMutation.mutateAsync(payload);

      notifications.show({
        title: "Order Successful",
        message:
          status === "completed"
            ? "Payment confirmed by cashier"
            : "Payment for this order wasn't confirmed by cashier",
        color: "green",
      });

      navigate(ROUTES.viewOrder, {state: {orderID: orderResponse?.data?.salesOrder?.orderID}});
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error?.message || "Failed to save order",
        color: "red",
      });
    }
  };

  // ---- Updaters ----
  const updatePaymentDetails = useCallback(
    (
      updater:
        | ((prev: {
            method: string;
            amount: string;
            items: any[];
            customerId: string | null;
          }) => {
            method: string;
            amount: string;
            items: any[];
            customerId: string | null;
          })
        | {
            method: string;
            amount: string;
            items: any[];
            customerId: string | null;
          }
    ) => {
      setPaymentDetails((prev) =>
        typeof updater === "function" ? (updater as any)(prev) : updater
      );
    },
    []
  );

  const handlePaymentChange = useCallback((method: string, amount: string) => {
    setPaymentDetails((prev) => ({ ...prev, method, amount }));
  }, []);

  // ---- Headers & bottom buttons ----
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

    return [
      <div key="1" className="py-2.5">
        <div className="hidden sm:flex gap-8 items-center">{backButton}</div>
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
  };

  const getBottomButtons = () => {
    switch (currentStep) {
      case OrderCreationStep.SEARCH_PRODUCT:
        return [
          <div key="search-product-buttons" className="flex gap-4 justify-end">
            <Button variant="outline-primary" onClick={handleBack2} w={150}>
              Cancel
            </Button>
            <Button
              variant="filled-primary"
              onClick={() => {
                if (isOrderValid && !isConfirmingOrder) {
                  setIsConfirmingOrder(true);
                  nextStep();
                }
              }}
              disabled={!isOrderValid || isConfirmingOrder}
              w={150}
              title={
                !hasCustomer
                  ? "Select a customer"
                  : !hasProducts
                  ? "Add at least one product with quantity"
                  : undefined
              }
            >
              Confirm Order
            </Button>
          </div>,
        ];
      case OrderCreationStep.CONFIRM_PAYMENT:
        return [
          <div key="confirm-payment-buttons" className="flex gap-4 justify-end">
            <Button
              variant="outline-primary"
              onClick={() => isOrderValid && handleSubmit("draft")}
              disabled={!isOrderValid}
              className="btn btn-secondary"
              title={
                !hasCustomer
                  ? "Select a customer"
                  : !hasProducts
                  ? "Add at least one product with quantity"
                  : undefined
              }
            >
              Save as Draft
            </Button>

            <Button
              variant="filled-primary"
              onClick={() => {
                if (canConfirmPayment && !isConfirmingPayment) {
                  setIsConfirmingPayment(true);
                  handleSubmit("completed");
                }
              }}
              disabled={!canConfirmPayment || isConfirmingPayment}
              title={
                !hasCustomer
                  ? "Select a customer"
                  : !hasProducts
                  ? "Add at least one product with quantity"
                  : !paymentDetails.method
                  ? "Choose a payment method"
                  : paymentDetails.method === "cash" &&
                    numericAmount < numericTotal
                  ? "Collected cash cannot be less than total"
                  : undefined
              }
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
              paymentDetails={paymentDetails}
              updatePaymentDetails={updatePaymentDetails as any}
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
              // If your PaymentDetails2 supports showing the rows:
              items={paymentItems as any}
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

  if (isRedirecting) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Text fw={500} size="lg">
          Redirecting...
        </Text>
      </div>
    );
  }

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
