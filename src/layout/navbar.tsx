import { Link, NavLink, useLocation } from "react-router-dom";
import { Burger, Drawer, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "../assets/images/logo.png";
import { ROUTES } from "../constants/routes";



const NavBar = () => {
  const location = useLocation();
  const [
    isMobileMenuOpen,
    { toggle: toggleMobileMenu, close: closeMobileMenu },
  ] = useDisclosure(false);

  const getLinkClassName = (href: string) => {
    const isActive =
      href === ROUTES.HOME
        ? location.pathname === href
        : location.pathname === href ||
          location.pathname.startsWith(href + "/");
    return `transition-colors tracking-wider hover:text-[#F16722] ${
      isActive ? "text-[#F16722] font-semibold" : "text-[#5C6C72]"
    }`;
  };

  const closeAll = () => {
    closeMobileMenu();
  };

  return (
    <div className="bg-white font-clash-regular relative shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <NavLink to={ROUTES.HOME} onClick={closeAll}>
            <img src={logo} alt="Logo" className="h-8 sm:h-10" />
          </NavLink>


          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-4 items-center">
            <Link to="/login">
              <Button
                variant="outline"
                color="#F16722"
                radius="md"
                size="md"
                styles={{
                  root: {
                    padding: "8px 20px",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  },
                }}
              >
                Log In
              </Button>
            </Link>

            <NavLink
              to={ROUTES.CONTACT}
              className={getLinkClassName(ROUTES.CONTACT)}
              // onClick={closeDropdown}
            >
              <Button
                variant="filled"
                color="#F16722"
                radius="md"
                size="md"
                styles={{
                  root: {
                    padding: "8px 20px",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  },
                }}
              >
                Sign Up
              </Button>
            </NavLink>
          </div>

          {/* Mobile Burger */}
          <div className="md:hidden">
            <Burger
              opened={isMobileMenuOpen}
              onClick={toggleMobileMenu}
              color="#F16722"
              size="md"
              aria-label="Toggle navigation menu"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        opened={isMobileMenuOpen}
        onClose={closeAll}
        position="right"
        size="xs"
        withCloseButton={true}
        closeButtonProps={{ "aria-label": "Close navigation menu" }}
        styles={{
          content: { backgroundColor: "#fff" },
          header: { padding: "16px" },
        }}
      >
        <div className="flex flex-col gap-4 p-4">

          <Group grow className="mt-4">
            <Button
              component={Link}
              to="/login"
              variant="outline"
              color="#F16722"
              radius="md"
              size="md"
              styles={{ root: { height: "48px", fontSize: "14px" } }}
              onClick={closeAll}
            >
              Log In
            </Button>
            <Button
              component={Link}
              to="/payment-summary"
              variant="filled"
              color="#F16722"
              radius="md"
              size="md"
              styles={{ root: { height: "48px", fontSize: "14px" } }}
              onClick={closeAll}
            >
              Sign Up
            </Button>
          </Group>
        </div>
      </Drawer>
    </div>
  );
};

export default NavBar;
