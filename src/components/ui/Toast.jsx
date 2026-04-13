/**
 * Reusable toast component for short feedback messages.
 */

import "./ui.css";

function Toast({ message, variant = "info" }) {
  return <div className={`ui-toast ui-toast--${variant}`}>{message}</div>;
}

export default Toast;
