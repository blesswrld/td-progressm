"use client";

import { useState } from "react";
import { Loader2, PhoneCall, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({ name: "", phone: "" });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = (formData.get("name") as string).trim();
        const phone = (formData.get("phone") as string).trim();

        const newErrors = { name: "", phone: "" };
        let isValid = true;

        const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s\-]{2,40}$/;
        if (!nameRegex.test(name)) {
            newErrors.name = "Только буквы, минимум 2 символа";
            isValid = false;
        }

        const digitsOnly = phone.replace(/\D/g, "");
        if (digitsOnly.length < 10 || digitsOnly.length > 15) {
            newErrors.phone = "Введите корректный номер (от 10 цифр)";
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
                    formType: "callback",
                    name,
                    phone,
                }),
            });

            if (res.ok) {
                setIsSuccess(true);
                form.reset();

                setTimeout(() => {
                    setIsSuccess(false);
                }, 5000);
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
        <section className="mb-16 bg-dark rounded-3xl overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-125 h-125 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-100 h-100 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row p-8 sm:p-12 md:p-16 gap-10 md:gap-16 items-center max-w-7xl mx-auto">
                <div className="w-full md:w-1/2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-primary border border-white/10 mb-6 text-sm font-medium">
                        <PhoneCall size={16} />
                        Свяжитесь с нами
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                        Нужна консультация <br className="hidden lg:block" />
                        по подбору инструмента?
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-md">
                        Оставьте свой номер, и наш профильный специалист
                        перезвонит вам в течение 15 минут для расчета стоимости
                        и сроков.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex -space-x-3">
                            <div className="w-10 h-10 rounded-full border-2 border-dark bg-gray-600 flex items-center justify-center text-white text-xs">
                                М
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-dark bg-gray-500 flex items-center justify-center text-white text-xs">
                                А
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-dark bg-gray-400 flex items-center justify-center text-white text-xs">
                                +3
                            </div>
                        </div>
                        <p>Наши менеджеры всегда на связи</p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 max-w-md ml-auto">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
                        {isSuccess ? (
                            <div className="text-center py-10 animate-fade-in">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-dark mb-3">
                                    Ждите звонка!
                                </h3>
                                <p className="text-gray-500">
                                    Мы уже получили вашу заявку и скоро свяжемся
                                    с вами по указанному номеру.
                                </p>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                                noValidate
                            >
                                <h3 className="text-xl font-bold text-dark mb-6">
                                    Заказать звонок
                                </h3>

                                <div>
                                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                                        Как к вам обращаться?
                                    </label>
                                    <input
                                        required
                                        name="name"
                                        type="text"
                                        placeholder="Иван Иванов"
                                        onChange={() => clearError("name")}
                                        className={`w-full px-5 py-3.5 rounded-xl border bg-gray-50 focus:outline-none text-sm text-dark transition-colors ${
                                            errors.name
                                                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                                : "border-gray-200 focus:ring-2 focus:ring-primary"
                                        }`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1.5 ml-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                                        Номер телефона
                                    </label>
                                    <input
                                        required
                                        name="phone"
                                        type="tel"
                                        placeholder="+7 (999) 000-00-00"
                                        onChange={() => clearError("phone")}
                                        className={`w-full px-5 py-3.5 rounded-xl border bg-gray-50 focus:outline-none text-sm text-dark transition-colors ${
                                            errors.phone
                                                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                                : "border-gray-200 focus:ring-2 focus:ring-primary"
                                        }`}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs mt-1.5 ml-1">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all duration-200 active:scale-95 active:bg-primary/80 disabled:opacity-70 flex items-center justify-center gap-2 mt-4 shadow-lg shadow-primary/20 cursor-pointer"
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
                                        "Перезвоните мне"
                                    )}
                                </button>

                                <p className="text-[11px] text-gray-400 text-center mt-4">
                                    Нажимая кнопку, вы соглашаетесь с политикой
                                    конфиденциальности.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
