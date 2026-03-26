"use client";

import "./TimeSlots.css";

type Props = {
  date: Date;
  selectedTime: string | null;
  onSelect: (time: string) => void;
  bookedTimes: string[];
};

export default function TimeSlots({
  date,
  selectedTime,
  onSelect,
  bookedTimes,
}: Props) {
  function getTimeSlots() {
    const day = date.getDay();
    let start, end;

    if (day === 0) {
      start = 10;
      end = 15.5;
    } else if (day === 6) {
      start = 9;
      end = 16;
    } else {
      start = 9;
      end = 16.5;
    }

    const slots: string[] = [];

    for (let h = start; h <= end; h += 0.5) {
      const hours = Math.floor(h);
      const minutes = h % 1 === 0 ? "00" : "30";
      slots.push(`${hours}:${minutes}`);
    }

    return slots;
  }

  const allSlots = getTimeSlots();

  return (
    <div className="timeslots-container">
      <h4 className="timeslots-title">Select a time</h4>

      <div className="timeslots-grid">
        {allSlots.map((time) => {
          const isBooked = bookedTimes.includes(time);
          const isActive = selectedTime === time;

          return (
            <button
              key={time}
              type="button"
              disabled={isBooked}
              onClick={() => !isBooked && onSelect(time)}
              className={`slot 
                ${isActive ? "active" : ""} 
                ${isBooked ? "booked" : ""}
              `}
            >
              {time}
            </button>
          );
        })}

        {allSlots.length === 0 && (
          <p className="no-slots">No times available for this day.</p>
        )}
      </div>
    </div>
  );
}