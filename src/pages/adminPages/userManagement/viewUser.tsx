import { Button, Menu, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { ChevronDown, Plus } from "lucide-react";
import ViewUserForm from "../../../components/dashboard/adminPage/userManagement/viewUserForm";
import ActivateUserModal from "../../../components/dashboard/adminPage/userManagement/modal/activateUser";
import { useState } from "react";
import EditUserModal from "../../../components/dashboard/adminPage/userManagement/modal/editUserForm";

const ViewUser = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const subHeaders = [
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <Text fw={500} size="xl" c="black">
                View Users
            </Text>
            <div className="flex flex-row gap-2 md:gap-4">
                <div>
                    <div className="hidden sm:block">
                        <Menu>
                            <Menu.Target>
                                <Button variant="filled-primary">
                                    Take Action
                                    <ChevronDown className="ml-2" />
                                </Button>
                            </Menu.Target>

                            <Menu.Dropdown
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    padding: "10px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                }}
                            >

                                <Menu.Item
                                    style={{
                                        fontSize: "14px",
                                        padding: "8px 16px",
                                        color: "#333",
                                    }}
                                    onClick={() => setEditModalOpen(true)}
                                >
                                    Edit User
                                </Menu.Item>

                                <Menu.Item
                                    style={{
                                        fontSize: "14px",
                                        padding: "8px 16px",
                                        color: "#333",
                                    }}
                                    onClick={() => setModalOpen(true)}
                                >
                                    Deactivate User
                                </Menu.Item>

                            </Menu.Dropdown>
                        </Menu>
                    </div>

                    <div className="block sm:hidden">
                        <Menu>
                            <Menu.Target>
                                <Button
                                    variant="filled-primary"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        padding: "0",
                                        borderRadius: "20%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Plus size={20} />
                                </Button>
                            </Menu.Target>

                            <Menu.Dropdown
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    padding: "10px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                }}
                            >

                                <Menu.Item
                                    style={{
                                        fontSize: "14px",
                                        padding: "8px 16px",
                                        color: "#333",
                                    }}
                                    onClick={() => setEditModalOpen(true)}
                                >
                                    Edit User
                                </Menu.Item>
                                <Menu.Item
                                    style={{
                                        fontSize: "14px",
                                        padding: "8px 16px",
                                        color: "#333",
                                    }}
                                    onClick={() => setModalOpen(true)}
                                >
                                    Deactivate User
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>,
    ];

    return (
        <PageContainer subHeaders={subHeaders}>
            <ViewUserForm />
            <ActivateUserModal opened={modalOpen} onClose={() => setModalOpen(false)} />
            <EditUserModal opened={editModalOpen} onClose={() => setEditModalOpen(false)} />
        </PageContainer>
    );
};

export default ViewUser;
