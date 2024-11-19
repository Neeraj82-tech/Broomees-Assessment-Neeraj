import React from "react";
import "../styles/leftSection.css";
import wing from "../assets/wing.jpg"; 

const LeftSection = () => {
  return (
    <div className="left-section">
      <img src={wing} alt="Wing View" className="image" />
      <div className="overlay">
        <h1>Altit<span className="underline">ud</span>e Air</h1>
        <p>
          We promise to ensure that your well-being is taken care of while
          traveling with us. Boasting top-in-class fleet inventory and a
          5-star approval for our in-flight experience, you know you're
          getting the best from Altitude with no attitude.
        </p>
      </div>
    </div>
  );
};

export default LeftSection;
