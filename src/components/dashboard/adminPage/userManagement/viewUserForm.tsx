import { useParams } from "react-router-dom";
import FormInput from "../../../General/formInput";
import { User } from "lucide-react";
import { useFetchSingleUser } from "../../../../hooks/backendApis/admin/userManagement";
import { useEffect } from "react";

const ViewUserForm = ({ setUser }: { setUser: (user: any) => void }) => {
    const { userId } = useParams();
    const { data, isLoading, isError } = useFetchSingleUser(userId || "");

    const user = data?.data;

    useEffect(() => {
        if (user) {
            setUser(user);
        }
    }, [user, setUser]);

    if (isLoading) return <p>Loading user...</p>;
    if (isError || !user) return <p>No user found</p>;

    return (
        <div>
            <div className="md:grid-cols-3 gap-8">
                {/* Left side */}
                <div className="md:col-span-2 space-y-8 w-full">
                    <div className="bg-white rounded-xl p-6 shadow-md w-full">
                        {/* Profile Details */}
                        <div className="p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <User className="w-20 h-20 text-gray-600 bg-gray-100 p-2 border-2 border-[#FA9874] rounded-full" />
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div>
                                            <p className="text-[#AD3307] bg-[#FFECE5] px-3 py-1 text-xs rounded-full font-medium">
                                                #{user.user_uuid}
                                            </p>
                                        </div>
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full font-medium ${user.status?.toLowerCase() === "active"
                                                ? "text-green-600 bg-green-100"
                                                : user.status?.toLowerCase() === "pending"
                                                    ? "text-[#AD3307] bg-[#FFECE5]"
                                                    : "text-gray-600 bg-gray-100"
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-medium text-gray-800">
                                        {user.firstname} {user.lastname}
                                    </h3>
                                    <div className="text-sm text-[#667085]">
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
                            USER DETAILS
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                type="text"
                                label="First Name"
                                value={user.firstname}
                                paddingY="0.7rem"
                            />

                            <FormInput
                                type="text"
                                label="Last Name"
                                value={user.lastname}
                                paddingY="0.7rem"
                            />

                            <FormInput
                                type="email"
                                label="Email"
                                value={user.email}
                                paddingY="0.7rem"
                            />

                            <FormInput
                                type="number"
                                label="Phone Number"
                                value={user.phone_number || ""}
                                paddingY="0.7rem"
                            />

                            <FormInput
                                type="text"
                                label="Role"
                                value={user.roles?.[0]?.name || "—"}
                                paddingY="0.7rem"
                            />

                            <FormInput
                                type="text"
                                label="Store"
                                value={user.locations?.[0]?.name || "—"}
                                paddingY="0.7rem"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewUserForm;
