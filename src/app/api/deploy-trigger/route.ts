export async function POST() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-blog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            return new Response("Failed to trigger send-blog", { status: 500 });
        }

        return new Response("Deploy trigger executed", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Error", { status: 500 });
    }
}