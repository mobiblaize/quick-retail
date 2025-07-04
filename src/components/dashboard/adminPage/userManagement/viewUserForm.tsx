import FormInput from "../../../General/formInput";
import { User } from "lucide-react";

const ViewUserForm = () => {
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
                                            <p className="text-[#AD3307] bg-[#FFECE5] px-3 py-1 text-xs rounded-full font-medium">#124618</p>
                                        </div>
                                        <span className="text-green-600 bg-green-100 px-3 py-1 text-xs rounded-full font-medium">
                                            Active
                                        </span>
                                    </div>
                                    <h3 className="text-base font-medium text-gray-800">Adekunle Ibrahim</h3>
                                    <div className="text-sm text-[#667085]">
                                        <span>adekunle@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
                            USER DETAILS
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                type="text"
                                label="First Name"
                                placeholder="Enter first name"
                                paddingY={"0.7rem"}
                            />

                            <FormInput
                                type="text"
                                label="Last Name"
                                placeholder="Enter last name"
                                paddingY={"0.7rem"}
                            />

                            <FormInput
                                type="email"
                                label="Email"
                                placeholder="Enter email"
                                paddingY={"0.7rem"}
                            />

                            <FormInput
                                type="number"
                                label="Phone Number"
                                placeholder="Enter phone number"
                                paddingY={"0.7rem"}
                            />

                            <FormInput
                                type="text"
                                label="Role"
                                placeholder="Enter role"
                                paddingY={"0.7rem"}
                            />

                            <FormInput
                                type="text"
                                label="Store"
                                placeholder="Enter store"
                                paddingY={"0.7rem"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewUserForm;
