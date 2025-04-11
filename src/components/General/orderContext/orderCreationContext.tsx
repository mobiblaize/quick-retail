import React, { createContext, useState, useContext, ReactNode } from "react";

export interface SlideContextType<T> {
  currentStep: T;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: T) => void;
}

export function createSlideProvider<T extends string | number>(steps: T[]) {
  const SlideContext = createContext<SlideContextType<T> | undefined>(
    undefined
  );

  const SlideProvider: React.FC<{
    children: ReactNode;
    initialStep?: T;
  }> = ({ children, initialStep = steps[0] }) => {
    const [currentStep, setCurrentStep] = useState<T>(initialStep);

    const nextStep = () => {
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1]);
      }
    };

    const prevStep = () => {
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex > 0) {
        setCurrentStep(steps[currentIndex - 1]);
      }
    };

    const goToStep = (step: T) => {
      if (steps.includes(step)) {
        setCurrentStep(step);
      }
    };

    return (
      <SlideContext.Provider
        value={{
          currentStep,
          nextStep,
          prevStep,
          goToStep,
        }}
      >
        {children}
      </SlideContext.Provider>
    );
  };

  const useSlideContext = () => {
    const context = useContext(SlideContext);
    if (context === undefined) {
      throw new Error("useSlideContext must be used within a SlideProvider");
    }
    return context;
  };

  return { SlideProvider, useSlideContext };
}

export enum OrderCreationStep {
  SEARCH_PRODUCT = "SEARCH_PRODUCT",
  CONFIRM_PAYMENT = "CONFIRM_PAYMENT",
  CUSTOMER_RECEIPT = "CUSTOMER_RECEIPT",
}

export enum ReturnsStep {
  VIEW_RETURNS = "VIEW_RETURNS",
  SEND_MAIL = "SEND_MAIL",
}

export enum StoreOverviewStep {
  STORE_OVERVIEW = "STORE_OVERVIEW",
  ORDER_DETAILS = "ORDER_DETAILS",
  VIEW_PRODUCT = "VIEW_PRODUCT",
}

export const {
  SlideProvider: OrderCreationProvider,
  useSlideContext: useOrderCreation,
} = createSlideProvider([
  OrderCreationStep.SEARCH_PRODUCT,
  OrderCreationStep.CONFIRM_PAYMENT,
  OrderCreationStep.CUSTOMER_RECEIPT,
]);

export const { SlideProvider: ReturnsProvider, useSlideContext: useReturns } =
  createSlideProvider([ReturnsStep.VIEW_RETURNS, ReturnsStep.SEND_MAIL]);

export const {
  SlideProvider: StoreOrderProvider,
  useSlideContext: useStoreOrder,
} = createSlideProvider([
  StoreOverviewStep.STORE_OVERVIEW,
  StoreOverviewStep.ORDER_DETAILS,
  StoreOverviewStep.VIEW_PRODUCT,
]);
