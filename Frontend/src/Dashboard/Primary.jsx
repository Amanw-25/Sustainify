import React from "react";
import "./Dashboard.css";
import { useForm } from "react-hook-form";
const Primary = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    
    console.log(data);
  };
  return (
    <>
      <div className="calculator-box">
        <h3>Primary Carbon Footprint Calculator</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Petrol [lit/m]</label>
            <input
              required
              type="number"
              placeholder="per month"
              {...register("petrol")}
            />
          </div>
          <div className="form-group">
            <label>Diesel [lit/m]</label>
            <input
              required
              type="number"
              placeholder="per month"
              {...register("diesel")}
            />
          </div>
          <div className="form-group">
            <label>Electricity </label>
            <input
              required
              type="number"
              placeholder="per month"
              {...register("electricity")}
            />
          </div>
          <div className="form-group">
            <label>Natural Gases </label>
            <input
              required
              type="number"
              placeholder="per month"
              {...register("naturalgas")}
            />
          </div>
          <div className="form-group">
            <label>C.N.G</label>
            <input
              required
              type="number"
              placeholder="per month"
              {...register("cng")}
            />
          </div>
          <div className="form-group">
            <label>Flight</label>
            <input
              requiredt
              type="number"
              placeholder="per month"
              {...register("flight")}
            />
          </div>
          <div className="form-group">
            <label>L.P.G</label>
            <input
              requiredt
              type="number"
              placeholder="per month"
              {...register("lpg")}
            />
          </div>
          <div className="form-group">
            <label>Fuel Oil</label>
            <input
              requiredt
              type="number"
              placeholder="per month"
              {...register("fueloil")}
            />
          </div>
          <button onClick={onsubmit} className="submit-button">
            Next
          </button>
        </form>
      </div>
    </>
  );
};

export default Primary;
