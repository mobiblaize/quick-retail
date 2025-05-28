import { Button, Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import PageContainer from "../../../layout/pageContainer";
import { useOrderCreation } from "../../../components/General/orderContext/orderCreationContext";

import CustomerReceipt from "./customerReceipt";
import { OrderCreationStep } from "../../../utils/orderCreationTypes";
import { motion, AnimatePresence } from "framer-motion";
import CreateOrderForm from "./createOrderForm";
import { useEffect, useState } from "react";
import PaymentDetails2 from "../../../components/dashboard/pointOfSales/salesProcessing/confirmPayment/paymentDetails";
import { useCreateSales, useUpdateDraft } from "../../../hooks/backendApis/pos/salesProcessing";
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
      type: "tween",
      duration: 0.3,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: {
      type: "tween",
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
    setPaymentDetails({
      method: saleData.payment_method || "",
      amount: saleData.amount_collected || "",
      customerId: saleData.customerId || null,
      items: (saleData.items || []).map((item: any) => ({
        ...item,
        quantity: item.quantity || 1,
        price: item.selling_price || 0,
      })),
    });
  }
}, [saleData]);



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




  const createSaleMutation = useCreateSales();
const updateDraftMutation = useUpdateDraft(orderId);
  const handleSubmit = async (status: 'draft' | 'completed') => {
    const payload = {
      status,
      customerId: paymentDetails.customerId,
      payment_method: paymentDetails.method,
      amount_collected: paymentDetails.amount,
      items: paymentDetails.items.map((item) => ({
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
        title: 'Success',
        message:
          status === 'completed' ? 'Payment confirmed' : 'Draft saved successfully',
        color: 'green',
      });
          navigate(ROUTES.sales);
    } catch (error) {
      notifications.show({
        title: 'Error',
        //@ts-ignore
        message: error?.message || 'Failed to save order',
        color: 'red',
      });
    }
  };

useEffect(() => {
  registerSubmitHandler((status: string) => {
    if (status === "draft" || status === "completed") {
      handleSubmit(status);  // call your typed async function
    } else {
      console.warn(`Invalid status: ${status}`);
    }
  });
}, [paymentDetails]);
// Re-register handler if details change


  const registerSubmitHandler = (handler: (status: string) => void) => {
    setSubmitHandler(() => handler);
  };

  const updatePaymentDetails = (details: {
    method: string;
    amount: string;
    items: any[];
    customerId: string | null;
  }) => {
    setPaymentDetails(details);
  };


  const handlePaymentChange = (method: string, amount: string) => {
    setPaymentDetails((prev) => ({
      ...prev,
      method,
      amount,
    }));
  };
  
  
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
  
  const paymentItems = [
    { label: `Subtotal (${paymentDetails.items.length} items)`, amount: formatCurrency(subtotal) },
    { label: "Discount", amount: "-" },
    { label: "Tax (7.5% VAT)", amount: formatCurrency(tax) },
  ];
  
  const totalAmount = subtotal + tax;
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
        {/* Original layout for larger screens */}
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
  updatePaymentDetails={updatePaymentDetails}
  paymentItems={paymentItems}
  total={total}

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
