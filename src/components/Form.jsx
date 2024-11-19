import React, { useState } from "react";
import "../styles/form.css";

const Form = () => {
  const [formType, setFormType] = useState("register"); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formType === "register") {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        const response = await fetch("https://Broomees-Assessment-Neeraj.onrender.com/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        alert(result.message);
      } catch (error) {
        console.error(error);
        alert("An error occurred. Please try again.");
      }
    } else if (formType === "signin") {
      try {
        const response = await fetch("https://Broomees-Assessment-Neeraj.onrender.com/api/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        const result = await response.json();
  
        if (response.ok) {
          alert(`Welcome to the page, ${result.username || "User"}!`);
        } else {
          alert(result.message || "Invalid credentials. Please try again.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred. Please try again.");
      }
    }
  };
  
  return (
    <div className="right-section">
      <button
        className="sign-in"
        onClick={() => setFormType(formType === "signin" ? "register" : "signin")}
      >
        {formType === "signin" ? "Register" : "Sign In"}
      </button>
      <div className="form-header">
        <h2>{formType === "signin" ? "Sign In" : "Explore & Experience"}</h2>
        {formType === "register" && (
          <p>Get onto your most comfortable journey yet. All the way up.</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        {formType === "register" && (
          <>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </>
        )}
        {formType === "signin" && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </>
        )}
        <button type="submit">
          {formType === "signin" ? "Sign In" : "Get Started"}
        </button>
      </form>
    </div>
  );
};

export default Form;
