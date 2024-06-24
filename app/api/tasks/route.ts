import prismadb from "@/libs/prismadb";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const userId = token?.sub;

    if (!userId) {
      console.log("Unauthorized: No user ID found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, date, completed, important } = body;

    if (!title || !date || !description) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (title.length < 3) {
      console.log("Title must be at least 3 characters long");
      return NextResponse.json(
        { error: "Title must be at least 3 characters long" },
        { status: 400 }
      );
    }

    const task = await prismadb.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR CREATING TASKS", error);
    return NextResponse.json(
      { error: "Error creating tasks" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const userId = token?.sub;

    if (!userId) {
      console.log("Unauthorized: No user ID found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tasks = await prismadb.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.log("ERROR GETTING TASKS", error);
    return NextResponse.json({ error: "Error getting tasks" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const userId = token?.sub;
    const { isCompleted, id } = await req.json();

    if (!userId) {
      console.log("Unauthorized: No user ID found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const task = await prismadb.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    console.log(task, "Task Updated");
    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    console.log("ERROR UPDATING TASKS", error);
    return NextResponse.json(
      { error: "Error updating tasks" },
      { status: 500 }
    );
  }
}
