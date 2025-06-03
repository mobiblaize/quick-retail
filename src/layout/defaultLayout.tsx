import { Outlet } from "react-router-dom";
// import ScrollToTop from "../components/scrollToTop";
import Navbar from "./navbar";
import Footer from "./footer";

const DefaultLayout = () => {
  return (
    <>
      {/* <ScrollToTop /> */}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default DefaultLayout;