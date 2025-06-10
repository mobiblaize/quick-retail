import logo from "../assets/images/logo.png";
import { Facebook, Linkedin, X } from "../assets/svg";

const Footer = () => {
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
            <span className="hover:text-white transition-colors cursor-pointer">
              Company
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Pricing
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Policy
            </span>
          </div>

          <div className="flex gap-3 sm:gap-3.5">
            <div className="hover:opacity-80 transition-opacity cursor-pointer">
              <X />
            </div>
            <div className="hover:opacity-80 transition-opacity cursor-pointer">
              <Linkedin />
            </div>
            <div className="hover:opacity-80 transition-opacity cursor-pointer">
              <Facebook />
            </div>
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
