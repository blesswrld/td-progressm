import catalogJson from "./catalog.json";

interface CatalogItem {
    id: string;
    article: string;
    name: string;
    categoryId: string;
    group: string;
    folder: string;
    folderSlug: string;
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

function isExcluded(text: string): boolean {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    return excludedKeywords.some((keyword) => lowerText.includes(keyword));
}

function getFolderName(name: string): string {
    if (!name) return "Разное";
    const firstWord = name.trim().split(" ")[0];
    const cleanWord = firstWord.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
    if (!cleanWord) return "Разное";
    return cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1).toLowerCase();
}

// eslint-disable-next-line
const processedCatalog: any[] = [];

for (const item of rawCatalog) {
    if (!item.group) continue;

    const cleanedGroup = cleanGroupName(item.group);

    if (isExcluded(cleanedGroup) || isExcluded(item.name)) {
        continue;
    }

    processedCatalog.push({
        ...item,
        group: cleanedGroup,
        folder: getFolderName(item.name),
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

const uniqueFolders = Array.from(
    new Set(processedCatalog.map((p) => p.folder).filter(Boolean)),
).sort((a, b) => (a as string).localeCompare(b as string, "ru"));

export const folders = uniqueFolders.map((folder, index) => ({
    id: `folder-${index + 1}`,
    name: folder,
    slug: slugify(folder as string),
}));

export const products = processedCatalog.map((p) => {
    const category = categories.find((c) => c.name === p.group);
    return {
        ...p,
        categoryId: category ? category.id : "1",
        folderSlug: slugify(p.folder),
    };
});
