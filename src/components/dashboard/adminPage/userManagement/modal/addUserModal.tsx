import { Button } from "@mantine/core";
import { X } from "lucide-react";
import { useState } from "react";
import {
    useCreateUser,
    useFetchAllRoles,
} from "../../../../../hooks/backendApis/admin/userManagement";
import { showNotification } from "@mantine/notifications";
import { useFetchAllLocations } from "../../../../../hooks/backendApis/pos/products";

type Props = {
    opened: boolean;
    onClose: () => void;
};

export default function AddUserModal({ opened, onClose }: Props) {
    const windowUrl = window.location.origin;
    
    const [formValues, setFormValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        role_id: "",
        locationID: "",
        password_url:"",
    });

    const { mutate: createUser, isPending } = useCreateUser();
    const { data: locationData } = useFetchAllLocations();
    const { data: roleData } = useFetchAllRoles();

    const roleOptions = Array.isArray(roleData?.data)
        ? roleData.data.map((role: { display_name: string; id: string }) => ({
            label: role.display_name,
            value: role.id,
        }))
        : [];


    const locationOptions = Array.isArray(locationData?.data?.stores)
        ? locationData.data.stores.map((store: { locationID: string; name: string }) => ({
            label: store.name,
            value: store.locationID
            ,
        }))
        : [];


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const payload = {
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            email: formValues.email,
            phone_number: formValues.phone_number,
            role_id: formValues.role_id,
            locationId: formValues.locationID,
            password_url: windowUrl + "/create-password"
        };

        createUser(payload, {
            onSuccess: () => {
                showNotification({
                    title: "User Created",
                    message: "The new user has been successfully added.",
                    color: "green",
                });
                onClose();
            },
            onError: (err: any) => {
                showNotification({
                    title: "Error",
                    message:
                        err?.response?.data?.message || "Failed to create user. Please try again.",
                    color: "red",
                });
            },
        });
    };

    if (!opened) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl w-[380px] p-6 relative shadow-md">
                <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
                    <X size={18} />
                </button>

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Add New User</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Enter the details below to add a new user
                    </p>

                    <div className="space-y-4">
                        {/* Name */}
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
                                <option value="" disabled>
                                    Select role
                                </option>
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
                                name="locationID"
                                value={formValues.locationID}
                                onChange={(e) => {
                                    setFormValues({
                                        ...formValues,
                                        locationID: e.target.value,
                                    });
                                }}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            >
                                <option value="" disabled>
                                    Select store
                                </option>
                                {locationOptions.map((loc: any) => (
                                    <option key={loc.value} value={loc.value}>
                                        {loc.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6 justify-center">
                        <Button variant="outline-primary" onClick={onClose}>
                            No
                        </Button>
                        <Button
                            variant="filled-primary"
                            loading={isPending}
                            onClick={handleSubmit}
                            disabled={
                                !formValues.firstname ||
                                !formValues.lastname ||
                                !formValues.email ||
                                !formValues.role_id ||
                                !formValues.locationID
                            }
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
