/* eslint-disable */
const fs = require("fs");
const readline = require("readline");
const path = require("path");

const INPUT_FILE = path.join(__dirname, "export.xml");
const OUTPUT_FILE = path.join(__dirname, "src", "catalog.json");

const stopWords = ["садов", "крепеж", "автомобиль", "автоинструмент"];

async function processCatalog() {
    console.log("Начинаем парсинг...");

    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`Файл ${INPUT_FILE} не найден!`);
        return;
    }

    const fileStream = fs.createReadStream(INPUT_FILE);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let inOffer = false;
    let offerStr = "";
    const products = [];
    let skipped = 0;

    for await (const line of rl) {
        if (line.includes("<offer ")) {
            inOffer = true;
            offerStr = "";
        }

        if (inOffer) {
            offerStr += line + "\n";
        }

        if (line.includes("</offer>")) {
            inOffer = false;

            const idMatch = offerStr.match(/<offer id="([^"]+)"/);
            const skuMatch = offerStr.match(/<sku>(.*?)<\/sku>/);
            const nameMatch = offerStr.match(/<name>(.*?)<\/name>/);
            const catIdMatch = offerStr.match(
                /<categoryId>(.*?)<\/categoryId>/,
            );
            const picMatch = offerStr.match(/<picture>(.*?)<\/picture>/);
            const groupMatch = offerStr.match(
                /<param name="Группа товаров">(.*?)<\/param>/,
            );
            const priceMatch = offerStr.match(/<price>(.*?)<\/price>/);

            const name = nameMatch ? nameMatch[1] : "";
            const group = groupMatch ? groupMatch[1] : "";

            const isBanned = stopWords.some(
                (word) =>
                    name.toLowerCase().includes(word) ||
                    group.toLowerCase().includes(word),
            );

            if (isBanned) {
                skipped++;
                continue;
            }

            if (idMatch && name) {
                products.push({
                    id: idMatch[1],
                    article: skuMatch ? skuMatch[1] : "Н/Д",
                    name: name,
                    categoryId: catIdMatch ? catIdMatch[1] : "1",
                    group: group,
                    image: picMatch ? picMatch[1] : null,
                    price: priceMatch ? parseFloat(priceMatch[1]) : 0,
                });
            }
        }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2));
    console.log(`\n✅ Готово!`);
    console.log(`Добавлено товаров: ${products.length}`);
    console.log(`Отфильтровано (садовое/крепеж): ${skipped}`);
    console.log(`Файл сохранен в: ${OUTPUT_FILE}`);
}

processCatalog();
