import { Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import HelpArticle from "../../../components/dashboard/adminPage/helpComponent/helpArticle";


const LearnMoreHelp: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
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
        <div className="hidden sm:flex gap-8 items-center">
          {backButton}
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
    //   <div key="2">
    //     <Text fw={500} size="xl" c="black">
    //       How do i set up other modules of the app?
    //     </Text>
    //   </div>,
    ];

    return subHeaders;
  };


  return (
    <PageContainer
      subHeaders={getSubHeaders()}
    >
      <HelpArticle />
    </PageContainer>
  );
};

export default LearnMoreHelp;
