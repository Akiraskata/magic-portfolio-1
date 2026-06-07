import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser, isDatabaseConfigured } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPosts({
  searchParams,
}: {
  searchParams?: Promise<{ saved?: string; error?: string }>;
}) {
  if (!isDatabaseConfigured()) {
    return (
      <div>
        <h1 style={{ fontSize: "24px", marginBottom: "12px" }}>Database not configured</h1>
        <p>Please set `DATABASE_URL` before using the admin panel.</p>
      </div>
    );
  }

  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    redirect("/admin/login");
  }

  const posts = await prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
  });

  const params = await searchParams;
  const saved = params?.saved;
  const error = params?.error;

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <h1 style={{ fontSize: "28px" }}>Blog Posts</h1>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Link
          href="/admin"
          style={{ color: "#9cc7ff", textDecoration: "none", alignSelf: "center" }}
        >
          ← Back to dashboard
        </Link>
        <Link
          href="/admin/posts/new"
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #555",
            background: "#151515",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          New post
        </Link>
      </div>
      {saved && <p style={{ color: "#9cffb5" }}>Post saved.</p>}
      {error && <p style={{ color: "#ff9c9c" }}>Failed: {error}</p>}
      <div style={{ border: "1px solid #2a2a2a", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#151515" }}>
            <tr>
              <th style={{ textAlign: "left", padding: "12px" }}>Title</th>
              <th style={{ textAlign: "left", padding: "12px" }}>Slug</th>
              <th style={{ textAlign: "left", padding: "12px" }}>Status</th>
              <th style={{ textAlign: "left", padding: "12px" }}>Updated</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} style={{ borderTop: "1px solid #222" }}>
                <td style={{ padding: "12px" }}>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    {post.title}
                  </Link>
                </td>
                <td style={{ padding: "12px", color: "#9ca3af" }}>{post.slug}</td>
                <td style={{ padding: "12px" }}>{post.status}</td>
                <td style={{ padding: "12px", color: "#9ca3af" }}>
                  {post.updatedAt.toISOString().split("T")[0]}
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: "12px", color: "#9ca3af" }}>
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
