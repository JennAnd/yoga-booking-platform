/**
 * Provides authentication state and actions across the application.
 * Stores a mock user in localStorage for a simple client-side auth flow.
 */

import { createContext, useEffect, useMemo, useState } from "react";
import { classes } from "../data/classes";

export const AuthContext = createContext(null);

function createInitialClassAvailability() {
  return classes.reduce((availability, yogaClass) => {
    availability[yogaClass.id] =
      yogaClass.availableSpots ?? yogaClass.totalSpots;

    return availability;
  }, {});
}

function createInitialWaitlists() {
  return classes.reduce((waitlists, yogaClass) => {
    waitlists[yogaClass.id] = [];

    return waitlists;
  }, {});
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [classAvailability, setClassAvailability] = useState(() => {
    const storedAvailability = localStorage.getItem(
      "still-studio-availability",
    );

    return storedAvailability
      ? JSON.parse(storedAvailability)
      : createInitialClassAvailability();
  });

  const [waitlists, setWaitlists] = useState(() => {
    const storedWaitlists = localStorage.getItem("still-studio-waitlists");

    return storedWaitlists
      ? JSON.parse(storedWaitlists)
      : createInitialWaitlists();
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("still-studio-user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "still-studio-availability",
      JSON.stringify(classAvailability),
    );
  }, [classAvailability]);

  useEffect(() => {
    localStorage.setItem("still-studio-waitlists", JSON.stringify(waitlists));
  }, [waitlists]);

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
      membership: null,
      classCredits: 0,
      bookings: [],
      waitlist: [],
      favorites: [],
    };

    localStorage.setItem("still-studio-user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const chooseMembership = (membership) => {
    if (!user) {
      throw new Error("You need to be logged in to choose a membership.");
    }

    const updatedUser = {
      ...user,
      membership:
        membership.type === "unlimited" ? membership : user.membership,
      classCredits:
        membership.type === "credits"
          ? (user.classCredits ?? 0) + membership.credits
          : (user.classCredits ?? 0),
    };

    updateStoredUser(updatedUser);
  };

  const logout = () => {
    setUser(null);
  };

  const bookClass = (classId) => {
    if (!user) {
      throw new Error("You need to be logged in to book a class.");
    }

    const hasUnlimitedMembership = user.membership?.type === "unlimited";
    const hasClassCredits = (user.classCredits ?? 0) > 0;

    if (!hasUnlimitedMembership && !hasClassCredits) {
      throw new Error(
        "You need an active membership or class credits to book classes.",
      );
    }

    const alreadyBooked = user.bookings.includes(classId);

    if (alreadyBooked) {
      throw new Error("You have already booked this class.");
    }

    const selectedClass = classes.find((yogaClass) => yogaClass.id === classId);

    if (!selectedClass) {
      throw new Error("Class not found.");
    }

    const availableSpots =
      classAvailability[classId] ?? selectedClass.totalSpots;

    if (availableSpots <= 0) {
      throw new Error("This class is fully booked.");
    }

    const updatedUser = {
      ...user,
      bookings: [...user.bookings, classId],
      waitlist: user.waitlist.filter(
        (currentClassId) => currentClassId !== classId,
      ),

      classCredits: hasUnlimitedMembership
        ? user.classCredits
        : Math.max((user.classCredits ?? 0) - 1, 0),
    };

    setClassAvailability((currentAvailability) => ({
      ...currentAvailability,
      [classId]: availableSpots - 1,
    }));

    setWaitlists((currentWaitlists) => ({
      ...currentWaitlists,
      [classId]: (currentWaitlists[classId] ?? []).filter(
        (userId) => userId !== user.id,
      ),
    }));

    updateStoredUser(updatedUser);
  };

  const cancelBooking = (classId) => {
    if (!user) {
      throw new Error("You need to be logged in to manage bookings.");
    }

    const selectedClass = classes.find((yogaClass) => yogaClass.id === classId);

    if (!selectedClass) {
      throw new Error("Class not found.");
    }

    const isBooked = user.bookings.includes(classId);

    if (!isBooked) {
      throw new Error("You do not have a booking for this class.");
    }

    const availableSpots =
      classAvailability[classId] ?? selectedClass.totalSpots;

    const updatedUser = {
      ...user,
      bookings: user.bookings.filter(
        (currentClassId) => currentClassId !== classId,
      ),

      classCredits:
        user.membership?.type === "unlimited"
          ? user.classCredits
          : (user.classCredits ?? 0) + 1,
    };

    setClassAvailability((currentAvailability) => ({
      ...currentAvailability,
      [classId]: Math.min(availableSpots + 1, selectedClass.totalSpots),
    }));

    updateStoredUser(updatedUser);
  };

  const joinWaitlist = (classId) => {
    if (!user) {
      throw new Error("You need to be logged in to join the waitlist.");
    }

    const alreadyBooked = user.bookings.includes(classId);
    const alreadyWaitlisted = waitlists[classId]?.includes(user.id);

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

    setWaitlists((currentWaitlists) => ({
      ...currentWaitlists,
      [classId]: [...(currentWaitlists[classId] ?? []), user.id],
    }));

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

    setWaitlists((currentWaitlists) => ({
      ...currentWaitlists,
      [classId]: (currentWaitlists[classId] ?? []).filter(
        (userId) => userId !== user.id,
      ),
    }));

    updateStoredUser(updatedUser);
  };

  const getWaitlistPosition = (classId) => {
    if (!user) {
      return null;
    }

    const waitlist = waitlists[classId] ?? [];
    const position = waitlist.indexOf(user.id);

    return position === -1 ? null : position + 1;
  };

  const getWaitlistCount = (classId) => {
    return waitlists[classId]?.length ?? 0;
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
      classAvailability,
      setClassAvailability,
      login,
      register,
      logout,
      chooseMembership,
      bookClass,
      cancelBooking,
      joinWaitlist,
      leaveWaitlist,
      toggleFavorite,
      waitlists,
      getWaitlistPosition,
      getWaitlistCount,
    }),
    [user, classAvailability, waitlists],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
