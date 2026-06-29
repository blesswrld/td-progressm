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

const catalog = catalogJson as CatalogItem[];

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

const uniqueGroups = Array.from(
    new Set(catalog.map((p) => p.group).filter(Boolean)),
);

export const categories = uniqueGroups.map((group, index) => ({
    id: String(index + 1),
    name: group,
    slug: slugify(group),
}));

export const products = catalog.map((p) => {
    const category = categories.find((c) => c.name === p.group);
    return {
        ...p,
        categoryId: category ? category.id : "1",
    };
});
