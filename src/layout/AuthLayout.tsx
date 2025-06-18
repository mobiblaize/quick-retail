import { LogoSvg } from "../assets/svg/logoSvg";

import AuthImage from "../assets/images/createPassword.png";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({
  children,
  image = AuthImage,
  title = "One Platform for all your",
  titleOrange = "Business Needs.",
  description = "Customizable solutions that cater to the unique needs of retail businesses.",
}: {
  children: React.ReactNode;
  image?: string;
  title?: string;
  titleOrange?: string;
  description?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen  bg-white ">
      {/* Left Side - Login Form */}

      <div className="flex flex-1 flex-col justify-center items-center  relative">
        <div className="absolute  top-5 left-5">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
          >
            <LogoSvg />
          </button>
        </div>
        {children}
      </div>
      {/* Right Side - Image and Text */}
      <div className="flex-1 relative hidden md:flex items-end justify-center min-h-screen overflow-hidden">
        <img
          src={image}
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
          <div className="text-3xl md:text-5xl font-bold leading-tight mb-4 ">
            {title} <span className="text-orange-500">{titleOrange}</span>
          </div>
          <div className="text-lg md:text-xl font-normal text-gray-200">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
