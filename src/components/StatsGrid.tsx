"use client";

import { useState, useEffect, useRef } from "react";

function AnimatedNumber({ end, suffix }: { end: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start: number;
                    const duration = 2000;

                    const step = (timestamp: number) => {
                        if (!start) start = timestamp;
                        const progress = Math.min(
                            (timestamp - start) / duration,
                            1,
                        );
                        const easeOut = 1 - Math.pow(1 - progress, 4);

                        setCount(Math.floor(easeOut * end));

                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    window.requestAnimationFrame(step);
                }
            },
            { threshold: 0.1 },
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, hasAnimated]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

const statsData = [
    {
        id: 0,
        end: 10,
        suffix: "",
        label: "лет на рынке\nстройматериалов",
        title: "Опыт, которому доверяют",
        description:
            "За десятилетие работы мы накопили уникальную экспертизу в подборе и поставках строительных материалов для объектов любой сложности. Мы знаем рынок изнутри.",
        bgClass: "bg-light",
        numberClass: "text-primary",
        textClass: "text-dark",
        isException: false,
    },
    {
        id: 1,
        end: 3000,
        suffix: "+",
        label: "довольных\nклиентов",
        title: "Надежный партнер для бизнеса",
        description:
            "Нам доверяют как частные мастера, так и крупнейшие застройщики страны. Мы ценим каждого клиента, предлагая индивидуальный подход и выделенного менеджера.",
        bgClass: "bg-dark",
        numberClass: "text-primary",
        textClass: "text-light",
        isException: false,
    },
    {
        id: 2,
        end: 400,
        suffix: "+",
        label: "поставщиков со\nвсего мира",
        title: "Прямые контракты с заводами",
        description:
            "Работаем напрямую с ведущими российскими и зарубежными производителями, что позволяет нам гарантировать 100% качество по ГОСТ и держать лучшие цены.",
        bgClass: "bg-primary",
        numberClass: "text-light",
        textClass: "text-light/90",
        isException: true,
    },
    {
        id: 3,
        end: 12000,
        suffix: "+",
        label: "наименований\nтовара",
        title: "Всё необходимое в одном месте",
        description:
            "Огромный складской запас гарантирует, что вы найдете всё для строительства от фундамента до кровли без долгих ожиданий. Комплектуем объекты под ключ.",
        bgClass: "bg-gray-400",
        numberClass: "text-light",
        textClass: "text-light",
        isException: false,
    },
];

export default function StatsGrid() {
    const [activeStat, setActiveStat] = useState(0);

    return (
        <section className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
            <div className="flex-1 w-full lg:pr-10 min-h-55 flex flex-col justify-center">
                <span className="text-sm font-bold text-primary tracking-wider uppercase mb-2 block">
                    Прогресс в цифрах
                </span>

                <div
                    className="animate-in fade-in slide-in-from-left-4 duration-500"
                    key={activeStat}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-light mb-4">
                        {statsData[activeStat].title}
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-300 leading-relaxed">
                        {statsData[activeStat].description}
                    </p>
                </div>
            </div>

            <div className="flex-1 w-full grid grid-cols-1 min-[400px]:grid-cols-2 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-border-main gap-px">
                {statsData.map((stat, index) => {
                    const isActive = activeStat === index;

                    const opacityClass =
                        isActive || stat.isException
                            ? "opacity-100"
                            : "opacity-50 hover:opacity-80";

                    return (
                        <button
                            key={stat.id}
                            onMouseEnter={() => setActiveStat(index)}
                            onClick={() => setActiveStat(index)}
                            className={`
                p-6 sm:p-10 flex flex-col justify-center min-h-35 sm:min-h-50 text-left transition-all duration-500
                ${stat.bgClass} ${opacityClass}
              `}
                        >
                            <span
                                className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-1 sm:mb-2 transition-colors ${stat.numberClass}`}
                            >
                                <AnimatedNumber
                                    end={stat.end}
                                    suffix={stat.suffix}
                                />
                            </span>
                            <span
                                className={`text-xs sm:text-sm font-semibold whitespace-pre-line transition-colors ${stat.textClass}`}
                            >
                                {stat.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
