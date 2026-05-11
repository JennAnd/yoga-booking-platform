/**
 * Classes page.
 * Displays all available yoga classes at Still Studio.
 */

import { useMemo, useState } from "react";
import ClassCard from "../components/classes/ClassCard";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { classes } from "../data/classes";
import { filterClasses } from "../utils/filterClasses";
import { formatScheduleDate } from "../utils/formatScheduleDate";

function Classes() {
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    level: "all",
    date: "all",
  });

  const classDates = useMemo(() => {
    return [...new Set(classes.map((yogaClass) => yogaClass.date))].sort();
  }, []);

  const filteredClasses = useMemo(() => {
    const filteredBySearchTypeAndLevel = filterClasses(classes, filters);

    const filteredByDate =
      filters.date === "all"
        ? filteredBySearchTypeAndLevel
        : filteredBySearchTypeAndLevel.filter(
            (yogaClass) => yogaClass.date === filters.date,
          );

    return [...filteredByDate].sort((firstClass, secondClass) => {
      const firstDate = new Date(
        `${firstClass.date}T${firstClass.time}`,
      ).getTime();

      const secondDate = new Date(
        `${secondClass.date}T${secondClass.time}`,
      ).getTime();

      return firstDate - secondDate;
    });
  }, [filters]);

  const groupedClasses = filteredClasses.reduce((groups, yogaClass) => {
    const date = yogaClass.date;

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(yogaClass);

    return groups;
  }, {});

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  return (
    <section className="classes-page">
      <div className="classes-page__header">
        <h1>Classes</h1>
        <p>Browse all available yoga classes at Still Studio.</p>
      </div>

      <div className="classes-page__filters">
        <Input
          id="search"
          name="search"
          label="Search"
          placeholder="Search by class, type, or instructor"
          value={filters.search}
          onChange={handleFilterChange}
        />

        <div
          className="classes-page__date-tabs"
          aria-label="Filter classes by date"
        >
          <button
            type="button"
            className={`classes-page__date-tab ${
              filters.date === "all" ? "classes-page__date-tab--active" : ""
            }`}
            onClick={() =>
              setFilters((currentFilters) => ({
                ...currentFilters,
                date: "all",
              }))
            }
          >
            All dates
          </button>

          {classDates.map((date) => (
            <button
              key={date}
              type="button"
              className={`classes-page__date-tab ${
                filters.date === date ? "classes-page__date-tab--active" : ""
              }`}
              onClick={() =>
                setFilters((currentFilters) => ({
                  ...currentFilters,
                  date,
                }))
              }
            >
              {formatScheduleDate(date)}
            </button>
          ))}
        </div>

        <Select
          id="type"
          name="type"
          label="Class type"
          value={filters.type}
          onChange={handleFilterChange}
          options={[
            { value: "all", label: "All class types" },
            { value: "Hot Vinyasa", label: "Hot Vinyasa" },
            { value: "Yin Yoga", label: "Yin Yoga" },
            { value: "Hot Hatha", label: "Hot Hatha" },
            { value: "Breathwork", label: "Breathwork" },
            { value: "Ashtanga", label: "Ashtanga" },
            { value: "Meditation", label: "Meditation" },
          ]}
        />

        <Select
          id="level"
          name="level"
          label="Level"
          value={filters.level}
          onChange={handleFilterChange}
          options={[
            { value: "all", label: "All levels" },
            { value: "Beginner", label: "Beginner" },
            { value: "Intermediate", label: "Intermediate" },
            { value: "Advanced", label: "Advanced" },
            { value: "All Levels", label: "All Levels" },
          ]}
        />
      </div>

      {filteredClasses.length > 0 ? (
        <div className="classes-page__schedule">
          {Object.entries(groupedClasses).map(([date, classesForDate]) => (
            <section key={date} className="classes-page__schedule-group">
              <div className="classes-page__schedule-header">
                <h2>{formatScheduleDate(date)}</h2>
              </div>

              <ul className="class-card-list">
                {classesForDate.map((yogaClass) => (
                  <li key={yogaClass.id}>
                    <ClassCard yogaClass={yogaClass} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <div className="page-placeholder">
          <h2>No classes found</h2>
          <p>Try adjusting your filters to see more results.</p>
        </div>
      )}
    </section>
  );
}

export default Classes;
