"use client";

import BigCalendarComponent from "./BigCalender";

const BigCalendarContainer = () => {
  const examEvents = [
    { title: "Math Exam Room: A201", start: new Date(2025, 2, 24, 9, 0), end: new Date(2025, 2, 24, 11, 0), role: "student" },
    { title: "Physics Exam Room: A301", start: new Date(2025, 2, 25, 10, 0), end: new Date(2025, 2, 25, 12, 0), role: "teacher" },
    { title: "History Exam Room: A401", start: new Date(2025, 2, 26, 9, 0), end: new Date(2025, 2, 26, 11, 0), role: "student" },
    { title: "Biology Exam Duty Room: A201", start: new Date(2025, 2, 27, 11, 0), end: new Date(2025, 2, 27, 13, 0), role: "teacher" },
    { title: "Chemistry Exam Room: A501", start: new Date(2025, 2, 28, 10, 0), end: new Date(2025, 2, 28, 12, 0), role: "student" },
    { title: "English Exam Room: A202", start: new Date(2025, 2, 24, 13, 0), end: new Date(2025, 2, 24, 15, 0), role: "student" },
    { title: "Computer Science Exam Room: A601", start: new Date(2025, 2, 25, 14, 0), end: new Date(2025, 2, 25, 16, 0), role: "teacher" },
    { title: "Geography Exam Room: A402", start: new Date(2025, 2, 26, 12, 0), end: new Date(2025, 2, 26, 14, 0), role: "student" },
    { title: "Sports Science Exam Room: A303", start: new Date(2025, 2, 27, 9, 0), end: new Date(2025, 2, 27, 11, 0), role: "teacher" },
    { title: "Economics Exam Room: A505", start: new Date(2025, 2, 28, 8, 0), end: new Date(2025, 2, 28, 10, 0), role: "student" },
    { title: "Psychology Exam Room: A702", start: new Date(2025, 2, 29, 11, 0), end: new Date(2025, 2, 29, 13, 0), role: "teacher" },
    { title: "Art Exam Room: A103", start: new Date(2025, 2, 30, 10, 0), end: new Date(2025, 2, 30, 12, 0), role: "student" },
    { title: "Music Exam Room: A205", start: new Date(2025, 2, 30, 14, 0), end: new Date(2025, 2, 30, 16, 0), role: "teacher" },
    { title: "Drama Exam Room: A801", start: new Date(2025, 3, 1, 9, 0), end: new Date(2025, 3, 1, 11, 0), role: "student" },
    { title: "Philosophy Exam Room: A902", start: new Date(2025, 3, 2, 10, 0), end: new Date(2025, 3, 2, 12, 0), role: "teacher" },
    { title: "Law Exam Room: A506", start: new Date(2025, 3, 3, 13, 0), end: new Date(2025, 3, 3, 15, 0), role: "student" },
  ];

  return (
    <div className="p-4">
      <BigCalendarComponent events={examEvents} />
    </div>
  );
};

export default BigCalendarContainer;
