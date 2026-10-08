import type { MetadataRoute } from "next";
import { siteUrl } from "./data/siteUrl";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: new URL("/sitemap.xml", siteUrl).toString() };
}
