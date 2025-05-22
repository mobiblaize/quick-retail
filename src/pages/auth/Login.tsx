import { TextInput, PasswordInput, Button, Box } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { LogoSvg } from "../../assets/svg/logoSvg";
import { usePostData } from "../../hooks/useApis";
import { notifications } from "@mantine/notifications";
import { Link } from "react-router-dom";


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
    <div className="flex min-h-screen  bg-white">
      {/* Left Side - Login Form */}

      <div className="flex flex-1 flex-col justify-center items-center  relative">
        <div className="absolute  top-5 left-5">
          <LogoSvg />
        </div>
        <Box className="w-full md:w-[496px] bg-white rounded-2xl md:shadow-sm p-9 flex flex-col gap-6 mt-10">
          {/* Logo */}

          {/* Title */}
          <div className="mb-2">
            <div className="text-gray-400 text-sm font-normal mb-1">
              Let's get Started
            </div>
            <div className="flex items-center font-bold text-2xl tracking-tight">
              Victoria Store LLC
            </div>
          </div>
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
                className="text-gray-300 text-sm font-medium no-underline"
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
              color="#F16722"
              style={{ boxShadow: "0 2px 8px rgba(249, 115, 22, 0.08)" }}
            >
              Log In
            </Button>
          </form>
        </Box>
      </div>
      {/* Right Side - Image and Text */}
      <div className="flex-1 relative hidden md:flex items-end justify-center min-h-screen overflow-hidden">
        <img
          src={placeholderImage}
          alt="Retail background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div
          className="absolute top-0 left-0 w-full h-full z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.2) 100%)",
          }}
        />
        <div className="relative z-20 text-white max-w-2xl p-12 ">
          <div className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            One Platform for all your{" "}
            <span className="text-orange-500">Business Needs.</span>
          </div>
          <div className="text-lg md:text-xl font-normal text-gray-200">
            Customizable solutions that cater to the unique needs of retail
            businesses.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
