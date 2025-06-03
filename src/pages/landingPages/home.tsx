import { useEffect } from "react";
import HeroSection from "../../components/landingComponent/heroSection/hero";


const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <HeroSection />
    </main>
  );
};

export default Home;
