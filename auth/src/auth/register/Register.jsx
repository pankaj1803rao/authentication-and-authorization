import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const input = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    marginBottom: "12px",
    fontSize: "15px",
  };

  const button = {
    width: "100%",
    maxWidth: "200px",
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    display: "block",
    margin: "0 auto",
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "380px",
        margin: "100px auto",
        padding: "20px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          style={input}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          style={input}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          style={input}
          onChange={handleChange}
          required
        />

        <select name="role" style={input} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="Student">Student</option>
          <option value="Developer">Developer</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit" style={button}>
          Register
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Already have an account?
        <Link to="/login" style={{ color: "black", marginLeft: "5px" }}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
