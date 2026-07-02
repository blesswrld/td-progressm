import catalogJson from "./catalog.json";

interface CatalogItem {
    id: string;
    article: string;
    name: string;
    categoryId: string;
    group: string;
    image: string | null;
    price: number;
}

const rawCatalog = catalogJson as CatalogItem[];

function slugify(text: string) {
    const cyrillic: Record<string, string> = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "yo",
        ж: "zh",
        з: "z",
        и: "i",
        й: "j",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "h",
        ц: "c",
        ч: "ch",
        ш: "sh",
        щ: "shch",
        ъ: "",
        ы: "y",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya",
        " ": "-",
        ",": "",
        ".": "",
    };
    return text
        .toLowerCase()
        .split("")
        .map((char) => cyrillic[char] || char)
        .join("")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
}

const excludedKeywords = ["садов", "крепеж", "автомобил"];

function cleanGroupName(name: string): string {
    if (!name) return "";
    return name.replace(/\s*без скидки\s*/gi, "").trim();
}

function isExcluded(groupName: string): boolean {
    const lowerName = groupName.toLowerCase();
    return excludedKeywords.some((keyword) => lowerName.includes(keyword));
}

const processedCatalog: CatalogItem[] = [];

for (const item of rawCatalog) {
    if (!item.group) continue;

    const cleanedGroup = cleanGroupName(item.group);

    if (isExcluded(cleanedGroup)) {
        continue;
    }

    processedCatalog.push({
        ...item,
        group: cleanedGroup,
    });
}

const uniqueGroups = Array.from(
    new Set(processedCatalog.map((p) => p.group).filter(Boolean)),
);

export const categories = uniqueGroups.map((group, index) => ({
    id: String(index + 1),
    name: group,
    slug: slugify(group),
}));

export const products = processedCatalog.map((p) => {
    const category = categories.find((c) => c.name === p.group);
    return {
        ...p,
        categoryId: category ? category.id : "1",
    };
});
