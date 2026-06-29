"use client";

import { useState } from "react";
import { Waypoints, Handshake, MapPinned, ShieldCheck } from "lucide-react";

const slides = [
    {
        id: 0,
        shortTitle: "Широкая торговая сеть",
        icon: Waypoints,
        title: "Широкая торговая сеть на территории РФ",
        description:
            "Обеспечиваем бесперебойные поставки строительных материалов в любые регионы. Наша логистическая сеть позволяет доставлять грузы точно в срок.",
    },
    {
        id: 1,
        shortTitle: "Выгодные условия",
        icon: Handshake,
        title: "Партнерство на ваших условиях",
        description:
            "Разработана специальная ценовая политика и система лояльности для оптовых покупателей и постоянных партнеров.",
    },
    {
        id: 2,
        shortTitle: "Развитая логистика",
        icon: MapPinned,
        title: "Собственный автопарк и склады",
        description:
            "Более 1000 квадратных метров складских помещений и отлаженная система доставки день в день.",
    },
    {
        id: 3,
        shortTitle: "Сервис и гарантия",
        icon: ShieldCheck,
        title: "Гарантия качества на весь ассортимент",
        description:
            "Вся продукция сертифицирована. Предоставляем полный пакет документов и гарантийное обслуживание.",
    },
];

export default function InteractiveHero() {
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <section className="w-full">
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col lg:flex-row min-h-[auto] lg:min-h-[500px] transition-all duration-500">
                <div className="flex-1 p-6 sm:p-10 lg:p-16 flex flex-col justify-center relative z-10 text-light">
                    <div
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                        key={activeSlide}
                    >
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight max-w-xl">
                            {slides[activeSlide].title}
                        </h1>
                        <p className="text-sm sm:text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
                            {slides[activeSlide].description}
                        </p>
                        <button className="w-full sm:w-auto justify-center bg-primary hover:bg-primary-dark text-light font-bold py-3.5 sm:py-4 px-8 rounded-xl transition-all flex items-center gap-2 group text-sm sm:text-base shadow-lg shadow-primary/20">
                            Стать партнером
                            <span className="group-hover:translate-x-1 transition-transform">
                                →
                            </span>
                        </button>
                    </div>
                </div>

                <div className="w-full lg:w-[500px] grid grid-cols-1 sm:grid-cols-2 relative z-10 border-t lg:border-l lg:border-t-0 border-white/10 bg-dark/40 backdrop-blur-sm">
                    {slides.map((slide, index) => {
                        const isActive = activeSlide === index;
                        const Icon = slide.icon;

                        return (
                            <button
                                key={slide.id}
                                onMouseEnter={() => setActiveSlide(index)}
                                onClick={() => setActiveSlide(index)}
                                className={`
                                    p-4 sm:p-8 flex flex-row sm:flex-col items-center sm:items-start justify-start sm:justify-center text-left border-b sm:border-r border-white/10 transition-all duration-300
                                    ${isActive ? "bg-primary text-light" : "bg-transparent text-gray-400 hover:bg-white/10 hover:text-light"}
                                `}
                            >
                                <Icon
                                    size={24}
                                    strokeWidth={1.5}
                                    className={`mr-4 sm:mr-0 sm:mb-4 transition-colors ${isActive ? "text-light" : "text-gray-400"} sm:w-9 sm:h-9`}
                                />
                                <span
                                    className={`font-semibold text-sm lg:text-base ${isActive ? "text-light" : "text-gray-300"}`}
                                >
                                    {slide.shortTitle}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
