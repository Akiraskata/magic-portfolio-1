import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser, isDatabaseConfigured } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function NewPost({
  searchParams,
}: {
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

  const params = await searchParams;
  const error = params?.error;

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <h1 style={{ fontSize: "28px" }}>New Blog Post</h1>
      <Link href="/admin/posts" style={{ color: "#9cc7ff", textDecoration: "none" }}>
        ← Back to posts
      </Link>
      {error && <p style={{ color: "#ff9c9c" }}>Failed: {error}</p>}
      <form action="/api/admin/posts" method="post" style={{ display: "grid", gap: "12px" }}>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Title</span>
          <input
            type="text"
            name="title"
            required
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Slug (optional)</span>
          <input
            type="text"
            name="slug"
            placeholder="auto-generated from title"
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Subtitle</span>
          <input
            type="text"
            name="subtitle"
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Summary</span>
          <textarea
            name="summary"
            rows={3}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Image URL</span>
          <input
            type="text"
            name="image"
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Tag</span>
          <input
            type="text"
            name="tag"
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Published date</span>
          <input
            type="date"
            name="publishedAt"
            required
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Status</span>
          <select
            name="status"
            defaultValue="DRAFT"
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
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
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
          Create post
        </button>
      </form>
    </div>
  );
}
