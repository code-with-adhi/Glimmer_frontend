import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, LoginData } from "../services/apiService";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await loginUser(formData);
      login(response.data.token);
      navigate("/");
    } catch (err: any) {
      const errorMessage =
        err.response?.data || "Login failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="onboarding-page-container">
      <div className="form-container">
        <h2 className="form-title">Login to Glimmer</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="text-input"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-section">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="text-input"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && (
            <p
              style={{
                color: "#c62828",
                fontSize: "0.875rem",
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}
          <button
            className="button button-primary"
            style={{ marginTop: "1.5rem" }}
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
