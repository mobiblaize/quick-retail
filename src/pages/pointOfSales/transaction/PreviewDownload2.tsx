import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { useLocation, useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { useRef, useState } from "react";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import PreviewTransaction from "../../../components/dashboard/pointOfSales/transactions/previewReceipt";

const PreviewTransactionDownloadPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;
  const orderId = location.state?.orderId || order?.orderID;

  const receiptRef = useRef(null);

  const handleBack = () => {
    navigate(-1);
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadReceiptAsPDF = () => {
    const node = receiptRef.current;
    if (!node) return;

    domtoimage
      .toPng(node)
      .then((dataUrl: any) => {
        const pdf = new jsPDF("p", "pt", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`order-receipt-${orderId || "receipt"}.pdf`);
        setIsDownloading(false);
      })
      .catch((error: any) => {
        console.error("PDF generation failed", error);
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
    <div key="2" className="justify-between flex items-center">
      <Text fw={500} size="xl" c="black">
        View Order
      </Text>
      <div key="customer-receipt-buttons" className="flex gap-4 justify-end">
        <Button variant="filled-primary" onClick={handleDownloadReceiptAsPDF}>
          {isDownloading ? "Generating..." : "Download Receipt"}
        </Button>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      {/* Wrap ReceiptPreview in a div with ref */}
      <div ref={receiptRef}>
        <PreviewTransaction order={order} />
      </div>
    </PageContainer>
  );
};

export default PreviewTransactionDownloadPage;
