/**
 * Reusable input component for form fields.
 */

import "./ui.css";

function Input({
  id,
  name,
  type = "text",
  label,
  placeholder = "",
  value,
  onChange,
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

      <input
        id={id}
        name={name}
        type={type}
        className="ui-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
