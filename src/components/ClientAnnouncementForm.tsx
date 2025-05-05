"use client";

import AnnouncementForm from "@/components/forms/AnnouncementForm";
import { createAnnouncement, updateAnnouncement } from "@/lib/actions";

const ClientAnnouncementForm = ({
  type,
  announcement,
}: {
  type: "create" | "update";
  announcement?: { id: number; title: string; description: string; date: string; classId?: number };
}) => {
  const handleSubmit = async (data: FormData) => {
    if (type === "create") {
      await createAnnouncement(data);
    } else if (type === "update") {
      await updateAnnouncement(data);
    }
  };

  return <AnnouncementForm type={type} announcement={announcement} onSubmit={handleSubmit} />;
};

export default ClientAnnouncementForm;