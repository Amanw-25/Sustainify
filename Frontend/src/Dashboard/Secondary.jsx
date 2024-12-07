import React from "react";
import "./Dashboard.css";
import { useForm } from "react-hook-form";
const Secondary = () => {
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
        <h3>Secondary Carbon Footprint Calculator</h3>
        <form action="">
          <div className="form-group">
            <label>Coal</label>
            <input
              required
              type="number"
              placeholder="per month"
              {...register("coal")}
            />
          </div>
          <div className="form-group">
            <label>Organic Waste</label>
            <input
              required
              type="number"
              placeholder="per month"
              {...register("organicwaste")}
            />
          </div>
          <div className="form-group">
            <label>Paper Waste</label>
            <input
              required
              type="number"
              placeholder="per month"
              {...register("paperwaste")}
            />
          </div>
          <div className="form-group">
            <label>Plastic Waste</label>
            <input
              required
              type="number"
              placeholder="per month"
              {...register("platicwaste")}
            />
          </div>
          <div className="form-group">
            <label>Water usage</label>
            <input
              requiredt
              type="number"
              placeholder="per month"
              {...register("waterusage")}
            />
          </div>
          <button type="submit" className="submit-button">
            RESULTS
          </button>
        </form>
      </div>
    </>
  );
};

export default Secondary;
