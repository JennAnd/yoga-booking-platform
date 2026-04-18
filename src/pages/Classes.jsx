/**
 * Classes page.
 * Displays all available yoga classes at Still Studio.
 */

import ClassCard from "../components/classes/ClassCard";
import { classes } from "../data/classes";

function Classes() {
  return (
    <section className="page-placeholder">
      <h1>Classes</h1>
      <p>Browse all available yoga classes at Still Studio.</p>

      <ul className="class-card-list">
        {classes.map((yogaClass) => (
          <li key={yogaClass.id}>
            <ClassCard yogaClass={yogaClass} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Classes;
