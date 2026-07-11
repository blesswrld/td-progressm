"use client";

import { useState } from "react";
import Link from "next/link";
import { Folder, Search } from "lucide-react";

interface CategorySidebarProps {
    title: string;
    // eslint-disable-next-line
    folders: any[];
    // eslint-disable-next-line
    products: any[];
    currentFolderSlug?: string;
}

export default function CategorySidebar({
    title,
    folders,
    products,
    currentFolderSlug,
}: CategorySidebarProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFolders = folders.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <aside className="w-full lg:w-1/4 shrink-0 lg:sticky lg:top-24 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-lg font-bold text-dark mb-4 border-b border-gray-100 pb-3">
                {title}
            </h3>

            <div className="relative mb-4">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    type="text"
                    placeholder="Поиск по папкам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-1 custom-scrollbar">
                {filteredFolders.length > 0 ? (
                    filteredFolders.map((folder) => {
                        const count = products.filter(
                            (p) => p.folderSlug === folder.slug,
                        ).length;
                        const isActive = folder.slug === currentFolderSlug;

                        return (
                            <Link
                                key={folder.id}
                                href={`/catalog/folder/${folder.slug}`}
                                className={`flex items-center justify-between p-2.5 rounded-lg transition-colors group ${
                                    isActive
                                        ? "bg-primary text-white shadow-md shadow-primary/20"
                                        : "hover:bg-primary/5 text-gray-700"
                                }`}
                            >
                                <div
                                    className={`flex items-center gap-2 font-medium line-clamp-1 ${
                                        isActive
                                            ? "text-white"
                                            : "group-hover:text-primary"
                                    }`}
                                >
                                    <Folder
                                        size={16}
                                        className={`shrink-0 ${
                                            isActive
                                                ? "text-white"
                                                : "text-gray-400 group-hover:text-primary"
                                        }`}
                                    />
                                    <span className="truncate">
                                        {folder.name}
                                    </span>
                                </div>
                                <span
                                    className={`text-xs px-2 py-0.5 rounded border shrink-0 ${
                                        isActive
                                            ? "bg-white/20 border-white/20 text-white"
                                            : "bg-gray-50 border-gray-100 text-gray-400"
                                    }`}
                                >
                                    {count}
                                </span>
                            </Link>
                        );
                    })
                ) : (
                    <p className="text-sm text-gray-400 text-center py-6">
                        Ничего не найдено
                    </p>
                )}
            </div>
        </aside>
    );
}
