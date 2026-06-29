import { categories, products } from "@/mockData";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    ArrowDownUp,
} from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string; sort?: string }>;
}

const ITEMS_PER_PAGE = 24;

// 1. ДИНАМИЧЕСКИЕ МЕТАТЕГИ КАТЕГОРИИ
export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const category = categories.find((c) => c.slug === resolvedParams.slug);

    if (!category) return { title: "Категория не найдена | ТСК ПРОГРЕСС" };

    return {
        title: `${category.name} — каталог профессионального инструмента | ТСК ПРОГРЕСС`,
        description: `Большой выбор промышленного оборудования в категории «${category.name}». Официальные поставки, доступные оптовые цены, быстрая доставка со склада ТСК ПРОГРЕСС.`,
    };
}

export default async function CategoryPage({
    params,
    searchParams,
}: PageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const category = categories.find((c) => c.slug === resolvedParams.slug);

    if (!category) {
        notFound();
    }

    const currentPage = Number(resolvedSearchParams.page) || 1;
    const currentSort = resolvedSearchParams.sort || "default";

    const categoryProducts = products.filter(
        (p) => p.categoryId === category.id,
    );

    // Логика сортировки на const (без переназначения ссылки)
    if (currentSort === "price_asc") {
        categoryProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (currentSort === "price_desc") {
        categoryProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    const totalItems = categoryProducts.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = categoryProducts.slice(startIndex, endIndex);

    return (
        <main className="min-h-screen p-6 sm:p-8 max-w-7xl mx-auto w-full flex flex-col">
            <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-main hover:text-primary mb-6 transition-colors group w-fit"
            >
                <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                />
                Назад в каталог
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-border-main pb-4 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-dark mb-2">
                        {category.name}
                    </h1>
                    <span className="text-sm font-medium px-3 py-1 bg-bg-light rounded-full text-text-main">
                        {totalItems} товаров
                    </span>
                </div>

                <div className="relative inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <ArrowDownUp size={16} className="text-gray-400" />
                    <span className="text-gray-500 mr-2">Сортировка:</span>
                    <div className="flex gap-3 font-medium">
                        <Link
                            href={`/catalog/${category.slug}?sort=default`}
                            className={
                                currentSort === "default"
                                    ? "text-primary"
                                    : "text-gray-400 hover:text-dark"
                            }
                        >
                            По умолчанию
                        </Link>
                        <Link
                            href={`/catalog/${category.slug}?sort=price_asc`}
                            className={
                                currentSort === "price_asc"
                                    ? "text-primary"
                                    : "text-gray-400 hover:text-dark"
                            }
                        >
                            Дешевле
                        </Link>
                        <Link
                            href={`/catalog/${category.slug}?sort=price_desc`}
                            className={
                                currentSort === "price_desc"
                                    ? "text-primary"
                                    : "text-gray-400 hover:text-dark"
                            }
                        >
                            Дороже
                        </Link>
                    </div>
                </div>
            </div>

            {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-grow">
                    {paginatedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            article={product.article}
                            image={product.image}
                            price={product.price}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-white border border-border-main rounded-2xl flex-grow">
                    <p className="text-lg text-text-main">Нет товаров.</p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-border-main">
                    {currentPage > 1 ? (
                        <Link
                            href={`/catalog/${category.slug}?page=${currentPage - 1}&sort=${currentSort}`}
                            className="p-2.5 rounded-lg border border-border-main hover:border-primary text-dark hover:text-primary transition-colors bg-white"
                        >
                            <ChevronLeft size={18} />
                        </Link>
                    ) : (
                        <span className="p-2.5 rounded-lg border border-border-main text-gray-300 bg-bg-light cursor-not-allowed">
                            <ChevronLeft size={18} />
                        </span>
                    )}

                    {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNum = index + 1;
                        if (
                            pageNum === 1 ||
                            pageNum === totalPages ||
                            Math.abs(pageNum - currentPage) <= 1
                        ) {
                            return (
                                <Link
                                    key={pageNum}
                                    href={`/catalog/${category.slug}?page=${pageNum}&sort=${currentSort}`}
                                    className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${pageNum === currentPage ? "bg-primary border-primary text-light shadow-md shadow-primary/10" : "bg-white border-border-main text-dark hover:border-primary hover:text-primary"}`}
                                >
                                    {pageNum}
                                </Link>
                            );
                        }
                        if (pageNum === 2 || pageNum === totalPages - 1)
                            return (
                                <span
                                    key={pageNum}
                                    className="px-2 text-gray-400"
                                >
                                    ...
                                </span>
                            );
                        return null;
                    })}

                    {currentPage < totalPages ? (
                        <Link
                            href={`/catalog/${category.slug}?page=${currentPage + 1}&sort=${currentSort}`}
                            className="p-2.5 rounded-lg border border-border-main hover:border-primary text-dark hover:text-primary transition-colors bg-white"
                        >
                            <ChevronRight size={18} />
                        </Link>
                    ) : (
                        <span className="p-2.5 rounded-lg border border-border-main text-gray-300 bg-bg-light cursor-not-allowed">
                            <ChevronRight size={18} />
                        </span>
                    )}
                </div>
            )}
        </main>
    );
}
