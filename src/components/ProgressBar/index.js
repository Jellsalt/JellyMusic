import React from "react";
import "./index.scss";

const ProgressBar = ({ currentTime, duration, onProgressChange }) => {
  // 计算进度百分比
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  // 处理进度变化
  const handleChange = (e) => {
    onProgressChange(e.target?.value);
  };

  return (
    <div className="progress">
      <div className="point" style={{ left: `${progressPercentage}%` }}></div>
      <div
        className="progress-bar"
        style={{ width: `${progressPercentage}%` }}
      ></div>
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleChange}
        className="progress-range"
      />
    </div>
  );
};

export default ProgressBar;
