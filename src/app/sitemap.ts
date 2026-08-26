import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/data/registry";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = getProjectSlugs().map((slug) => ({
    url: `${siteConfig.url}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
