import CarbonFootprint from "../models/carbonFootprintmodel.js";
import UserModel from "../models/usermodel.js";

const calculateCarbonFootprint = async (req, res) => {
  const { id } = req.user;

  if (!id) {
    return res.status(404).json({
      status: "failed",
      message: "User_id not exist",
    });
  }
  try {
    const CarbonData = await CarbonFootprint.calculate(req.body);

    const carbonFootprint = new CarbonFootprint({
      ...CarbonData,
      user: id,
    });

    const savedCarbonFootprint = await carbonFootprint.save();

    await UserModel.findOneAndUpdate(
      { _id: id },
      { carbonFootprint: savedCarbonFootprint._id },
      { new: true }
    );

    const updateUser = await UserModel.findById(id).populate("carbonFootprint");

    return res.status(200).json({
      message: "Carbon footprint calculated and saved successfully",
      carbonFootprint: savedCarbonFootprint,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export default calculateCarbonFootprint;
