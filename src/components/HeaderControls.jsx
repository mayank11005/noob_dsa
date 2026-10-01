import React from "react";

const HeaderControls = ({
  onPickRandom,
  searchQuery,
  setSearchQuery,
  solvedCount,
  totalCount,
  onOpenAddModal,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "20px 0",
      }}
    >
      {/* Pick Random Button */}
      <button
        onClick={onPickRandom}
        style={{
          padding: "8px 14px",
          borderRadius: "4px",
          cursor: "pointer",
          border: "1px solid #ccc",
          background: "#fff",
        }}
      >
        Pick Random 🧙‍♂️
      </button>

      {/* Normal Search Input */}
      <div style={{ flexGrow: 1, margin: "0 20px", maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Search Question.. 🔍"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Counter & Add New Question Button */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span
          style={{
            background: "#C3E6CB",
            padding: "6px 12px",
            borderRadius: "4px",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          {solvedCount}/{totalCount} Done ✔
        </span>
        <button
          onClick={onOpenAddModal}
          title="Add new question (Auto increment ID)"
          style={{
            background: "#FFF3CD",
            border: "1px solid #FFEBAA",
            padding: "6px 10px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ✏️
        </button>
      </div>
    </div>
  );
};

export default HeaderControls;
