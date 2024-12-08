import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in by calling an API
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:5130/api/v1/sustainify/auth/checkAuth", {
          method: "GET",
          credentials: "include", // Important: send cookies with the request
        });

        if (response.ok) {
          setIsLoggedIn(true); // User is logged in
        } else {
          setIsLoggedIn(false); // User is not logged in
        }
      } catch (error) {
        setIsLoggedIn(false); // In case of an error (like network failure)
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  // Handle log out
  const handleLogout = async () => {
    try {
      // Send a request to the backend to log out
      await fetch("http://localhost:5130/api/v1/sustainify/auth/logout", {
        method: "POST",
        credentials: "include", // Ensure cookies are sent
      });

      setIsLoggedIn(false); // Update state to reflect logout
      navigate("/"); // Redirect to home or login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-white text-2xl font-bold tracking-wider hover:text-gray-300 transition duration-300"
            >
              Sustainify
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition duration-300">About</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition duration-300">Contact Us</Link>
            <Link to="/calculator" className="text-gray-300 hover:text-white transition duration-300">Calculator</Link>

            {/* Conditional Button (Log Out / Sign Up) */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300 font-medium relative z-40"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition duration-300 font-medium relative z-40"
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-white">Home</Link>
          <Link to="/about" className="block px-3 py-2 text-gray-300 hover:text-white">About</Link>
          <Link to="/contact" className="block px-3 py-2 text-gray-300 hover:text-white">Contact Us</Link>
          <Link to="/calculator" className="block px-3 py-2 text-gray-300 hover:text-white">Calculator</Link>
          <Link to="/shop" className="block px-3 py-2 text-gray-300 hover:text-white">Eco Shop</Link>
          <Link to="/blog" className="block px-3 py-2 text-gray-300 hover:text-white">Blog</Link>
          <Link to="/events" className="block px-3 py-2 text-gray-300 hover:text-white">Event</Link>
          <button
            onClick={isLoggedIn ? handleLogout : () => navigate("/register")}
            className="w-full text-left px-3 py-2 text-gray-300 hover:text-white"
          >
            {isLoggedIn ? "Log Out" : "Sign Up"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
