import mongoose from "mongoose";

const carbonFootprintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Petrol: {
      type: Number,
      required: true,
    },
    Diesel: {
      type: Number,
      required: true,
    },
    Electricity: {
      type: Number,
      required: true,
    },
    NaturalGas: {
      type: Number,
      required: true,
    },
    CNG: {
      type: Number,
      required: true,
    },
    Flight: {
      type: Number,
      required: true,
    },
    LPG: {
      type: Number,
      required: true,
    },
    FuelOil: {
      type: Number,
      required: true,
    },
    Coal: {
      type: Number,
      required: true,
    },
    Total: {
      type: Number
    },
  },
  { timestamps: true }
);

const CarbonFootprint = mongoose.model("CarbonFootprint", carbonFootprintSchema);


const factors = {
  Petrol: 2.296,
  Diesel: 2.716,
  Electricity: 0.7132,
  NaturalGas: 0.203,
  CNG: 2.720,
  Flight: 2.5,
  LPG: 3.014,
  FuelOil: 2.987,
  Coal: 2.478
};


CarbonFootprint.calculate = async (data) => {
  const CarbonData = {
    Petrol: data.Petrol * factors.Petrol,
    Diesel: data.Diesel * factors.Diesel,
    Electricity: data.Electricity * factors.Electricity,
    NaturalGas: data.NaturalGas * factors.NaturalGas,
    CNG: data.CNG * factors.CNG,
    Flight: data.Flight * factors.Flight,
    LPG: data.LPG * factors.LPG,
    FuelOil: data.FuelOil * factors.FuelOil,
    Coal: data.Coal * factors.Coal,
  };

  CarbonData.Total = Object.values(CarbonData).reduce((acc, curr) => acc + curr, 0);
  return CarbonData;
};


export default CarbonFootprint;
