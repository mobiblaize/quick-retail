import { useEffect } from "react";
import HeroSection from "../../components/landingComponent/home/hero";
import ManageFinncial from "../../components/landingComponent/home/manageFinncial";
import PointOfSales from "../../components/landingComponent/home/pointOfSales";
import Consolidate from "../../components/landingComponent/home/consolidate";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <HeroSection />
      <ManageFinncial />
      <PointOfSales />
      <Consolidate />
    </main>
  );
};

export default Home;
