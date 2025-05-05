"use client"; // ✅ Add this at the top to make it a Client Component

import { useUser } from "@clerk/nextjs"; // ✅ Import Clerk for user auth
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { assignmentsData } from "@/lib/data"; // ❌ Removed static role import
import Image from "next/image";

type Assignment = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
};

const columns = [
  { header: "Subject Name", accessor: "subject" },
  { header: "Class", accessor: "class" },
  { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "Due Date", accessor: "dueDate", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "action" },
];

const AssignmentListPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [userRole, setUserRole] = useState("user"); // Default role is "user"

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const role = (user?.publicMetadata?.role as string) || "user"; // ✅ Fetch role dynamically
      setUserRole(role);
    }
  }, [isLoaded, isSignedIn, user]);

  const renderRow = (item: Assignment) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.dueDate}</td>
      <td>
        <div className="flex items-center gap-2">
          {(userRole === "admin" || userRole === "teacher") && (
            <>
              <button className="text-blue-500">Edit</button>
              <button className="text-red-500">Delete</button>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP SECTION */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {(userRole === "admin" || userRole === "teacher") && (
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Assignment</button>
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={assignmentsData} />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default AssignmentListPage;
