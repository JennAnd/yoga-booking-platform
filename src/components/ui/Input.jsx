/**
 * Reusable input component for form fields.
 */

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
  required = false,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordField = type === "password";

  const inputType = isPasswordField
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((currentValue) => !currentValue);
  };

  return (
    <div className={`ui-field ${className}`.trim()}>
      {label ? (
        <label className="ui-field__label" htmlFor={id}>
          {label}
        </label>
      ) : null}

      <div className="ui-input-wrapper">
        <input
          id={id}
          name={name}
          type={inputType}
          className="ui-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
        />
        {isPasswordField ? (
          <button
            type="button"
            className="ui-input-toggle"
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Input;
