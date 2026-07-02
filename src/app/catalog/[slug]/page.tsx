import { categories, products } from "@/mockData";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

const ITEMS_PER_PAGE = 24;

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

    const categoryProducts = products.filter(
        (p) => p.categoryId === category.id,
    );

    const totalItems = categoryProducts.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = categoryProducts.slice(startIndex, endIndex);

    return (
        <main className="min-h-screen p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col">
            <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-sm font-bold text-dark bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-primary hover:text-primary mb-6 transition-all duration-200 active:scale-95 w-fit shadow-sm"
            >
                <ArrowLeft
                    size={18}
                    className="group-hover:-translate-x-1 transition-transform"
                />
                <span className="hidden sm:inline">Назад в каталог</span>
                <span className="sm:hidden">Назад</span>
            </Link>

            <div className="flex flex-col mb-8 border-b border-border-main pb-6 gap-5">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-dark mb-3 break-words leading-tight">
                        {category.name}
                    </h1>
                    <span className="text-sm font-medium px-4 py-1.5 bg-white border border-gray-200 shadow-sm rounded-full text-text-main inline-block">
                        {totalItems} товаров
                    </span>
                </div>
            </div>

            {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 flex-grow">
                    {paginatedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            article={product.article}
                            image={product.image ?? undefined}
                            price={product.price}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-white border border-border-main rounded-2xl flex-grow shadow-sm">
                    <p className="text-lg text-text-main">Нет товаров.</p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-border-main">
                    {currentPage > 1 ? (
                        <Link
                            href={`/catalog/${category.slug}?page=${currentPage - 1}`}
                            className="p-3 rounded-lg border border-border-main hover:border-primary text-dark hover:text-primary transition-all duration-200 active:scale-90 active:bg-gray-50 bg-white shadow-sm"
                        >
                            <ChevronLeft size={18} />
                        </Link>
                    ) : (
                        <span className="p-3 rounded-lg border border-border-main text-gray-300 bg-bg-light cursor-not-allowed">
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
                                    href={`/catalog/${category.slug}?page=${pageNum}`}
                                    className={`px-4 py-2.5 text-sm font-bold rounded-lg border transition-all duration-200 active:scale-90 shadow-sm ${pageNum === currentPage ? "bg-primary border-primary text-light shadow-md shadow-primary/20" : "bg-white border-border-main text-dark hover:border-primary hover:text-primary active:bg-gray-50"}`}
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
                            href={`/catalog/${category.slug}?page=${currentPage + 1}`}
                            className="p-3 rounded-lg border border-border-main hover:border-primary text-dark hover:text-primary transition-all duration-200 active:scale-90 active:bg-gray-50 bg-white shadow-sm"
                        >
                            <ChevronRight size={18} />
                        </Link>
                    ) : (
                        <span className="p-3 rounded-lg border border-border-main text-gray-300 bg-bg-light cursor-not-allowed">
                            <ChevronRight size={18} />
                        </span>
                    )}
                </div>
            )}
        </main>
    );
}
