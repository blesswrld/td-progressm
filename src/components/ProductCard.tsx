"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import RequestModal from "./RequestModal";

interface ProductCardProps {
    id: string;
    name: string;
    article: string;
    image?: string | null;
    price?: number;
}

export default function ProductCard({
    id,
    name,
    article,
    image,
    price,
}: ProductCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-light border border-border-main rounded-xl p-5 flex flex-col justify-between h-full transition-all hover:shadow-xl hover:border-primary/50 group">
                <Link
                    href={`/product/${id}`}
                    className="block flex-grow cursor-pointer mb-4"
                >
                    <div className="w-full aspect-square relative mb-4 bg-white rounded-lg overflow-hidden flex items-center justify-center p-2 border border-gray-100">
                        {image ? (
                            <Image
                                src={image}
                                alt={name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 p-2"
                                loading="lazy"
                            />
                        ) : (
                            <div className="text-gray-300 flex flex-col items-center justify-center h-full">
                                <span className="text-4xl block mb-2">📦</span>
                                <span className="text-xs">Нет фото</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="text-xs text-gray-400 mb-2 font-mono">
                            Арт: {article}
                        </p>
                        <h3 className="font-semibold text-sm md:text-base text-dark leading-snug group-hover:text-primary transition-colors line-clamp-3">
                            {name}
                        </h3>
                    </div>
                </Link>

                {price && price > 0 ? (
                    <div className="mb-4 font-bold text-lg text-dark">
                        {price} ₽
                    </div>
                ) : null}

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full border-2 border-primary text-primary font-bold py-2.5 rounded-lg hover:bg-primary hover:text-light transition-all active:scale-95 text-sm"
                >
                    Узнать цену
                </button>
            </div>

            <RequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productName={name}
                productArticle={article}
            />
        </>
    );
}
