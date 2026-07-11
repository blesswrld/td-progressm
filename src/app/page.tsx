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
            <section className="mb-12 sm:mb-16 bg-dark rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start relative overflow-hidden shadow-xl">
                <div className="relative z-10 w-full max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight sm:text-balance wrap-break-word">
                        Профессиональный инструмент и оборудование
                    </h1>

                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-5 sm:p-6 rounded-2xl mb-6 sm:mb-8 w-full">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                            Комплексные поставки для любого проекта
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                            В нашем ассортименте есть{" "}
                            <strong className="text-primary font-bold">
                                весь спектр строительных материалов от
                                фундамента до кровли
                            </strong>{" "}
                            под любой запрос!
                        </p>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                            Мы работаем напрямую от производителей, поэтому
                            можем дать лучшие цены и условия для каждого
                            партнера.
                        </p>
                    </div>

                    <Link
                        href="/catalog"
                        className="inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 sm:py-4 sm:px-8 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-primary/20 w-full sm:w-auto text-center text-sm sm:text-base"
                    >
                        Перейти в каталог
                        <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4 hidden lg:block">
                    <WrenchIcon size={500} />
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
                    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0 overflow-hidden pointer-events-none opacity-30">
                        <svg
                            viewBox="0 0 1440 320"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-auto min-w-250"
                        >
                            <path
                                d="M-100,160 C200,-50 500,350 1540,160"
                                stroke="#eab308"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="2000"
                                strokeDashoffset="2000"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    values="2000;0"
                                    dur="3s"
                                    fill="freeze"
                                    calcMode="spline"
                                    keySplines="0.4 0 0.2 1"
                                />
                            </path>

                            <path
                                d="M-100,160 C350,300 400,-10 1540,160"
                                stroke="#eab308"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeDasharray="2000"
                                strokeDashoffset="2000"
                                opacity="0.5"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    values="2000;0"
                                    dur="4s"
                                    fill="freeze"
                                    calcMode="spline"
                                    keySplines="0.4 0 0.2 1"
                                />
                            </path>
                        </svg>
                    </div>

                    <div
                        className={`grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 ${
                            categories.slice(0, 8).length === 2
                                ? "max-w-5xl mx-auto"
                                : categories.slice(0, 8).length === 3
                                  ? "min-[1040px]:grid-cols-3 max-w-6xl mx-auto"
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
                                    className="group relative bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 active:scale-95 overflow-hidden flex flex-col justify-between min-h-48 z-10"
                                >
                                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-gray-50 rounded-full group-hover:bg-primary/5 transition-colors duration-500 z-0"></div>

                                    <div className="relative z-10 flex justify-between items-start mb-4">
                                        <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-colors text-gray-500">
                                            <Icon size={28} strokeWidth={1.5} />
                                        </div>
                                        {count > 0 && (
                                            <span className="text-sm font-medium text-gray-400 bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm">
                                                {count}
                                            </span>
                                        )}
                                    </div>

                                    <div className="relative z-10">
                                        <span className="font-bold text-dark group-hover:text-primary transition-colors text-lg md:text-xl line-clamp-2 leading-tight">
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
