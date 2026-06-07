import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/utils/slugify";

export async function POST(request: NextRequest) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const subtitle = String(formData.get("subtitle") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const tag = String(formData.get("tag") || "").trim();
  const publishedAt = String(formData.get("publishedAt") || "").trim();
  const status = String(formData.get("status") || "DRAFT").trim();
  const content = String(formData.get("content") || "").trim();

  if (!title || !publishedAt || !content) {
    return NextResponse.redirect(new URL("/admin/posts/new?error=missing", request.url));
  }

  const slug = slugInput || slugify(title);
  if (!slug) {
    return NextResponse.redirect(new URL("/admin/posts/new?error=slug", request.url));
  }

  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.redirect(new URL("/admin/posts/new?error=slug-taken", request.url));
  }

  await prisma.blogPost.create({
    data: {
      slug,
      title,
      subtitle: subtitle || null,
      summary: summary || null,
      image: image || null,
      tag: tag || null,
      publishedAt: new Date(publishedAt),
      status: status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
      content,
    },
  });

  return NextResponse.redirect(new URL("/admin/posts?saved=true", request.url));
}
