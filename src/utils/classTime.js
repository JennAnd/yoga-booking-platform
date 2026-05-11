/*
  Helper functions for class dates and times.

  Used to check if a class has already passed
  based on its date and start time.
*/

export function hasClassPassed(yogaClass) {
  const classDateTime = new Date(`${yogaClass.date}T${yogaClass.time}`);
  const now = new Date();

  return classDateTime < now;
}
