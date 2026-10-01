import React, { useState } from "react";

const NoteModal = ({ question, onClose, onSaveNotes }) => {
  const [approaches, setApproaches] = useState(
    question.notes || [
      { id: 1, description: "using : tree with it", isOpen: true },
    ],
  );

  const handleAddApproach = () => {
    const nextId =
      approaches.length > 0 ? Math.max(...approaches.map((a) => a.id)) + 1 : 1;
    setApproaches([
      ...approaches,
      { id: nextId, description: "", isOpen: true },
    ]);
  };

  const handleDescriptionChange = (id, text) => {
    setApproaches(
      approaches.map((a) => (a.id === id ? { ...a, description: text } : a)),
    );
  };

  const toggleAccordion = (id) => {
    setApproaches(
      approaches.map((a) => (a.id === id ? { ...a, isOpen: !a.isOpen } : a)),
    );
  };

  const handleSave = () => {
    onSaveNotes(question.id, approaches);
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
      <div
        style={{
          background: "#e0e0e0",
          padding: "25px",
          borderRadius: "8px",
          width: "500px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h3>Note for: {question.title}</h3>

        {approaches.map((app) => (
          <div
            key={app.id}
            style={{
              background: "#C3E6CB",
              borderRadius: "4px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  background: "#fff",
                  padding: "2px 8px",
                  borderRadius: "3px",
                  fontWeight: "bold",
                }}
              >
                id ={app.id}
              </span>
              <button
                onClick={() => toggleAccordion(app.id)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                {app.isOpen ? "∇" : "Δ"}
              </button>
            </div>
            {app.isOpen && (
              <div style={{ marginTop: "8px" }}>
                <input
                  type="text"
                  placeholder="Enter approach description..."
                  value={app.description}
                  onChange={(e) =>
                    handleDescriptionChange(app.id, e.target.value)
                  }
                  style={{
                    width: "95%",
                    padding: "6px",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                  }}
                />
              </div>
            )}
          </div>
        ))}

        <div style={{ textAlign: "center", margin: "15px 0" }}>
          <button
            onClick={handleAddApproach}
            style={{
              background: "#C3E6CB",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            add approach
          </button>
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <button onClick={onClose} style={{ padding: "6px 12px" }}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "6px 12px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
