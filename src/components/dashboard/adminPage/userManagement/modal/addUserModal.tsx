import {
    Button,
    Grid,
    Modal,
    Select,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import { useState } from "react";
import {
    useCreateUser,
    useFetchAllRoles,
    useFetchAllApplicationRoles,
} from "../../../../../hooks/backendApis/admin/userManagement";
import { showNotification } from "@mantine/notifications";
import { useFetchAllLocations } from "../../../../../hooks/backendApis/pos/products";

type Props = {
    opened: boolean;
    onClose: () => void;
};

type Option = { label: string; value: string };

export default function AddUserModal({ opened, onClose }: Props) {
    const windowUrl = window.location.origin;

    const [formValues, setFormValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        role_id: "" as string | null,
        locationID: "" as string | null,
        password_url: "",
        applicationId: "" as string | null,
    });

    const [phoneError, setPhoneError] = useState<string | null>(null);

    const { mutate: createUser, isPending } = useCreateUser();
    const { data: locationData } = useFetchAllLocations();
    const { data: roleData } = useFetchAllRoles();
    const { data: applicationData } = useFetchAllApplicationRoles();

    const roleOptions: Option[] = Array.isArray(roleData?.data)
        ? roleData.data.map((role: { display_name: string; id: string | number }) => ({
            label: role.display_name,
            value: String(role.id),   // force string
        }))
        : [];

    const locationOptions: Option[] = Array.isArray(locationData?.data?.stores)
        ? locationData.data.stores.map(
            (store: { locationID: string | number; name: string }) => ({
                label: store.name,
                value: String(store.locationID),   // force string
            })
        )
        : [];

    const applicationOptions: Option[] = Array.isArray(applicationData?.data)
        ? applicationData.data.map((app: { id: string | number; name: string }) => ({
            label: app.name,
            value: String(app.id),   // force string
        }))
        : [];


    const validatePhoneNumber = (phone: string) => {
        const cleaned = phone.replace(/\D/g, "");
        if (cleaned.length !== 11) return "Phone number must be exactly 11 digits";
        return null;
    };

    const handleTextChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = e.target;

        if (name === "phone_number") {
            setPhoneError(validatePhoneNumber(value));
        }

        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const payload = {
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            email: formValues.email,
            phone_number: formValues.phone_number,
            role_id: formValues.role_id ?? "",
            locationId: formValues.locationID ?? "",
            password_url: windowUrl + "/create-password",
            applicationId: formValues.applicationId ?? "",
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
                        err?.response?.data?.message ||
                        "Failed to create user. Please try again.",
                    color: "red",
                });
            },
        });
    };

    const saveDisabled =
        !formValues.firstname ||
        !formValues.lastname ||
        !formValues.email ||
        !formValues.role_id ||
        !formValues.locationID ||
        !!phoneError;

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={<Text fw={600}>Add New User</Text>}
            centered
            size={480}
            overlayProps={{ opacity: 0.35, blur: 2 }}
            radius="lg"
            padding={"md"}
            withCloseButton
        >
            <Text size="sm" c="dimmed" mb="md">
                Enter the details below to add a new user
            </Text>

            <Stack gap="md">
                {/* Name */}
                <Grid>
                    <Grid.Col span={6}>
                        <TextInput
                            label="First Name"
                            name="firstname"
                            value={formValues.firstname}
                            onChange={handleTextChange}
                            placeholder="Enter first name"
                            size="sm"
                            withAsterisk
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Last Name"
                            name="lastname"
                            value={formValues.lastname}
                            onChange={handleTextChange}
                            placeholder="Enter last name"
                            size="sm"
                            withAsterisk
                        />
                    </Grid.Col>
                </Grid>

                {/* Email */}
                <TextInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleTextChange}
                    placeholder="Enter email"
                    size="sm"
                    withAsterisk
                />

                {/* Phone */}
                <TextInput
                    label="Phone Number"
                    name="phone_number"
                    value={formValues.phone_number}
                    onChange={handleTextChange}
                    placeholder="Enter phone number"
                    size="sm"
                    error={phoneError || undefined}
                />

                {/* Role */}
                <Select
                    label="Role"
                    name="role_id"
                    value={formValues.role_id}
                    onChange={(val) =>
                        setFormValues((prev) => ({
                            ...prev,
                            role_id: val,
                        }))
                    }
                    data={roleOptions}
                    placeholder="Select role"
                    size="sm"
                    withAsterisk
                    clearable
                />

                {/* Store */}
                <Select
                    label="Assign Store"
                    name="locationID"
                    value={formValues.locationID}
                    onChange={(val) =>
                        setFormValues((prev) => ({
                            ...prev,
                            locationID: val,
                        }))
                    }
                    data={locationOptions}
                    placeholder="Select store"
                    size="sm"
                    withAsterisk
                    clearable
                />

                {/* Application */}
                <Select
                    label="Select Application"
                    name="applicationId"
                    value={formValues.applicationId}
                    onChange={(val) =>
                        setFormValues((prev) => ({
                            ...prev,
                            applicationId: val,
                        }))
                    }
                    data={applicationOptions}
                    placeholder="Select application"
                    size="sm"
                    withAsterisk
                    clearable
                />
            </Stack>
            <div className="flex gap-7 mt-[2em] justify-center w-[100%]">
                <Button className="!w-full" variant="outline-primary" onClick={onClose} disabled={isPending}>
                    No
                </Button>
                <Button className="!w-full" variant="filled-primary" onClick={handleSubmit} loading={isPending}  disabled={saveDisabled}>
                    Save
                </Button>
            </div>
        </Modal>
    );
}
