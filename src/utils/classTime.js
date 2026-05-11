/*
  Helper functions for class dates and times.

  Used to check if a class has already passed
  and if booking is open for a class.
*/

const BOOKING_WINDOW_DAYS = 5;

function getClassDateTime(yogaClass) {
  return new Date(`${yogaClass.date}T${yogaClass.time}`);
}

export function hasClassPassed(yogaClass) {
  const classDateTime = getClassDateTime(yogaClass);
  const now = new Date();

  return classDateTime < now;
}

export function isBookingOpen(yogaClass) {
  const classDateTime = getClassDateTime(yogaClass);
  const now = new Date();

  const bookingOpensAt = new Date(classDateTime);
  bookingOpensAt.setDate(classDateTime.getDate() - BOOKING_WINDOW_DAYS);

  return now >= bookingOpensAt;
}
