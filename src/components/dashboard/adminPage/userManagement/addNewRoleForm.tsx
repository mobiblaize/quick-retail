import FormInput from "../../../General/formInput";
import PermissionsPanel from "./permissionPanel";

const AddNewRoleForm = () => {
    return (
        <div>
            <div className="md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8 w-full">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
                           BASIC INFORMATION
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                type="text"
                                label="Role Name"
                                placeholder="Enter role name"
                                paddingY={"0.7rem"}
                            />

                            <FormInput
                                type="text"
                                label="Role Description"
                                placeholder="Enter role description"
                                paddingY={"0.7rem"}
                            />      
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <PermissionsPanel />
            </div>
        </div>
    );
};

export default AddNewRoleForm;
