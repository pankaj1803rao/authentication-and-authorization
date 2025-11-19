import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("  http://localhost:7789/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", // send cookies if any
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 401 || data.error) {
        setError(data.error || "Unauthorized");
        navigate("/login");
        return;
      }

      if (data.error) {
        setError(data.error);
        return;
      }

      // Successful login
      navigate("/"); // redirect to home page
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
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
    cursor: loading ? "not-allowed" : "pointer",
    display: "block",
    margin: "0 auto",
    opacity: loading ? 0.7 : 1,
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "380px",
        margin: "150px auto",
        padding: "40px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

      <form onSubmit={handleSubmit}>
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

        <button type="submit" style={button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {error}
          </p>
        )}
      </form>

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Don't have an account?
        <Link to="/register" style={{ color: "black", marginLeft: "5px" }}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
