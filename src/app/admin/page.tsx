import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser, isDatabaseConfigured } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
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

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <h1 style={{ fontSize: "28px" }}>Admin Dashboard</h1>
      <p>Signed in as {sessionUser.email}</p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Link
          href="/admin/posts"
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #555",
            background: "#151515",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Manage Blog Posts
        </Link>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #555",
              background: "#1f1f1f",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
