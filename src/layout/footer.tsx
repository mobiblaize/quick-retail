import logo from "../assets/images/logo.png";
import { Instagram, Linkedin, X } from "../assets/svg";
import { useNavigate } from "react-router-dom";

const SOCIAL_LINKS = {
  x: "https://x.com/Quickretail2026",
  // linkedin: "https://www.linkedin.com/company/quickretail",
  instagram: "https://www.instagram.com/quickkretail?igsh=cHlobXV5bzQ2YTcy",
};

const Footer = () => {
  const navigate = useNavigate();
  return (
    <main className="text-white bg-inherit pt-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <img src={logo} alt="logo" className="h-8 sm:h-auto" />
          <p className="text-[#000000] tracking-widest text-base sm:text-lg font-clash-medium">
            Follow Us
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 sm:mt-1 gap-4 sm:gap-0">
          <div className="flex flex-wrap font-sans text-[#98A2B3] gap-3 sm:gap-3.5 text-sm sm:text-base">
            <button
              type="button"
              onClick={() => {
                if (window.location.pathname !== "/") {
                  navigate("/");
                }
                const options: ScrollToOptions = { top: 0, left: 0, behavior: "smooth" };
                document.getElementById("root")?.scrollTo(options);
                document.documentElement.scrollTo(options);
                document.body.scrollTo(options);
                window.scrollTo(options);
              }}
              className="bg-transparent border-0 p-0 font-sans text-inherit hover:text-[#F16722] transition-colors cursor-pointer"
            >
              Company
            </button>
            <button type="button" onClick={() => navigate("/payment-summary")} className="bg-transparent border-0 p-0 font-sans text-inherit hover:text-[#F16722] transition-colors cursor-pointer">
              Pricing
            </button>
            <button type="button" onClick={() => navigate("/policy")} className="hover:text-[#F16722] transition-colors cursor-pointer">
              Policy
            </button>
          </div>

          <div className="flex gap-3 sm:gap-3.5">
            <a
              href={SOCIAL_LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="hover:opacity-80 transition-opacity"
            >
              <X />
            </a>
            {/* <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:opacity-80 transition-opacity"
            >
              <Linkedin />
            </a> */}
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:opacity-80 transition-opacity"
            >
              <Instagram />
            </a>
          </div>
        </div>

        <div className="py-4 sm:py-5 border-t border-[#98A2B3] my-6 sm:my-9">
          <small className="text-[#98A2B3] text-center font-sans flex items-center justify-center text-xs sm:text-sm">
            © {new Date().getFullYear()} UK. All rights reserved.
          </small>
        </div>
      </div>
    </main>
  );
};

export default Footer;
