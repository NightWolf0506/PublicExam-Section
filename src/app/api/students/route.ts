import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "public/data/students.json");

export async function GET() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const parsedData = JSON.parse(data);

    if (typeof parsedData !== "object") {
      throw new Error("Invalid data format");
    }

    return NextResponse.json(parsedData, { status: 200, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error("Error loading student data:", error);
    return NextResponse.json({ error: "Failed to load student data." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newData = await request.json();
    await fs.writeFile(dataPath, JSON.stringify(newData, null, 2), "utf-8");
    return NextResponse.json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving student data:", error);
    return NextResponse.json({ error: "Failed to save data." }, { status: 500 });
  }
}