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

  const updateStoredUser = (updatedUser) => {
    localStorage.setItem("still-studio-user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

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
      bookings: [],
      waitlist: [],
      favorites: [],
    };

    localStorage.setItem("still-studio-user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const bookClass = (classId) => {
    if (!user) {
      throw new Error("You need to be logged in to book a class.");
    }

    const alreadyBooked = user.bookings.includes(classId);

    if (alreadyBooked) {
      throw new Error("You have already booked this class.");
    }

    const updatedUser = {
      ...user,
      bookings: [...user.bookings, classId],
      waitlist: user.waitlist.filter(
        (currentClassId) => currentClassId !== classId,
      ),
    };

    updateStoredUser(updatedUser);
  };

  const cancelBooking = (classId) => {
    if (!user) {
      throw new Error("You need to be logged in to manage bookings.");
    }

    const updatedUser = {
      ...user,
      bookings: user.bookings.filter(
        (currentClassId) => currentClassId !== classId,
      ),
    };

    updateStoredUser(updatedUser);
  };

  const joinWaitlist = (classId) => {
    if (!user) {
      throw new Error("You need to be logged in to join the waitlist.");
    }

    const alreadyBooked = user.bookings.includes(classId);
    const alreadyWaitlisted = user.waitlist.includes(classId);

    if (alreadyBooked) {
      throw new Error("You have already booked this class.");
    }

    if (alreadyWaitlisted) {
      throw new Error("You are already on the waitlist for this class.");
    }

    const updatedUser = {
      ...user,
      waitlist: [...user.waitlist, classId],
    };

    updateStoredUser(updatedUser);
  };

  const leaveWaitlist = (classId) => {
    if (!user) {
      throw new Error("You need to be logged in to manage your waitlist.");
    }

    const updatedUser = {
      ...user,
      waitlist: user.waitlist.filter(
        (currentClassId) => currentClassId !== classId,
      ),
    };

    updateStoredUser(updatedUser);
  };

  const toggleFavorite = (classId) => {
    if (!user) {
      throw new Error("You need to be logged in to save favorites.");
    }

    const isFavorite = user.favorites.includes(classId);

    const updatedUser = {
      ...user,
      favorites: isFavorite
        ? user.favorites.filter((currentClassId) => currentClassId !== classId)
        : [...user.favorites, classId],
    };

    updateStoredUser(updatedUser);
  };

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      login,
      register,
      logout,
      bookClass,
      cancelBooking,
      joinWaitlist,
      leaveWaitlist,
      toggleFavorite,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
