import prismadb from "@/libs/prismadb";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const userId = token?.sub;
    const { id } = params;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const task = await prismadb.task.delete({
      where: {
        id,
        userId,
      },
    });

    if (task) {
      return NextResponse.json(
        { message: "Task deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
  } catch (error) {
    console.log("ERROR DELETING TASKS", error);
    return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const userId = token?.sub;
    const { id } = params;
    const { title, description, date, isCompleted, isImportant } =
      await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updateTask = await prismadb.task.update({
      where: {
        id,
        userId,
      },

      data: {
        title,
        description,
        date,
        isCompleted,
        isImportant,
      },
    });

    if (updateTask) {
      return NextResponse.json({
        message: "Task updated successfully",
        task: updateTask,
      });
    } else {
      console.log("Task not found");
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
  } catch (error) {
    console.log("ERROR UPDATING TASKS", error);
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}
