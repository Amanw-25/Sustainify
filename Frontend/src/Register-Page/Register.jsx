import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState(""); // For error handling
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Sending a POST request to the backend
      const response = await axios.post("http://localhost:5130/api/v1/sustainify/auth/signup", {
        username: data.username,
        phonenumber: data.phonenumber,
        email: data.email,
        password: data.password,
      });

      // On successful registration, redirect to the login page
      if (response.data.status === "success") {
        console.log(response.data.message); // Optionally log the success message
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      // Handle errors if any
      console.error("Error during registration:", error);
      setErrorMessage("Registration failed! Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="Register-Page-Container h-screen w-full flex bg-cover bg-black animate-onload"
        style={{ backgroundImage: 'url("../assets/Landing-Back.png")' }}
      >
        {/* Left Text Section */}
        <div className="Register-Page-Container-Left h-full w-3/5 text-center font-poppins text-black flex flex-col items-center justify-start">
          <h1 className="mt-[25%] text-7xl w-7/10 text-white">Welcome to Sustainify</h1>
          <p className="w-4/5 text-white mt-[3%] text-xl">
            At Sustainify, we believe that every action counts when it comes to protecting our planet. Our mission is to empower individuals to make sustainable choices, reduce their carbon footprint, and live in harmony with the environment. By adopting sustainable practices in our daily lives, we can create a future where both people and nature thrive.
          </p>
        </div>

        {/* Right Form Section */}
        <div className="Register-Page-Container-Right h-full w-2/5 flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="h-[70%] w-[55%] bg-black rounded-lg border-2 border-white flex flex-col items-center justify-evenly shadow-[0_0_0.25rem_#fff]"
          >
            <input
              type="text"
              placeholder="Enter Username"
              {...register("username", { required: true })}
              className="h-[10%] w-[80%] rounded-lg border-2 border-black text-center"
            />
            {errors.username && <p className="text-red-500">Username is required</p>}

            <input
              type="number"
              placeholder="Enter Phone Number"
              {...register("phonenumber", { required: true })}
              className="h-[10%] w-[80%] rounded-lg border-2 border-black text-center"
            />
            {errors.phonenumber && <p className="text-red-500">Phone number is required</p>}

            <input
              type="email"
              placeholder="Enter Email"
              {...register("email", { required: true })}
              className="h-[10%] w-[80%] rounded-lg border-2 border-black text-center"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            <input
              type="password"
              placeholder="Set Password"
              {...register("password", { required: true })}
              className="h-[10%] w-[80%] rounded-lg border-2 border-black text-center"
            />
            {errors.password && <p className="text-red-500">Password is required</p>}

            {/* Displaying error message if registration fails */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <button
              type="submit"
              className="p-2 bg-white font-poppins rounded-xl border-2 border-white transition-all duration-400 ease-in-out hover:bg-white hover:border-white hover:text-honeydew"
            >
              Submit
            </button>
            <a
              onClick={() => navigate("/login")}
              className="font-poppins text-white no-underline cursor-pointer"
            >
              Already a User?
            </a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
