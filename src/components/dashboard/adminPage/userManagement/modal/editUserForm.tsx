import { Button } from "@mantine/core";
import { X } from "lucide-react";

type Props = {
    opened: boolean;
    onClose: () => void;
};

export default function EditUserModal({ opened, onClose }: Props) {
    if (!opened) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl w-[380px] p-6 relative shadow-md">
                {/* Close Icon */}
                <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
                    <X size={18} />
                </button>

                <div className="space-y-4">
                    {/* Title */}
                    <h2 className="text-lg font-semibold text-gray-900">Edit User</h2>
                    <p className="text-sm text-gray-500 mb-6">Edit user details below</p>

                    <div className="space-y-4">
                        {/* First Name & Last Name */}
                        <div className="flex gap-3">
                            <div className="w-1/2">
                                <label className="text-sm text-gray-700 block mb-1">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter first name"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="text-sm text-gray-700 block mb-1">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter last name"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm text-gray-700 block mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter customer email"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400"
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="text-sm text-gray-700 block mb-1">Phone Number</label>
                            <input
                                type="text"
                                placeholder="Enter phone number"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400"
                            />
                        </div>

                        {/* Role Dropdown */}
                        <div>
                            <label className="text-sm text-gray-700 block mb-1">Role</label>
                            <select
                                defaultValue=""
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500"
                            >
                                <option value="" disabled>Select role</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>

                        {/* Assign Store Dropdown */}
                        <div>
                            <label className="text-sm text-gray-700 block mb-1">Assign Store</label>
                            <select
                                defaultValue=""
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500"
                            >
                                <option value="" disabled>Select store</option>
                                <option value="store1">Store 1</option>
                                <option value="store2">Store 2</option>
                            </select>
                        </div>
                    </div>
                    <div
                        key="search-product-buttons"
                        className="flex gap-4 mt-[2em] justify-center"
                    >
                        <Button variant="outline-primary" onClick={onClose}>
                           Cancel
                        </Button>

                        <Button variant="filled-primary">Update</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
