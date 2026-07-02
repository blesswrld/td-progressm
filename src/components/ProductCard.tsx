"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import RequestModal from "./RequestModal";

interface ProductCardProps {
    id: string;
    name: string;
    article: string;
    image?: string;
    price?: number;
}

export default function ProductCard({
    id,
    name,
    article,
    image,
}: ProductCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        navigator.clipboard.writeText(article);
        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <Link
                href={`/product/${id}`}
                className="group bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative"
            >
                <div className="w-full aspect-square bg-bg-light rounded-xl flex items-center justify-center p-4 mb-4 overflow-hidden relative border border-gray-50">
                    {image ? (
                        // eslint-disable-next-line
                        <img
                            src={image}
                            alt={name}
                            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                        />
                    ) : (
                        <span className="text-4xl">📦</span>
                    )}
                </div>

                <div className="grow flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                                Арт: {article}
                            </span>
                            <button
                                onClick={handleCopy}
                                title="Скопировать артикул"
                                className={`p-1.5 rounded-md border transition-all duration-200 active:scale-90 ${
                                    copied
                                        ? "bg-green-50 border-green-200 text-green-600"
                                        : "bg-white border-gray-200 text-gray-400 hover:text-dark hover:bg-gray-50"
                                }`}
                            >
                                {copied ? (
                                    <Check size={13} />
                                ) : (
                                    <Copy size={13} />
                                )}
                            </button>
                        </div>

                        <h3 className="font-bold text-dark text-sm sm:text-base line-clamp-2 leading-tight group-hover:text-primary transition-colors mb-3">
                            {name}
                        </h3>
                    </div>

                    <div>
                        <div className="mb-4">
                            <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded border border-gray-100 uppercase tracking-wide inline-block">
                                Цена по запросу
                            </span>
                        </div>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsModalOpen(true);
                            }}
                            className="w-full border-2 border-primary text-primary font-bold py-2 rounded-xl hover:bg-primary hover:text-white transition-all duration-200 active:scale-95 text-sm cursor-pointer"
                        >
                            Узнать цену
                        </button>
                    </div>
                </div>
            </Link>

            <RequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productName={name}
                productArticle={article}
            />
        </>
    );
}
