"use client";

import { useState } from "react";
import RequestModal from "./RequestModal";

interface OrderButtonProps {
    name: string;
    article: string;
}

export default function OrderButton({ name, article }: OrderButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-primary/20 text-lg"
            >
                Узнать цену и наличие
            </button>

            <RequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productName={name}
                productArticle={article}
            />
        </>
    );
}
