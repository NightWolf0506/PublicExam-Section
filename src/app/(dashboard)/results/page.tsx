"use client";

import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const maxMarks = { internal: 15, assignment: 10, attendance: 5, viva: 10, endTerm: 60 };

interface SubjectMarks {
  internal: number;
  assignment: number;
  attendance: number;
  viva: number;
  endTerm: number;
  pdfUrl?: string | null; // Added PDF URL
}

interface StudentData {
  [subject: string]: SubjectMarks;
}

const StudentDashboard: React.FC = () => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedStudent) return;

      const response = await fetch(`/api/students?studentName=${selectedStudent}`);
      const data = await response.json();

      if (data[selectedStudent]) {
        setStudentData(data[selectedStudent]);
      } else {
        setStudentData(null);
      }
    };

    fetchData();
  }, [selectedStudent]);

  const downloadPDF = () => {
    if (!studentData) return;

    const doc = new jsPDF();
    doc.text(`Student Report - ${selectedStudent}`, 14, 10);

    const tableData = Object.entries(studentData).map(([subject, marks]) => [
      subject,
      marks.internal,
      marks.assignment,
      marks.attendance,
      marks.viva,
      marks.endTerm,
    ]);

    autoTable(doc, {
      head: [["Subject", "Internal", "Assignment", "Attendance", "Viva", "End Term"]],
      body: tableData,
    });

    doc.save(`${selectedStudent}_Report.pdf`);
  };

  return (
    <div className="p-10 bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-indigo-800 mb-8 drop-shadow-md">
        Student Dashboard
      </h1>

      <select
        value={selectedStudent}
        onChange={(e) => setSelectedStudent(e.target.value)}
        className="w-full max-w-lg p-4 mb-8 border-4 border-indigo-500 rounded-2xl text-xl focus:ring-4 focus:ring-indigo-600 shadow-lg"
      >
        <option value="">Select a Student</option>
        <option value="Aarav Sharma">Aarav Sharma</option>
      </select>

      {studentData && (
        <div className="w-full max-w-4xl">
          <table className="w-full border-collapse shadow-xl rounded-3xl overflow-hidden">
            <thead>
              <tr className="bg-indigo-700 text-white text-lg">
                <th className="p-4">Subject</th>
                {Object.keys(maxMarks).map((field) => (
                  <th key={field} className="p-4">{field}</th>
                ))}
                <th className="p-4">End Term PDF</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(studentData).map(([subject, marks]) => (
                <tr
                  key={subject}
                  className="text-center bg-white even:bg-indigo-100 hover:bg-indigo-200 transition"
                >
                  <td className="p-4 font-semibold">{subject}</td>
                  {Object.keys(maxMarks).map((field) => (
                    <td key={field} className="p-4">
                      {marks[field as keyof SubjectMarks]}
                    </td>
                  ))}
                  <td className="p-4">
                    {marks.pdfUrl ? (
                      <a
                        href={marks.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        View PDF
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={downloadPDF}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;