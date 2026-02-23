import { NextResponse } from "next/server";

const API_KEY = process.env.MAILCHIMP_API_KEY!;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!;
const SERVER = process.env.MAILCHIMP_SERVER!;

const BASE = `https://${SERVER}.api.mailchimp.com/3.0`;

export async function POST(req: Request) {
    const { title, url, excerpt } = await req.json();

    // 1️⃣ 创建 Campaign
    const campaignRes = await fetch(`${BASE}/campaigns`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString("base64")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: "regular",
            recipients: {
                list_id: AUDIENCE_ID,
            },
            settings: {
                subject_line: title,
                from_name: "Akira",
                reply_to: "your@email.com",
            },
        }),
    });

    const campaign = await campaignRes.json();

    // 2️⃣ 设置内容
    await fetch(`${BASE}/campaigns/${campaign.id}/content`, {
        method: "PUT",
        headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString("base64")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            html: `
        <h1>${title}</h1>
        <p>${excerpt}</p>
        <a href="${url}">Read More</a>
      `,
        }),
    });

    // 3️⃣ 发送
    await fetch(`${BASE}/campaigns/${campaign.id}/actions/send`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString("base64")}`,
        },
    });

    return NextResponse.json({ success: true });
}