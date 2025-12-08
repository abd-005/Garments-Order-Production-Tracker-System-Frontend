import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaApplePay } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../../Logo/Logo";

const Footer = () => {
  return (
    <footer className="text-white py-12 bg-primary/70">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Logo/>
          <p className="text-sm leading-relaxed">
            Streamlining garment production and order tracking for factories worldwide. Your trusted partner in efficient manufacturing.
          </p>
          
        </div>

        {/* Useful Links */}
        <div className="footer-section animate-fade-in">
          <h3 className="text-lg font-semibold mb-4 text-secondary">Useful Links</h3>
          <ul className="space-y-3 opacity-90">
            <li><Link to="/" className="hover:text-primary transition-colors duration-200">Home</Link></li>
            <li><Link to="/all-products" className="hover:text-primary transition-colors duration-200">All Products</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors duration-200">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors duration-200">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
         <div className="footer-section animate-fade-in">
          <h3 className="text-lg font-semibold mb-4 text-secondary">Support</h3>
          <ul className="space-y-3 opacity-90">
            <li><Link to="/help" className="hover:text-primary transition-colors duration-200">Help Line</Link></li>
            <li><Link to="/privacy" className="hover:text-primary transition-colors duration-200">Privacy Policy</Link></li>
            <li><Link to="/support" className="hover:text-primary transition-colors duration-200">Support Center</Link></li>
            <li><Link to="/terms-conditions" className="hover:text-primary transition-colors duration-200">Terms & conditions</Link></li>
          </ul>
        </div>


        {/* Social */}
         <div className="footer-section animate-fade-in">
          <h3 className="text-lg font-semibold mb-4 text-secondary">Socials</h3>
          <nav>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                    </a>
                </div>
            </nav>
        </div>

        
          

      </div>
      
      <div className="container mx-auto mt-10 px-6">

        {/* Copyright */}
        <div className='py-6 text-sm text-center text-gray-200'>
              <hr className="mb-3"/>
        Copyright © {new Date().getFullYear()} PlantNet Inc. All rights reserved.
      </div>
      </div>
    </footer>
  );
};

export default Footer;