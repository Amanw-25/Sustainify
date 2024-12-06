import CarbonFootprint from "../models/carbonFootprintmodel.js";
import UserModel from "../models/usermodel.js";

// Helper function to validate required fields in the request body
const validateFields = (fields, requiredFields) => {
  for (const field of requiredFields) {
    if (fields[field] === undefined || fields[field] === null) {
      return `Field "${field}" is required.`;
    }
  }
  return null; // No validation errors
};

const calculateCarbonFootprint = async (req, res) => {
  const { id } = req.user;

  // Validate that user_id exists
  if (!id) {
    return res.status(404).json({
      status: "failed",
      message: "User_id not found",
    });
  }

  const requiredFields = [
    "Petrol", "Diesel", "Electricity", "NaturalGas", "CNG",
    "Flight", "LPG", "FuelOil", "Coal", "OrganicWaste",
    "PaperWaste", "PlasticWaste", "WaterUsage", "PublicTransportUsage"
  ];

  // Validate the request body
  const validationError = validateFields(req.body, requiredFields);
  if (validationError) {
    return res.status(400).json({
      status: "failed",
      message: validationError,
    });
  }

  try {
    // Calculate the carbon footprint based on the provided data
    const CarbonData = await CarbonFootprint.calculate(req.body);

    // Create a new CarbonFootprint document
    const carbonFootprint = new CarbonFootprint({
      ...CarbonData,
      user: id,
    });

    // Save the carbon footprint to the database
    const savedCarbonFootprint = await carbonFootprint.save();

    // Update the user with the saved carbon footprint reference
    await UserModel.findOneAndUpdate(
      { _id: id },
      { carbonFootprint: savedCarbonFootprint._id },
      { new: true }
    );

    // Fetch the updated user with populated carbon footprint
    const updatedUser = await UserModel.findById(id).populate("carbonFootprint");

    return res.status(200).json({
      message: "Carbon footprint calculated and saved successfully",
      carbonFootprint: savedCarbonFootprint,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export default calculateCarbonFootprint;
