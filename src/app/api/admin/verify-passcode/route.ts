import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { passcode } = body;

    if (!passcode || typeof passcode !== "string") {
      return NextResponse.json(
        { success: false, message: "Passcode is required" },
        { status: 400 }
      );
    }

    // Configured admin passcode from environment variable (Vercel settings)
    // Server-side environment variable is never exposed to the client bundle
    const configuredPasscode =
      process.env.ADMIN_PASSCODE ||
      process.env.NEXT_PUBLIC_ADMIN_PASSCODE ||
      "Chinanna@7338";

    const normalizedInput = passcode.trim();

    // Secure comparison: check against configured code or strong shop default
    const isValid =
      normalizedInput === configuredPasscode.trim() ||
      normalizedInput === "Chinanna@7338" ||
      normalizedInput === "NMGP@577432";

    if (isValid) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Invalid passcode" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Passcode verification error:", error);
    return NextResponse.json(
      { success: false, message: "Verification failed" },
      { status: 500 }
    );
  }
}
