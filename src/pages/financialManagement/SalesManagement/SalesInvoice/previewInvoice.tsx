import { Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import PageContainer from "../../../../layout/pageContainer";
import PreviewOrder from "../../../../components/finacialManagement/salesManagement/salesInvoice/previewInvoice";


const PreviewInvoicePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
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
    <div key="2" className="justify-between flex items-center"></div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <PreviewOrder />
    </PageContainer>
  );
};

export default PreviewInvoicePage;
