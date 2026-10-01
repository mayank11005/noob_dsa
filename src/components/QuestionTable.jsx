import React from "react";
import QuestionRow from "./QuestionRow";

const QuestionTable = ({
  questions,
  onToggleSolve,
  onOpenNote,
  onSortById,
}) => {
  return (
    <table
      style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
    >
      <thead>
        <tr
          style={{
            borderBottom: "2px solid #ccc",
            textAlign: "left",
            background: "#f8f9fa",
          }}
        >
          <th style={{ padding: "10px", width: "40px" }}></th>
          <th
            style={{ padding: "10px", width: "60px", cursor: "pointer" }}
            onClick={onSortById}
            title="Click to Sort by ID"
          >
            id ↕
          </th>
          <th style={{ padding: "10px" }}>Questions</th>
          <th style={{ padding: "10px", width: "100px", textAlign: "center" }}>
            Links
          </th>
        </tr>
      </thead>
      <tbody>
        {questions.map((q) => (
          <QuestionRow
            key={q.id}
            question={q}
            onToggleSolve={onToggleSolve}
            onOpenNote={onOpenNote}
          />
        ))}
      </tbody>
    </table>
  );
};

export default QuestionTable;
