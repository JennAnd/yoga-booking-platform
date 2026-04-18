/**
 * Class details page.
 * Displays detailed information about a selected yoga class.
 */

import Badge from "../components/ui/Badge";
import { Link, useParams } from "react-router-dom";
import { classes } from "../data/classes";
import { getAvailabilityStatus } from "../utils/getAvailabilityStatus";
import { getAvailabilityBadgeVariant } from "../utils/getAvailabilityBadgeVariant";

function ClassDetails() {
  const { id } = useParams();

  const yogaClass = classes.find((currentClass) => currentClass.id === id);

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

        <h1 className="class-details__title">{yogaClass.title}</h1>

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
      </div>
    </section>
  );
}

export default ClassDetails;
