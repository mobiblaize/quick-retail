import { Button, Menu, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import UserManagementComp from "../../../components/dashboard/adminPage/userManagement/userManagement";
import UserAnalyticsOverview from "../../../components/dashboard/adminPage/userManagement/userAnalyticsOverview";
import AddUserModal from "../../../components/dashboard/adminPage/userManagement/modal/addUserModal";
import { useState } from "react";

const UserManagement = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const subHeaders = [
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <Text fw={500} size="xl" c="black">
                User and Role Management
            </Text>
            <div className="flex flex-row gap-2 md:gap-4">
                <div>
                    <div className="hidden sm:block">
                        <Menu>
                            <Menu.Target>
                                <Button variant="filled-primary" onClick={() => setModalOpen(true)}>
                                    Add New Users
                                </Button>
                            </Menu.Target>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>,
    ];

    return (
        <PageContainer subHeaders={subHeaders}>
            <UserAnalyticsOverview />
            <UserManagementComp />
            <AddUserModal opened={modalOpen} onClose={() => setModalOpen(false)} />
        </PageContainer>
    );
};

export default UserManagement;
