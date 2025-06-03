import { Button, Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import PageContainer from "../../../layout/pageContainer";
import {
  StoreOverviewStep,
  useStoreOrder,
} from "../../../components/General/orderContext/orderCreationContext";
import OrderDetails from "../../../components/dashboard/pointOfSales/returnsRefunds/orderDetails";
import ViewProduct from "../../../components/General/orderContext/viewProduct";
import AllOrders from "./allOrders";
import EditStore from "../../../components/dashboard/pointOfSales/stores/modals/editStore";
import { useState } from "react";

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
  const location = useLocation();
  const store = location.state?.store;
  const navigate = useNavigate();
  const { currentStep, prevStep } = useStoreOrder();
  const [storeData, setStoreData] = useState(location.state?.store);

  const handleBack = () => {
    if (currentStep === StoreOverviewStep.STORE_OVERVIEW) {
      navigate(-1);
    } else {
      prevStep();
    }
  };
  const storeName = storeData?.name ?? "Store";

  const [isAddNewStoreOpen, setIsAddNewStoreOpen] = useState(false);
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
          <div className="md:flex hidden items-center">
            {/* <Text>Stores</Text> */}
            {/* <span className="mx-2">/</span> */}
            {/* <Text c={"black"}>{store.name}</Text> */}
          </div>
        </div>
      </div>,
      <div key="2" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <Text fw={500} size="xl" c="black">
          {storeName}
          </Text>
          <div className="flex gap-2 sm:gap-4 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <Button variant="filled-primary" className="whitespace-nowrap"      onClick={() => setIsAddNewStoreOpen(true)}>
              Edit Store
            </Button>
            {/* <Button variant="outline-primary" className="whitespace-nowrap">
              View Store
            </Button> */}
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
           {/* <AllOrders store={store} /> */}
           <AllOrders store={storeData} />

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
    <>
     <EditStore
        opened={isAddNewStoreOpen}
        onClose={() => setIsAddNewStoreOpen(false)}
        store={store} 
        setStore={setStoreData}
      />
    <PageContainer subHeaders={getSubHeaders()}>
      <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
    </PageContainer>
    </>
  );
};

export default StoreOrderContent;
