import { NextRequest, NextResponse } from "next/server";
import { countAdmins, createAdmin, createSession, getSessionCookieOptions } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    return NextResponse.redirect(new URL("/admin/setup?error=missing", request.url));
  }

  const adminCount = await countAdmins();
  if (adminCount > 0) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const user = await createAdmin(email, password);
  const session = await createSession(user.id);

  const response = NextResponse.redirect(new URL("/admin", request.url));
  response.cookies.set("admin_session", session.token, getSessionCookieOptions(session.expiresAt));
  return response;
}
