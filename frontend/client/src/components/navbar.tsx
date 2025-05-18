import React from "react";

export default function Navbar({ search, setSearch }: { search: string; setSearch: (v: string) => void }) {
  return (
    <header
      style={{
        width: "100vw",
        position: "sticky",
        top: 0,
        left: 0,
        background: "#3498db",
        padding: "1em 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        zIndex: 100
      }}
    >
      <input
        type="text"
        placeholder="Search by travel name"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          padding: "0.5em 1em",
          borderRadius: "5px",
          border: "1px solid #ccc",
          minWidth: "220px",
          fontSize: "1em"
        }}
      />
    </header>
  );
}