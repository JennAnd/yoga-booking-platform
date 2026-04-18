/**
 * Reusable select component for filters and form choices.
 */

import "./ui.css";

function Select({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  className = "",
}) {
  return (
    <div className={`ui-field ${className}`.trim()}>
      {label ? (
        <label className="ui-field__label" htmlFor={id}>
          {label}
        </label>
      ) : null}

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
    </div>
  );
}

export default Select;
