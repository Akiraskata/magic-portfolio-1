import { NextRequest, NextResponse } from "next/server";
import {
  clearSession,
  deleteSessionCookie,
  getSessionToken,
} from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  const token = await getSessionToken();
  await clearSession(token);
  await deleteSessionCookie();

  return NextResponse.redirect(
      new URL("/admin/login", request.url)
  );
}