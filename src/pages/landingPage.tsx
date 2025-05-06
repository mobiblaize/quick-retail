import { Button } from "@mantine/core";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { ROUTES } from "../constants/routes";

const LandingPage = () => {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-black font-bold">WELCOME GUYS!👋👋</h1>
      <Link to={ROUTES.dashboard}>
        <Button
          type="submit"
          bg="customPrimary.9"
          className="mt-4 bg-[customPrimary.9] flex items-center gap-2"
        >
          Cick to proceed
          <ArrowRight />
        </Button>
      </Link>
    </main>
  );
};

export default LandingPage;
