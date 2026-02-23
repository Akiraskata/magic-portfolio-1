import { Feed } from "feed";
import fs from "fs";
import path from "path";

export async function generateRss(posts: any[]) {
    const feed = new Feed({
        title: "Akira Blog",
        description: "Akira personal blog",
        id: "https://www.akirakata.com/",
        link: "https://www.akirakata.com/",
        language: "ja",
        favicon: "https://www.akirakata.com/favicon.ico",
        copyright: `All rights reserved ${new Date().getFullYear()}`,
    });

    posts.forEach((post) => {
        feed.addItem({
            title: post.title,
            id: `https://www.akirakata.com/blog/${post.slug}`,
            link: `https://www.akirakata.com/blog/${post.slug}`,
            description: post.description,
            date: new Date(post.date),
        });
    });

    const outputPath = path.join(process.cwd(), "public", "rss.xml");
    fs.writeFileSync(outputPath, feed.rss2());
}