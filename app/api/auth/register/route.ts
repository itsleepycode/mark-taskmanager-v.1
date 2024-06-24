import prismadb from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const user = await req.json();
    const { nickname, email, password } = user;

    if (!email || !nickname || !password) {
      return new NextResponse("Data belum diisi", { status: 500 });
    }

    const userAlreadyExist = await prismadb.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExist?.id) {
      return new NextResponse("Users telah teregistrasi", { status: 500 });
    }

    const codex = await bcrypt.hash(password, 6);

    const newUser = await prismadb.user.create({
      data: {
        email: email,
        nickname: nickname,
        password: codex,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {}
}
