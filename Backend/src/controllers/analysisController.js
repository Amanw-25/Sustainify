import { spawn } from "child_process";
import CarbonFootprint from "../models/carbonFootprintmodel.js";

const chatWithMistralAI = async (req, res) => {
  try {
    const carbonData = await CarbonFootprint.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!carbonData || carbonData.length === 0) {
      return res
        .status(404)
        .json({ error: "Carbon footprint data not found for the user." });
    }

    const messageContent = `
    Analyze the following carbon footprint data for the data provided which is of 1 MONTHS all the data/consumption is of 1 MONTH and provide a comprehensive and insightful response, including actionable recommendations, comparisons, and practical tips. Specifically:
    
    1. Key Insights: Summarize the user's overall carbon footprint and highlight the primary areas of concern, based on the highest contributors to emissions.
    
    2. Actionable Tips: Provide five personalized and practical tips to help reduce the carbon footprint, tailored to the user's specific data. Ensure these tips are creative, feasible, and impactful.
    
    3. Main Contributor Analysis: Identify the category with the highest emissions and explain why this is significant. Offer specific suggestions to address this category.
    
    4. Precautionary Measures: Suggest precautionary steps the user can take to mitigate long-term environmental impact across all categories.
    
    5. Comparison with Benchmarks: Compare the user's consumption levels with standard benchmarks for an average individual in a developed country, highlighting areas where they excel and where improvements are needed. Provide statistics for context.
    
    Data Provided:
    - Petrol Consumption (litres per month): ${carbonData[0].Petrol}
    - Diesel Consumption (litres per month): ${carbonData[0].Diesel}
    - Electricity Consumption (kWh per month): ${carbonData[0].Electricity}
    - Natural Gas Consumption (kg per month): ${carbonData[0].NaturalGas}
    - CNG Consumption (kg per month): ${carbonData[0].CNG}
    - Distance Travelled by Flight (km per month): ${carbonData[0].Flight}
    - LPG Usage (kg per month): ${carbonData[0].LPG}
    - Fuel Oil Consumption (litres per month): ${carbonData[0].FuelOil}
    - Coal Usage (kg per month): ${carbonData[0].Coal}
    - Organic Waste (kg per month): ${carbonData[0].OrganicWaste}
    - Paper Waste (kg per month): ${carbonData[0].PaperWaste}
    - Plastic Waste (kg per month): ${carbonData[0].PlasticWaste}
    - Water Usage (litres per month): ${carbonData[0].WaterUsage}
    - Public Transport Usage (passenger-km per month): ${JSON.stringify(
      carbonData[0].PublicTransportUsage
    )}

    Deliverables:
    1. Detailed Written Response: Provide a well-structured breakdown addressing each of the points above. Make the language engaging and informative for the user.
    
    Additional Guidance:
    Focus on being user-centric and empathetic. Assume the user is looking for both clarity and motivation to improve. End with an encouraging note to inspire action and emphasize the importance of small changes leading to significant results over time.
    
    Thank you for taking the first step towards a more sustainable future! Every change, no matter how small, has the potential to make a significant positive impact on our planet.
`;

    console.log("Question for Mistral AI:", messageContent);

    const pythonProcess = spawn("python3", [
      "app.py",
      JSON.stringify(messageContent),
    ]);

    let responseData = "";
    let errorOccurred = false;

    pythonProcess.stdout.on("data", (data) => {
      // console.log(`Python script output: ${data}`);
      responseData += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error from Python script: ${data}`);
      errorOccurred = true;
      if (!res.headersSent) {
        res
          .status(500)
          .json({ error: "An error occurred while processing the data." });
      }
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(`Python script exited with code ${code}`);
        return res.status(500).json({ error: "Python script failed." });
      }

      if (!errorOccurred && !res.headersSent) {
        try {
          const parsedResponse = JSON.parse(responseData);
          res.json(parsedResponse);
        } catch (parseError) {
          console.error("Error parsing AI response:", parseError);
          res.status(500).json({ error: "Failed to parse AI response." });
        }
      }
    });
  } catch (err) {
    console.error("Error fetching or processing carbon footprint data:", err);
    if (!res.headersSent) {
      res.status(500).json({
        error:
          "An error occurred while fetching or processing carbon footprint data.",
      });
    }
  }
};

export default chatWithMistralAI;
