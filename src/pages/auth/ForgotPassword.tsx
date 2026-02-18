import { TextInput, Button, Box } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
// Adjust this import path based on where your hook actually is
import { usePostData } from "../../hooks/useApis"; 
import { notifications } from "@mantine/notifications";
import AuthLayout from "../../layout/AuthLayout";
import ForgotPasswordImage from "../../assets/images/forgetPassword.png";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CheckMail from "../../components/landingComponent/contact/CheckMail";

export const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const ForgotPassword = () => {
  // Using 'mutateAsync' to handle the promise manually in the handler
  const { mutateAsync: forgotPassword, isPending } = usePostData(
    "auth/forgot-password/reset-link"
  );
  
  const windowUrl = window.location.origin;
  const navigate = useNavigate();
  
  const [checkMail, setCheckMail] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: "",
    },
  });

  // This function handles both the initial submit and the resend
  const handleForgotPassword = async (isResendRequest = false) => {
    // If validation fails (and it's not a resend), stop.
    if (!form.values.email) {
      form.validate();
      return;
    }

    // Set local loading state if this is a resend action
    if (isResendRequest) {
      setIsResending(true);
    }

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

      // Open the modal
      setCheckMail(true);
    } catch (error) {
      console.log(error);
      notifications.show({
        title: "Error",
        message: "Failed to send email. Please try again.",
        color: "red",
      });
    } finally {
      setIsResending(false); 
    }
  };

  return (
    <AuthLayout image={ForgotPasswordImage}>
      {/* back arrow */}
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
            // We pass a lambda so we can ensure isResendRequest is false for the main button
            onSubmit={form.onSubmit(() => handleForgotPassword(false))}
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
          </form>
        </Box>
      </div>

      {/* 
        Render the Modal here. 
        It sits on top of the layout when 'opened' is true. 
      */}
      <CheckMail
        email={form.values.email}
        message="Email sent successfully"
        onClose={() => setCheckMail(false)}
        opened={checkMail}
        onResend={() => handleForgotPassword(true)} // Pass true to indicate resend
        isResending={isResending}
      />
    </AuthLayout>
  );
};

export default ForgotPassword;