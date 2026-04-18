/**
 * Provides authentication state and actions across the application.
 * Stores a mock user in localStorage for a simple client-side auth flow.
 */

import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("still-studio-user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = ({ email, password }) => {
    const storedUser = localStorage.getItem("still-studio-user");

    if (!storedUser) {
      throw new Error("No account found for this email.");
    }

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser.email !== email || parsedUser.password !== password) {
      throw new Error("Invalid email or password.");
    }

    setUser(parsedUser);
  };

  const register = ({ firstName, lastName, email, password }) => {
    const newUser = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      email,
      password,
      membership: "Unlimited Monthly",
    };

    localStorage.setItem("still-studio-user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      login,
      register,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
