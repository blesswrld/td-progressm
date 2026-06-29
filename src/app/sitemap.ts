import { categories, products } from "@/mockData";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://instrument-analog.ru"; // Заменить на реальный домен сайта

    const categoryUrls = categories.map((cat) => ({
        url: `${baseUrl}/catalog/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    const productUrls = products.map((prod) => ({
        url: `${baseUrl}/product/${prod.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    const staticUrls = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/catalog`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.4,
        },
        {
            url: `${baseUrl}/delivery`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.4,
        },
        {
            url: `${baseUrl}/warranty`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.4,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.2,
        },
    ];

    return [...staticUrls, ...categoryUrls, ...productUrls];
}
