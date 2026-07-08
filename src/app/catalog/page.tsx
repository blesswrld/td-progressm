import Link from "next/link";
import { ArrowLeft, FolderOpen, ChevronRight } from "lucide-react";
import { categories, folders, products } from "@/mockData";
import FolderSearchGrid from "@/components/FolderSearchGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Каталог направлений | ТД Прогресс",
    description:
        "Выберите интересующее вас направление строительных материалов и инструмента.",
};

export default function CatalogIndexPage() {
    return (
        <main className="min-h-screen p-6 sm:p-8 max-w-7xl mx-auto w-full flex flex-col">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-main hover:text-primary mb-8 transition-colors group w-fit"
            >
                <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                />
                Назад на главную
            </Link>

            <div className="mb-10 border-b border-border-main pb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                    Каталог продукции
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl">
                    Выберите основное направление или найдите конкретный тип
                    товара в нашем подробном алфавитном рубрикаторе.
                </p>
            </div>

            <section className="mb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-dark">
                        Основные направления
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categories.map((category) => {
                        const count = products.filter(
                            (p) => p.categoryId === category.id,
                        ).length;

                        if (count === 0) return null;

                        return (
                            <Link
                                key={category.id}
                                href={`/catalog/${category.slug}`}
                                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-4 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <FolderOpen
                                            size={32}
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <span className="bg-gray-50 border border-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full">
                                        {count} товаров
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold text-dark group-hover:text-primary transition-colors mb-2">
                                    {category.name}
                                </h2>

                                <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                    Открыть категорию
                                    <ChevronRight size={16} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            <FolderSearchGrid folders={folders} products={products} />
        </main>
    );
}
