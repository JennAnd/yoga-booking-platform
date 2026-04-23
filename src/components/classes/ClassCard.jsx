/**
 * Reusable class card component.
 * Displays key class information, level, and availability status.
 */

import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import { getAvailabilityStatus } from "../../utils/getAvailabilityStatus";
import { getAvailabilityBadgeVariant } from "../../utils/getAvailabilityBadgeVariant";
import useAuth from "../../hooks/useAuth";

function ClassCard({ yogaClass }) {
  const availabilityStatus = getAvailabilityStatus(yogaClass.availableSpots);
  const availabilityBadgeVariant = getAvailabilityBadgeVariant(
    yogaClass.availableSpots,
  );
  const { user, toggleFavorite } = useAuth();
  const isFavorite = user?.favorites.includes(yogaClass.id);

  const levelBadgeVariant =
    yogaClass.level === "Beginner"
      ? "beginner"
      : yogaClass.level === "Intermediate"
        ? "intermediate"
        : yogaClass.level === "Advanced"
          ? "advanced"
          : "all-levels";

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      toggleFavorite(yogaClass.id);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Link to={`/classes/${yogaClass.id}`} className="class-card-link">
      <article className="class-card">
        <img
          className="class-card__image"
          src={yogaClass.image}
          alt={yogaClass.title}
        />

        <div className="class-card__content">
          <div className="class-card__title-row">
            <div className="class-card__header">
              <h2 className="class-card__title">{yogaClass.title}</h2>
              <button
                type="button"
                className={`class-card__favorite-button ${
                  isFavorite ? "class-card__favorite-button--active" : ""
                }`}
                onClick={handleFavoriteClick}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Save as favorite"
                }
              >
                {isFavorite ? "♥" : "♡"}
              </button>
            </div>

            <div className="class-card__badges">
              <Badge variant={levelBadgeVariant}>{yogaClass.level}</Badge>

              {availabilityBadgeVariant ? (
                <Badge variant={availabilityBadgeVariant}>
                  {availabilityStatus}
                </Badge>
              ) : null}
            </div>
          </div>

          <p className="class-card__meta">
            {yogaClass.type} • {yogaClass.instructor}
          </p>

          <p className="class-card__meta">
            {yogaClass.date} • {yogaClass.time} • {yogaClass.location}
          </p>

          <p className="class-card__description">{yogaClass.description}</p>

          <p className="class-card__price">
            Drop-in: {yogaClass.dropInPrice} SEK
          </p>
        </div>
      </article>
    </Link>
  );
}

export default ClassCard;
