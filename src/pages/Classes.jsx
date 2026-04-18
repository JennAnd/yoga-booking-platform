/**
 * Classes page.
 * Displays all available yoga classes.
 */

import Badge from "../components/ui/Badge";
import { classes } from "../data/classes";
import { getAvailabilityStatus } from "../utils/getAvailabilityStatus";
import { getAvailabilityBadgeVariant } from "../utils/getAvailabilityBadgeVariant";

function Classes() {
  return (
    <section className="page-placeholder">
      <h1>Classes</h1>
      <p>Browse all available yoga classes at Still Studio.</p>

      <ul
        style={{ display: "grid", gap: "1rem", padding: 0, listStyle: "none" }}
      >
        {classes.map((yogaClass) => {
          const availabilityStatus = getAvailabilityStatus(
            yogaClass.availableSpots,
          );
          const availabilityBadgeVariant = getAvailabilityBadgeVariant(
            yogaClass.availableSpots,
          );

          return (
            <li
              key={yogaClass.id}
              style={{
                padding: "1rem",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginBottom: "0.5rem",
                }}
              >
                <strong>{yogaClass.title}</strong>
                <Badge
                  variant={
                    yogaClass.level === "Beginner"
                      ? "beginner"
                      : yogaClass.level === "Intermediate"
                        ? "intermediate"
                        : yogaClass.level === "Advanced"
                          ? "advanced"
                          : "all-levels"
                  }
                >
                  {yogaClass.level}
                </Badge>
                {availabilityBadgeVariant ? (
                  <Badge variant={availabilityBadgeVariant}>
                    {availabilityStatus}
                  </Badge>
                ) : null}
              </div>

              <p style={{ margin: "0 0 0.5rem" }}>
                {yogaClass.type} • {yogaClass.instructor}
              </p>

              <p style={{ margin: 0 }}>
                {yogaClass.date} • {yogaClass.time} • {yogaClass.location}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Classes;
