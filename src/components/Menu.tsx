"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin","teacher","student"],
      },
      {
        icon: "/lesson.png",
        label: "Seating Chart",
        href: "/seating-chart",
        visible: ["admin"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/lesson.png",
        label: "Teacher DashBoard (Marks Upload)",
        href: "/teacher-dashboard",
        visible: ["teacher"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/lesson.png",
        label: "Results",
        href: "/results",
        visible: ["student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  const { user } = useUser(); // Fetch the logged-in user
  const role = user?.publicMetadata?.role as string; // Explicitly cast role to string

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-black bold font-serif text-2xl my-4">
            {i.title}
          </span>
          <hr />
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-black py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
      <div className="flex flex-col gap-2 mt-1">
        <SignOutButton>
          <button className="flex items-center justify-center lg:justify-start gap-4 text-black py-2 md:px-2 rounded-md hover:bg-lamaSkyLight">
            <Image src="/logout.png" alt="Logout" width={20} height={20} />
            <span className="hidden lg:block">Logout</span>
          </button>
        </SignOutButton>
      </div>
      <hr />
    </div>
  );
};

export default Menu;