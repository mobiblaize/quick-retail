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
import { z } from "zod";

type Props = {
  opened: boolean;
  onClose: () => void;
};

type Option = { label: string; value: string };

// ✅ Zod Schema with Nigerian-specific validation
const userSchema = z.object({
  firstname: z
    .string()
    .min(1, "First name is required")
    .regex(/^[A-Za-z\s]+$/, "First name can only contain letters and spaces"),

  lastname: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[A-Za-z\s]+$/, "Last name can only contain letters and spaces"),

  email: z
    .string()
    .min(1, "Email is required")
    .refine(
      (val) => /^[^\d][A-Za-z0-9._%+-]+@[A-Za-z]+\.[cC][oO][mM]$/.test(val),
      "Email must be valid, contain '@', end with .com, and not have numbers after '@'"
    ),

  phone_number: z
    .string()
    .regex(
      /^(080|070|090|081|091)\d{8}$/,
      "Phone number must start with 080, 070, 090, 081, or 091 and be 11 digits total"
    ),

  role_id: z.string().min(1, "Role is required"),
  locationID: z.string().min(1, "Location is required"),
  applicationId: z.string().min(1, "Application is required"),
});

export default function AddUserModal({ opened, onClose }: Props) {
  const windowUrl = window.location.origin;

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
    role_id: "",
    locationID: "",
    applicationId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: createUser, isPending } = useCreateUser();
  const { data: locationData } = useFetchAllLocations();
  const { data: roleData } = useFetchAllRoles();
  const { data: applicationData } = useFetchAllApplicationRoles();

  // Map API data to select options
  const roleOptions: Option[] = Array.isArray(roleData?.data)
    ? roleData.data.map(
        (role: { display_name: string; id: string | number }) => ({
          label: role.display_name,
          value: String(role.id),
        })
      )
    : [];

  const locationOptions: Option[] = Array.isArray(locationData?.data?.stores)
    ? locationData.data.stores.map(
        (store: { locationID: string | number; name: string }) => ({
          label: store.name,
          value: String(store.locationID),
        })
      )
    : [];

  const applicationOptions: Option[] = Array.isArray(applicationData?.data)
    ? applicationData.data.map(
        (app: { id: string | number; name: string }) => ({
          label: app.name,
          value: String(app.id),
        })
      )
    : [];

  // ✅ Handle input change
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    // Limit phone number to 11 digits and remove non-digits
    if (name === "phone_number") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length > 11) return;
      setFormValues((prev) => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }

    // Validate field immediately
    const result = userSchema.safeParse({ ...formValues, [name]: value });
    if (!result.success) {
      const fieldError =
        result.error.errors.find((err) => err.path[0] === name)?.message || "";
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ✅ Handle selects
  const handleSelectChange = (field: string, val: string | null) => {
    setFormValues((prev) => ({ ...prev, [field]: val || "" }));

    const result = userSchema.safeParse({ ...formValues, [field]: val || "" });
    if (!result.success) {
      const fieldError =
        result.error.errors.find((err) => err.path[0] === field)?.message || "";
      setErrors((prev) => ({ ...prev, [field]: fieldError }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // ✅ Submit
  const handleSubmit = () => {
    const validation = userSchema.safeParse(formValues);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      showNotification({
        title: "Validation Error",
        message: "Please fix the highlighted fields before submitting.",
        color: "red",
      });
      return;
    }

    const payload = {
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      email: formValues.email,
      phone_number: formValues.phone_number,
      role_id: formValues.role_id,
      locationId: formValues.locationID,
      password_url: windowUrl + "/create-password",
      applicationId: formValues.applicationId,
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
      onError: (err: unknown) => {
        const errorMessage = (
          err as { response?: { data?: { message?: string } } }
        )?.response?.data?.message;
        showNotification({
          title: "Error",
          message: errorMessage || "Failed to create user. Please try again.",
          color: "red",
        });
      },
    });
  };

  // ✅ Disable Save until all fields are filled & valid
  const allFieldsFilled = Object.values({
    firstname: formValues.firstname,
    lastname: formValues.lastname,
    email: formValues.email,
    phone_number: formValues.phone_number,
    role_id: formValues.role_id,
    locationID: formValues.locationID,
    applicationId: formValues.applicationId,
  }).every((val) => val && val.trim() !== "");

  const hasErrors = Object.values(errors).some(Boolean);
  const saveDisabled = !allFieldsFilled || hasErrors || isPending;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fw={600}>Add New User</Text>}
      centered
      size={480}
      overlayProps={{ opacity: 0.35, blur: 2 }}
      radius="lg"
      padding="md"
      withCloseButton
    >
      <Text size="sm" c="dimmed" mb="md">
        Enter the details below to add a new user
      </Text>

      <Stack gap="md">
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
              error={errors.firstname}
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
              error={errors.lastname}
            />
          </Grid.Col>
        </Grid>

        <TextInput
          label="Email"
          name="email"
          value={formValues.email}
          onChange={handleTextChange}
          placeholder="Enter email"
          size="sm"
          withAsterisk
          error={errors.email}
        />

        <TextInput
          label="Phone Number"
          name="phone_number"
          value={formValues.phone_number}
          onChange={handleTextChange}
          placeholder="Enter phone number"
          size="sm"
          withAsterisk
          error={errors.phone_number}
          maxLength={11} // prevent typing beyond 11 digits
        />

        <Select
          label="Role"
          name="role_id"
          value={formValues.role_id}
          onChange={(val) => handleSelectChange("role_id", val)}
          data={roleOptions}
          placeholder="Select role"
          size="sm"
          withAsterisk
          clearable
          error={errors.role_id}
        />

        <Select
          label="Assign Store"
          name="locationID"
          value={formValues.locationID}
          onChange={(val) => handleSelectChange("locationID", val)}
          data={locationOptions}
          placeholder="Select store"
          size="sm"
          withAsterisk
          clearable
          error={errors.locationID}
        />

        <Select
          label="Select Application"
          name="applicationId"
          value={formValues.applicationId}
          onChange={(val) => handleSelectChange("applicationId", val)}
          data={applicationOptions}
          placeholder="Select application"
          size="sm"
          withAsterisk
          clearable
          error={errors.applicationId}
        />
      </Stack>

      <div className="flex gap-7 mt-[2em] justify-center w-[100%]">
        <Button
          className="!w-full"
          variant="outline-primary"
          onClick={onClose}
          disabled={isPending}
        >
          No
        </Button>
        <Button
          className="!w-full"
          variant={saveDisabled ? "light" : "filled-primary"}
          onClick={handleSubmit}
          loading={isPending}
          disabled={saveDisabled}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}
