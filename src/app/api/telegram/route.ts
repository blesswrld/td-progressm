import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { formType, name, phone, email, productName, productArticle } =
            body;

        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        if (!BOT_TOKEN || !CHAT_ID) {
            return NextResponse.json(
                { error: "Конфигурация Telegram не настроена на сервере" },
                { status: 500 },
            );
        }

        let message = `🔔 <b>НОВАЯ ЗАЯВКА С САЙТА</b>\n\n`;

        if (formType === "callback") {
            message += `❓ <b>Тип:</b> Заказ обратного звонка\n`;
            message += `👤 <b>Имя:</b> ${name}\n`;
            message += `📞 <b>Телефон:</b> <code>${phone}</code>\n`;
        } else if (formType === "price_request") {
            message += `💰 <b>Тип:</b> Запрос цены на товар\n`;
            message += `📦 <b>Товар:</b> ${productName}\n`;
            message += `🔢 <b>Артикул:</b> <code>${productArticle}</code>\n`;
            message += `👤 <b>Имя:</b> ${name}\n`;
            message += `📞 <b>Телефон:</b> <code>${phone}</code>\n`;
            if (email) message += `📧 <b>Email:</b> ${email}\n`;
        }

        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "HTML", // Изменили на HTML для максимальной стабильности
            }),
        });

        if (!response.ok) {
            const errData = await response.json();
            console.error("❌ Ошибка Telegram API:", errData);
            return NextResponse.json(
                { error: "Ошибка Telegram API", details: errData },
                { status: 500 },
            );
        }

        return NextResponse.json({ success: true });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("❌ Критическая ошибка в API:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
