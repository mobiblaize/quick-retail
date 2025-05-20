import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ChevronLeft, Trash } from "lucide-react";
import PageContainer from "../../../layout/pageContainer";
import ViewCard from "../../../components/finacialManagement/Banking/viewCardTransaction";
import { useState } from "react";
import DeactivateModal from "../../../components/finacialManagement/Banking/deactivateModal";
import DeleteModal from "../../../components/finacialManagement/Banking/deleteCard";
import { ROUTES } from "../../../constants/routes";

interface ViewCardPageProps {
  isOnDefault?: boolean;
  onToggle?: (state: boolean) => void;
}
function ViewCardPage({ isOnDefault = true, onToggle }: ViewCardPageProps) {
  const [showAllocatedModal, setShowAllocatedModal] = useState(false);
  const [showAllocatedModal1, setShowAllocatedModal1] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleCard = () => {
    navigate(ROUTES.addCard);
  };

  const [isOn, setIsOn] = useState(isOnDefault);

  const handleToggle = () => {
    setIsOn((prev) => {
      const newState = !prev;
      if (newState) {
        setShowAllocatedModal(true);
      }
      onToggle?.(newState);

      return newState;
    });
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
      <div className="flex items-left justify-between whitespace-nowrap">
        <Text fw={500} size="xl" c="black">
          View Card Details
        </Text>
        <div className="flex items-center justify-end gap-6 w-full">
          {/* Trash Icon */}
          <Trash
            className="w-6 h-6 text-red-500"
            onClick={() => setShowAllocatedModal1(true)}
          />

          {/* Active Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-black font-medium text-lg">
              {isOn ? "Active" : "Inactive"}
            </span>
            <div
              onClick={handleToggle}
              className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                isOn ? "bg-orange-500" : "bg-gray-400"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                  isOn ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
          </div>

          {/* Add New Card Button */}
          <Button
            variant="filled-primary"
            onClick={handleCard}
            style={{
              color: "white",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 0.5rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "20%",
            }}
          >
            Add new card
          </Button>
        </div>
      </div>
    </div>,
  ];
  return (
    <>
      {showAllocatedModal && (
        <DeactivateModal
          opened={showAllocatedModal}
          onClose={() => setShowAllocatedModal(false)}
        />
      )}
      {showAllocatedModal1 && (
        <DeleteModal
          opened={showAllocatedModal1}
          onClose={() => setShowAllocatedModal1(false)}
        />
      )}
      <PageContainer subHeaders={subHeaders}>
        <ViewCard />
      </PageContainer>
    </>
  );
}

export default ViewCardPage;
