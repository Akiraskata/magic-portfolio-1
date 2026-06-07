import { redirect } from "next/navigation";
import { countAdmins, getSessionUser, isDatabaseConfigured } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminLogin({
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
  if (sessionUser) {
    redirect("/admin");
  }

  const adminCount = await countAdmins();
  if (adminCount === 0) {
    redirect("/admin/setup");
  }

  const params = await searchParams;
  const error = params?.error;

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <h1 style={{ fontSize: "28px" }}>Admin Login</h1>
      {error && (
        <p style={{ color: "#ff9c9c" }}>
          {error === "invalid" ? "Invalid email or password." : "Login failed."}
        </p>
      )}
      <form action="/api/admin/login" method="post" style={{ display: "grid", gap: "12px" }}>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            required
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #333" }}
          />
        </label>
        <label style={{ display: "grid", gap: "6px" }}>
          <span>Password</span>
          <input
            type="password"
            name="password"
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
          Log in
        </button>
      </form>
    </div>
  );
}
