import React from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const navigate = useNavigate();
  return (
    <>
      <nav className="Navbar">
        <div className="Navbar-Logo">
          <h1>Sustainify</h1>
        </div>
      </nav>
      <div className="Register-Page-Container">
        <div className="Register-Page-Container-Left">
          <h1>Welcome to Sustainify</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
            consequuntur voluptatem. Quis, unde reprehenderit modi optio
            obcaecati distinctio est illo porro earum voluptate, eum officiis
            vitae excepturi magni facilis cumque?
          </p>
        </div>
        <div className="Register-Page-Container-Right">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Enter Username"
              {...register("username")}
            />
            <input
              type="number"
              placeholder="Enter Phone Number"
              {...register("phonenumber")}
            />
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email")}
            />
            <input
              type="password"
              placeholder="Set Password"
              {...register("password")}
            />
            <button type="submit">Submit</button>
            <a onClick={() => navigate("/login")}>Already a User ?</a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
