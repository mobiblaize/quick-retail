import { Button, Box, PinInput, LoadingOverlay } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { usePostData } from "../../hooks/useApis";
import { notifications } from "@mantine/notifications";
import AuthLayout from "../../layout/AuthLayout";
import ForgotPasswordImage from "../../assets/images/forgetPassword.png";
import { useNavigate } from "react-router-dom";
import { useCountdown } from "../../hooks/useCountdown";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

const schema = z.object({
  otp: z.string().min(6, { message: "Invalid code" }),
});

const OTP_DURATION = 120; // 2 minutes in seconds

const VerifyOTP = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  // get token and email from url
  const token = new URLSearchParams(window.location.search).get("token");
  const email = new URLSearchParams(window.location.search).get("email");
  // state for user input otp
  const [userId, setUserId] = useState("");

  const { mutateAsync: verifyOTP, isPending } = usePostData(
    "auth/forgot-password/verify-code"
  );
  //   send otp
  const { mutateAsync: sendOTP, isPending: isSendOTPPending } = usePostData(
    "auth/forgot-password/send-code"
  );

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      otp: "",
    },
  });
  const { secondsLeft, isActive, restart } = useCountdown(OTP_DURATION);

  // Format mm:ss
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const handleSendOTP = async () => {
    const payload = {
      email: email,
      token: token,
    };

    try {
      const res = await sendOTP(payload);
      console.log(res);
      if (!res) return;

      setUserId(res?.data?.user?.user_uuid);
      notifications.show({
        title: "Success",
        message: res?.message || "OTP sent successfully",
        color: "green",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOTP = async () => {
    const payload = {
      code: form.values.otp,
      token: token,
      email: email,
    };

    try {
      const res = await verifyOTP(payload);
      if (!res) return;

      notifications.show({
        title: "Success",
        message: res?.message || "OTP verified successfully",
        color: "green",
      });
      navigate("/reset-password?userId=" + res?.data?.user_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout image={ForgotPasswordImage}>
      {/* back  arrow */}
      <div className="w-full md:w-[496px] bg-white ">
        {/* <button
          className="cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IconArrowLeft size={24} />
        </button> */}
        <Box
          className=" rounded-2xl md:shadow-sm p-9 flex flex-col gap-6 mt-10 border border-gray-200"
          pos={"relative"}
        >
          {/* Logo */}
          <LoadingOverlay
            visible={isSendOTPPending}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />

          {/* Title */}
          <div className="mb-2">
            <div className="flex items-center font-bold text-2xl tracking-tight">
              OTP Code Verification
            </div>
            <div className="text-gray-400 text-sm font-normal mb-1">
              A six digit code has been sent to your email address
            </div>
          </div>
          {/* Form */}
          <form
            onSubmit={form.onSubmit(handleVerifyOTP)}
            className="flex flex-col gap-6"
          >
            {form.errors.otp && (
              <p className="text-red-500 text-sm">{form.errors.otp}</p>
            )}
            {/* use a PinInput */}
            <div className="space-y-2">
              <div className="flex justify-start  items-center">
                <PinInput
                  length={6}
                  size={isMobile ? "md" : "lg"}
                  onChange={(value: string) => {
                    form.setFieldValue("otp", value);
                  }}
                />
              </div>
              {/* code expires in 4 minutes */}
              <p className="text-center">
                Code expires in{" "}
                <span className="text-[#F16722]">
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </span>
              </p>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={isPending}
              size="md"
              radius="md"
              className="font-bold text-lg mt-2 shadow-md"
              color="#F16722"
              style={{ boxShadow: "0 2px 8px rgba(249, 115, 22, 0.08)" }}
              disabled={form.values.otp.length !== 6}
            >
              Verify
            </Button>
            {/* resent otp */}
            <div className="flex justify-center items-center gap-2">
              <p className="text-gray-300 text-sm font-medium no-underline">
                Didn't receive the code?
              </p>
              <Button
                variant="transparent"
                className="text-gray-300 text-sm font-medium no-underline"
                onClick={() => {
                  handleSendOTP();
                  restart();
                }}
                disabled={isActive}
                size="xs"
              >
                Resend OTP
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </AuthLayout>
  );
};

export default VerifyOTP;
