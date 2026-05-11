/**
 * Formats a class date for the schedule tabs.
 */

export function formatScheduleDate(date) {
  return new Date(date).toLocaleDateString("en-SE", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
