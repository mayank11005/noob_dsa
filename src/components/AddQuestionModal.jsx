import React, { useState } from "react";

const AddQuestionModal = ({ nextId, onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAdd({
      id: nextId,
      title,
      link: link || "#",
      isSolved: false,
      notes: [],
    });
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
        }}
      >
        <h3>Add New Question (Auto ID: {nextId})</h3>

        <div style={{ marginBottom: "12px" }}>
          <label
            style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}
          >
            Question Name:
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}
          >
            Question Link:
          </label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{ padding: "6px 12px" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: "6px 12px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Add Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionModal;
