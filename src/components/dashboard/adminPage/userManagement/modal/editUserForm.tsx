import { Button } from "@mantine/core";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useUpdateUser, useFetchAllRoles, useFetchAllApplicationRoles } from "../../../../../hooks/backendApis/admin/userManagement";
import { showNotification } from "@mantine/notifications";
import { useFetchAllLocations } from "../../../../../hooks/backendApis/pos/products";

type Props = {
    opened: boolean;
    onClose: () => void;
    userUUID: string;
    initialData: {
        firstname: string;
        lastname: string;
        email: string;
        phone_number: string;
        role_id: string;
        locationId: string;
        applicationId: string;
    };
};

export default function EditUserModal({ opened, onClose, userUUID, initialData }: Props) {
    const [formValues, setFormValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        role_id: "",
        locationId: "",
        applicationId: "",
    });

    const { mutate: updateUser, isPending } = useUpdateUser(userUUID);
    const { data: roleData } = useFetchAllRoles();
    const { data: locationData } = useFetchAllLocations();
    const { data: applicationData } = useFetchAllApplicationRoles();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        updateUser(formValues, {
            onSuccess: () => {
                showNotification({
                    title: "Success",
                    message: "User updated successfully",
                    color: "green",
                });
                onClose();
            },
            onError: (err: any) => {
                showNotification({
                    title: "Update failed",
                    message: err?.response?.data?.message || "An error occurred",
                    color: "red",
                });
            },
        });
    };

    useEffect(() => {
        if (opened && initialData && locationData?.data?.stores) {
            const store = locationData.data.stores.find(
                (store: any) => store.id === Number(initialData.locationId)
            );

            setFormValues({
                ...initialData,
                locationId: store?.locationID ?? "", 
            });
        }
    }, [opened, initialData, locationData]);

    if (!opened) {
        return null;
    }



    const roleOptions = Array.isArray(roleData?.data)
        ? roleData.data.map((role: { display_name: string; id: string }) => ({
            label: role.display_name,
            value: role.id,
        }))
        : [];

    const storeOptions = Array.isArray(locationData?.data?.stores)
        ? locationData.data.stores.map((store: { locationID: string; name: string }) => ({
            label: store.name,
            value: store.locationID.toString(),
        }))
        : [];

     const applicationOptions = Array.isArray(applicationData?.data)
        ? applicationData.data.map((app: { id: number; name: string }) => ({
            label: app.name,
            value: String(app.id),
        }))
        : [];


    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl w-[380px] p-6 relative shadow-md">
                <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
                    <X size={18} />
                </button>

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Edit User</h2>
                    <p className="text-sm text-gray-500 mb-6">Edit user details below</p>

                    {/* First & Last Name */}
                    <div className="flex gap-3">
                        <div className="w-1/2">
                            <label className="text-sm text-gray-700 block mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                value={formValues.firstname}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="text-sm text-gray-700 block mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                value={formValues.lastname}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-700 block mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-sm text-gray-700 block mb-1">Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formValues.phone_number}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="text-sm text-gray-700 block mb-1">Role</label>
                        <select
                            name="role_id"
                            value={formValues.role_id}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        >
                            <option value="">Select Role</option>
                            {roleOptions.map((role: any) => (
                                <option key={role.value} value={role.value}>
                                    {role.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Store */}
                    <div>
                        <label className="text-sm text-gray-700 block mb-1">Assign Store</label>
                        <select
                            name="locationId"
                            value={formValues.locationId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        >
                            <option value="">Select Store</option>
                            {storeOptions.map((store: any) => (
                                <option key={store.value} value={store.value}>
                                    {store.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Application */}
                     <div>
                        <label className="text-sm text-gray-700 block mb-1">Select Application</label>
                        <select
                            name="applicationId"
                            value={formValues.applicationId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        >
                            <option value="">Select application</option>
                            {applicationOptions.map((store: any) => (
                                <option key={store.value} value={store.value}>
                                    {store.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6 justify-center">
                        <Button variant="outline-primary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="filled-primary"
                            onClick={handleSubmit}
                            loading={isPending}
                            disabled={
                                !formValues.firstname ||
                                !formValues.lastname ||
                                !formValues.email ||
                                !formValues.role_id ||
                                !formValues.locationId
                            }
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

