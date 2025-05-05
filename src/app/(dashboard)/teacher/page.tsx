import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer"; // Use the container instead of BigCalendar

const TeacherPage = () => {
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT: Calendar Section */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md shadow-md">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Exam Schedule</h1>
          <BigCalendarContainer /> {/* Use the container here */}
        </div>
      </div>

      {/* RIGHT: Announcements Section */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;