/**
 * Returns the correct badge variant for class availability.
 */

export function getAvailabilityBadgeVariant(availableSpots) {
  if (availableSpots === 0) {
    return "fully-booked";
  }

  if (availableSpots <= 3) {
    return "few-spots";
  }

  return null;
}
