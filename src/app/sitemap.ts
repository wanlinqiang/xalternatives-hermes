import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://bestalt.org";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/notion-alternatives`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/canva-alternatives`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/zapier-alternatives`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/slack-alternatives`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/asana-alternatives`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/monday-alternatives`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/airtable-alternatives`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/figma-alternatives`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
