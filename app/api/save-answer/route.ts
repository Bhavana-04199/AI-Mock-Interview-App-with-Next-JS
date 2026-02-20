import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await db.insert(UserAnswer).values({
      mockIdRef: body.mockIdRef,
      question: body.question,
      correctAns: body.correctAns,
      userAns: body.userAns,
      feedback: body.feedback,
      rating: body.rating,
      userEmail: body.userEmail,
      createdAt: body.createdAt,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SAVE ANSWER API ERROR 👉", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
