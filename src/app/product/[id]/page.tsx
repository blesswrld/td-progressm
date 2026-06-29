import { products, categories } from "@/mockData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import OrderButton from "@/components/OrderButton";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
    const resolvedParams = await params;

    // Ищем товар по ID
    const product = products.find((p) => p.id === resolvedParams.id);

    if (!product) {
        notFound();
    }

    // Ищем категорию товара для хлебных крошек
    const category = categories.find((c) => c.id === product.categoryId);

    return (
        <main className="min-h-screen p-6 sm:p-8 max-w-7xl mx-auto w-full">
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
                            href={
                                category
                                    ? `/catalog/${category.slug}`
                                    : "/catalog"
                            }
                            className="inline-flex items-center gap-2 text-sm font-medium text-text-main hover:text-primary mb-6 transition-colors group w-fit"
                        >
                            <ArrowLeft
                                size={16}
                                className="group-hover:-translate-x-1 transition-transform"
                            />
                            Назад в категорию
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

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark leading-tight mb-6">
                        {product.name}
                    </h1>

                    {/* Блок преимуществ (заглушка для солидности) */}
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
                        {/* Вызов клиентской кнопки модалки */}
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
