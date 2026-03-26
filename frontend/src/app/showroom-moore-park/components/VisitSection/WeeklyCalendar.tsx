"use client";

import { useState } from "react";
import "./WeeklyCalendar.css";

type Props = {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
};

export default function WeeklyCalendar({ selectedDate, onSelect }: Props) {
  const [weekOffset, setWeekOffset] = useState(0);

  function getMondayOfWeek(offset: number) {
    const now = new Date();
    const day = now.getDay();

    const monday = new Date(now);
    monday.setDate(now.getDate() - ((day + 6) % 7));
    monday.setDate(monday.getDate() + offset * 7);

    return monday;
  }

  const monday = getMondayOfWeek(weekOffset);

  const week = [...Array(7)].map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  function isPast(date: Date) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return date < now;
  }

  function canGoPrev() {
    return weekOffset > 0;
  }

  return (
    <div className="week-calendar-wrapper">
      <div className="week-header">
        <button
          className={`arrow-btn ${!canGoPrev() ? "disabled" : ""}`}
          onClick={() => canGoPrev() && setWeekOffset((prev) => prev - 1)}
        >
          ←
        </button>

        <div className="week-label">
          {week[0].toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })}{" "}
          —{" "}
          {week[6].toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })}
        </div>

        <button
          className="arrow-btn"
          onClick={() => setWeekOffset((prev) => prev + 1)}
        >
          →
        </button>
      </div>

      <div className="week-calendar">
        {week.map((date, idx) => {
          const disabled = isPast(date);
          const isActive =
            selectedDate?.toDateString() === date.toDateString();

          return (
            <button
              key={idx}
              className={`day-box ${disabled ? "disabled" : ""} ${
                isActive ? "active" : ""
              }`}
              onClick={() => !disabled && onSelect(date)}
            >
              <span className="day-name">
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </span>

              <span className="day-number">
                {date.getDate()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}