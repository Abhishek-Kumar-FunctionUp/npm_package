import React from "react";
export default function TextArea({
  onChange,
  placeholder,
  value,
  rows,
  cols,
  className
}) {
  return (
    <div>
      <textarea
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        rows={rows}
        cols={cols}
        className={className}
      />
    </div>
  );
}
