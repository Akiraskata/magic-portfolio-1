import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser, isDatabaseConfigured } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditPost({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string }>;
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

  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) {
    redirect("/admin/posts?error=not-found");
  }

  const paramsData = await searchParams;
  const error = paramsData?.error;

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <h1 style={{ fontSize: "28px" }}>Edit Post</h1>
      <Link href="/admin/posts" style={{ color: "#9cc7ff", textDecoration: "none" }}>
        ← Back to posts
      </Link>
      {error && <p style={{ color: "#ff9c9c" }}>Failed: {error}</p>}
      <form
        action={`/api/admin/posts/${post.id}`}
        method="post"
        style={{ display: "grid", gap: "12px" }}
      >
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Title</span>
          <input
            type="text"
            name="title"
            required
            defaultValue={post.title}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Slug</span>
          <input
            type="text"
            name="slug"
            required
            defaultValue={post.slug}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Subtitle</span>
          <input
            type="text"
            name="subtitle"
            defaultValue={post.subtitle ?? ""}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Summary</span>
          <textarea
            name="summary"
            rows={3}
            defaultValue={post.summary ?? ""}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Image URL</span>
          <input
            type="text"
            name="image"
            defaultValue={post.image ?? ""}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Tag</span>
          <input
            type="text"
            name="tag"
            defaultValue={post.tag ?? ""}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Published date</span>
          <input
            type="date"
            name="publishedAt"
            defaultValue={post.publishedAt.toISOString().split("T")[0]}
            required
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Status</span>
          <select
            name="status"
            defaultValue={post.status}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Content (MDX)</span>
          <textarea
            name="content"
            rows={14}
            required
            defaultValue={post.content}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            type="submit"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #555",
              background: "#151515",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Save changes
          </button>
          <button
            type="submit"
            name="action"
            value="delete"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #7b2c2c",
              background: "#2a1212",
              color: "#ffb6b6",
              cursor: "pointer",
            }}
          >
            Delete post
          </button>
        </div>
      </form>
    </div>
  );
}
