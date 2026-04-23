/**
 * Class details page.
 * Displays detailed information about a selected yoga class.
 */

import { useState } from "react";
import Badge from "../components/ui/Badge";
import { Link, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { classes } from "../data/classes";
import { getAvailabilityStatus } from "../utils/getAvailabilityStatus";
import { getAvailabilityBadgeVariant } from "../utils/getAvailabilityBadgeVariant";

function ClassDetails() {
  const { id } = useParams();
  const {
    user,
    bookClass,
    cancelBooking,
    joinWaitlist,
    leaveWaitlist,
    toggleFavorite,
  } = useAuth();

  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
  });

  const yogaClass = classes.find((currentClass) => currentClass.id === id);
  const isBooked = user?.bookings.includes(yogaClass?.id);
  const isFavorite = user?.favorites.includes(yogaClass?.id);
  const isWaitlisted = user?.waitlist.includes(yogaClass?.id);
  const isLoggedIn = Boolean(user);
  const isClassFull = yogaClass?.availableSpots === 0;

  if (!yogaClass) {
    return (
      <section className="page-placeholder">
        <h1>Class not found</h1>
        <p>The class you are looking for does not exist.</p>
      </section>
    );
  }

  const availabilityStatus = getAvailabilityStatus(yogaClass.availableSpots);
  const availabilityBadgeVariant = getAvailabilityBadgeVariant(
    yogaClass.availableSpots,
  );

  const levelBadgeVariant =
    yogaClass.level === "Beginner"
      ? "beginner"
      : yogaClass.level === "Intermediate"
        ? "intermediate"
        : yogaClass.level === "Advanced"
          ? "advanced"
          : "all-levels";
  const handleBookClass = () => {
    try {
      bookClass(yogaClass.id);
      setFeedback({
        type: "success",
        message: "Your class has been booked successfully.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message,
      });
    }
  };

  const handleToggleFavorite = () => {
    try {
      toggleFavorite(yogaClass.id);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message,
      });
    }
  };

  const handleCancelBooking = () => {
    try {
      cancelBooking(yogaClass.id);
      setFeedback({
        type: "success",
        message: "Your booking has been canceled.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message,
      });
    }
  };

  const handleJoinWaitlist = () => {
    try {
      joinWaitlist(yogaClass.id);
      setFeedback({
        type: "success",
        message: "You have joined the waitlist.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message,
      });
    }
  };

  const handleLeaveWaitlist = () => {
    try {
      leaveWaitlist(yogaClass.id);
      setFeedback({
        type: "success",
        message: "You have left the waitlist.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message,
      });
    }
  };
  return (
    <section className="class-details">
      <img
        className="class-details__image"
        src={yogaClass.image}
        alt={yogaClass.title}
      />

      <div className="class-details__content">
        <Link to="/classes" className="class-details__back-link">
          Back to classes
        </Link>
        <p className="class-details__eyebrow">{yogaClass.studio}</p>

        <div className="class-details__title-row">
          <h1 className="class-details__title">{yogaClass.title}</h1>

          <button
            type="button"
            className={`class-details__favorite-button ${
              isFavorite ? "class-details__favorite-button--active" : ""
            }`}
            onClick={handleToggleFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Save as favorite"
            }
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>

        <div className="class-details__badges">
          <Badge variant={levelBadgeVariant}>{yogaClass.level}</Badge>

          {availabilityBadgeVariant ? (
            <Badge variant={availabilityBadgeVariant}>
              {availabilityStatus}
            </Badge>
          ) : null}
        </div>

        <p className="class-details__meta">
          {yogaClass.type} • {yogaClass.instructor}
        </p>

        <p className="class-details__meta">
          {yogaClass.date} • {yogaClass.time} • {yogaClass.duration} min
        </p>

        <p className="class-details__meta">
          {yogaClass.location} • Drop-in: {yogaClass.dropInPrice} SEK
        </p>

        <p className="class-details__description">{yogaClass.description}</p>
        <div className="class-details__booking-actions">
          <h2 className="class-details__booking-title">Booking</h2>

          {feedback.message ? (
            <p
              className={`class-details__feedback ${
                feedback.type === "success"
                  ? "class-details__feedback--success"
                  : "class-details__feedback--error"
              }`}
            >
              {feedback.message}
            </p>
          ) : null}

          {!isLoggedIn ? (
            <p className="class-details__booking-note">
              Please log in to book this class or join the waitlist.
            </p>
          ) : null}

          {isLoggedIn && !isClassFull && !isBooked ? (
            <button
              type="button"
              className="ui-button ui-button--primary"
              onClick={handleBookClass}
            >
              Book class
            </button>
          ) : null}

          {isLoggedIn && isBooked ? (
            <button
              type="button"
              className="ui-button ui-button--secondary"
              onClick={handleCancelBooking}
            >
              Cancel booking
            </button>
          ) : null}

          {isLoggedIn && isClassFull && !isBooked && !isWaitlisted ? (
            <button
              type="button"
              className="ui-button ui-button--secondary"
              onClick={handleJoinWaitlist}
            >
              Join waitlist
            </button>
          ) : null}

          {isLoggedIn && isWaitlisted ? (
            <button
              type="button"
              className="ui-button ui-button--ghost"
              onClick={handleLeaveWaitlist}
            >
              Leave waitlist
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default ClassDetails;
