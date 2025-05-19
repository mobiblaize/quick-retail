import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import PageContainer from "../../../layout/pageContainer";
import JournalTable from "../../../components/finacialManagement/account/journalTable";
import { ROUTES } from "../../../constants/routes";


const AllJournalPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const handleNewJournal = () => {
    navigate(ROUTES.createJournal);
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
        Journal Entry
        </Text>
        <div className=" text-sm flex  justify-end text-right gap-6 pb-4 mt-[-2em] ">
            <div
              className="curor-pointer flex gap-6"
            //   onClick={handleEdit}
            >
                 <Button
              variant="filled"
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
      Import Journal of Entry
            </Button>
              
              <Button
                variant="filled"
                onClick={handleNewJournal}
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
              New Journal Entry
          
              </Button>
            </div>

          </div>
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <JournalTable/>
    </PageContainer>
  );
};

export default AllJournalPage;
