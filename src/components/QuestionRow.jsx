import React from "react";

const QuestionRow = ({ question, onToggleSolve, onOpenNote }) => {
  return (
    <tr
      style={{
        backgroundColor: question.isSolved ? "#C3E6CB" : "transparent",
        borderBottom: "1px solid #eee",
      }}
    >
      <td style={{ padding: "10px", textAlign: "center" }}>
        <input
          type="checkbox"
          checked={question.isSolved}
          onChange={() => onToggleSolve(question.id)}
        />
      </td>
      <td style={{ padding: "10px" }}>{question.id}</td>
      <td style={{ padding: "10px" }}>
        <a
          href={question.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#0056b3",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          {question.title}
        </a>
      </td>
      <td style={{ padding: "10px", textAlign: "center" }}>
        <a
          href={question.link}
          target="_blank"
          rel="noopener noreferrer"
          title="Open Link in New Tab"
          style={{ marginRight: "10px" }}
        >
          🔗
        </a>
        <button
          onClick={() => onOpenNote(question)}
          style={{ border: "none", background: "none", cursor: "pointer" }}
          title="Note / Expected Time to solve"
        >
          📝
        </button>
      </td>
    </tr>
  );
};

export default QuestionRow;
