"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import RequestModal from "./RequestModal";

interface SearchResult {
    id: string;
    name: string;
    article: string;
    image: string | null;
}

export default function SearchInput() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState<{
        name: string;
        article: string;
    } | null>(null);

    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.trim().length < 2) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setResults([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const delayDebounceFn = setTimeout(async () => {
            try {
                const res = await fetch(
                    `/api/search?q=${encodeURIComponent(query)}`,
                );
                const data = await res.json();
                setResults(data);
                setIsOpen(true);
            } catch (error) {
                console.error("Ошибка поиска:", error);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div
            ref={searchRef}
            className="w-full md:w-auto md:flex-1 max-w-xl relative order-last md:order-none md:mx-4"
        >
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Поиск по названию или артикулу..."
                    className="w-full bg-light text-dark px-4 py-2 sm:py-2.5 pr-12 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary border border-gray-700 md:border-transparent"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-text-main">
                    {isLoading ? (
                        <Loader2
                            size={18}
                            className="animate-spin text-primary"
                        />
                    ) : (
                        <Search size={18} strokeWidth={2} />
                    )}
                </div>
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-border-main overflow-hidden z-[100] max-h-[380px] overflow-y-auto">
                    {results.map((product) => (
                        <button
                            key={product.id}
                            onClick={() => {
                                setSelectedProduct({
                                    name: product.name,
                                    article: product.article,
                                });
                                setIsOpen(false);
                            }}
                            className="w-full px-4 py-3 hover:bg-bg-light transition-colors flex items-center gap-4 text-left border-b border-gray-100 last:border-none group"
                        >
                            <div className="w-10 h-10 bg-white border border-gray-100 rounded p-1 shrink-0 flex items-center justify-center">
                                {product.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={product.image}
                                        alt=""
                                        className="object-contain max-w-full max-h-full"
                                    />
                                ) : (
                                    <span className="text-sm">📦</span>
                                )}
                            </div>
                            <div className="flex-grow min-w-0">
                                <p className="text-xs text-gray-400 font-mono">
                                    Арт: {product.article}
                                </p>
                                <p className="text-sm font-medium text-dark truncate group-hover:text-primary transition-colors">
                                    {product.name}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {isOpen &&
                query.trim().length >= 2 &&
                results.length === 0 &&
                !isLoading && (
                    <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-border-main p-4 text-center text-sm text-text-main z-[100]">
                        Ничего не найдено по запросу «{query}»
                    </div>
                )}

            {selectedProduct && (
                <RequestModal
                    isOpen={true}
                    onClose={() => setSelectedProduct(null)}
                    productName={selectedProduct.name}
                    productArticle={selectedProduct.article}
                />
            )}
        </div>
    );
}
