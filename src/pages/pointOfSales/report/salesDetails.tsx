import SalesCustomerAnalysis from "../../../components/dashboard/pointOfSales/reportsPages/salesCustomerAnalysis";





const SalesDetails = () => {
 
  return (
    <div>
       < SalesCustomerAnalysis reportInfo={{
        reportData: {
          data: {
            customer_sales: undefined,
            product_sales: undefined
          }
        }
      }}/>
    </div>
  );
}

export default SalesDetails;
