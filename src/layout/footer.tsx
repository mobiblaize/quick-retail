// Footer.tsx
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 py-10 text-sm">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">Benta ERP</h4>
          <p>© {new Date().getFullYear()} Benta ERP. All rights reserved.</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Home</a></li>
            <li><a href="#" className="hover:text-orange-500">Products</a></li>
            <li><a href="#" className="hover:text-orange-500">Pricing</a></li>
            <li><a href="#" className="hover:text-orange-500">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-orange-500" /></a>
            <a href="#" aria-label="Twitter"><Twitter className="w-5 h-5 hover:text-orange-500" /></a>
            <a href="#" aria-label="Instagram"><Instagram className="w-5 h-5 hover:text-orange-500" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
