import { Button, Box, PasswordInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { usePostData } from "../../hooks/useApis";
import { notifications } from "@mantine/notifications";
import AuthLayout from "../../layout/AuthLayout";
import ForgotPasswordImage from "../../assets/images/forgetPassword.png";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const ResetPassword = () => {
  const userId = new URLSearchParams(window.location.search).get("userId");
  const { mutateAsync: resetPassword, isPending } = usePostData(
    "auth/forgot-password/reset"
  );
  const navigate = useNavigate();
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = async () => {
    const payload = {
      password: form.values.password,
      password_confirmation: form.values.confirmPassword,
      user_id: userId,
      //   new_password: form.values.confirmPassword,
      //   confirm_password: form.values.confirmPassword,
    };

    try {
      const res = await resetPassword(payload);
      if (!res) return;

      notifications.show({
        title: "Success",
        message: res?.message || "Password reset successfully",
        color: "green",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout image={ForgotPasswordImage}>
      {/* back  arrow */}
      <div className="w-full md:w-[496px] bg-white ">
        <button
          className="cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IconArrowLeft size={24} />
        </button>
        <Box className=" rounded-2xl md:shadow-sm p-9 flex flex-col gap-6 mt-10 border border-gray-200">
          {/* Logo */}

          {/* Title */}
          <div className="mb-2">
            <div className="flex items-center font-bold text-2xl tracking-tight">
              Create Password
            </div>
            <div className="text-gray-400 text-sm font-normal mb-1">
              Create a new secure password for your account.
            </div>
          </div>
          {/* Form */}
          <form
            onSubmit={form.onSubmit(handleResetPassword)}
            className="flex flex-col gap-6"
          >
            <PasswordInput
              label="Password"
              placeholder="********"
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
            <PasswordInput
              label="Confirm Password"
              placeholder="********"
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

            <Button
              type="submit"
              fullWidth
              loading={isPending}
              size="md"
              radius="md"
              className="font-bold text-lg mt-2 shadow-md"
              color="#F16722"
              style={{ boxShadow: "0 2px 8px rgba(249, 115, 22, 0.08)" }}
            >
              Reset Password
            </Button>
          </form>
          {/* go to login */}
          <div className="flex justify-center items-center gap-2">
            <p className="text-gray-300 text-sm font-medium no-underline">
              Already have an account?
            </p>{" "}
            <Link
              to="/login"
              className="text-[#F16722] hover:text-[#F16722] cursor-pointer text-sm font-medium no-underline"
            >
              Login
            </Link>
          </div>
        </Box>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
