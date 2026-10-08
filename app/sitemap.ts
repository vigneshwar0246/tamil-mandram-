import type { MetadataRoute } from "next";
import { siteUrl } from "./data/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl.toString(), changeFrequency: "monthly", priority: 1 }];
}
