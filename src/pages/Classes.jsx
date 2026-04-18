/**
 * Classes page.
 * Displays all available yoga classes.
 */

import { classes } from "../data/classes";

function Classes() {
  return (
    <section className="page-placeholder">
      <h1>Classes</h1>
      <p>Browse all available yoga classes at Still Studio.</p>

      <ul>
        {classes.map((yogaClass) => (
          <li key={yogaClass.id}>
            <strong>{yogaClass.title}</strong> - {yogaClass.type} -{" "}
            {yogaClass.level}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Classes;
