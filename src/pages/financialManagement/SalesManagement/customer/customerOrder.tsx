import PageContainer from "../../../../layout/pageContainer";

import ViewCustomerBox from "../../../../components/finacialManagement/salesManagement/customer/viewCustomerAnalysis";
import ViewCustomerOrder from "../../../../components/finacialManagement/salesManagement/customer/viewCustomerOrder";

const CustomerOrderPage = () => {


  return (
    <PageContainer >
      <ViewCustomerBox />
      <ViewCustomerOrder />
    </PageContainer>
  );
};

export default CustomerOrderPage;
