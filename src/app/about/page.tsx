import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen p-6 sm:p-8 max-w-4xl mx-auto w-full">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-main hover:text-primary mb-6 transition-colors group w-fit"
            >
                <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                />
                Назад на главную
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-8">
                О компании ТД Прогресс
            </h1>

            <div className="bg-white rounded-2xl p-8 border border-border-main shadow-sm space-y-6 text-text-main leading-relaxed">
                <p>
                    <strong>ТД Прогресс</strong> — надежный партнер и поставщик
                    профессионального строительного инструмента, оборудования и
                    расходных материалов на территории РФ.
                </p>
                <p>
                    Наша цель — обеспечить строительные объекты, производства и
                    частных мастеров качественным инструментом без перебоев и
                    долгих ожиданий. Мы работаем напрямую с крупнейшими
                    производителями и импортерами, что позволяет нам держать
                    конкурентные цены и гарантировать подлинность каждого
                    товара.
                </p>
                <h2 className="text-xl font-bold text-dark mt-8 mb-4">
                    Наши преимущества:
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li>
                        Ассортимент более 15 000 наименований в наличии на
                        складах.
                    </li>
                    <li>
                        Оперативная отгрузка и доставка день в день по
                        согласованию.
                    </li>
                    <li>
                        Индивидуальный подход к B2B клиентам: выделенный
                        менеджер и гибкие условия оплаты.
                    </li>
                    <li>
                        Строгий контроль качества и официальная гарантия на весь
                        электроинструмент.
                    </li>
                </ul>
            </div>
        </main>
    );
}
