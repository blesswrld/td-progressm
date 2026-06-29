"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";

interface RequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    productArticle: string;
}

export default function RequestModal({
    isOpen,
    onClose,
    productName,
    productArticle,
}: RequestModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const phone = formData.get("phone");
        const email = formData.get("email");

        try {
            const res = await fetch("/api/telegram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    formType: "price_request",
                    name,
                    phone,
                    email,
                    productName,
                    productArticle,
                }),
            });

            if (res.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    onClose();
                }, 3000);
            } else {
                alert("Ошибка при отправке заявки. Попробуйте позже.");
            }
        } catch (error) {
            console.error("Ошибка сети:", error);
            alert("Произошла ошибка сети. Проверьте соединение.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-dark transition-colors p-1 rounded-lg hover:bg-gray-100"
                >
                    <X size={20} />
                </button>

                {isSuccess ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                            ✓
                        </div>
                        <h3 className="text-xl font-bold text-dark mb-2">
                            Заявка отправлена!
                        </h3>
                        <p className="text-sm text-gray-500">
                            Мы рассчитаем цену для вас и свяжемся в ближайшее
                            время.
                        </p>
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl font-bold text-dark mb-2 pr-6">
                            Запрос стоимости
                        </h3>

                        <div className="bg-gray-55 p-3 rounded-xl mb-6 border border-gray-100 text-sm">
                            <p className="text-xs text-gray-400 font-mono mb-1">
                                Артикул: {productArticle}
                            </p>
                            <p className="font-semibold text-dark line-clamp-2">
                                {productName}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                                    Ваше имя *
                                </label>
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    placeholder="Иван"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-none text-sm text-dark"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                                    Телефон *
                                </label>
                                <input
                                    required
                                    name="phone"
                                    type="tel"
                                    placeholder="+7 (999) 000-00-00"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-none text-sm text-dark"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                                    Email (необязательно)
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="example@mail.ru"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-none text-sm text-dark"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-70 shadow-lg shadow-primary/10"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                        Отправка...
                                    </>
                                ) : (
                                    "Отправить запрос"
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
