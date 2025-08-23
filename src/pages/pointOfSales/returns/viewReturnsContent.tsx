import { useRef, useState } from "react";
import { Button, Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import { motion, AnimatePresence } from "framer-motion";
import {
  ReturnsStep,
  useReturns,
} from "../../../components/General/orderContext/orderCreationContext";
import ReturnedProduct from "../../../components/dashboard/pointOfSales/returnsRefunds/returnedProduct";
import Resolve from "../../../components/dashboard/pointOfSales/returnsRefunds/modals/resolve";
import Decline from "../../../components/dashboard/pointOfSales/returnsRefunds/modals/decline";
import { shortenTransactionId } from "../../../utils/helpers";
import SendMail, {
  SendMailRef,
} from "../../../components/dashboard/pointOfSales/returnsRefunds/sendMail";
import { useFetchRetrun } from "../../../hooks/backendApis/pos/returns";
import { Loader } from "@mantine/core";

const slideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween" as "tween",
      duration: 0.3,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: {
      type: "tween" as "tween",
      duration: 0.3,
    },
  }),
};

const ViewReturnsContent: React.FC = () => {
  const location = useLocation();
  const data = location.state || {};
  const returnId = data.returnId;



  const { data: returnedData } = useFetchRetrun(returnId || "");
  const [salesOrderData, setSalesOrderData] = useState(null);
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);


  const statusColors = {
    declined: "#CB1A14",
    resolved: "#099137",
    pending: "#B54708",
  };

  const navigate = useNavigate();
  const { currentStep, prevStep } = useReturns();
  const [isResolveOpen, setIsResolveOpen] = useState(false);
  const [isLoading,] = useState(false);

  const sendMailRef = useRef<SendMailRef>(null);

  const handleBack = () => {
    if (currentStep === ReturnsStep.VIEW_RETURNS) {
      navigate(-1);
    } else {
      prevStep();
    }
  };
  const complaintStatus = (data.complaintStatus || "").toLowerCase();
  const isPending = complaintStatus === "pending";

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
        <div className="flex gap-8 items-center">{backButton}</div>
      </div>,
      <div key="2">
        <Text fw={500} size="xl" c="black">
          {currentStep === ReturnsStep.SEND_MAIL ? (
            "Send Mail"
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <Text
                    fw={400}
                    size="xl"
                    c="black"
                    className="hidden md:block"
                  >
                    Returns: {shortenTransactionId(data.returnId)}
                  </Text>
                  {/* <div className="inline-flex items-center px-3 py-1 rounded-full font-medium text-sm bg-[#FFFAEB]  text-[#B54708]">
                    {data.complaintStatus}
                  </div> */}
                  <div className="inline-flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                        // @ts-ignore
                          statusColors[data.complaintStatus?.toLowerCase()] ||
                          "#D1D5DB",
                      }}
                    />
                    <span
                      className="capitalize text-sm font-medium"
                      style={{
                        color:
                            // @ts-ignore
                          statusColors[data.complaintStatus?.toLowerCase()] ||
                          "#6B7280",
                      }}
                    >
                      {data.complaintStatus}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3.5 items-center">
                  <Button
                    onClick={() => setIsResolveOpen(true)}
                    disabled={!isPending}
                    style={{
                      backgroundColor: "#099137",
                      color: "#E7F6EC",
                      borderRadius: "0.4rem",
                      height: "auto",
                      padding: "0.9rem 1.5rem",
                      fontWeight: 600,
                      fontSize: "16px",
                      opacity: isPending ? 1 : 0.5,
                      cursor: isPending ? "pointer" : "not-allowed",
                    }}
                  >
                    Resolve
                  </Button>

                  <Button
                    onClick={() => setIsDeclineOpen(true)}
                    disabled={!isPending}
                    style={{
                      backgroundColor: "#CB1A14",
                      color: "#FBEAE9",
                      borderRadius: "0.4rem",
                      height: "auto",
                      padding: "0.9rem 1.5rem",
                      fontWeight: 600,
                      fontSize: "16px",
                      opacity: isPending ? 1 : 0.5,
                      cursor: isPending ? "pointer" : "not-allowed",
                    }}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </>
          )}
        </Text>
      </div>,
    ];
  };

  const getSubHeaderBottom = () => {
    if (currentStep === ReturnsStep.SEND_MAIL) {
      return [
        <div
          key="confirm-payment-buttons"
          className="flex flex-col sm:flex-row w-full gap-4"
        >
          {/* <div className="flex items-center gap-2.5 w-full">
            <Attachment />
            <Text className="text-sm">Attached</Text>
          </div> */}
          <div className="flex gap-3 justify-between sm:justify-end w-full">
            <Button
              variant="outline-primary"
              onClick={prevStep}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              variant="filled-primary"
              className="flex-1 sm:flex-none sm:w-40"
              onClick={() => {
                sendMailRef.current?.handleSave();
              }}
            >
              Send
            </Button>
          </div>
        </div>,
      ];
    }
    return [];
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case ReturnsStep.VIEW_RETURNS:
        return (
          <motion.div
            key={ReturnsStep.VIEW_RETURNS}
            custom={-1}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col gap-4"
          >
            <ReturnedProduct onSendMail={(order) => setSalesOrderData(order)} />
          </motion.div>
        );
      case ReturnsStep.SEND_MAIL:
        return (
          <motion.div
            key={ReturnsStep.SEND_MAIL}
            custom={currentStep > ReturnsStep.SEND_MAIL ? 1 : -1}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SendMail
              key={returnedData.returnID}
              ref={sendMailRef}
              // @ts-ignore
              initialOrderID={salesOrderData?.orderID || ""}
              initialProductID={
                returnedData.data.product_variation?.variationID || ""
              }
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <PageContainer
      subHeaders={getSubHeaders()}
      subHeaderButtom={getSubHeaderBottom()}
    >
        {isLoading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
        <Loader size="xl" color="orange" />
      </div>
    )}
      <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

      <Resolve
        opened={isResolveOpen}
        onClose={() => setIsResolveOpen(false)}
        returnID={data.returnId}
      />
      <Decline
        opened={isDeclineOpen}
        onClose={() => setIsDeclineOpen(false)}
        returnID={data.returnId}
      />
    </PageContainer>
  );
};

export default ViewReturnsContent;
