import Link from "next/link";
import { categories } from "@/mockData";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
    const topCategories = categories.slice(0, 6);

    return (
        <footer className="bg-dark pt-16 pb-8 border-t border-gray-800 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <img
                                src="/progressm-logo.png"
                                alt="ТД Прогресс"
                                className="h-12 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Надежный поставщик профессионального инструмента и
                            оборудования. Работаем напрямую с производителями.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-light text-lg font-bold mb-5 tracking-wide">
                            Направления
                        </h3>
                        <ul className="space-y-3">
                            {topCategories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={`/catalog/${category.slug}`}
                                        className="text-sm text-gray-400 hover:text-primary transition-colors block truncate pr-4"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-2">
                                <Link
                                    href="/catalog"
                                    className="text-sm font-medium text-primary hover:text-white transition-colors inline-flex items-center gap-1"
                                >
                                    Все направления &rarr;
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-light text-lg font-bold mb-5 tracking-wide">
                            Информация
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                                >
                                    О компании
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/delivery"
                                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                                >
                                    Доставка и оплата
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/warranty"
                                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                                >
                                    Гарантия и возврат
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                                >
                                    Политика конфиденциальности
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-light text-lg font-bold mb-5 tracking-wide">
                            Контакты
                        </h3>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <Phone
                                    size={18}
                                    className="text-primary shrink-0 mt-0.5"
                                />
                                <div>
                                    <a
                                        href="tel:+79670356244"
                                        className="block text-light font-bold hover:text-primary transition-colors text-base mb-1"
                                    >
                                        8 (967) 035-62-44
                                    </a>
                                    <span className="text-xs">
                                        Пн-Пт: 9:00 - 18:00
                                    </span>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail
                                    size={18}
                                    className="text-primary shrink-0"
                                />
                                <a
                                    href="mailto:d.zhmakin@tskprogress.ru"
                                    className="hover:text-primary transition-colors"
                                >
                                    d.zhmakin@tskprogress.ru
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin
                                    size={18}
                                    className="text-primary shrink-0 mt-0.5"
                                />
                                <span>
                                    г. Москва, ул. Рябиновая, 26с1, офис 504. БЦ
                                    West Plaza
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>
                        © {new Date().getFullYear()} ТД Прогресс. Все права
                        защищены.
                    </p>
                </div>
            </div>
        </footer>
    );
}
