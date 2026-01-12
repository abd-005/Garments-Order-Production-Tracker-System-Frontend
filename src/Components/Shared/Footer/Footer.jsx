import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../../Logo/Logo";

const Footer = () => {
  return (
    <footer className="text-white py-12 bg-primary dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Logo/>
          <p className="text-sm leading-relaxed text-gray-100 dark:text-gray-400 mt-3">
            Premium garment production and order tracking for discerning customers worldwide. Your trusted partner in quality craftsmanship.
          </p>
        </div>

        {/* Useful Links */}
        <div className="footer-section">
          <h3 className="text-lg font-semibold mb-4 text-secondary dark:text-blue-300">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="text-gray-100 dark:text-gray-400 hover:text-secondary dark:hover:text-blue-300 transition-colors duration-200">Home</Link></li>
            <li><Link to="/products" className="text-gray-100 dark:text-gray-400 hover:text-secondary dark:hover:text-blue-300 transition-colors duration-200">All Products</Link></li>
            <li><Link to="/about" className="text-gray-100 dark:text-gray-400 hover:text-secondary dark:hover:text-blue-300 transition-colors duration-200">About Us</Link></li>
            <li><Link to="/contact" className="text-gray-100 dark:text-gray-400 hover:text-secondary dark:hover:text-blue-300 transition-colors duration-200">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3 className="text-lg font-semibold mb-4 text-secondary dark:text-blue-300">Support</h3>
          <ul className="space-y-3">
            <li><Link to="/help" className="text-gray-100 dark:text-gray-400 hover:text-secondary dark:hover:text-blue-300 transition-colors duration-200">Help & Support</Link></li>
            <li><Link to="/privacy" className="text-gray-100 dark:text-gray-400 hover:text-secondary dark:hover:text-blue-300 transition-colors duration-200">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions" className="text-gray-100 dark:text-gray-400 hover:text-secondary dark:hover:text-blue-300 transition-colors duration-200">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h3 className="text-lg font-semibold mb-4 text-secondary dark:text-blue-300">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-gray-100 dark:text-gray-400 hover:text-secondary dark:hover:text-blue-300 transition-colors" aria-label="Twitter">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-100 dark:text-gray-400 hover:text-secondary dark:hover:text-blue-300 transition-colors" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-100 dark:text-gray-400 hover:text-secondary dark:hover:text-blue-300 transition-colors" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto mt-10 px-6">
        {/* Copyright */}
        <div className='py-6 text-sm text-center text-gray-300 dark:text-gray-500'>
          <hr className="mb-3 border-gray-600 dark:border-slate-700"/>
          Copyright © {new Date().getFullYear()} TailorFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;