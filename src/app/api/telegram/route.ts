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

        let message = `🔔 *НОВАЯ ЗАЯВКА С САЙТА*\n\n`;

        if (formType === "callback") {
            message += `❓ *Тип:* Заказ обратного звонка\n`;
            message += `👤 *Имя:* ${name}\n`;
            message += `📞 *Телефон:* \`${phone}\`\n`;
        } else if (formType === "price_request") {
            message += `💰 *Тип:* Запрос цены на товар\n`;
            message += `📦 *Товар:* ${productName}\n`;
            message += `🔢 *Артикул:* \`${productArticle}\`\n`;
            message += `👤 *Имя:* ${name}\n`;
            message += `📞 *Телефон:* \`${phone}\`\n`;
            if (email) message += `📧 *Email:* ${email}\n`;
        }

        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "Markdown",
            }),
        });

        if (!response.ok) {
            const errData = await response.json();
            return NextResponse.json(
                { error: "Ошибка Telegram API", details: errData },
                { status: 500 },
            );
        }

        return NextResponse.json({ success: true });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
