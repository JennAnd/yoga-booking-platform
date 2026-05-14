/**
 * Class details page.
 * Displays detailed information about a selected yoga class.
 */

import { useState } from "react";
import Badge from "../components/ui/Badge";
import { Link, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";
import { classes } from "../data/classes";
import { getAvailabilityStatus } from "../utils/getAvailabilityStatus";
import { getAvailabilityBadgeVariant } from "../utils/getAvailabilityBadgeVariant";
import { hasClassPassed, isBookingOpen } from "../utils/classTime";

function ClassDetails() {
  const { id } = useParams();
  const {
    user,
    classAvailability,
    bookClass,
    cancelBooking,
    joinWaitlist,
    leaveWaitlist,
    toggleFavorite,
    getWaitlistPosition,
    getWaitlistCount,
  } = useAuth();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { showToast } = useToast();

  const yogaClass = classes.find((currentClass) => currentClass.id === id);

  if (!yogaClass) {
    return (
      <section className="page-placeholder">
        <h1>Class not found</h1>
        <p>The class you are looking for does not exist.</p>
      </section>
    );
  }

  const isBooked = user?.bookings.includes(yogaClass.id);
  const isFavorite = user?.favorites.includes(yogaClass.id);
  const isWaitlisted = user?.waitlist.includes(yogaClass.id);
  const waitlistPosition = getWaitlistPosition(yogaClass.id);
  const waitlistCount = getWaitlistCount(yogaClass.id);
  const isLoggedIn = Boolean(user);

  const availableSpots =
    classAvailability?.[yogaClass.id] ?? yogaClass.availableSpots;

  const isClassFull = availableSpots === 0;
  const isPastClass = hasClassPassed(yogaClass);
  const bookingIsOpen = isBookingOpen(yogaClass);

  const availabilityStatus = getAvailabilityStatus(availableSpots);
  const availabilityBadgeVariant = getAvailabilityBadgeVariant(availableSpots);

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
      showToast("Your class has been booked successfully.", "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleToggleFavorite = () => {
    try {
      toggleFavorite(yogaClass.id);

      showToast(
        isFavorite
          ? "Class removed from favorites."
          : "Class added to favorites.",
        "success",
      );
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleCancelBooking = () => {
    try {
      cancelBooking(yogaClass.id);
      setIsCancelModalOpen(false);

      showToast("Your booking has been canceled.", "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleJoinWaitlist = () => {
    try {
      joinWaitlist(yogaClass.id);
      showToast("You have joined the waitlist.", "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleLeaveWaitlist = () => {
    try {
      leaveWaitlist(yogaClass.id);

      showToast("You have left the waitlist.", "info");
    } catch (error) {
      showToast(error.message, "error");
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

          {isPastClass ? (
            <Badge variant="neutral">Passed</Badge>
          ) : availabilityBadgeVariant ? (
            <Badge variant={availabilityBadgeVariant}>
              {availabilityStatus}
            </Badge>
          ) : null}
        </div>

        {isClassFull ? (
          <p className="class-details__booking-note">
            Waitlist: {waitlistCount}{" "}
            {waitlistCount === 1 ? "person" : "people"}
          </p>
        ) : null}

        <p className="class-details__meta">
          {yogaClass.type} • {yogaClass.instructor}
        </p>

        <p className="class-details__meta">
          {yogaClass.date} • {yogaClass.time} • {yogaClass.duration} min
        </p>

        <p className="class-details__meta">
          {yogaClass.location} • Drop-in: {yogaClass.dropInPrice} SEK
        </p>

        <p className="class-details__meta">
          {availableSpots} of {yogaClass.totalSpots} spots available
        </p>

        <p className="class-details__description">{yogaClass.description}</p>
        <div className="class-details__booking-actions">
          <h2 className="class-details__booking-title">Booking</h2>

          {isPastClass ? (
            <p className="class-details__booking-note">
              This class has already passed and can no longer be booked.
            </p>
          ) : !bookingIsOpen ? (
            <p className="class-details__booking-note">
              Booking opens 5 days before this class.
            </p>
          ) : !isLoggedIn ? (
            <p className="class-details__booking-note">
              Please log in to book this class or join the waitlist.
            </p>
          ) : null}

          {isLoggedIn &&
          bookingIsOpen &&
          !isPastClass &&
          !isClassFull &&
          !isBooked ? (
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
              onClick={() => setIsCancelModalOpen(true)}
            >
              Cancel booking
            </button>
          ) : null}

          {isLoggedIn &&
          bookingIsOpen &&
          !isPastClass &&
          isClassFull &&
          !isBooked &&
          !isWaitlisted ? (
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

          {isLoggedIn && isWaitlisted && waitlistPosition ? (
            <p className="class-details__booking-note">
              You are number {waitlistPosition} on the waitlist.
            </p>
          ) : null}
        </div>
      </div>
      {isCancelModalOpen ? (
        <div className="confirmation-modal">
          <div className="confirmation-modal__card">
            <h2>Cancel booking?</h2>

            <p>
              Are you sure you want to cancel your booking for{" "}
              <strong>{yogaClass.title}</strong>?
            </p>

            <div className="confirmation-modal__actions">
              <button
                type="button"
                className="ui-button ui-button--secondary"
                onClick={handleCancelBooking}
              >
                Yes, cancel booking
              </button>

              <button
                type="button"
                className="ui-button ui-button--ghost"
                onClick={() => setIsCancelModalOpen(false)}
              >
                Keep booking
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default ClassDetails;
