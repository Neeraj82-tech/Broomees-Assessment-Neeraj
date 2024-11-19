import React from "react";
import LeftSection from "./components/LeftSection";
import Form from "./components/Form";
import "./styles/app.css";

const App = () => {
  return (
    <div className="container">
      <LeftSection />
      <Form />
    </div>
  );
};

export default App;
