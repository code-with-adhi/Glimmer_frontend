import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../services/apiService";
import type { UserData } from "../services/apiService";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<UserData>({
    firstName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      const loginResponse = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      login(loginResponse.data.token);
      navigate("/onboarding");
    } catch (error: any) {
      alert(
        `Registration failed: ${error.response?.data || "An error occurred."}`
      );
    }
  };

  return (
    <div className="onboarding-page-container">
      <div className="form-container">
        <h2 className="form-title">Register for Glimmer</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label className="form-label" htmlFor="firstName">
              First Name
            </label>
            <input
              className="text-input"
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="form-section">
            <label className="form-label" htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <input
              className="text-input"
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-section">
            <label className="form-label" htmlFor="gender">
              Gender
            </label>
            <input
              className="text-input"
              id="gender"
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </div>
          <button
            className="button button-primary"
            style={{ marginTop: "1.5rem" }}
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
