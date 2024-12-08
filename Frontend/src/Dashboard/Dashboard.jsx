import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("primary"); // To track active tab
  const [formData, setFormData] = useState({
    petrol: 0,
    diesel: 0,
    electricity: 0,
    naturalGas: 0,
    cng: 0,
    flight: 0,
    lpg: 0,
    fuelOil: 0,
    coal: 0,
    organicWaste: 0,
    paperWaste: 0,
    plasticWaste: 0,
    waterUsage: 0,
    busUsage: 0,
    trainUsage: 0,
    metroUsage: 0,
  });
  const [totalFootprint, setTotalFootprint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [tipsModalOpen, setTipsModalOpen] = useState(false);
  const [tipsData, setTipsData] = useState(null);
  const [tipsError, setTipsError] = useState(""); // State for tips error

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateFootprint = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const requestBody = {
        Petrol: formData.petrol,
        Diesel: formData.diesel,
        Electricity: formData.electricity,
        NaturalGas: formData.naturalGas,
        CNG: formData.cng,
        Flight: formData.flight,
        LPG: formData.lpg,
        FuelOil: formData.fuelOil,
        Coal: formData.coal,
        OrganicWaste: formData.organicWaste,
        PaperWaste: formData.paperWaste,
        PlasticWaste: formData.plasticWaste,
        WaterUsage: formData.waterUsage,
        PublicTransportUsage: {
          Bus: formData.busUsage,
          Train: formData.trainUsage,
          Metro: formData.metroUsage,
        },
      };

      const response = await fetch(
        "http://localhost:5130/api/v1/sustainify/carbon/calculate-carbon-footprint",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          credentials: "include", // Ensures cookies are sent with the request
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTotalFootprint(data.carbonFootprint);
        setLoginError("");
        setActiveTab("total"); // Switch to Total tab after calculation
      } else {
        setLoginError(
          data.message || "An error occurred while calculating the footprint."
        );
      }
    } catch (error) {
      setLoginError("An error occurred while calculating the footprint.");
    } finally {
      setLoading(false);
    }
  };

  const getTips = async () => {
    try {
      const requestBody = {
        Petrol: formData.petrol,
        Diesel: formData.diesel,
        Electricity: formData.electricity,
        NaturalGas: formData.naturalGas,
        CNG: formData.cng,
        Flight: formData.flight,
        LPG: formData.lpg,
        FuelOil: formData.fuelOil,
        Coal: formData.coal,
        OrganicWaste: formData.organicWaste,
        PaperWaste: formData.paperWaste,
        PlasticWaste: formData.plasticWaste,
        WaterUsage: formData.waterUsage,
        PublicTransportUsage: {
          Bus: formData.busUsage,
          Train: formData.trainUsage,
          Metro: formData.metroUsage,
        },
      };

      const response = await fetch(
        "http://localhost:5130/api/v1/sustainify/mistral/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setTipsData(data);
        setTipsModalOpen(true);
        setTipsError(""); // Clear any previous error
      } else {
        setTipsError("Failed to fetch tips.");
      }
    } catch (error) {
      setTipsError("Error fetching tips.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-100 to-white min-h-screen pb-16">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 sm:px-12 py-12">
        <h2 className="text-4xl font-extrabold text-center text-[#004d40] mb-6">
          Carbon Footprint Calculator
        </h2>
        <p className="text-gray-600 text-lg mb-10 text-center max-w-3xl mx-auto">
          This tool helps you calculate your carbon footprint based on your daily activities and consumption. By entering your data, we can calculate your environmental impact and suggest ways to reduce it.
        </p>

        {/* Tabs for Primary, Secondary, and Total */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`px-6 py-2 font-semibold rounded-full ${
              activeTab === "primary" ? "bg-[#004d40] text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("primary")}
          >
            Primary
          </button>

          <button
            className={`px-4 py-2 font-semibold rounded-full ${
              activeTab === "secondary" ? "bg-[#004d40] text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("secondary")}
          >
            Secondary
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-full ${
              activeTab === "total" ? "bg-[#004d40] text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => totalFootprint && setActiveTab("total")}
            disabled={!totalFootprint}
          >
            Total
          </button>
        </div>

        {/* Form content based on selected tab */}
        <div
          className={`bg-white p-6 rounded-lg shadow-2xl ${
            activeTab === "primary" || activeTab === "secondary" ? "block" : "hidden"
          }`}
        >
          <form onSubmit={calculateFootprint} className="space-y-6">
            {/* Primary Data Fields */}
            {activeTab === "primary" && (
              <>
                <h3 className="text-2xl font-semibold mb-4 text-[#004d40]">Primary Carbon Footprint</h3>
                {[
                  { key: "petrol", label: "Petrol", unit: "L/month" },
                  { key: "diesel", label: "Diesel", unit: "L/month" },
                  { key: "electricity", label: "Electricity", unit: "kWh/month" },
                  { key: "naturalGas", label: "Natural Gas", unit: "m³/month" },
                  { key: "cng", label: "CNG", unit: "kg/month" },
                  { key: "flight", label: "Flight", unit: "km/month" },
                  { key: "lpg", label: "LPG", unit: "kg/month" },
                  { key: "fuelOil", label: "Fuel Oil", unit: "L/month" },
                  { key: "coal", label: "Coal", unit: "kg/month" },
                ].map((field) => (
                  <div key={field.key} className="flex justify-between items-center">
                    <label className="flex-1 text-lg">{field.label}</label>
                    <input
                      type="number"
                      value={formData[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder={field.unit}
                      className="flex-1 p-2 border border-gray-300 rounded-md text-black"
                    />
                  </div>
                ))}
              </>
            )}

            {/* Secondary Data Fields */}
            {activeTab === "secondary" && (
              <>
                <h3 className="text-2xl font-semibold mb-4 text-[#004d40]">Secondary Carbon Footprint</h3>
                {[
                  { key: "organicWaste", label: "Organic Waste", unit: "kg/month" },
                  { key: "paperWaste", label: "Paper Waste", unit: "kg/month" },
                  { key: "plasticWaste", label: "Plastic Waste", unit: "kg/month" },
                  { key: "waterUsage", label: "Water Usage", unit: "m³/month" },
                  { key: "busUsage", label: "Bus Usage", unit: "km/month" },
                  { key: "trainUsage", label: "Train Usage", unit: "km/month" },
                  { key: "metroUsage", label: "Metro Usage", unit: "km/month" },
                ].map((field) => (
                  <div key={field.key} className="flex justify-between items-center">
                    <label className="flex-1 text-lg">{field.label}</label>
                    <input
                      type="number"
                      value={formData[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder={field.unit}
                      className="flex-1 p-2 border border-gray-300 rounded-md text-black"
                    />
                  </div>
                ))}
              </>
            )}

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#00796b] text-white px-6 py-2 rounded-md hover:bg-[#004d40] transition-colors flex items-center"
              >
                {loading ? (
                  <>
                    Calculating Your Result &nbsp;
                    <div className="spinner-border animate-spin border-t-4 border-b-4 border-white w-5 h-5 mr-2"></div>
                  </>
                ) : (
                  "Calculate Results"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Display Total Result */}
        {activeTab === "total" && totalFootprint && (
          <div className="mt-10 text-center">
            <h3 className="text-3xl font-bold text-[#004d40]">Your Total Carbon Footprint</h3>
            <p className="text-xl mt-4">{totalFootprint.Total.toFixed(2)} kg CO₂e</p>
            <p className="text-xl mt-2">Primary: {totalFootprint.Electricity.toFixed(2)} kg CO₂e</p>
            <p className="text-xl mt-2">Secondary: {totalFootprint.OrganicWaste.toFixed(2)} kg CO₂e</p>

            <div className="mt-4">
              <button
                onClick={getTips}
                className="bg-[#00796b] text-white px-6 py-2 rounded-md hover:bg-[#004d40] transition-colors"
              >
                Get Tips
              </button>
            </div>
          </div>
        )}

        {/* Tips Modal */}
        {tipsModalOpen && tipsData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-h-[80vh] overflow-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Mistral AI Response</h3>
              </div>

              {/* Modal Content */}
              <div className="max-h-[60vh] overflow-y-scroll">
                <p className="font-semibold">Summary:</p>
                <p>{tipsData.summary}</p>

                {tipsData.tips.map((tip, index) => (
                  <p key={index} className="mt-2">
                    {tip}
                  </p>
                ))}
              </div>

              {/* Close Button at the bottom */}
              <button
                onClick={() => setTipsModalOpen(false)}
                className="mt-4 bg-[#004d40] text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Login error message */}
        {loginError && (
          <div className="text-red-500 mt-4 text-center">
            <p>{loginError}</p>
          </div>
        )}

        {/* Tips error message */}
        {tipsError && (
          <div className="text-red-500 mt-4 text-center">
            <p>{tipsError}</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
