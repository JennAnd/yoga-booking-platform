/*
  Hjälpfunktioner för att skapa verkliga schemadatum.

  Används för att generera datum från dagens datum och framåt,
  så att klasschemat inte behöver hårdkodade datum.
*/

const DAYS_IN_SCHEDULE = 14;

function formatDateToIso(date) {
  return date.toISOString().split("T")[0];
}

function addDays(date, numberOfDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numberOfDays);
  return newDate;
}

export function getScheduleDate(index) {
  const today = new Date();
  const scheduleDate = addDays(today, index);

  return formatDateToIso(scheduleDate);
}

export function getUpcomingScheduleDates() {
  return Array.from({ length: DAYS_IN_SCHEDULE }, (_, index) =>
    getScheduleDate(index),
  );
}
