import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "public/data/students.json");
const uploadsPath = path.join(process.cwd(), "public/uploads");

export async function GET(req: Request) {
  const url = new URL(req.url);
  const studentName = url.searchParams.get("studentName");
  const subjectName = url.searchParams.get("subjectName");

  if (!studentName || !subjectName) {
    return NextResponse.json({ error: "Student or subject missing." }, { status: 400 });
  }

  try {
    const data = await fs.readFile(dataPath, "utf-8").then(JSON.parse).catch(() => ({}));

    if (!data[studentName] || !data[studentName][subjectName]) {
      return NextResponse.json({ error: "Student or subject not found." }, { status: 404 });
    }

    const studentFolder = path.join(uploadsPath, studentName);
    const pdfName = `${subjectName}_Report.pdf`;
    const pdfPath = path.join(studentFolder, pdfName);

    const fileExists = await fs.access(pdfPath).then(() => true).catch(() => false);

    if (!fileExists) {
      return NextResponse.json({ error: "PDF not found." }, { status: 404 });
    }

    const pdfUrl = `/uploads/${studentName}/${pdfName}`;
    data[studentName][subjectName].pdfUrl = pdfUrl;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading student data:", error);
    return NextResponse.json({ error: "Failed to load student data." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const pdfFile = formData.get("pdf") as File | null;
  const studentName = formData.get("studentName") as string;
  const subjectName = formData.get("subjectName") as string;

  if (!pdfFile || !studentName || !subjectName) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const studentFolderPath = path.join(uploadsPath, studentName);
  await fs.mkdir(studentFolderPath, { recursive: true });

  const pdfBuffer = await pdfFile.arrayBuffer();
  const pdfPath = path.join(studentFolderPath, `${subjectName}_Report.pdf`);

  try {
    await fs.writeFile(pdfPath, new Uint8Array(pdfBuffer));

    let data: Record<string, any> = {};
    try {
      const fileData = await fs.readFile(dataPath, "utf-8");
      data = JSON.parse(fileData);
    } catch (error) {
      console.warn("students.json not found. Creating new file.");
      data = {};
    }

    if (!data[studentName]) data[studentName] = {};
    if (!data[studentName][subjectName]) {
      data[studentName][subjectName] = {
        internal: 0,
        assignment: 0,
        attendance: 0,
        viva: 0,
        endTerm: 0,
        pdfUrl: `/uploads/${studentName}/${subjectName}_Report.pdf`,
      };
    } else {
      data[studentName][subjectName].pdfUrl = `/uploads/${studentName}/${subjectName}_Report.pdf`;
    }

    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ pdfUrl: data[studentName][subjectName].pdfUrl });
  } catch (error) {
    console.error("Error saving PDF:", error);
    return NextResponse.json({ error: "Failed to save PDF" }, { status: 500 });
  }
}