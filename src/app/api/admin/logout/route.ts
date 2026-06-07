import { NextRequest, NextResponse } from "next/server";
import { clearSession, deleteSessionCookie, getSessionToken } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  const token = getSessionToken();
  await clearSession(token);
  deleteSessionCookie();
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
