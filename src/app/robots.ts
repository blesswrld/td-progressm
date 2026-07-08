import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/*?*sort=", "/*?*page=", "/.next/", "/out/"],
        },
        sitemap: "https://tdprogressm.ru/sitemap.xml",
    };
}
