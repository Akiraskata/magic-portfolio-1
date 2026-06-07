import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/adminAuth";
import { getPosts } from "@/utils/utils";

export type BlogPostItem = {
  slug: string;
  content: string;
  source: "mdx" | "db";
  metadata: {
    title: string;
    subtitle?: string;
    publishedAt: string;
    summary?: string;
    image?: string;
    tag?: string;
  };
};

export function getMdxBlogPosts(): BlogPostItem[] {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
    content: post.content,
    source: "mdx",
    metadata: {
      title: post.metadata.title,
      subtitle: post.metadata.subtitle,
      publishedAt: post.metadata.publishedAt,
      summary: post.metadata.summary,
      image: post.metadata.image,
      tag: post.metadata.tag,
    },
  }));
}

export async function getDbBlogPosts(options?: { includeDrafts?: boolean }) {
  if (!isDatabaseConfigured()) return [] as BlogPostItem[];

  const posts = await prisma.blogPost.findMany({
    where: options?.includeDrafts ? undefined : { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return posts.map((post) => ({
    slug: post.slug,
    content: post.content,
    source: "db" as const,
    metadata: {
      title: post.title,
      subtitle: post.subtitle ?? undefined,
      publishedAt: post.publishedAt.toISOString(),
      summary: post.summary ?? undefined,
      image: post.image ?? undefined,
      tag: post.tag ?? undefined,
    },
  }));
}

export async function getAllBlogPosts(options?: { includeDrafts?: boolean }) {
  const mdxPosts = getMdxBlogPosts();
  const dbPosts = await getDbBlogPosts(options);
  const merged = new Map<string, BlogPostItem>();
  [...dbPosts, ...mdxPosts].forEach((post) => {
    if (!merged.has(post.slug)) {
      merged.set(post.slug, post);
    }
  });

  return Array.from(merged.values()).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );
}

export async function getBlogPostBySlug(
  slug: string,
  options?: { includeDrafts?: boolean },
): Promise<BlogPostItem | null> {
  const dbPosts = await getDbBlogPosts(options);
  const dbMatch = dbPosts.find((post) => post.slug === slug);
  if (dbMatch) return dbMatch;

  const mdxMatch = getMdxBlogPosts().find((post) => post.slug === slug);
  return mdxMatch ?? null;
}
