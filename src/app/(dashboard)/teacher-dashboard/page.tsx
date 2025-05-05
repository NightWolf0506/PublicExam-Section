"use client";

import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const subjects = ["Math", "Science", "English", "History", "Computer Science"];

const maxMarks = { internal: 15, assignment: 10, attendance: 5, viva: 10, endTerm: 60 };

interface StudentMarks {
  [subject: string]: {
    internal: number;
    assignment: number;
    attendance: number;
    viva: number;
    endTerm: number;
  };
}

const Button = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300"
  >
    {children}
  </button>
);

const Input = ({ type, value, onChange, max }: { type: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; max: number }) => (
  <input
    type={type}
    value={value}
    onChange={(e) => {
      const val = parseInt(e.target.value, 10);
      if (e.target.value === "" || (val >= 0 && val <= max)) {
        onChange(e);
      }
    }}
    className="border-2 border-blue-400 px-3 py-2 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
  />
);

const TeacherDashboard: React.FC = () => {
  const [students, setStudents] = useState<string[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [marks, setMarks] = useState<StudentMarks>({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/students", { cache: 'no-store' });
      const data = await response.json();

      if (data && typeof data === "object") {
        const studentNames = Object.keys(data);
        setStudents(studentNames);

        if (studentNames.length) {
          const selectedStudentData = data[studentNames[0]];

          const initialMarks: StudentMarks = subjects.reduce((acc, subject) => {
            acc[subject] = selectedStudentData?.[subject] || {
              internal: 0,
              assignment: 0,
              attendance: 0,
              viva: 0,
              endTerm: 0,
              pdfUrl: selectedStudentData?.[subject]?.pdfUrl || "" // Ensure pdfUrl is fetched
            };
            return acc;
          }, {} as StudentMarks);

          setMarks(initialMarks);
        }
      } else {
        console.error("Invalid data format or empty response");
        setStudents([]);
      }
    };

    fetchData();
  }, []);

  const handleMarkChange = (subject: string, field: keyof StudentMarks[string], value: number) => {
    setMarks((prev) => ({
      ...prev,
      [subject]: { ...prev[subject], [field]: value },
    }));
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.text(`Assessment Report - ${selectedStudent}`, 40, 10);

    autoTable(doc, {
      head: [["Subject", ...Object.keys(maxMarks), "Total"]],
      body: subjects.map((subject) => [
        subject,
        marks[subject].internal,
        marks[subject].assignment,
        marks[subject].attendance,
        marks[subject].viva,
        marks[subject].endTerm,
        Object.values(marks[subject]).reduce((acc, val) => acc + val, 0),
      ]),
      startY: 20,
    });

    const pdfBlob = doc.output("blob");
    const formData = new FormData();
    formData.append("pdf", pdfBlob, `${selectedStudent}_Report.pdf`);

    await fetch("/api/save-pdf", {
      method: "POST",
      body: formData,
    });

    alert(`PDF for ${selectedStudent} saved successfully!`);
  };

  const handleFileUpload = async (subject: string, file: File) => {
    if (!selectedStudent) {
      alert("Please select a student first.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("studentName", selectedStudent); // Ensure selectedStudent has a valid value
    formData.append("subjectName", subject);

    const response = await fetch("/api/save-pdf", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.pdfUrl) {
      setMarks((prev) => ({
        ...prev,
        [subject]: { ...prev[subject], pdfUrl: data.pdfUrl },
      }));
      alert(`PDF uploaded successfully for ${selectedStudent} - ${subject}`);
    } else {
      alert(`Failed to upload PDF for ${selectedStudent} - ${subject}`);
    }
  };

  const handleSave = async () => {
    await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [selectedStudent]: marks }),
    });

    alert(`Marks for ${selectedStudent} saved successfully!`);
  };

  const handleSaveAndGeneratePDF = async () => {
    await handleSave();
    await generatePDF();
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-6">Teacher Dashboard</h1>

      <select
        value={selectedStudent}
        onChange={(e) => setSelectedStudent(e.target.value)}
        className="w-full p-3 mb-6 border-2 border-indigo-400 rounded-lg text-lg focus:ring-2 focus:ring-indigo-600"
      >
        <option value="">Select a Student</option>
        {students.map((student) => (
          <option key={student} value={student}>
            {student}
          </option>
        ))}
      </select>

      {selectedStudent && (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white p-6">
  <table className="w-full min-w-max text-center">

            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3">Subject</th>
                {Object.keys(maxMarks).map((field) => (
                  <th key={field} className="p-3">{field}</th>
                ))}
                <th className="p-3">Upload PDF</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={subject} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                  <td className="p-3">{subject}</td>
                  {Object.keys(maxMarks).map((field) => (
                    <td key={field} className="p-3">
                      <Input
                        type="number"
                        value={marks[subject][field as keyof StudentMarks[string]]}
                        onChange={(e) =>
                          handleMarkChange(subject, field as keyof StudentMarks[string], parseInt(e.target.value))
                        }
                        max={maxMarks[field as keyof typeof maxMarks]}
                      />
                    </td>
                  ))}
                  <td className="p-3">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(subject, e.target.files[0]);
                        }
                      }}
                      className="border-2 border-blue-400 px-3 py-2 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-4 mt-6">
            <Button onClick={handleSaveAndGeneratePDF}>Save Marks and Generate PDF</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;