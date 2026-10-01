import React, { useState } from "react";

const NoteModal = ({ question, onClose, onSaveNotes }) => {
  const [approaches, setApproaches] = useState(
    question.notes && question.notes.length > 0
      ? question.notes
      : [
          {
            id: 1,
            title: "using binary search",
            description: "",
            isOpen: true,
          },
        ],
  );

  const handleAddApproach = () => {
    const nextId =
      approaches.length > 0 ? Math.max(...approaches.map((a) => a.id)) + 1 : 1;
    setApproaches([
      ...approaches,
      { id: nextId, title: "", description: "", isOpen: true },
    ]);
  };

  const handleTitleChange = (id, newTitle) => {
    setApproaches(
      approaches.map((a) => (a.id === id ? { ...a, title: newTitle } : a)),
    );
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
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#262626",
          color: "#fff",
          padding: "25px",
          borderRadius: "8px",
          width: "600px",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Note for: {question.title}
        </h3>

        {approaches.map((app) => (
          <div
            key={app.id}
            style={{
              background: "#1c3829",
              border: "1px solid #2e5940",
              borderRadius: "6px",
              padding: "12px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* Approach Title Input (replaces static id=1 badge) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  flexGrow: 1,
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "#88c999",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  approach -
                </span>
                <input
                  type="text"
                  placeholder="e.g. using binary search"
                  value={app.title}
                  onChange={(e) => handleTitleChange(app.id, e.target.value)}
                  style={{
                    backgroundColor: "#111",
                    color: "#fff",
                    border: "1px solid #333",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    fontSize: "13px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <button
                onClick={() => toggleAccordion(app.id)}
                style={{
                  border: "none",
                  background: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                {app.isOpen ? "∇" : "Δ"}
              </button>
            </div>

            {/* Approach Description Code Area */}
            {app.isOpen && (
              <div style={{ marginTop: "10px" }}>
                <textarea
                  rows={8}
                  placeholder="Paste or write code / approach here..."
                  value={app.description}
                  onChange={(e) =>
                    handleDescriptionChange(app.id, e.target.value)
                  }
                  style={{
                    width: "100%",
                    minHeight: "200px",
                    padding: "10px",
                    backgroundColor: "#181818",
                    color: "#e6e6e6",
                    border: "1px solid #333",
                    borderRadius: "4px",
                    fontFamily:
                      'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                    fontSize: "13px",
                    lineHeight: "1.5",
                    resize: "vertical",
                    boxSizing: "border-box",
                    whiteSpace: "pre",
                    overflowX: "auto",
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
              background: "#1c3829",
              color: "#88c999",
              border: "1px solid #2e5940",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            add approach
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              background: "#555",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "8px 16px",
              background: "#0066cc",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
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
