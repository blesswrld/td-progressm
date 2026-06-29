"use client";

import { useState } from "react";
import { PhoneCall, Loader2 } from "lucide-react";

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const phone = formData.get("phone");

        try {
            const res = await fetch("/api/api/../telegram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    formType: "callback",
                    name,
                    phone,
                }),
            });

            if (res.ok) {
                setIsSuccess(true);
                e.currentTarget.reset();
                setTimeout(() => setIsSuccess(false), 4000);
            } else {
                alert("Ошибка отправки. Попробуйте снова.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-dark rounded-3xl p-8 md:p-12 mt-8 flex flex-col md:flex-row items-center justify-between gap-10 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="md:w-1/2 relative z-10 text-light">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Нужна консультация?
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                    Оставьте заявку, и наш специалист свяжется с вами в течение
                    15 минут, чтобы помочь с выбором или собрать заказ по смете.
                </p>
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                        <PhoneCall
                            size={28}
                            strokeWidth={1.5}
                            className="text-light"
                        />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 mb-1">
                            Прямая линия
                        </p>
                        <p className="font-bold text-2xl tracking-wide">
                            8 (800) 000-00-00
                        </p>
                    </div>
                </div>
            </div>

            <div className="md:w-1/2 w-full relative z-10">
                <form
                    onSubmit={handleSubmit}
                    className="bg-light p-6 md:p-8 rounded-2xl shadow-lg space-y-4"
                >
                    {isSuccess ? (
                        <div className="text-center py-6 text-dark">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                                ✓
                            </div>
                            <h3 className="font-bold text-lg mb-1">
                                Заявка принята!
                            </h3>
                            <p className="text-sm text-text-main">
                                Менеджер уже пишет вам в Telegram или позвонит.
                            </p>
                        </div>
                    ) : (
                        <>
                            <h3 className="font-bold text-dark text-xl mb-4">
                                Заказать звонок
                            </h3>
                            <input
                                required
                                name="name"
                                type="text"
                                placeholder="Ваше имя"
                                className="w-full px-4 py-3 rounded-lg border border-border-main bg-bg-light focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                            <input
                                required
                                name="phone"
                                type="tel"
                                placeholder="Телефон"
                                className="w-full px-4 py-3 rounded-lg border border-border-main bg-bg-light focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary-dark text-light font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2
                                            size={18}
                                            className="animate-spin"
                                        />
                                        Отправка...
                                    </>
                                ) : (
                                    "Жду звонка"
                                )}
                            </button>
                        </>
                    )}
                </form>
            </div>
        </section>
    );
}
