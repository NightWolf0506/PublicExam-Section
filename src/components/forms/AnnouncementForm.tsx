"use client";

import { useState } from "react";

const AnnouncementForm = ({
  type,
  announcement,
  onSubmit,
}: {
  type: "create" | "update";
  announcement?: { id: number; title: string; description: string; date: string; classId?: number };
  onSubmit: (data: FormData) => void;
}) => {
  const [title, setTitle] = useState(announcement?.title || "");
  const [description, setDescription] = useState(announcement?.description || "");
  const [date, setDate] = useState(announcement?.date || "");
  const [classId, setClassId] = useState(announcement?.classId || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (type === "update") formData.append("id", String(announcement?.id));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    if (classId) formData.append("classId", String(classId));
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        placeholder="Class ID (optional)"
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {type === "create" ? "Create Announcement" : "Update Announcement"}
      </button>
    </form>
  );
};

export default AnnouncementForm;