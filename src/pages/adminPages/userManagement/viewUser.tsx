import { Button, Menu, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import ViewUserForm from "../../../components/dashboard/adminPage/userManagement/viewUserForm";
import ActivateUserModal from "../../../components/dashboard/adminPage/userManagement/modal/activateUser";
import { useState } from "react";
import EditUserModal from "../../../components/dashboard/adminPage/userManagement/modal/editUserForm";
import DeactiveUserModal from "../../../components/dashboard/adminPage/userManagement/modal/deactivateUser";
import { useNavigate } from "react-router";

const ViewUser = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deactiveModalOpen, setDeactiveModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);


  const isPending = selectedUser?.status?.toLowerCase() === "pending";
  const isActive = selectedUser?.status?.toLowerCase() === "active";
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
    <>
     <div key="1" className="py-2.5">
        <div className="hidden sm:flex gap-8 items-center">
          {backButton}
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0" key="header">
     


      <Text fw={500} size="xl" c="black">
        View User
      </Text>
      <div className="flex flex-row gap-2 md:gap-4">
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

              {isPending && (
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  Activate User
                </Menu.Item>
              )}

              {isActive && (
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setDeactiveModalOpen(true)}
                >
                  Deactivate User
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        </div>

        {/* Mobile dropdown */}
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

              {isPending && (
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  Activate User
                </Menu.Item>
              )}

              {isActive && (
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setDeactiveModalOpen(true)}
                >
                  Deactivate User
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>
    </>
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <ViewUserForm setUser={setSelectedUser} />
      <ActivateUserModal opened={modalOpen} onClose={() => setModalOpen(false)} userId={selectedUser?.user_uuid} setUser={setSelectedUser} />
      <DeactiveUserModal opened={deactiveModalOpen} onClose={() => setDeactiveModalOpen(false)} setUser={setSelectedUser} />
      {selectedUser && (
        <EditUserModal
          opened={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          userUUID={selectedUser.user_uuid}
          initialData={{
            firstname: selectedUser?.firstname || "",
            lastname: selectedUser?.lastname || "",
            email: selectedUser?.email || "",
            phone_number: selectedUser?.phone_number || "",
            role_id: selectedUser?.roles?.[0]?.id?.toString() || "",
            locationId: selectedUser.locations?.[0]?.id?.toString() ?? "",
            applicationId: selectedUser?.application_id?.toString() || "",
          }}
        />
      )}
    </PageContainer>
  );
};

export default ViewUser;
