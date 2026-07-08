import { products, categories } from "@/mockData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import OrderButton from "@/components/OrderButton";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const product = products.find((p) => p.id === resolvedParams.id);

    if (!product) return { title: "Товар не найден | ТД Прогресс" };

    const title = `${product.name} — купить по выгодной цене | ТД Прогресс`;
    const description = `Заказывайте ${product.name} (артикул: ${product.article}) с доставкой. Низкие цены, официальная гарантия, профессиональный инструмент от компании ТД Прогресс.`;

    return {
        title,
        description,
        keywords: [
            product.name,
            product.article,
            "купить инструмент",
            "ТД Прогресс",
            product.group,
        ],
        openGraph: {
            title,
            description,
            type: "video.other",
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

    const similarProducts = products
        .filter(
            (p) => p.categoryId === product.categoryId && p.id !== product.id,
        )
        .slice(0, 4);

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
            name: "ТД Прогресс",
        },
        offers: {
            "@type": "Offer",
            // Заменить домен на реальный домен сайта
            url: `https://instrument-analog.ru/product/${product.id}`,
            priceCurrency: "RUB",
            price: 0,
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
                // Заменить домен на реальный домен сайта
                item: "https://instrument-analog.ru",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Каталог",
                // Заменить домен на реальный домен сайта
                item: "https://instrument-analog.ru/catalog",
            },
            ...(category
                ? [
                      {
                          "@type": "ListItem",
                          position: 3,
                          name: category.name,
                          // Заменить домен на реальный домен сайта
                          item: `https://instrument-analog.ru/catalog/${category.slug}`,
                      },
                  ]
                : []),
            {
                "@type": "ListItem",
                position: category ? 4 : 3,
                name: product.name,
                // Заменить домен на реальный домен сайта
                item: `https://instrument-analog.ru/product/${product.id}`,
            },
        ],
    };

    return (
        <main className="min-h-screen p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
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

            <Link
                href={category ? `/catalog/${category.slug}` : "/catalog"}
                className="inline-flex items-center gap-2 text-sm font-bold text-dark bg-white border border-gray-200 rounded-xl px-4 py-2.5 hover:border-primary hover:text-primary mb-6 transition-all duration-200 active:scale-95 w-fit shadow-sm"
            >
                <ArrowLeft size={16} />
                Назад в категорию
            </Link>

            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-400 mb-6 bg-white border border-gray-100 rounded-xl px-4 py-2 w-fit shadow-sm">
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
                <span className="text-dark font-semibold truncate max-w-[150px] sm:max-w-md">
                    {product.name}
                </span>
            </div>

            <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 border border-gray-200 shadow-sm flex flex-col md:flex-row gap-8 lg:gap-16 mb-16">
                <div className="md:w-1/2 shrink-0">
                    <div className="w-full aspect-square bg-bg-light rounded-2xl flex items-center justify-center p-6 border border-gray-100 relative overflow-hidden">
                        {product.image ? (
                            // eslint-disable-next-line
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

                <div className="md:w-1/2 flex flex-col justify-center">
                    <p className="text-xs font-mono text-gray-400 mb-3 bg-gray-50 inline-block px-3 py-1 rounded-md border border-gray-100 w-fit">
                        Артикул: {product.article}
                    </p>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark leading-tight mb-5">
                        {product.name}
                    </h1>

                    <div className="mb-6">
                        <span className="text-sm font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 uppercase tracking-wide">
                            Цена по запросу
                        </span>
                    </div>

                    <div className="space-y-3 mb-8 bg-green-50/40 p-4 rounded-xl border border-green-100">
                        <div className="flex items-center gap-3 text-sm text-dark">
                            <CheckCircle2
                                size={18}
                                className="text-green-500 shrink-0"
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
                            Точная цена зависит от объема партии. Оставьте
                            заявку, и менеджер подготовит индивидуальное КП.
                        </p>
                    </div>
                </div>
            </div>

            {similarProducts.length > 0 && (
                <section className="border-t border-gray-200 pt-12 mb-8">
                    <h2 className="text-2xl font-bold text-dark mb-6">
                        Похожие товары
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {similarProducts.map((item) => (
                            <ProductCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                article={item.article}
                                image={item.image ?? undefined}
                                price={item.price}
                            />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
