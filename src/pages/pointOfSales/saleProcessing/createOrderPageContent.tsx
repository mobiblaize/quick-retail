import React from "react";
import { Button, Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PageContainer from "../../../layout/pageContainer";
import { useOrderCreation } from "../../../components/General/orderContext/orderCreationContext";

import CustomerReceipt from "./customerReceipt";
import { OrderCreationStep } from "../../../utils/orderCreationTypes";
import { motion, AnimatePresence } from "framer-motion";
import CreateOrderForm from "./createOrderForm";
import ConfirmPayment from "./confirmPayment";

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
  const { currentStep, nextStep, prevStep } = useOrderCreation();

  const handleBack = () => {
    if (currentStep === OrderCreationStep.SEARCH_PRODUCT) {
      navigate(-1);
    } else {
      prevStep();
    }
  };

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
        <div className="flex gap-8 items-center">
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
            <Button variant="outline-primary" onClick={prevStep}>
              Save to Draft
            </Button>
            <Button variant="filled-primary" onClick={nextStep}>
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
            <CreateOrderForm />
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
            <ConfirmPayment />
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
