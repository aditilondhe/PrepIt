import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();

    cookieStore.set("session", "", {
      maxAge: 0,     
      path: "/",
      httpOnly: true,
    });

    return NextResponse.redirect(new URL("/sign-in", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      { message: "Something went wrong during logout." },
      { status: 500 }
    );
  }
}