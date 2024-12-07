import React, { useState } from "react";
import "./Dashboard.css";
import Primary from "./Primary";
import Secondary from "./Secondary";
const Dashboard = () => {
  const [toggle, settoggle] = useState(true);

  const onsubmit = () => {
    settoggle(false);
  };

  return (
    <>
      <nav className="Nav"></nav>
      <div className="calculator-container">
        <main className="main-content">
          <h2>CARBON CALCULATOR</h2>
          <p className="description">
            Our website is dedicated to helping you understand and manage your
            carbon footprint. We provide an easy-to-use tool that calculates the
            carbon emissions from your daily activities, lifestyle choices, and
            energy consumption. By entering simple information about your
            habits, our calculator gives you a clear picture of your
            environmental impact and offers practical tips to reduce it.
          </p>

          <div className="tabs">
            <button onClick={() => settoggle(true)} className="tab">
              Primary
            </button>
            <button onClick={() => settoggle(false)} className="tab">
              Secondary
            </button>
            <button className="tab">Total</button>
          </div>

          {toggle ? <Primary /> : <Secondary />}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
