import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/*?*sort=", "/*?*page=", "/.next/", "/out/"],
        },
        // Заменить на реальный домен сайта
        sitemap: "https://instrument-analog.ru/sitemap.xml",
    };
}
