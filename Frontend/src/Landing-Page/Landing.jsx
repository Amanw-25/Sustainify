import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Landing = () => {
  const navigate = useNavigate();

  const sections = [
    {
      number: "01",
      title: "Sustainable Energy Solution",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet sint, at autem asperiores eveniet ullam explicabo."
    },
    {
      number: "02",
      title: "Eco-friendly Products Showcase",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet sint, at autem asperiores eveniet ullam explicabo."
    },
    {
      number: "03",
      title: "Environmental Impact Initiatives",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet sint, at autem asperiores eveniet ullam explicabo."
    }
  ];

  return (
    <>
      <style>
        {`
          @keyframes onload {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>

      <Navbar />

      {/* Hero Section */}
      <div
        className="relative h-screen w-full bg-pink bg-cover bg-center flex flex-col items-center animate-[onload_1.5s]"
        style={{ 
          backgroundImage: `url('/assets/Landing-Back.png')`,
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}
      >
        <div className="w-full md:w-1/2 mt-[5%] text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Illuminate Tomorrow With Sustainable Energy
          </h1>
        </div>

        <div className="w-full md:w-[60%] px-4 text-center">
          <p className="text-base md:text-lg text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolorem eum sit eligendi neque odit, cupiditate quam quae ducimus fugiat unde quas rem doloremque non numquam quod, error, debitis tempore.
          </p>
        </div>

        <div className="mt-12 flex flex-col md:flex-row gap-4 md:gap-8">
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 rounded-xl border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
          >
            Start Now !!!
          </button>
          <button className="px-8 py-4 rounded-xl border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg">
            Watch Video
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="h-screen w-full bg-black">
        <div className="h-[55%] w-full flex flex-col md:flex-row items-center px-4 md:px-8">
          <div className="w-full md:w-[40%] flex justify-center items-center py-8 md:py-0">
            <div
              className="h-[300px] w-[300px] rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url('/assets/Landing-Background.jpg')` }}
            />
          </div>

          <div className="w-full md:w-[60%] flex flex-col items-center md:items-start">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center md:text-left w-full md:w-[70%]">
              Sustainable Energy Future in Ecovista
            </h1>
            <p className="text-white text-base md:text-lg w-full md:w-[70%] text-center md:text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores modi, sapiente architecto cupiditate facilis quos quas quia exercitationem, dolorum libero quibusdam deserunt consectetur nulla eveniet quasi obcaecati suscipit quidem nobis.
            </p>
          </div>
        </div>

        <div className="h-[45%] w-full flex flex-col md:flex-row">
          {sections.map((item, index) => (
            <div
              key={index}
              className="flex-1 border-r border-gray-700 last:border-r-0 p-6 flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {item.number}
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 w-[90%] md:w-[70%] text-center">
                {item.title}
              </h2>
              <p className="text-white text-sm md:text-base w-[90%] text-center">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="h-[60vh] w-full bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url('/assets/footer.jpg')` }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center px-4">
          Join Sustainify Now !!!
        </h1>
        <button className="px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg">
          Start Your Journey Now
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Landing;
