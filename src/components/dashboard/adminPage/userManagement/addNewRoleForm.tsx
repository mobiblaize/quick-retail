import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../General/formInput";
import PermissionsPanel from "./permissionPanel";
import { Button, Modal, Text, Title } from "@mantine/core";
import { useCreateRole } from "../../../../hooks/backendApis/admin/userManagement";
import { showNotification } from "@mantine/notifications";

const AddNewRoleForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateRole();

  // This handles the actual creation of the role
  const handleCreateRole = async () => {
    const payload = {
      name,
      display_name: name,
      description,
      assign_all_permissions: false,
      permissions: selectedPermissions,
    };

    try {
      await mutateAsync(payload);
      showNotification({
        title: "Success",
        message: "Role created successfully",
        color: "green",
      });
      navigate(-1); // Go back to role list
    } catch (error: any) {
      showNotification({
        title: "Error",
        message: error?.response?.data?.message || "Something went wrong",
        color: "red",
      });
    }
  };

  return (
    <div>
      <div className="md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8 w-full">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <Title
              order={2}
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '1rem',
                borderBottom: '1px solid #E5E7EB',
                paddingBottom: '0.5rem',
              }}
            >
              BASIC INFORMATION
            </Title>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <Text size="sm" c="gray.6" mb={1}>
                Role Name
              </Text>
              <FormInput
                type="text"
                placeholder="Enter role name"
                paddingY="0.7rem"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />

              <Text size="sm" c="gray.6" mb={1}>
                Role Description
              </Text>
              <FormInput
                type="text"
                placeholder="Enter role description"
                paddingY="0.7rem"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <PermissionsPanel
          selectedPermissions={selectedPermissions}
          setSelectedPermissions={setSelectedPermissions}
        />
      </div>

      {/* Footer Buttons */}
      <div
        key="search-product-buttons"
        className="flex gap-4 justify-end mt-[3em] bg-[#fff] p-4"
      >
        <Button variant="outline-primary" onClick={() => history.back()}>
          Cancel
        </Button>
        <Button variant="filled-primary" onClick={() => setConfirmModalOpen(true)}>
          Continue
        </Button>
      </div>

      {/* Confirm Modal */}
      <Modal
        opened={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Create Role"
        centered
      >
        <p>Are you sure you want to create this role? Once created, users can be assigned to a role.</p>

        <div className="mt-4 flex justify-end gap-4">
          <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>
            No
          </Button>
          <Button
            variant="filled"
            color="orange"
            loading={isPending}
            onClick={() => {
              setConfirmModalOpen(false);
              handleCreateRole(); // 👈 renamed for clarity
            }}
          >
            Yes, create
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddNewRoleForm;
