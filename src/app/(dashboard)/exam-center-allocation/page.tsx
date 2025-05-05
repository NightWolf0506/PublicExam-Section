"use client";  // This tells Next.js that the component is a Client Component

import React, { useState, useEffect } from "react";
import { NextPage } from "next";

interface Student {
  name: string;
  latitude: number;
  longitude: number;
}

interface ExamCenter {
  name: string;
  latitude: number;
  longitude: number;
}

interface Allocation {
  student: string;
  center: string;
  distance: string;
}


const students: Student[] = [
  { "name": "Amit Sharma", "latitude": 28.7041, "longitude": 77.1025 },
  { "name": "Priya Verma", "latitude": 19.0760, "longitude": 72.8777 },
  { "name": "Rahul Mehta", "latitude": 22.7196, "longitude": 75.8577 },
  { "name": "Sonia Reddy", "latitude": 15.2993, "longitude": 74.1240 },
  { "name": "Vikas Yadav", "latitude": 26.8467, "longitude": 80.9462 },
  { "name": "Neha Joshi", "latitude": 23.0225, "longitude": 72.5714 },
  { "name": "Arjun Singh", "latitude": 18.5204, "longitude": 73.8567 },
  { "name": "Pooja Desai", "latitude": 21.1702, "longitude": 72.8311 },
  { "name": "Rohan Bhatia", "latitude": 25.3176, "longitude": 82.9739 },
  { "name": "Kavita Choudhary", "latitude": 30.7333, "longitude": 76.7794 },
  { "name": "Vivek Kumar", "latitude": 27.1767, "longitude": 78.0081 },
  { "name": "Simran Kaur", "latitude": 13.0827, "longitude": 80.2707 },
  { "name": "Rajat Kapoor", "latitude": 22.5726, "longitude": 88.3639 },
  { "name": "Deepak Chauhan", "latitude": 25.5941, "longitude": 85.1376 },
  { "name": "Megha Nair", "latitude": 9.9312, "longitude": 76.2673 },
  { "name": "Alok Pandey", "latitude": 26.4499, "longitude": 74.6399 },
  { "name": "Tanvi Malhotra", "latitude": 19.2183, "longitude": 72.9781 },
  { "name": "Harshit Gupta", "latitude": 17.3850, "longitude": 78.4867 },
  { "name": "Shruti Das", "latitude": 11.0168, "longitude": 76.9558 },
  { "name": "Aakash Rana", "latitude": 23.3441, "longitude": 85.3096 },
  { "name": "Payal Tiwari", "latitude": 30.3165, "longitude": 78.0322 },
  { "name": "Aniket Sen", "latitude": 18.6298, "longitude": 73.7997 },
  { "name": "Rashi Bhatt", "latitude": 20.5937, "longitude": 78.9629 },
  { "name": "Yash Rajput", "latitude": 24.5854, "longitude": 73.7125 },
  { "name": "Kiran Pillai", "latitude": 8.5241, "longitude": 76.9366 },
  { "name": "Varun Joshi", "latitude": 26.9124, "longitude": 75.7873 },
  { "name": "Sneha Dutta", "latitude": 21.1458, "longitude": 79.0882 },
  { "name": "Ravi Saxena", "latitude": 22.3072, "longitude": 73.1812 },
  { "name": "Divya Menon", "latitude": 12.9716, "longitude": 77.5946 },
  { "name": "Ishaan Malhotra", "latitude": 27.2046, "longitude": 77.4977 },
  { "name": "Aditi Mishra", "latitude": 10.8505, "longitude": 76.2711 },
  { "name": "Nitin Bansal", "latitude": 16.5062, "longitude": 80.6480 },
  { "name": "Pallavi Srivastava", "latitude": 25.5788, "longitude": 91.8933 },
  { "name": "Manoj Thakur", "latitude": 22.7803, "longitude": 86.2029 },
  { "name": "Kartik Ahuja", "latitude": 15.9129, "longitude": 79.7400 },
  { "name": "Sunita Yadav", "latitude": 26.4890, "longitude": 80.3319 },
  { "name": "Rohit Kulkarni", "latitude": 18.9894, "longitude": 72.8292 },
  { "name": "Anjali Chopra", "latitude": 32.7266, "longitude": 74.8570 },
  { "name": "Suresh Kamble", "latitude": 19.9975, "longitude": 73.7898 },
  { "name": "Pooja Nair", "latitude": 20.2961, "longitude": 85.8245 },
  { "name": "Aditya Iyer", "latitude": 13.6288, "longitude": 79.4192 },
  { "name": "Tanya Bajaj", "latitude": 14.7504, "longitude": 78.5755 },
  { "name": "Rahul Sen", "latitude": 21.1702, "longitude": 72.8311 },
  { "name": "Kritika Taneja", "latitude": 25.0961, "longitude": 85.3131 },
  { "name": "Amitabh Sharma", "latitude": 29.0588, "longitude": 76.0856 },
  { "name": "Swati Arora", "latitude": 28.7041, "longitude": 77.1025 },
];

const examCenters: ExamCenter[] = [
  { "name": "City Public School", "latitude": 28.5355, "longitude": 77.3910 },
  { "name": "National Institute of Technology", "latitude": 22.5726, "longitude": 88.3639 },
  { "name": "Global Academy", "latitude": 19.2183, "longitude": 72.9781 },
  { "name": "ABC University", "latitude": 16.5062, "longitude": 80.6480 },
  { "name": "XYZ High School", "latitude": 27.1767, "longitude": 78.0081 },
  { "name": "Government Polytechnic", "latitude": 23.2599, "longitude": 77.4126 },
  { "name": "Modern Engineering College", "latitude": 18.5913, "longitude": 73.7389 },
  { "name": "St. Peter's Institute", "latitude": 20.5937, "longitude": 78.9629 },
  { "name": "Elite Coaching Center", "latitude": 25.4358, "longitude": 81.8463 },
  { "name": "Cambridge International School", "latitude": 31.1048, "longitude": 77.1734 },
];

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const StudentExamAllocation: NextPage = () => {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const allocateStudents = () => {
      const allocationList = students.map((student) => {
        let minDistance = Infinity;
        let nearestCenter: string | null = null;

        examCenters.forEach((center) => {
          const distance = calculateDistance(
            student.latitude,
            student.longitude,
            center.latitude,
            center.longitude
          );

          if (distance < minDistance) {
            minDistance = distance;
            nearestCenter = center.name;
          }
        });

        return {
          student: student.name,
          center: nearestCenter || "Unknown",
          distance: minDistance.toFixed(2),
        };
      });

      setAllocations(allocationList);
    };

    allocateStudents();
  }, []);

  const filteredAllocations = allocations.filter(
    (allocation) =>
      allocation.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      allocation.center.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-5 bg-white  min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold text-yellow-500 mb-6">
        Student Exam Center Allocation
      </h2>
      <input
        type="text"
        placeholder="Search by Student Name or Exam Center"
        className="w-full max-w-4xl p-2 mb-5 text-black rounded-lg border-2 border-yellow-500 focus:ring-2 focus:ring-yellow-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700 shadow-lg">
          <thead>
            <tr className="bg-yellow-500 text-black">
              <th className="border border-gray-700 px-4 py-2">Student Name</th>
              <th className="border border-gray-700 px-4 py-2">Allocated Exam Center</th>
              <th className="border border-gray-700 px-4 py-2">Distance (km)</th>
            </tr>
          </thead>
          <tbody>
            {filteredAllocations.map((allocation, index) => (
              <tr
                key={index}
                className="text-black hover:bg-yellow-600 hover:text-black transition duration-200"
              >
                <td className="border border-gray-700 px-4 py-2">{allocation.student}</td>
                <td className="border border-gray-700 px-4 py-2">{allocation.center}</td>
                <td className="border border-gray-700 px-4 py-2">{allocation.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentExamAllocation;
