/**
 * Reusable empty state component.
 */

import "./ui.css";

function EmptyState({ title, description }) {
  return (
    <div className="ui-empty-state">
      <h2 className="ui-empty-state__title">{title}</h2>
      <p className="ui-empty-state__description">{description}</p>
    </div>
  );
}

export default EmptyState;
