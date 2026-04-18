/**
 * Login page.
 * Allows users to sign in to their account.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
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

    if (!formValues.email.trim() || !formValues.password.trim()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formValues.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      login(formValues);
      navigate("/profile");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="auth-card__eyebrow">Still Studio</p>
        <h1 className="auth-card__title">Login</h1>
        <p className="auth-card__description">
          Sign in to manage your bookings, membership, and studio activity.
        </p>
        <p className="auth-card__hint">
          Use the email and password you registered with.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          {errorMessage ? (
            <p className="auth-form__error">{errorMessage}</p>
          ) : null}

          <Button type="submit" variant="primary">
            Login
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Login;
