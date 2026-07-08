import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
    subsets: ["latin", "cyrillic"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-montserrat",
});

export const metadata: Metadata = {
    title: "ТД Прогресс — Профессиональный инструмент",
    description:
        "Комплексные поставки строительных материалов от фундамента до кровли. Работаем напрямую от производителей.",
    icons: {
        icon: "/progressm-logo.png",
        apple: "/progressm-logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body
                className={`${montserrat.className} antialiased flex flex-col min-h-screen`}
            >
                <Header />

                <div className="grow">{children}</div>

                <Footer />
            </body>
        </html>
    );
}
