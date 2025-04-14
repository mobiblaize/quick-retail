import React from "react";
import { Button, Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import PageContainer from "../../../layout/pageContainer";
import {
  StoreOverviewStep,
  useStoreOrder,
} from "../../../components/General/orderContext/orderCreationContext";
import OrderDetails from "../../../components/dashboard/pointOfSales/returnsRefunds/orderDetails";
import ViewProduct from "../../../components/General/orderContext/viewProduct";
import AllOrders from "./allOrders";

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

const StoreOrderContent: React.FC = () => {
  const navigate = useNavigate();
  const { currentStep, prevStep } = useStoreOrder();

  const handleBack = () => {
    if (currentStep === StoreOverviewStep.STORE_OVERVIEW) {
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
            <Text>Stores</Text>
            <span className="mx-2">/</span>
            <Text c={"black"}>Ikeja City Mall</Text>
          </div>
        </div>
      </div>,
      <div key="2">
        <div className="flex justify-between items-center">
          <Text fw={500} size="xl" c="black">
            Ikeja City Mall
          </Text>
          <div className="flex gap-4">
            <Button variant="filled-primary">Edit Store</Button>
            <Button variant="outline-primary">View Store</Button>
          </div>
        </div>
      </div>,
    ];

    return subHeaders;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case StoreOverviewStep.STORE_OVERVIEW:
        return (
          <motion.div
            key={StoreOverviewStep.STORE_OVERVIEW}
            custom={-1}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col gap-4"
          >
            <AllOrders />
          </motion.div>
        );
      case StoreOverviewStep.ORDER_DETAILS:
        return (
          <motion.div
            key={StoreOverviewStep.ORDER_DETAILS}
            custom={currentStep > StoreOverviewStep.STORE_OVERVIEW ? 1 : -1}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <OrderDetails />
          </motion.div>
        );
      case StoreOverviewStep.VIEW_PRODUCT:
        return (
          <motion.div
            key={StoreOverviewStep.VIEW_PRODUCT}
            custom={1}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ViewProduct />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer subHeaders={getSubHeaders()}>
      <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
    </PageContainer>
  );
};

export default StoreOrderContent;
