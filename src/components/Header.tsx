import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import SearchInput from "./SearchInput";

export default function Header() {
    return (
        <header className="bg-dark text-light py-3 sm:py-4 border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-y-4 gap-x-4">
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src="/progressm-logo.png"
                        alt="ТД Прогресс"
                        width={160}
                        height={50}
                        className="h-12 sm:h-16 w-auto object-contain"
                        priority
                    />
                </Link>

                <div className="flex flex-col items-end">
                    <a
                        href="tel:+79670356244"
                        className="flex items-center gap-1.5 sm:gap-2 font-bold text-sm sm:text-lg hover:text-primary transition-colors"
                    >
                        <Phone
                            size={16}
                            strokeWidth={2.5}
                            className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                        <span>8 (967) 035-62-44</span>
                    </a>
                    <span className="hidden sm:block text-xs text-gray-400">
                        Пн-Пт: 9:00 - 18:00
                    </span>
                </div>

                <SearchInput />
            </div>
        </header>
    );
}
