import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState(""); // To handle error messages
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To handle login status
  const [loading, setLoading] = useState(true); // To handle loading state
  const navigate = useNavigate();

  // Check login status by attempting to access a protected route
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:5130/", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          // If response is 200, user is logged in
          setIsLoggedIn(true);
        } else {
          // If response is 401/403, user is not logged in
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false); // Assume not logged in on error
      } finally {
        setLoading(false); // Hide loader after check
      }
    };

    checkLoginStatus();
  }, []);

  // Handle login form submission
  const onSubmit = async (data) => {
    setLoginError(""); // Clear previous errors
    try {
      const response = await fetch("http://localhost:5130/api/v1/sustainify/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: "include", // Send cookies with the request
      });

      if (response.ok) {
        // Login successful
        setIsLoggedIn(true);
        navigate("/"); // Redirect to home page
      } else {
        // Handle errors from the server
        const result = await response.json();
        setLoginError(result.message || "Invalid email or password.");
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
      console.error("Error during login:", error);
    }
  };

  if (loading) {
    // Show a loading spinner while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div
        className="Login-Page-Container h-screen w-full flex bg-cover bg-black animate-onload"
        style={{ backgroundImage: 'url("../assets/Landing-Back.png")' }}
      >
        <div className="Login-Page-Container-Left h-full w-3/5 text-center font-poppins text-black flex flex-col items-center justify-start">
          <h1 className="mt-[29%] text-7xl text-white w-7/10">Welcome Back to Sustainify</h1>
          <p className="w-4/5 text-white mt-[2%] text-lg">
            At Sustainify, we believe that every action counts when it comes to protecting our planet. Our mission is to empower individuals to make sustainable choices, reduce their carbon footprint, and live in harmony with the environment. By adopting sustainable practices in our daily lives, we can create a future where both people and nature thrive.
          </p>
        </div>
        <div className="Login-Page-Container-Right h-full w-2/5 flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="h-[50%] w-[55%] bg-black rounded-lg border-2 border-white flex flex-col items-center justify-evenly shadow-[0_0_0.25rem_#fff]"
          >
            <input
              type="text"
              placeholder="Enter Your Email"
              {...register("email", { required: "Email is required" })}
              className="h-[15%] w-[80%] rounded-lg border-2 border-black text-center p-2"
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            
            <input
              type="password"
              placeholder="Enter Your Password"
              {...register("password", { required: "Password is required" })}
              className="h-[15%] w-[80%] rounded-lg border-2 border-black text-center p-2"
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            
            <button className="p-2 bg-white font-poppins rounded-xl border-2 border-white transition-all duration-300 ease-in-out hover:bg-white hover:text-honeydew w-[200px]">
              Submit
            </button>

            {loginError && <p className="text-red-500 mt-2">{loginError}</p>}

            <a
              onClick={() => navigate("/register")}
              className="font-poppins text-white no-underline cursor-pointer mt-4"
            >
              Not a User?
            </a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
