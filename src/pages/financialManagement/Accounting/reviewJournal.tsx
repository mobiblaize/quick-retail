import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ChevronLeft, Trash } from "lucide-react";
import PageContainer from "../../../layout/pageContainer";
import { useState } from "react";
import JournalEntryForm from "../../../components/finacialManagement/account/createJournalTable";
import DraftModal from "../../../components/finacialManagement/account/draftmodal";
import PublishModal from "../../../components/finacialManagement/account/publishmodal";
import ReoccurringJournalModal from "../../../components/finacialManagement/account/recurringModal";
import DeleteModal from "../../../components/finacialManagement/account/deleteModal";

type CreateJournalPageProps = {
    onToggle?: (state: boolean) => void;
  };
  

  const ReviewJournalPage: React.FC<CreateJournalPageProps> = ({ onToggle }) => {
  const navigate = useNavigate();
  const [showAllocatedModal, setShowAllocatedModal] = useState(false);
  const [showAllocatedModal1, setShowAllocatedModal1] = useState(false);
  const [showAllocatedModal2, setShowAllocatedModal2] = useState(false);
  const [showAllocatedModal3, setShowAllocatedModal3] = useState(false);
  const handleBack = () => {
    navigate(-1);
  };
  const [enabled, setEnabled] = useState(false);

//   const toggle = () => {
//     const newState = !enabled;
//     setEnabled(newState);
//     if (onToggle) onToggle(newState);
//   };
const toggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    if (onToggle) onToggle(newState);
  
    // Show modal only when toggled ON
    if (newState) {
      setShowAllocatedModal2(true); // or setShowAllocatedModal1(true) depending on which modal you want
    }
  };
  
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
      <div className="hidden sm:flex gap-8 items-center">{backButton}</div>

      <div className="flex sm:hidden">{backButton}</div>
    </div>,
    <div key="1">
      <div className="flex flex-col items-left justify-start">
        <Text fw={500} size="xl" c="black">
        Review Imported Journal Entry
        </Text>
        <div className=" text-sm flex  justify-end text-right gap-6 pb-4 mt-[-2em] ">
        <div className=" mt-[1em]"      onClick={() => setShowAllocatedModal3(true)}>  <Trash className="w-4 h-4 text-red-600"/></div>  
          <div
            className="curor-pointer flex gap-6"
            //   onClick={handleEdit}
          >
            <div className="flex items-center space-x-4">

              <button
                onClick={toggle}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${
                  enabled ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
                    enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-gray-700 text-sm whitespace-nowrap">Set as Reoccurring Journal </span>
            </div>
            <Button
              variant="filled"
              onClick={() => setShowAllocatedModal1(true)}
              style={{
                backgroundColor: "#FFFFFF",
                color: "#F16722",
                borderRadius: "0.4rem",
                height: "auto",
                padding: "0.9rem 1.1rem",
                fontWeight: 600,
                fontSize: "16px",
                width: "100%",
                border: "2px solid #F16722",
              }}
            >
              Publish Journal
            </Button>

            <Button
              variant="filled"
              onClick={() => setShowAllocatedModal(true)}
              style={{
                backgroundColor: "#F16722",
                color: "white",
                borderRadius: "0.4rem",
                height: "auto",
                padding: "0.9rem 1.1rem",
                fontWeight: 600,
                fontSize: "16px",
                width: "100%",
              }}
            >
              Save as draft
            </Button>
          </div>
        </div>
      </div>
    </div>,
  ];
  return (
    <>
    {showAllocatedModal && (
      <DraftModal
        opened={showAllocatedModal}
        onClose={() => setShowAllocatedModal(false)}
      />
    )}
     {showAllocatedModal1 && (
      <PublishModal
        opened={showAllocatedModal1}
        onClose={() => setShowAllocatedModal1(false)}
      />
    )}
     {showAllocatedModal2 && (
      <ReoccurringJournalModal
        opened={showAllocatedModal2}
        onClose={() => setShowAllocatedModal2(false)}
      />
    )}
     {showAllocatedModal3 && (
      <DeleteModal
        opened={showAllocatedModal3}
        onClose={() => setShowAllocatedModal3(false)}
      />
    )}
    <PageContainer subHeaders={subHeaders}>
      <JournalEntryForm/>
    </PageContainer>
    </>
  );
};

export default ReviewJournalPage;
