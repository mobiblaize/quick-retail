import { Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import SalesProcessingReport from "../../../components/dashboard/pointOfSales/reportsPages/salesProcessingReport";
import SalesOverviewReport from "../../../components/dashboard/pointOfSales/reportsPages/overviewSales";
import SalesCustomerAnalysis from "../../../components/dashboard/pointOfSales/reportsPages/salesCustomerAnalysis";

const SalesProcessingReportPage = () => {
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
                       Sales Report
                   </Text>
                 </>
             </div>
           </div>
         </div>,
         <div key="2">
           <Text fw={500} size="xl" c="black">
             Sales Report
           </Text>
         </div>,
       ];
   
       return subHeaders;
     };
   
    
   
     return (
       <PageContainer
         subHeaders={getSubHeaders()}
       >
          <SalesOverviewReport/>
          < SalesCustomerAnalysis/>
         <SalesProcessingReport />
       </PageContainer>
     );
   };

export default SalesProcessingReportPage