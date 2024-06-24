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
