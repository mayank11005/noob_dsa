import React from "react";

const PieChart = ({ solvedCount, totalCount }) => {
  const unsolvedCount = totalCount - solvedCount;

  // Calculate percentages
  const solvedPercentage =
    totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;
  const unsolvedPercentage = totalCount > 0 ? 100 - solvedPercentage : 0;

  // Conic gradient for green (solved) and black (unsolved)
  const chartStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: `conic-gradient(#C3E6CB 0% ${solvedPercentage}%, #000000 ${solvedPercentage}% 100%)`,
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
      <div style={chartStyle}></div>
      <div style={{ fontSize: "13px", lineHeight: "1.6" }}>
        <div>
          <span style={{ color: "#000", fontWeight: "bold" }}>■</span> Black -
          unsolved ({unsolvedPercentage}%)
        </div>
        <div>
          <span style={{ color: "#88c999", fontWeight: "bold" }}>■</span> Green
          - solved ({solvedPercentage}%)
        </div>
      </div>
    </div>
  );
};

export default PieChart;
