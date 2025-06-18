import { TextInput, PasswordInput, Button, Box } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

import { usePostData } from "../../hooks/useApis";
import { notifications } from "@mantine/notifications";
import { Link } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";

const placeholderImage =
  "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&w=800&q=80";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const { mutateAsync: login, isPending } = usePostData("auth/signin/login");
  // const { updateUser } = useSessionStorage();
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async () => {
    const payload = {
      email: form.values.email,
      password: form.values.password,
    };

    try {
      const res = await login(payload);
      if (!res?.data) return;

      const { accessToken, user } = res.data;
      const tenant_uuid = user.tenants?.[0]?.uuid;

      sessionStorage.setItem("access_token", accessToken);
      sessionStorage.setItem("user", JSON.stringify(user));

      if (tenant_uuid) {
        sessionStorage.setItem("tenant_uuid", tenant_uuid);
      } else {
        console.warn("Tenant UUID not found in login response.");
      }

      window.location.replace("/dashboard");

      notifications.show({
        title: "Success",
        message: "Login successful",
        color: "green",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout image={placeholderImage}>
      <Box className="w-full md:w-[496px] bg-white rounded-2xl md:shadow-sm p-9 flex flex-col gap-6 mt-10 border border-gray-200">
        {/* Logo */}

        {/* Title */}
        {/* <div className="mb-2">
          <div className="text-gray-400 text-sm font-normal mb-1">
            Let's get Started
          </div>
          <div className="flex items-center font-bold text-2xl tracking-tight">
            Victoria Store LLC
          </div>
        </div> */}
        {/* Form */}
        <form
          onSubmit={form.onSubmit(handleLogin)}
          className="flex flex-col gap-4"
        >
          <TextInput
            label="Email Address"
            placeholder="admin@victoriaillc.com.ng"
            {...form.getInputProps("email")}
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
          <div className="text-right -mt-2 mb-2">
            <Link
              to="/forgot-password"
              className=" text-sm font-medium no-underline text-[#F16722]"
            >
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            fullWidth
            loading={isPending}
            size="md"
            radius="md"
            className="font-bold text-lg mt-2 shadow-md"
            style={{ boxShadow: "0 2px 8px rgba(249, 115, 22, 0.08)" }}
          >
            Log In
          </Button>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default Login;
