import { Button, Menu as MantineMenu } from "@mantine/core";
import { Menu, ChevronDown } from "lucide-react";
import logo from "../../src/assets/images/logo.png";
import { Link } from "react-router";

const Navbar = () => {

  return (
    <header className="w-full py-4 bg-white shadow-sm font-[Clash Display]">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu className="md:hidden text-gray-800" />
          <img src={logo} alt="logo" className="object-contain" />
        </div>
        <nav className="hidden md:flex gap-6 text-gray-700 font-[400] text-[18px] leading-[100%] tracking-[0.02em] items-center">
          <a href="#">Home</a>

          {/* Dropdown for Products */}
          <MantineMenu shadow="md" width={200} position="bottom">
            <MantineMenu.Target>
              <div className="flex items-center gap-1 cursor-pointer hover:text-orange-500">
                <span>Products</span>
                <ChevronDown size={16} />
              </div>
            </MantineMenu.Target>
            <MantineMenu.Dropdown>
              <MantineMenu.Item>POS Software</MantineMenu.Item>
              <MantineMenu.Item>Inventory</MantineMenu.Item>
              <MantineMenu.Item>eCommerce</MantineMenu.Item>
              <MantineMenu.Item>Reports</MantineMenu.Item>
            </MantineMenu.Dropdown>
          </MantineMenu>

          <a href="#">Pricing</a>
          <a href="#">Company</a>
          <a href="#">Contact</a>
        </nav>
        <div key="search-product-buttons" className="flex gap-4 justify-end">
          <Link to="/login">
            <Button variant="outline-primary">Log in</Button>
          </Link>
          <Button variant="filled-primary">Sign Up</Button>
        </div>
        ,
      </div>
    </header>
  );
};

export default Navbar;
