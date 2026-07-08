import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen p-6 sm:p-8 max-w-4xl mx-auto w-full">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-main hover:text-primary mb-6 transition-colors group w-fit"
            >
                <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                />
                Назад на главную
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-8">
                Политика конфиденциальности
            </h1>

            <div className="bg-white rounded-2xl p-8 border border-border-main shadow-sm space-y-6 text-text-main leading-relaxed text-sm">
                <p>
                    Настоящая Политика конфиденциальности регулирует порядок
                    обработки и защиты персональных данных пользователей сайта
                    ТД Прогресс.
                </p>

                <h3 className="text-lg font-bold text-dark mt-4">
                    1. Сбор информации
                </h3>
                <p>
                    Мы собираем информацию, которую вы добровольно
                    предоставляете при заполнении форм обратной связи (имя,
                    номер телефона, адрес электронной почты). Эти данные
                    необходимы исключительно для обработки ваших заявок и связи
                    с вами.
                </p>

                <h3 className="text-lg font-bold text-dark mt-4">
                    2. Использование данных
                </h3>
                <p>Предоставленные вами данные используются для:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>
                        Расчета стоимости заказа и подготовки коммерческого
                        предложения.
                    </li>
                    <li>Связи с вами для уточнения деталей заявки.</li>
                    <li>Улучшения качества обслуживания.</li>
                </ul>

                <h3 className="text-lg font-bold text-dark mt-4">
                    3. Защита информации
                </h3>
                <p>
                    Мы не передаем ваши персональные данные третьим лицам, за
                    исключением случаев, предусмотренных законодательством РФ.
                    Данные защищены от несанкционированного доступа с помощью
                    современных технических средств.
                </p>

                <h3 className="text-lg font-bold text-dark mt-4">
                    4. Согласие
                </h3>
                <p>
                    Нажимая кнопки «Узнать цену» или «Заказать звонок», вы
                    автоматически соглашаетесь с условиями данной Политики
                    конфиденциальности и даете согласие на обработку
                    персональных данных в соответствии с ФЗ №152 «О персональных
                    данных».
                </p>
            </div>
        </main>
    );
}
