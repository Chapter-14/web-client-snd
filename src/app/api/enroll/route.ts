import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Initialize Supabase Admin Client
// note: Ensure these env vars are in your .env.local file
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    // 1. Authenticate user via Clerk
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: You must be logged in." },
        { status: 401 }
      );
    }

    // 2. Parse the Request Body to get courseId
    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    // 3. Perform the Insert as Admin
    const { error } = await supabaseAdmin.from("enrollments").insert({
      course_id: courseId,
      user_id: userId, // The Clerk ID
    });

    if (error) {
      // Handle "Unique Constraint" violation (Already enrolled)
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "You are already enrolled in this course." },
          { status: 409 } // 409 Conflict
        );
      }

      console.error("Supabase Error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // 4. Success Response
    return NextResponse.json(
      { success: true, message: "Enrolled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
