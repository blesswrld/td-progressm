"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Folder, Search, RefreshCw } from "lucide-react";

interface FolderSearchGridProps {
    // eslint-disable-next-line
    folders: any[];
    // eslint-disable-next-line
    products: any[];
}

const ITEMS_PER_LOAD = 30;

export default function FolderSearchGrid({
    folders,
    products,
}: FolderSearchGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

    const folderCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const p of products) {
            if (p.folderSlug) {
                counts[p.folderSlug] = (counts[p.folderSlug] || 0) + 1;
            }
        }
        return counts;
    }, [products]);

    const filteredFolders = useMemo(() => {
        const validFolders = folders.filter((f) => folderCounts[f.slug] > 0);

        if (!searchQuery) return validFolders;

        const lowerQuery = searchQuery.toLowerCase();
        return validFolders.filter((f) =>
            f.name.toLowerCase().includes(lowerQuery),
        );
    }, [folders, folderCounts, searchQuery]);

    const displayedFolders = filteredFolders.slice(0, visibleCount);

    const hasMore = visibleCount < filteredFolders.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
    };

    return (
        <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-dark">
                        Подробный рубрикатор
                    </h2>
                    <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full text-gray-500">
                        {filteredFolders.length} папок
                    </span>
                </div>

                <div className="relative w-full sm:w-80">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Поиск по названию (например, Бахилы)"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setVisibleCount(ITEMS_PER_LOAD);
                        }}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                    />
                </div>
            </div>

            {displayedFolders.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {displayedFolders.map((folder) => {
                            const count = folderCounts[folder.slug];

                            return (
                                <Link
                                    key={folder.id}
                                    href={`/catalog/folder/${folder.slug}`}
                                    className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-primary hover:shadow-md transition-all flex items-center gap-3 relative overflow-hidden"
                                >
                                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:text-primary text-gray-400 transition-colors">
                                        <Folder size={18} strokeWidth={2} />
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="font-semibold text-dark group-hover:text-primary transition-colors text-sm line-clamp-1">
                                            {folder.name}
                                        </span>
                                        <span className="text-xs text-gray-400 mt-0.5">
                                            {count} шт
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {hasMore && (
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 hover:border-primary text-dark hover:text-primary rounded-xl font-medium transition-all shadow-sm active:scale-95"
                            >
                                <RefreshCw size={16} />
                                Загрузить еще 30
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="py-12 text-center bg-white border border-gray-200 rounded-xl shadow-sm">
                    <p className="text-gray-500">
                        По вашему запросу «{searchQuery}» ничего не найдено.
                    </p>
                </div>
            )}
        </section>
    );
}
