import { slugify as transliterate } from "transliteration";

export function slugify(input: string) {
  const normalized = transliterate(input, {
    lowercase: true,
    separator: "-",
  });

  return normalized
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
