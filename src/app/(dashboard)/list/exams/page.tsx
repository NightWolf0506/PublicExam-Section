"use client"; // This marks the component as a Client Component

import { useRouter } from "next/navigation"; // Import from next/navigation
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { examsData, role } from "@/lib/data";
import Image from "next/image";

type Exam = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  date: string;
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ExamListPage = () => {
  const router = useRouter(); // Initialize the useRouter hook from next/navigation

  const renderRow = (item: Exam) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" || role === "teacher" && (
            <>
              <FormModal table="exam" type="update" data={item} />
              <FormModal table="exam" type="delete" id={item.id} />
            </>
          )}
          {/* View Seating Chart Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              const pdfPath = "/Data Structures_Computer Science_Seating_Plan.pdf"; // Path relative to the public folder
              const link = document.createElement("a");
              link.href = pdfPath;
              link.download = "Seating_Chart.pdf"; // File name when downloaded
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              
              // Open in new tab after downloading
              setTimeout(() => {
                window.open(pdfPath, "_blank");
              }, 500);
            }}
          >
            View Seating Chart
          </button>
          
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => {
            router.push("/exam-center-allocation"); // Redirect to the new page
          }}
        >
          View Exam Center Allocation
        </button>
        <button
  className={`bg-blue-500 text-white px-4 py-2 rounded-md ${role === "student" ? "" : "hidden"}`} // Hide button for non-student roles
  onClick={() => {
    const pdfPath = "/HallTicket.jpg"; // Path relative to the public folder
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "HallTicket.jpg"; // File name when downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Open in new tab after downloading
    setTimeout(() => {
      window.open(pdfPath, "_blank");
    }, 500);
  }}
>
  Download Hall Ticket
</button>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" || role === "teacher" && <FormModal table="exam" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={examsData} />
      {/* PAGINATION */}

      <Pagination />
    </div>
  );
};

export default ExamListPage;

