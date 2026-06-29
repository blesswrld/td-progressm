import { products, categories } from "@/mockData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import OrderButton from "@/components/OrderButton";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ id: string }>;
}

// 1. ДИНАМИЧЕСКОЕ SEO (МЕТАТЕГИ И OPEN GRAPH)
export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const product = products.find((p) => p.id === resolvedParams.id);

    if (!product) return { title: "Товар не найден | ТСК ПРОГРЕСС" };

    const title = `${product.name} — купить по выгодной цене | ТСК ПРОГРЕСС`;
    const description = `Заказывайте ${product.name} (артикул: ${product.article}) с доставкой. Низкие цены, официальная гарантия, профессиональный инструмент от компании ТСК ПРОГРЕСС.`;

    return {
        title,
        description,
        keywords: [
            product.name,
            product.article,
            "купить инструмент",
            "ТСК ПРОГРЕСС",
            product.group,
        ],
        openGraph: {
            title,
            description,
            type: "video.other", // Для e-commerce страниц
            images: [
                {
                    url: product.image || "/og-image.jpg",
                    width: 800,
                    height: 800,
                    alt: product.name,
                },
            ],
        },
    };
}

export default async function ProductPage({ params }: PageProps) {
    const resolvedParams = await params;
    const product = products.find((p) => p.id === resolvedParams.id);

    if (!product) {
        notFound();
    }

    const category = categories.find((c) => c.id === product.categoryId);

    // 2. МИКРОРАЗМЕТКА ДЛЯ ПОИСКОВИКОВ (JSON-LD)
    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.image || "",
        sku: product.article,
        mpn: product.article,
        category: category?.name || product.group,
        brand: {
            "@type": "Brand",
            name: "ТСК ПРОГРЕСС",
        },
        offers: {
            "@type": "Offer",
            url: `https://instrument-analog.ru/product/${product.id}`,
            priceCurrency: "RUB",
            price: product.price || 0,
            priceValidUntil: "2027-12-31",
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
        },
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: "https://instrument-analog.ru",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Каталог",
                item: "https://instrument-analog.ru/catalog",
            },
            ...(category
                ? [
                      {
                          "@type": "ListItem",
                          position: 3,
                          name: category.name,
                          item: `https://instrument-analog.ru/catalog/${category.slug}`,
                      },
                  ]
                : []),
            {
                "@type": "ListItem",
                position: category ? 4 : 3,
                name: product.name,
                item: `https://instrument-analog.ru/product/${product.id}`,
            },
        ],
    };

    return (
        <main className="min-h-screen p-6 sm:p-8 max-w-7xl mx-auto w-full">
            {/* Внедрение JSON-LD разметки в код страницы */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productJsonLd),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbsJsonLd),
                }}
            />

            {/* Кнопка назад */}
            <Link
                href={category ? `/catalog/${category.slug}` : "/catalog"}
                className="inline-flex items-center gap-2 text-sm font-medium text-text-main hover:text-primary mb-6 transition-colors group w-fit"
            >
                <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                />
                Назад в категорию
            </Link>

            {/* Хлебные крошки */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-text-main mb-8">
                <Link href="/" className="hover:text-primary transition-colors">
                    Главная
                </Link>
                <span>/</span>
                <Link
                    href="/catalog"
                    className="hover:text-primary transition-colors"
                >
                    Каталог
                </Link>
                <span>/</span>
                {category && (
                    <>
                        <Link
                            href={`/catalog/${category.slug}`}
                            className="hover:text-primary transition-colors"
                        >
                            {category.name}
                        </Link>
                        <span>/</span>
                    </>
                )}
                <span className="text-gray-400 truncate max-w-[200px] sm:max-w-md">
                    {product.name}
                </span>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-border-main shadow-sm flex flex-col md:flex-row gap-10 lg:gap-16">
                {/* Левая колонка: Изображение */}
                <div className="md:w-1/2 flex-shrink-0">
                    <div className="w-full aspect-square bg-bg-light rounded-2xl flex items-center justify-center p-8 border border-gray-100 relative overflow-hidden">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="object-contain w-full h-full mix-blend-multiply"
                            />
                        ) : (
                            <span className="text-6xl">📦</span>
                        )}
                    </div>
                </div>

                {/* Правая колонка: Инфо и Кнопки */}
                <div className="md:w-1/2 flex flex-col justify-center">
                    <p className="text-sm font-mono text-gray-400 mb-4 bg-gray-50 inline-block px-3 py-1 rounded-md border border-gray-100 w-fit">
                        Артикул: {product.article}
                    </p>

                    {/* Строго единственный H1 на странице для SEO */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark leading-tight mb-6">
                        {product.name}
                    </h1>

                    <div className="space-y-3 mb-8 bg-green-50/50 p-4 rounded-xl border border-green-100">
                        <div className="flex items-center gap-3 text-sm text-dark">
                            <CheckCircle2
                                size={18}
                                className="text-green-500"
                            />
                            <span>Официальная гарантия производителя</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-dark">
                            <CheckCircle2
                                size={18}
                                className="text-green-500"
                            />
                            <span>Доставка по всей России или самовывоз</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100">
                        <OrderButton
                            name={product.name}
                            article={product.article}
                        />
                        <p className="text-xs text-gray-400 mt-4 max-w-sm">
                            Точная цена зависит от объема партии и текущего
                            курса. Оставьте заявку, и менеджер подготовит
                            индивидуальное КП.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
