import { authOption } from "@/libs/AuthOption";
import prismadb from "@/libs/prismadb";
import nextAuth, { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOption);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !date || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (title.length < 3) {
      return NextResponse.json(
        { error: "Title must be at least 3 characters long" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId: session.user.id,
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

export async function GET(req: Request) {
  try {
    const { userId } = nextAuth(authOption);

    const task = await prismadb.task.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    console.log("ERROR GETTING TASKS", error);
    return NextResponse.json({ error: "Error getting tasks" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
  } catch (error) {
    console.log("ERROR UPDATING TASKS", error);
    return NextResponse.json(
      { error: "Error updating tasks" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
  } catch (error) {
    console.log("ERROR DELETING TASKS", error);
    return NextResponse.json(
      { error: "Error deleting tasks" },
      { status: 500 }
    );
  }
}
