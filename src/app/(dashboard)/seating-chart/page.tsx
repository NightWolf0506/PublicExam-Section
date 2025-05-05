"use client";

import React, { useState } from "react";

interface Room {
  room: string;
  capacity: number;
}

interface Exam {
  branch: string;
  exam: string;
  faculty: string;
  room: string;
  capacity: number;
  students: number;
  isAvailable: boolean;
}

interface SeatingPlan {
  exam: string;
  branch: string;
  primaryTeacher: string;
  allocatedRooms: Room[];
  wasReassigned?: boolean;
}

const extraTeachers: string[] = ["Dr. Brown", "Ms. Taylor", "Dr. Adams", "Ms. Clarke"];

const initialTeacherAvailability: Record<string, boolean> = {
  "Dr. Smith": false,
  "Prof. Johnson": true,
  "Dr. Brown": true,
  "Ms. Taylor": true,
  "Dr. Adams": true,
  "Ms. Clarke": true,
};

const initialRooms: Room[] = [
  { room: "A102", capacity: 20 },
  { room: "B203", capacity: 25 },
  { room: "C301", capacity: 30 },
  { room: "D405", capacity: 35 },
];

const studentNames: string[] = [
  "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hank",
  "Ivy", "Jack", "Kara", "Leo", "Mona", "Nate", "Olivia", "Paul",
  "Quincy", "Rachel", "Steve", "Tom", "Uma", "Vera", "Will", "Xander", "Yasmine",
];

const dutyList: Exam[] = [
  {
    branch: "Computer Science",
    exam: "Data Structures",
    faculty: "Dr. Smith",
    room: "A101",
    capacity: 20,
    students: 25,
    isAvailable: false,
  },
  {
    branch: "Electronics",
    exam: "Circuit Analysis",
    faculty: "Prof. Johnson",
    room: "B202",
    capacity: 30,
    students: 30,
    isAvailable: true,
  },
];

export default function SeatingChart() {
  const [selectedExam, setSelectedExam] = useState<SeatingPlan | null>(null);
  const [seatingPlans, setSeatingPlans] = useState<SeatingPlan[]>([]);
  const [roomList] = useState<Room[]>(initialRooms);
  const [teacherAvailability, setTeacherAvailability] = useState<Record<string, boolean>>(initialTeacherAvailability);
  const [viewPublishedPlan, setViewPublishedPlan] = useState<SeatingPlan | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>("");

  const toggleTeacherAvailability = (teacher: string) => {
    setTeacherAvailability((prev) => {
      const newAvailability = { ...prev, [teacher]: !prev[teacher] };
      if (!newAvailability[teacher]) {
        const newTeacher = extraTeachers.find((t) => newAvailability[t]) || extraTeachers[0];
        updatePublishedPlans(teacher, newTeacher);
      }
      return newAvailability;
    });
  };

  const updatePublishedPlans = (oldTeacher: string, newTeacher: string) => {
    setSeatingPlans((prevPlans) =>
      prevPlans.map((plan) => {
        if (plan.primaryTeacher === oldTeacher) {
          return { ...plan, primaryTeacher: newTeacher, wasReassigned: true };
        }
        return plan;
      })
    );
  };

  const handleExamSelection = (exam: Exam) => {
    let roomsNeeded = Math.ceil(exam.students / exam.capacity);
    let allocatedRooms: Room[] = [];
    let remainingStudents = exam.students;

    for (let i = 0; i < roomsNeeded; i++) {
      const availableRoom = roomList.find((room) => room.capacity >= remainingStudents);
      if (availableRoom) {
        allocatedRooms.push(availableRoom);
        remainingStudents -= availableRoom.capacity;
      } else {
        const largestRoom = roomList.reduce((prev, current) => (prev.capacity > current.capacity ? prev : current));
        allocatedRooms.push(largestRoom);
        remainingStudents -= largestRoom.capacity;
      }
    }

    const primaryTeacher = teacherAvailability[exam.faculty]
      ? exam.faculty
      : extraTeachers.find((t) => teacherAvailability[t]) || "Unassigned";

    setSelectedExam({ exam: exam.exam, branch: exam.branch, allocatedRooms, primaryTeacher });
  };

  const handlePublish = () => {
    if (!selectedExam) return;
    setSeatingPlans([...seatingPlans, selectedExam]);
    setSelectedExam(null);
  };

  const renderSeatingLayout = (seatCount: number, bgColor: string) => {
    return (
      <div className="grid grid-cols-5 gap-4 p-4 mt-4 bg-gray-100 rounded-lg justify-items-center">
        {studentNames.slice(0, seatCount).map((name, i) => (
          <div
            key={i}
            className={`w-20 h-20 ${bgColor} text-black flex justify-center items-center font-bold rounded-lg`}
          >
            {name}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-white text-black">
      <div className="flex-1 p-6">
        {!viewPublishedPlan ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-6">Seating Chart</h1>
            <div className="mb-4 p-4 bg-gray-100 rounded-lg text-center">
              <h2 className="text-xl font-bold mb-2">Teacher Availability</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {Object.entries(teacherAvailability).map(([teacher, isAvailable]) => (
                  <button
                    key={teacher}
                    onClick={() => toggleTeacherAvailability(teacher)}
                    className={`px-3 py-1 rounded ${
                      isAvailable ? "bg-green-600 text-white" : "bg-red-600 text-white"
                    }`}
                  >
                    {teacher}: {isAvailable ? "Available" : "On Leave"}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-gray-200 p-2 rounded-lg"
              >
                <option value="">Select Branch</option>
                {Array.from(new Set(dutyList.map((d) => d.branch))).map((branch, index) => (
                  <option key={index} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
              {selectedBranch &&
                dutyList
                  .filter((exam) => exam.branch === selectedBranch)
                  .map((exam, index) => (
                    <button
                      key={index}
                      onClick={() => handleExamSelection(exam)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      {exam.exam} - {exam.branch}
                    </button>
                  ))}
            </div>
            {selectedExam && (
              <div className="mt-8">
                <h2 className="text-2xl text-center font-semibold">
                  {selectedExam.exam} - {selectedExam.branch}
                </h2>
                <h3 className="text-lg text-center">
                  Primary Teacher: {selectedExam.primaryTeacher}
                  {!teacherAvailability[selectedExam.primaryTeacher] && (
                    <span className="ml-2 text-red-500"> (Default teacher on leave)</span>
                  )}
                </h3>
                {selectedExam.allocatedRooms.map((room, index) => (
                  <div key={index} className="mt-4">
                    {renderSeatingLayout(room.capacity, "bg-green-200")}
                    <p className="text-center mt-2 font-semibold">Room: {room.room}</p>
                  </div>
                ))}
                <div className="text-center mt-6">
                  <button
                    onClick={handlePublish}
                    className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-lg text-white"
                  >
                    Publish Seating Plan
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Published Seating Plan</h2>
            <h3 className="text-2xl mb-2">
              {viewPublishedPlan.exam} - {viewPublishedPlan.branch}
            </h3>
            <p className="mb-2">
              Primary Teacher: {viewPublishedPlan.primaryTeacher}
              {viewPublishedPlan.wasReassigned && (
                <span className="ml-2 text-blue-400"> (Reassigned)</span>
              )}
            </p>
            {viewPublishedPlan.allocatedRooms.map((room, index) => (
              <div key={index} className="mt-4">
                {renderSeatingLayout(room.capacity, "bg-green-200")}
                <p className="text-center mt-2 font-semibold">Room: {room.room}</p>
              </div>
            ))}
            <button
              onClick={() => setViewPublishedPlan(null)}
              className="mt-4 bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-lg text-white"
            >
              Back
            </button>
          </div>
        )}
      </div>
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Sitting Plans</h2>
        {seatingPlans.length === 0 ? (
          <p>No seating plans published yet.</p>
        ) : (
          seatingPlans.map((plan, index) => (
            <div
              key={index}
              className="mb-4 p-2 border border-yellow-500 rounded-lg bg-white text-black cursor-pointer hover:bg-gray-200"
              onClick={() => setViewPublishedPlan(plan)}
            >
              <h3 className="font-semibold">
                {plan.exam} - {plan.branch}
              </h3>
              <p>
                Primary Teacher: {plan.primaryTeacher}
                {plan.wasReassigned && (
                  <span className="ml-2 text-blue-400"> (Reassigned)</span>
                )}
              </p>
              {plan.allocatedRooms.map((room, idx) => (
                <p key={idx}>Room: {room.room}</p>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}