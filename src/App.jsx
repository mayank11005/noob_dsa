import React, { useState } from "react";
import initialData from "./data.json";
import PieChart from "./components/PieChart";
import Timer from "./components/Timer";
import HeaderControls from "./components/HeaderControls";
import QuestionTable from "./components/QuestionTable";
import NoteModal from "./components/NoteModal";
import AddQuestionModal from "./components/AddQuestionModal";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState(initialData);
  const [fileHandle, setFileHandle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [activeNoteQuestion, setActiveNoteQuestion] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Helper function to save changes to state and directly write to the connected file
  const updateQuestionsAndSave = async (updatedQuestions) => {
    setQuestions(updatedQuestions);

    if (fileHandle) {
      try {
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(updatedQuestions, null, 2));
        await writable.close();
      } catch (err) {
        console.error("Failed to save to local system file:", err);
      }
    }
  };

  // Open & link your local data.json file from your computer
  const handleOpenFile = async () => {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [
          {
            description: "JSON Files",
            accept: { "application/json": [".json"] },
          },
        ],
        multiple: false,
      });
      setFileHandle(handle);

      const file = await handle.getFile();
      const content = await file.text();
      const parsedData = JSON.parse(content);
      setQuestions(parsedData);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error opening file:", err);
      }
    }
  };

  // Toggle Solve Status
  const handleToggleSolve = (id) => {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, isSolved: !q.isSolved } : q,
    );
    updateQuestionsAndSave(updated);
  };

  // Pick Random Question
  const handlePickRandom = () => {
    const unsolved = questions.filter((q) => !q.isSolved);
    if (unsolved.length === 0) {
      alert("All questions are solved!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * unsolved.length);
    alert(`Random Question: ${unsolved[randomIndex].title}`);
  };

  // Sort by ID
  const handleSortById = () => {
    const sorted = [...questions].sort((a, b) =>
      sortAsc ? b.id - a.id : a.id - b.id,
    );
    setQuestions(sorted);
    setSortAsc(!sortAsc);
  };

  // Add New Question
  const handleAddQuestion = (newQ) => {
    const updated = [...questions, newQ];
    updateQuestionsAndSave(updated);
  };

  // Save Notes
  const handleSaveNotes = (id, notes) => {
    const updated = questions.map((q) => (q.id === id ? { ...q, notes } : q));
    updateQuestionsAndSave(updated);
  };

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const solvedCount = questions.filter((q) => q.isSolved).length;
  const nextId =
    questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 0;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <PieChart solvedCount={solvedCount} totalCount={questions.length} />
        <Timer />
      </div>

      {/* Header Controls */}
      <HeaderControls
        onPickRandom={handlePickRandom}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        solvedCount={solvedCount}
        totalCount={questions.length}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* File Connection Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
          background: "#f0f0f0",
          padding: "10px 15px",
          borderRadius: "6px",
        }}
      >
        <span style={{ fontSize: "13px", color: "#555" }}>
          {fileHandle
            ? `Connected File: ${fileHandle.name} (Auto-saving enabled)`
            : "Using default data.json (Connect file to write directly to system drive)"}
        </span>
        <button
          onClick={handleOpenFile}
          style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          📂 Connect Local data.json File
        </button>
      </div>

      {/* Main Table */}
      <QuestionTable
        questions={filteredQuestions}
        onToggleSolve={handleToggleSolve}
        onOpenNote={(q) => setActiveNoteQuestion(q)}
        onSortById={handleSortById}
      />

      {/* Modals */}
      {activeNoteQuestion && (
        <NoteModal
          question={activeNoteQuestion}
          onClose={() => setActiveNoteQuestion(null)}
          onSaveNotes={handleSaveNotes}
        />
      )}

      {isAddModalOpen && (
        <AddQuestionModal
          nextId={nextId}
          onAdd={handleAddQuestion}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
