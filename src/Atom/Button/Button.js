import React from "react";

export default function Button({ onClick, text, disabled, className }) {
  return (
    <div>
      <button disabled={disabled} onClick={onClick} className={className}>
        {text}
      </button>
    </div>
  );
}
