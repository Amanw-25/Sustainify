import React from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="Navbar">
        <div className="Navbar-Logo">
          <h1>Sustainify</h1>
        </div>
        <div className="Navbar-Options">
          <a href="">Home</a>
          <a href="">Dashboard</a>
          <a href="">Profile</a>
          <button onClick={() => navigate("/register")}>Sign Up</button>
        </div>
      </nav>
      <div className="Landing-Page-Container-1">
        <div className="Landing-Page-Container-1-Heading">
          <h1>Illuminate Tommorow With Suistanable Energy</h1>
        </div>
        <div className="Landing-Page-Container-1-Para">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit dolorem eum sit eligendi neque odit, cupiditate quam
            quae ducimus fugiat unde quas rem doloremque non numquam quod,
            error, debitis tempore.
          </p>
        </div>
        <div className="Landing-Page-Container-1-Buttons">
          <button onClick={()=>navigate("/register")}>Start Now !!!</button>
          <button>Watch Video</button>
        </div>
      </div>
      <div className="Landing-Page-Container-2">
        <div className="Landing-Page-Container-2-Box1">
          <div className="Landing-Page-Container-2-Box1-Left">
            <div className="Landing-Page-Container-2-Box1-Left-Img"></div>
          </div>
          <div className="Landing-Page-Container-2-Box1-Right">
            <h1>Sustainable Energy Future in Ecovista</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
              modi, sapiente architecto cupiditate facilis quos quas quia
              exercitationem, dolorum libero quibusdam deserunt consectetur
              nulla eveniet quasi obcaecati suscipit quidem nobis.
            </p>
          </div>
        </div>
        <div className="Landing-Page-Container-2-Box2">
          <div className="Landing-Page-Container-2-Box2-Box">
            <h1>01</h1>
            <h2>Sustainable Energy Solution</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
              sint, at autem asperiores eveniet ullam explicabo{" "}
            </p>
          </div>
          <div className="Landing-Page-Container-2-Box2-Box">
            <h1>02</h1>
            <h2>Ecofrindly Products Showcase</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
              sint, at autem asperiores eveniet ullam explicabo{" "}
            </p>
          </div>
          <div className="Landing-Page-Container-2-Box2-Box">
            <h1>03</h1>
            <h2>Environmental Impact Initiatives</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
              sint, at autem asperiores eveniet ullam explicabo{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="Landing-Page-Container-2-Box3">
        <h1>Join Sustainify Now !!!</h1>
        <button>Start Yout Jouney Now </button>
      </div>
      <footer>
        <div className="Footer-Box">
          <ul>
            <h3>LEGAL</h3>
            <li>F&Q</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className="Footer-Box">
          <ul>
            <h3>QUICK LINKS</h3>
            <li>Home</li>
            <li>About</li>
            <li>Product</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div className="Footer-Box">
          <ul>
            <h3>CONTACT</h3>
            <li>Adress :</li>
            <li>Phone No : xx xx xx xx</li>
            <li>Email : test@gmail.com</li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Landing;
