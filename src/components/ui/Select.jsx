/**
 * Reusable select component for filters and form choices.
 */

import "./ui.css";

function Select({ id, name, value, onChange, options = [], disabled = false }) {
  return (
    <select
      id={id}
      name={name}
      className="ui-select"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
