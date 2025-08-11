import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Text,
  Select,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { usePostData } from "../../hooks/useApis";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { IconChevronDown } from "@tabler/icons-react";
import AuthLayout from "../../layout/AuthLayout";

const CreatePassword = () => {
  const navigate = useNavigate();
  // get token and email from url
  const token = new URLSearchParams(window.location.search).get("token");
  const email = new URLSearchParams(window.location.search).get("email");

  const { mutateAsync: createPassword, isPending } = usePostData(
    "auth/signup/add-password"
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      confirmPassword: "",
      security_question: "",
      security_answer: "",
    },
    validate: {
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 letters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
      security_question: (value) =>
        value.length < 3
          ? "Security question must be at least 3 characters"
          : null,
      security_answer: (value) =>
        value.length < 3
          ? "Security answer must be at least 3 characters"
          : null,
    },
  });

  const handleSubmit = async (values: any) => {
    const payload = {
      email: email,
      password: values.password,
      password_confirmation: values.confirmPassword,
      token: token,
      security_question: values.security_question,
      security_answer: values.security_answer,
    };

    try {
      await createPassword(payload);

      notifications.show({
        title: "Password created successfully",
        message: "You can now login to your account",
        color: "green",
      });
      navigate("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

  if (!token || !email) {
    return (
      <div className="flex justify-center flex-col gap-4 items-center h-screen">
        <Text size="lg" className="text-gray-500">
          Invalid or expired link
        </Text>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate("/login")}>
            Go to Login
          </Button>
          <Button onClick={() => navigate("/signup")}>Go to Signup</Button>
        </div>
      </div>
    );
  }

  return (
    <AuthLayout>
      <Box className="w-full md:w-[496px] bg-white rounded-2xl md:shadow-sm p-9 flex flex-col gap-6 mt-20 border border-gray-200">
        {/* Logo */}

        {/* Title */}
        <div className="mb-2">
          <div className="text-gray-400 text-sm font-normal mb-1">
            Let's get Started
          </div>
          <div className="flex items-center font-bold text-2xl tracking-tight">
            {email ? email : ""}
          </div>
        </div>
        {/* Form */}
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
            size="md"
            radius="md"
            withAsterisk
            classNames={{ label: "text-[14px] text-[#222] font-medium" }}
            styles={{
              input: {
                background: "#F9FAFB",
                borderColor: "#E5E7EB",
                fontWeight: 400,
              },
            }}
          />
          <span className="font-light text-xs text-red-600">Password must contain at least 8 Characters, Uppercase, Lowercase, Symbol and Number  </span>
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            {...form.getInputProps("confirmPassword")}
            size="md"
            radius="md"
            withAsterisk
            classNames={{ label: "text-[14px] text-[#222] font-medium" }}
            styles={{
              input: {
                background: "#F9FAFB",
                borderColor: "#E5E7EB",
                fontWeight: 400,
              },
            }}
          />

          <div className="flex flex-col gap-2">
            <Select
              label="Security Question"
              placeholder="Select Security Question"
              {...form.getInputProps("security_question")}
              rightSection={<IconChevronDown size={16} />}
              rightSectionPointerEvents="none"
              data={[
                "What is your mother's maiden name?",
                "What is your pet's name?",
                "What is your favorite color?",
                "What is your favorite food?",
                "What is your favorite movie?",
              ]}
              size="md"
              radius="md"
            />
            <p className="text-sm text-gray-500">
              Create an extra layer of security pass
            </p>
          </div>

          <TextInput
            label="Security Answer"
            placeholder="Security Answer"
            {...form.getInputProps("security_answer")}
            size="md"
            radius="md"
          />

          <Button
            type="submit"
            fullWidth
            loading={isPending}
            className="font-bold text-lg mt-2 shadow-md"
            color="#F16722"
            size="md"
            radius="md"
          >
            Create Password
          </Button>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default CreatePassword;
