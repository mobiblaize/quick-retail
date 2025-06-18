import { TextInput, Button, Box } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { usePostData } from "../../hooks/useApis";
import { notifications } from "@mantine/notifications";
import AuthLayout from "../../layout/AuthLayout";
import ForgotPasswordImage from "../../assets/images/forgetPassword.png";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CheckMail from "../../components/landingComponent/contact/CheckMail";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const ForgotPassword = () => {
  const { mutateAsync: forgotPassword, isPending } = usePostData(
    "auth/forgot-password/reset-link"
  );
  const windowUrl = window.location.origin;
  const navigate = useNavigate();
  const [checkMail, setCheckMail] = useState(false);
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: "",
    },
  });

  const handleForgotPassword = async () => {
    const payload = {
      email: form.values.email,
      password_url: windowUrl + "/verify-otp",
    };

    try {
      const res = await forgotPassword(payload);
      if (!res) return;

      notifications.show({
        title: "Success",
        message: "Email sent successfully",
        color: "green",
      });

      setCheckMail(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (checkMail) {
    return (
      <CheckMail
        email={form.values.email}
        message="Email sent successfully"
        onClose={() => setCheckMail(false)}
        opened={checkMail}
      />
    );
  }

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
              Forgot Password?
            </div>
            <div className="text-gray-400 text-sm font-normal mb-1">
              An OTP code will be sent to your email to verify your account
            </div>
          </div>
          {/* Form */}
          <form
            onSubmit={form.onSubmit(handleForgotPassword)}
            className="flex flex-col gap-6"
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
              Send Email
            </Button>
            {/* resent otp */}
            <div className="flex justify-center items-center ">
              <p className="text-gray-300 text-sm font-medium no-underline">
                Didn't receive the email?
              </p>
              <Button
                variant="transparent"
                className="text-gray-300 text-sm font-medium no-underline"
                onClick={() => {
                  handleForgotPassword();
                }}
              >
                Resend Email
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
