// import { Button, Text } from "@mantine/core";
// import PageContainer from "../../../layout/pageContainer";
// import UserManagementComp from "../../../components/dashboard/adminPage/userManagement/userManagement";
// // import UserAnalyticsOverview from "../../../components/dashboard/adminPage/userManagement/userAnalyticsOverview";
// import AddUserModal from "../../../components/dashboard/adminPage/userManagement/modal/addUserModal";
// import { useState } from "react";
// import { Link } from "react-router";
// import { ROUTES } from "../../../constants/routes";

// const UserManagement = () => {
//     const [modalOpen, setModalOpen] = useState(false);
//     const [activeTab, setActiveTab] = useState<"userManage" | "roleGrid">("userManage");

//     const subHeaders = [
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
//             <Text fw={500} size="xl" c="black">
//                 User and Role Management
//             </Text>
//             <div className="flex flex-row gap-2 md:gap-4">
//                 <div>
//                     <div className="hidden sm:block">
//                         {activeTab === "userManage" && (
//                             <Button variant="filled-primary" onClick={() => setModalOpen(true)}>
//                                 Add New Users
//                             </Button>
//                         )}
//                         {activeTab === "roleGrid" && (
//                             <Link to={ROUTES.addNewRole}>
//                                 <Button variant="filled-primary">
//                                     Add New Role
//                                 </Button>
//                             </Link>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>,
//     ];

//     return (
//         <PageContainer subHeaders={subHeaders}>
//             {/* <UserAnalyticsOverview /> */}
//             <UserManagementComp
//                 activeTab={activeTab}
//                 onTabChange={(tab) => setActiveTab(tab)}
//             />
//             <AddUserModal opened={modalOpen} onClose={() => setModalOpen(false)} />
//         </PageContainer>
//     );
// };

// export default UserManagement;

import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import UserManagementComp from "../../../components/dashboard/adminPage/userManagement/userManagement";
import AddUserModal from "../../../components/dashboard/adminPage/userManagement/modal/addUserModal";
import { useState } from "react";
import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";
import { useFetchCurrentSub } from "../../../hooks/backendApis/admin/profile";

const UserManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"userManage" | "roleGrid">("userManage");

  const { data: subscriptionData, isLoading: isLoadingPlan, isError: isErrorPlan } = useFetchCurrentSub();

  const isSubscriptionActive = subscriptionData?.data?.status === "Active";

  // Determine if the "Add New Users" button should be disabled
  // It's disabled if the plan is still loading, if there's an error fetching the plan,
  // or if the subscription is not active.
  const isAddNewUserButtonDisabled = isLoadingPlan || isErrorPlan || !isSubscriptionActive; // <--- ADDED THIS LINE

  const subHeaders = [
    <div key="header-content" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <Text fw={500} size="xl" c="black">
        User and Role Management
      </Text>
      <div className="flex flex-row gap-2 md:gap-4">
        <div>
          <div className="hidden sm:block">
            {activeTab === "userManage" && ( // <--- Conditional rendering for tab remains
              <Button
                variant="filled-primary"
                onClick={() => setModalOpen(true)}
                disabled={isAddNewUserButtonDisabled} // <--- APPLIED DISABLED PROP HERE
              >
                Add New Users
              </Button>
            )}
            {activeTab === "roleGrid" && (
              <Link to={ROUTES.addNewRole}>
                <Button variant="filled-primary">
                  Add New Role
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      {/* <UserAnalyticsOverview /> */}
      <UserManagementComp
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />
      <AddUserModal opened={modalOpen} onClose={() => setModalOpen(false)} />
    </PageContainer>
  );
};

export default UserManagement;


