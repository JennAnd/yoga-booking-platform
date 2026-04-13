/**
 * Reusable badge component for class level and availability states.
 */

import "./ui.css";

function Badge({ children, variant = "beginner" }) {
  return <span className={`ui-badge ui-badge--${variant}`}>{children}</span>;
}

export default Badge;
