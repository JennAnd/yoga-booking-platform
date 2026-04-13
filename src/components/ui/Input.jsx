/**
 * Reusable input component for form fields.
 */

import "./ui.css";

function Input({
  id,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
}) {
  return (
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
  );
}

export default Input;
