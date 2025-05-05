// TEMPORARY DATA
export let role: "student" | "teacher" | "parent" | "admin" = "admin";

export function setRole(newRole: "admin" | "teacher" | "parent" | "student") {
  role = newRole;
}

export const teachersData = [
  {
    id: 1,
    teacherId: "1000000001",
    name: "Rajesh Sharma",
    email: "rajesh.sharma@example.com",
    photo:
      "https://images.pexels.com/photos/3779782/pexels-photo-3779782.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "9876543210",
    subjects: ["Mathematics", "Algebra"],
    classes: ["6A", "7B", "8C"],
    address: "56, MG Road, Delhi, India",
  },
  {
    id: 2,
    teacherId: "1000000002",
    name: "Priya Mehta",
    email: "priya.mehta@example.com",
    photo:
      "https://images.pexels.com/photos/3153200/pexels-photo-3153200.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "9876543211",
    subjects: ["Physics", "Chemistry"],
    classes: ["9A", "10B", "12C"],
    address: "78, Anna Salai, Chennai, India",
  },
  {
    id: 3,
    teacherId: "1000000003",
    name: "Ananya Iyer",
    email: "ananya.iyer@example.com",
    photo:
      "https://images.pexels.com/photos/3772511/pexels-photo-3772511.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "9876543212",
    subjects: ["Biology", "Environmental Science"],
    classes: ["11A", "12B"],
    address: "23, Bannerghatta Road, Bangalore, India",
  },
  {
    id: 4,
    teacherId: "1000000004",
    name: "Vikram Sinha",
    email: "vikram.sinha@example.com",
    photo:
      "https://images.pexels.com/photos/3526022/pexels-photo-3526022.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "9876543213",
    subjects: ["History", "Civics"],
    classes: ["8A", "9B"],
    address: "12, Park Street, Kolkata, India",
  }
];

export const studentsData = [
  {
    id: 1,
    studentId: "2000000001",
    name: "Aarav Gupta",
    email: "aarav.gupta@example.com",
    photo:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "9123456789",
    grade: 10,
    class: "10A",
    address: "34, Andheri West, Mumbai, India",
  },
  {
    id: 2,
    studentId: "2000000002",
    name: "Ishita Verma",
    email: "ishita.verma@example.com",
    photo:
      "https://images.pexels.com/photos/1586757/pexels-photo-1586757.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "9123456790",
    grade: 9,
    class: "9B",
    address: "120, MG Road, Pune, India",
  },
  {
    id: 3,
    studentId: "2000000003",
    name: "Kabir Nair",
    email: "kabir.nair@example.com",
    photo:
      "https://images.pexels.com/photos/1506760/pexels-photo-1506760.jpeg?auto=compress&cs=tinysrgb&w=1200",
    phone: "9123456791",
    grade: 8,
    class: "8A",
    address: "77, Brigade Road, Bangalore, India",
  }
];export const parentsData = [
  {
    id: 1,
    name: "Rajesh Sharma",
    students: ["Aarav Mehta"],
    email: "rajesh.sharma@email.com",
    phone: "9876543210",
    address: "45 MG Road, Mumbai, India",
  },
  {
    id: 2,
    name: "Priya Verma",
    students: ["Sneha Iyer"],
    email: "priya.verma@email.com",
    phone: "9823456789",
    address: "12 Nehru Nagar, Delhi, India",
  },
  {
    id: 3,
    name: "Amit Patel",
    students: ["Rohan Desai"],
    email: "amit.patel@email.com",
    phone: "9901234567",
    address: "78 Park Street, Ahmedabad, India",
  },
  {
    id: 4,
    name: "Sanjay Nair",
    students: ["Pooja Menon", "Kabir Reddy"],
    email: "sanjay.nair@email.com",
    phone: "9811123456",
    address: "5 Bannerghatta Road, Bangalore, India",
  },
  {
    id: 5,
    name: "Neha Joshi",
    students: ["Riya Kapoor"],
    email: "neha.joshi@email.com",
    phone: "9922334455",
    address: "23 Sector 21, Noida, India",
  },
];

export const subjectsData = [
  {
    id: 1,
    name: "Mathematics",
    teachers: ["Anil Chatterjee", "Suresh Rao"],
  },
  {
    id: 2,
    name: "English",
    teachers: ["Meera Banerjee", "Vikram Shah"],
  },
  {
    id: 3,
    name: "Physics",
    teachers: ["Rajiv Khanna", "Poonam Sethi"],
  },
  {
    id: 4,
    name: "Chemistry",
    teachers: ["Arun Prasad", "Rekha Iyer"],
  },
  {
    id: 5,
    name: "Biology",
    teachers: ["Suman Das", "Neelam Gupta"],
  },
  {
    id: 6,
    name: "History",
    teachers: ["Ramesh Kulkarni", "Deepa Pillai"],
  },
  {
    id: 7,
    name: "Geography",
    teachers: ["Sandeep Yadav", "Asha Nambiar"],
  },
  {
    id: 8,
    name: "Art",
    teachers: ["Vijay Mehta", "Sunita Chopra"],
  },
  {
    id: 9,
    name: "Music",
    teachers: ["Krishna Bhatt", "Ananya Saxena"],
  },
  {
    id: 10,
    name: "Literature",
    teachers: ["Ritika Malhotra", "Manish Verma"],
  },
];

export const classesData = [
  {
    id: 1,
    name: "1A",
    capacity: 20,
    grade: 1,
    supervisor: "Arjun Mishra",
  },
  {
    id: 2,
    name: "2B",
    capacity: 22,
    grade: 2,
    supervisor: "Smita Joshi",
  },
  {
    id: 3,
    name: "3C",
    capacity: 20,
    grade: 3,
    supervisor: "Deepak Kumar",
  },
  {
    id: 4,
    name: "4B",
    capacity: 18,
    grade: 4,
    supervisor: "Rekha Sharma",
  },
  {
    id: 5,
    name: "5A",
    capacity: 16,
    grade: 5,
    supervisor: "Suresh Nair",
  },
  {
    id: 6,
    name: "6B",
    capacity: 22,
    grade: 6,
    supervisor: "Vandana Sinha",
  },
  {
    id: 7,
    name: "7A",
    capacity: 18,
    grade: 7,
    supervisor: "Kamal Kapoor",
  },
];

export const lessonsData = [
  {
    id: 1,
    subject: "Mathematics",
    class: "1A",
    teacher: "Ravi Sharma",
  },
  {
    id: 2,
    subject: "English",
    class: "2A",
    teacher: "Meera Banerjee",
  },
  {
    id: 3,
    subject: "Science",
    class: "3A",
    teacher: "Pankaj Malhotra",
  },
  {
    id: 4,
    subject: "Social Studies",
    class: "1B",
    teacher: "Ramesh Kulkarni",
  },
  {
    id: 5,
    subject: "Art",
    class: "4A",
    teacher: "Vijay Mehta",
  },
  {
    id: 6,
    subject: "Music",
    class: "5A",
    teacher: "Krishna Bhatt",
  },
  {
    id: 7,
    subject: "History",
    class: "6A",
    teacher: "Ramesh Kulkarni",
  },
  {
    id: 8,
    subject: "Geography",
    class: "6B",
    teacher: "Sandeep Yadav",
  },
  {
    id: 9,
    subject: "Physics",
    class: "6C",
    teacher: "Rajiv Khanna",
  },
  {
    id: 10,
    subject: "Chemistry",
    class: "4B",
    teacher: "Arun Prasad",
  },
];

export const examsData = [
  { id: 1, subject: "Mathematics", class: "1A", teacher: "Rajesh Sharma", date: "2025-01-01" },
  { id: 2, subject: "English", class: "2A", teacher: "Anita Verma", date: "2025-01-01" },
  { id: 3, subject: "Science", class: "3A", teacher: "Sunil Patel", date: "2025-01-01" },
  { id: 4, subject: "Social Science", class: "1B", teacher: "Priya Iyer", date: "2025-01-01" },
  { id: 5, subject: "Hindi", class: "4A", teacher: "Amitabh Tiwari", date: "2025-01-01" },
  { id: 6, subject: "Sanskrit", class: "5A", teacher: "Rohini Kulkarni", date: "2025-01-01" },
  { id: 7, subject: "History", class: "6A", teacher: "Vikram Menon", date: "2025-01-01" },
  { id: 8, subject: "Geography", class: "6B", teacher: "Neha Joshi", date: "2025-01-01" },
  { id: 9, subject: "Physics", class: "7A", teacher: "Dr. Ramesh Kumar", date: "2025-01-01" },
  { id: 10, subject: "Chemistry", class: "8A", teacher: "Dr. Manisha Desai", date: "2025-01-01" },
];

export const assignmentsData = [
  { id: 1, subject: "Mathematics", class: "1A", teacher: "Rajesh Sharma", dueDate: "2025-01-01" },
  { id: 2, subject: "English", class: "2A", teacher: "Anita Verma", dueDate: "2025-01-01" },
  { id: 3, subject: "Science", class: "3A", teacher: "Sunil Patel", dueDate: "2025-01-01" },
  { id: 4, subject: "Social Science", class: "1B", teacher: "Priya Iyer", dueDate: "2025-01-01" },
  { id: 5, subject: "Hindi", class: "4A", teacher: "Amitabh Tiwari", dueDate: "2025-01-01" },
  { id: 6, subject: "Sanskrit", class: "5A", teacher: "Rohini Kulkarni", dueDate: "2025-01-01" },
  { id: 7, subject: "History", class: "6A", teacher: "Vikram Menon", dueDate: "2025-01-01" },
  { id: 8, subject: "Geography", class: "6B", teacher: "Neha Joshi", dueDate: "2025-01-01" },
  { id: 9, subject: "Physics", class: "7A", teacher: "Dr. Ramesh Kumar", dueDate: "2025-01-01" },
  { id: 10, subject: "Chemistry", class: "8A", teacher: "Dr. Manisha Desai", dueDate: "2025-01-01" },
];

export const resultsData = [
  { id: 1, subject: "Mathematics", class: "1A", teacher: "Rajesh Sharma", student: "Aarav Mehta", date: "2025-01-01", type: "exam", score: 88 },
  { id: 2, subject: "English", class: "2A", teacher: "Anita Verma", student: "Kavya Sharma", date: "2025-01-01", type: "exam", score: 91 },
  { id: 3, subject: "Science", class: "3A", teacher: "Sunil Patel", student: "Aryan Gupta", date: "2025-01-01", type: "exam", score: 85 },
  { id: 4, subject: "Social Science", class: "1B", teacher: "Priya Iyer", student: "Neha Reddy", date: "2025-01-01", type: "exam", score: 79 },
  { id: 5, subject: "Hindi", class: "4A", teacher: "Amitabh Tiwari", student: "Rohan Singh", date: "2025-01-01", type: "exam", score: 92 },
  { id: 6, subject: "Sanskrit", class: "5A", teacher: "Rohini Kulkarni", student: "Ananya Deshmukh", date: "2025-01-01", type: "exam", score: 86 },
  { id: 7, subject: "History", class: "6A", teacher: "Vikram Menon", student: "Ishaan Nair", date: "2025-01-01", type: "exam", score: 81 },
  { id: 8, subject: "Geography", class: "6B", teacher: "Neha Joshi", student: "Diya Kapoor", date: "2025-01-01", type: "exam", score: 89 },
  { id: 9, subject: "Physics", class: "7A", teacher: "Dr. Ramesh Kumar", student: "Arjun Rao", date: "2025-01-01", type: "exam", score: 93 },
  { id: 10, subject: "Chemistry", class: "8A", teacher: "Dr. Manisha Desai", student: "Sanya Bajaj", date: "2025-01-01", type: "exam", score: 87 },
];

export const eventsData = [
  {
    id: 1,
    title: "Lake Trip",
    class: "1A",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 2,
    title: "Picnic",
    class: "2A",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 3,
    title: "Beach Trip",
    class: "3A",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 4,
    title: "Museum Trip",
    class: "4A",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 5,
    title: "Music Concert",
    class: "5A",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 6,
    title: "Magician Show",
    class: "1B",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 7,
    title: "Lake Trip",
    class: "2B",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 8,
    title: "Cycling Race",
    class: "3B",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 9,
    title: "Art Exhibition",
    class: "4B",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 10,
    title: "Sports Tournament",
    class: "5B",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
];

export const announcementsData = [
  {
    id: 1,
    title: "About 4A Math Test",
    class: "4A",
    date: "2025-01-01",
  },
  {
    id: 2,
    title: "About 3A Math Test",
    class: "3A",
    date: "2025-01-01",
  },
  {
    id: 3,
    title: "About 3B Math Test",
    class: "3B",
    date: "2025-01-01",
  },
  {
    id: 4,
    title: "About 6A Math Test",
    class: "6A",
    date: "2025-01-01",
  },
  {
    id: 5,
    title: "About 8C Math Test",
    class: "8C",
    date: "2025-01-01",
  },
  {
    id: 6,
    title: "About 2A Math Test",
    class: "2A",
    date: "2025-01-01",
  },
  {
    id: 7,
    title: "About 4C Math Test",
    class: "4C",
    date: "2025-01-01",
  },
  {
    id: 8,
    title: "About 4B Math Test",
    class: "4B",
    date: "2025-01-01",
  },
  {
    id: 9,
    title: "About 3C Math Test",
    class: "3C",
    date: "2025-01-01",
  },
  {
    id: 10,
    title: "About 1C Math Test",
    class: "1C",
    date: "2025-01-01",
  },
];


// YOU SHOULD CHANGE THE DATES OF THE EVENTS TO THE CURRENT DATE TO SEE THE EVENTS ON THE CALENDAR
export const calendarEvents = [
  {
    title: "Math",
    allDay: false,
    start: new Date(2024, 7, 12, 8, 0),
    end: new Date(2024, 7, 12, 8, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2024, 7, 12, 9, 0),
    end: new Date(2024, 7, 12, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2024, 7, 12, 10, 0),
    end: new Date(2024, 7, 12, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2024, 7, 12, 11, 0),
    end: new Date(2024, 7, 12, 11, 45),
  },
  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2024, 7, 12, 13, 0),
    end: new Date(2024, 7, 12, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2024, 7, 12, 14, 0),
    end: new Date(2024, 7, 12, 14, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2024, 7, 13, 9, 0),
    end: new Date(2024, 7, 13, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2024, 7, 13, 10, 0),
    end: new Date(2024, 7, 13, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2024, 7, 13, 11, 0),
    end: new Date(2024, 7, 13, 11, 45),
  },

  {
    title: "History",
    allDay: false,
    start: new Date(2024, 7, 13, 14, 0),
    end: new Date(2024, 7, 13, 14, 45),
  },
  {
    title: "Math",
    allDay: false,
    start: new Date(2024, 7, 14, 8, 0),
    end: new Date(2024, 7, 14, 8, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2024, 7, 14, 10, 0),
    end: new Date(2024, 7, 14, 10, 45),
  },

  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2024, 7, 14, 13, 0),
    end: new Date(2024, 7, 14, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2024, 7, 14, 14, 0),
    end: new Date(2024, 7, 13, 14, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2024, 7, 15, 9, 0),
    end: new Date(2024, 7, 15, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2024, 7, 15, 10, 0),
    end: new Date(2024, 7, 15, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2024, 7, 15, 11, 0),
    end: new Date(2024, 7, 15, 11, 45),
  },

  {
    title: "History",
    allDay: false,
    start: new Date(2024, 7, 15, 14, 0),
    end: new Date(2024, 7, 15, 14, 45),
  },
  {
    title: "Math",
    allDay: false,
    start: new Date(2024, 7, 16, 8, 0),
    end: new Date(2024, 7, 16, 8, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2024, 7, 16, 9, 0),
    end: new Date(2024, 7, 16, 9, 45),
  },

  {
    title: "Physics",
    allDay: false,
    start: new Date(2024, 7, 16, 11, 0),
    end: new Date(2024, 7, 16, 11, 45),
  },
  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2024, 7, 16, 13, 0),
    end: new Date(2024, 7, 16, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2024, 7, 16, 14, 0),
    end: new Date(2024, 7, 16, 14, 45),
  },
];