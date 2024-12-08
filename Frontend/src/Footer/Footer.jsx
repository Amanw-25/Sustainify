import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white tracking-wide uppercase">Legal</h3>
            <ul className="space-y-2">
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">FAQ</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-2">
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Home</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">About</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Product</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Pricing</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white tracking-wide uppercase">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">Address:</span>
                <span className="text-gray-400">123 Business Street, Suite 100, City, Country</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">Phone:</span>
                <span className="text-gray-400 hover:text-white transition-colors duration-200">
                  xx xx xx xx
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">Email:</span>
                <span className="text-gray-400 hover:text-white transition-colors duration-200">
                  test@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;