/**
 * Register page.
 * Allows users to create a new account.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (
      !formValues.firstName.trim() ||
      !formValues.lastName.trim() ||
      !formValues.email.trim() ||
      !formValues.password.trim() ||
      !formValues.confirmPassword.trim()
    ) {
      setErrorMessage("Please fill in all fields.");
      showToast("Please fill in all fields.", "error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formValues.email)) {
      setErrorMessage("Please enter a valid email address.");
      showToast("Please enter a valid email address.", "error");
      return;
    }

    if (formValues.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      showToast("Password must be at least 8 characters long.", "error");
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      showToast("Passwords do not match.", "error");
      return;
    }

    try {
      register(formValues);
      showToast("Your account has been created.", "success");
      navigate("/profile");
    } catch (error) {
      setErrorMessage(error.message);
      showToast(error.message, "error");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="auth-card__eyebrow">Still Studio</p>
        <h1 className="auth-card__title">Create your account</h1>
        <p className="auth-card__description">
          Join the studio to manage bookings, favorites, and membership details.
        </p>
        <p className="auth-card__hint">
          Use a valid email address and a password with at least 8 characters.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <Input
            id="firstName"
            name="firstName"
            label="First name"
            value={formValues.firstName}
            onChange={handleChange}
            required
          />

          <Input
            id="lastName"
            name="lastName"
            label="Last name"
            value={formValues.lastName}
            onChange={handleChange}
            required
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formValues.email}
            onChange={handleChange}
            required
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formValues.password}
            onChange={handleChange}
            required
          />

          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            required
          />

          {errorMessage ? (
            <p className="auth-form__error">{errorMessage}</p>
          ) : null}

          <Button type="submit" variant="primary">
            Create account
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Register;
