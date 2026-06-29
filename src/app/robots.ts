import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/api/", // Закрываем наши прокси роуты
                "/*?*sort=", // Исключаем дубли страниц сортировок
                "/*?*page=", // Исключаем дубли страниц пагинации
                "/.next/",
                "/out/",
            ],
        },
        sitemap: "https://instrument-analog.ru/sitemap.xml",
    };
}
