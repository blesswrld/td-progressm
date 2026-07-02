import Link from "next/link";
import { categories, products } from "@/mockData";
import {
    Wrench,
    Zap,
    Drill,
    Hammer,
    WrenchIcon,
    ArrowRight,
} from "lucide-react";
import ContactSection from "@/components/ContactSection";

export default function Home() {
    return (
        <main className="min-h-screen p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
            <section className="mb-12 bg-dark rounded-3xl p-8 md:p-16 flex flex-col justify-center items-start relative overflow-hidden shadow-xl">
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight break-all">
                        Профессиональный инструмент и оборудование
                    </h1>
                    <p className="text-lg text-gray-400 mb-8 max-w-lg">
                        Надежные поставки для строительных объектов и
                        производств по всей России.
                    </p>
                    <Link
                        href="/catalog"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-primary/20"
                    >
                        Перейти в каталог
                        <ArrowRight size={20} />
                    </Link>
                </div>
                <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none translate-x-1/4 translate-y-1/4 hidden md:block">
                    <WrenchIcon size={400} />
                </div>
            </section>

            <section className="mb-16 bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6 leading-tight">
                        Комплексные поставки для любого проекта
                    </h2>
                    <p className="text-lg text-text-main leading-relaxed mb-6">
                        В нашем ассортименте есть{" "}
                        <strong className="text-primary font-bold">
                            весь спектр строительных материалов от фундамента до
                            кровли
                        </strong>{" "}
                        под любой запрос!
                    </p>
                    <p className="text-lg text-text-main leading-relaxed">
                        Мы работаем напрямую от производителей, поэтому можем
                        дать лучшие цены и условия для каждого партнера.
                    </p>
                </div>
            </section>

            <section className="mb-16 relative">
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                    @keyframes flow {
                        from { stroke-dashoffset: 40; }
                        to { stroke-dashoffset: 0; }
                    }
                    .animate-flow {
                        animation: flow 5s linear infinite;
                    }
                `,
                    }}
                />

                <div className="flex items-center justify-between mb-8 border-b border-border-main pb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-dark">
                        Популярные направления
                    </h2>
                    <Link
                        href="/catalog"
                        className="text-sm font-medium text-text-main hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                        Смотреть все
                        <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </Link>
                </div>

                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-24 -z-10 hidden min-[1040px]:block overflow-hidden opacity-40 pointer-events-none">
                        <svg
                            className="w-full h-full text-primary"
                            viewBox="0 0 100 20"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,10 Q12.5,20 25,10 T50,10 T75,10 T100,10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                                strokeDasharray="2 2"
                                className="animate-flow"
                            />
                        </svg>
                    </div>

                    <div
                        className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${
                            categories.slice(0, 8).length === 2
                                ? "max-w-3xl mx-auto"
                                : categories.slice(0, 8).length === 3
                                  ? "min-[1040px]:grid-cols-3 max-w-5xl mx-auto"
                                  : "min-[1040px]:grid-cols-4"
                        }`}
                    >
                        {categories.slice(0, 8).map((category, index) => {
                            const count = products.filter(
                                (p) => p.categoryId === category.id,
                            ).length;
                            const icons = [
                                Wrench,
                                Zap,
                                Drill,
                                Hammer,
                                WrenchIcon,
                            ];
                            const Icon = icons[index % icons.length];

                            return (
                                <Link
                                    key={category.id}
                                    href={`/catalog/${category.slug}`}
                                    className="group relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 active:scale-95 overflow-hidden flex flex-col justify-between h-40 z-10"
                                >
                                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-gray-50 rounded-full group-hover:bg-primary/5 transition-colors duration-500 z-0"></div>

                                    <div className="relative z-10 flex justify-between items-start mb-4">
                                        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors text-gray-500">
                                            <Icon size={24} strokeWidth={1.5} />
                                        </div>
                                        {count > 0 && (
                                            <span className="text-xs font-medium text-gray-400 bg-white border border-gray-100 px-2 py-1 rounded-full shadow-sm">
                                                {count}
                                            </span>
                                        )}
                                    </div>

                                    <div className="relative z-10">
                                        <span className="font-bold text-dark group-hover:text-primary transition-colors text-base md:text-lg line-clamp-2 leading-tight">
                                            {category.name}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <ContactSection />
        </main>
    );
}
