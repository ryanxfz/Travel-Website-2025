import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  label?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Type to search...",
  style = {},
  label,
}: SearchBarProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5em", ...style }}>
      {label && (
        <span style={{ fontWeight: 800, color: "#535bf2" }}>{label}</span>
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          padding: "0.5em",
          borderRadius: "5px",
          border: "1px solid #333",
          background: "#fff",
          color: "#222",
          fontSize: "1.2em",
          width: "100%",
          ...style,
        }}
      />
    </div>
  );
}