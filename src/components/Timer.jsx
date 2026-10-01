import React, { useState, useEffect } from "react";

const Timer = () => {
  const [minutesInput, setMinutesInput] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const handleStart = () => {
    if (!isActive && secondsLeft === 0 && minutesInput) {
      setSecondsLeft(parseInt(minutesInput, 10) * 60);
    }
    if (secondsLeft > 0 || minutesInput) {
      setIsActive(true);
    }
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const formatTime = () => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div
      className="timer-container"
      style={{
        background: "#E3F2FD",
        padding: "10px 15px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div>
        <div style={{ fontSize: "11px", color: "#555" }}>enter time MM</div>
        <input
          type="number"
          placeholder="MM"
          value={minutesInput}
          onChange={(e) => setMinutesInput(e.target.value)}
          disabled={isActive}
          style={{ width: "50px", padding: "4px", textAlign: "center" }}
        />
      </div>

      <div style={{ fontSize: "18px", fontWeight: "bold", margin: "0 5px" }}>
        {isActive || secondsLeft > 0 ? formatTime() : "00:00"}
      </div>

      <button
        onClick={handleStart}
        style={{ padding: "4px 10px", cursor: "pointer" }}
      >
        Start
      </button>
      <button
        onClick={handleStop}
        style={{ padding: "4px 10px", cursor: "pointer" }}
      >
        Stop
      </button>
    </div>
  );
};

export default Timer;

