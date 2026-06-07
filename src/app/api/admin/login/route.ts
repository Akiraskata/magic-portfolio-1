import { NextRequest, NextResponse } from "next/server";
import { createSession, getSessionCookieOptions, verifyAdmin } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  const user = await verifyAdmin(email, password);
  if (!user) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url));
  }

  const session = await createSession(user.id);
  const response = NextResponse.redirect(new URL("/admin", request.url));
  response.cookies.set("admin_session", session.token, getSessionCookieOptions(session.expiresAt));
  return response;
}
