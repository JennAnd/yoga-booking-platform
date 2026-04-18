/**
 * Filters classes based on search text, class type, and level.
 */

export function filterClasses(classes, filters) {
  const searchValue = filters.search.trim().toLowerCase();

  return classes.filter((yogaClass) => {
    const matchesSearch =
      yogaClass.title.toLowerCase().includes(searchValue) ||
      yogaClass.instructor.toLowerCase().includes(searchValue) ||
      yogaClass.type.toLowerCase().includes(searchValue);

    const matchesType =
      filters.type === "all" ? true : yogaClass.type === filters.type;

    const matchesLevel =
      filters.level === "all" ? true : yogaClass.level === filters.level;

    return matchesSearch && matchesType && matchesLevel;
  });
}
