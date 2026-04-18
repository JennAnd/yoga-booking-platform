/**
 * Returns a display-friendly availability status based on remaining spots..
 */

export function getAvailabilityStatus(availableSpots) {
  if (availableSpots === 0) {
    return "Fully booked";
  }

  if (availableSpots <= 3) {
    return "Few spots left";
  }

  return "Available";
}
