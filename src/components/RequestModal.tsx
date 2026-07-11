"use client";

import { useState, useEffect } from "react";
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

    const [errors, setErrors] = useState({ name: "", phone: "", email: "" });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setErrors({ name: "", phone: "", email: "" });
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = (formData.get("name") as string).trim();
        const phone = (formData.get("phone") as string).trim();
        const email = (formData.get("email") as string).trim();

        const newErrors = { name: "", phone: "", email: "" };
        let isValid = true;

        const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s\-]{2,40}$/;
        if (!nameRegex.test(name)) {
            newErrors.name =
                "Имя должно содержать только буквы (от 2 символов)";
            isValid = false;
        }

        const digitsOnly = phone.replace(/\D/g, "");
        if (digitsOnly.length < 10 || digitsOnly.length > 15) {
            newErrors.phone =
                "Введите корректный номер телефона (не менее 10 цифр)";
            isValid = false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email && !emailRegex.test(email)) {
            newErrors.email = "Введите корректный email адрес";
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

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

    const clearError = (field: keyof typeof errors) => {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    return (
        <div className="fixed inset-0 z-150 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
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

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                            noValidate
                        >
                            <div>
                                <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                                    Ваше имя *
                                </label>
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    placeholder="Иван"
                                    onChange={() => clearError("name")}
                                    className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:outline-none text-sm text-dark transition-colors ${
                                        errors.name
                                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                            : "border-gray-200 focus:ring-2 focus:ring-primary"
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1.5">
                                        {errors.name}
                                    </p>
                                )}
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
                                    onChange={() => clearError("phone")}
                                    className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:outline-none text-sm text-dark transition-colors ${
                                        errors.phone
                                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                            : "border-gray-200 focus:ring-2 focus:ring-primary"
                                    }`}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs mt-1.5">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                                    Email (необязательно)
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="example@mail.ru"
                                    onChange={() => clearError("email")}
                                    className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:outline-none text-sm text-dark transition-colors ${
                                        errors.email
                                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                            : "border-gray-200 focus:ring-2 focus:ring-primary"
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1.5">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all duration-200 active:scale-95 active:bg-primary/80 cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
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
                                    "Отправить заявку"
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
