import type { MetadataRoute } from "next";

const BASE_URL = "https://atelier-shahrazad.com";
const LOCALES  = ["en", "fr"] as const;
const PAGES    = ["", "/contact", "/pricing"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of PAGES) {
      entries.push({
        url:          `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority:     page === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
