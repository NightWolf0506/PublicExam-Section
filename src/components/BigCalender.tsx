"use client";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = ({ events = [] }: { events: any[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 24)); // Start from March 24, 2025

  // Navigate to the previous or next day
  const handleDayChange = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(direction === "prev" ? prevDate.getDate() - 1 : prevDate.getDate() + 1);
      return newDate;
    });
  };

  // Updated Filtering Logic
  const filteredEvents = events.filter(
    (event) =>
      moment(event.start).isSame(currentDate, "day") ||
      moment(event.end).isSame(currentDate, "day") ||
      (moment(event.start).isBefore(moment(currentDate).endOf("day")) &&
        moment(event.end).isAfter(moment(currentDate).startOf("day")))
  );

  return (
    <div>
      <div className="flex justify-between mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleDayChange("prev")}>
          Previous Day
        </button>
        <h2 className="text-lg font-semibold">{moment(currentDate).format("dddd, MMMM Do YYYY")}</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleDayChange("next")}>
          Next Day
        </button>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500">No events for this day.</p>
      ) : (
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          views={[Views.DAY]}
          date={currentDate}
          defaultView={Views.DAY}
          onNavigate={(newDate) => setCurrentDate(newDate)}
          style={{ height: "80vh" }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.role === "teacher" ? "#FF6347" : "#4CAF50",
              color: "white",
              borderRadius: "5px",
            },
          })}
        />
      )}
    </div>
  );
};

export default BigCalendar;
