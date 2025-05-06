import { Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import ReturnsRefundsReport from "../../../components/dashboard/pointOfSales/reportsPages/returnsRefundsReport";
import ReturnsReportAnalytics from "../../../components/dashboard/pointOfSales/reportsPages/returnsReportAnlytics";

const RetunsRefundsReportPage = () => {
    const navigate = useNavigate();
   
     const handleBack = () => {
       navigate(-2);
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
               <Text>Reports</Text>
                 <>
                   <span className="mx-2">/</span>
                   <Text c="black" fw={500}>
                      Returns and refunds
                   </Text>
                 </>
             </div>
           </div>
         </div>,
         <div key="2">
           <Text fw={500} size="xl" c="black">
             Reports: Returns and Refunds
           </Text>
         </div>,
       ];
   
       return subHeaders;
     };
   
    
   
     return (
       <PageContainer
         subHeaders={getSubHeaders()}
       >
        <ReturnsReportAnalytics/>
         <ReturnsRefundsReport />
       </PageContainer>
     );
   };

export default RetunsRefundsReportPage