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

function Classes() {
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    level: "all",
  });

  const filteredClasses = useMemo(() => {
    return filterClasses(classes, filters);
  }, [filters]);

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
        <ul className="class-card-list">
          {filteredClasses.map((yogaClass) => (
            <li key={yogaClass.id}>
              <ClassCard yogaClass={yogaClass} />
            </li>
          ))}
        </ul>
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
