import { NextResponse } from "next/server";
import db from "@/libs/db";
import bcrypt from "bcrypt";

// POST /api/auth/register with user prisma model scheme user data
export async function POST(request) {
  const body = await request.json();

  const userFound = await db.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (userFound) {
    if (userFound.email === body.email) {
      return NextResponse.json(
        { error: " Email already in use" },
        { status: 400 }
      );
    }
    if (userFound.username === body.username) {
      return NextResponse.json(
        { error: " Username already in use" },
        { status: 400 }
      );
    }
  } else {
    const hashedPassword = await bcrypt.hash(body.password, 12);
    const user = await db.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
        firstName: body.firstName,
        lastName: body.lastName,
        avatarUrl: body.avatarUrl,
      },
    });
    const { password:_, ...rest } = user;
    return NextResponse.json({ user }, { status: 201 });
  }
}
