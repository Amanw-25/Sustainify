import React from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Login = () => {
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
      <div className="Login-Page-Container">
        <div className="Login-Page-Container-Left">
          <h1>Welcome Back to Sustainify</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
            consequuntur voluptatem. Quis, unde reprehenderit modi optio
            obcaecati distinctio est illo porro earum voluptate, eum officiis
            vitae excepturi magni facilis cumque?
          </p>
        </div>
        <div className="Login-Page-Container-Right">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Enter Your Email"
              {...register("email")}
            />
            <input
              type="text"
              placeholder="Enter Your Password"
              {...register("password")}
            />

            <button>Submit</button>
            <a onClick={() => navigate("/register")}>Not an User ??</a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
