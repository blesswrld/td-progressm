export default function CatalogLoading() {
    return (
        <main className="min-h-screen p-6 sm:p-8 max-w-7xl mx-auto w-full flex flex-col">
            <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-6"></div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-border-main pb-4 gap-4">
                <div className="space-y-2">
                    <div className="w-64 h-10 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-24 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="w-48 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 grow">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white border border-border-main rounded-xl p-5 flex flex-col justify-between h-95"
                    >
                        <div>
                            <div className="w-full aspect-square bg-gray-100 rounded-lg animate-pulse mb-4"></div>
                            <div className="w-16 h-3 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-2">
                                .
                            </div>
                            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse mt-4"></div>
                    </div>
                ))}
            </div>
        </main>
    );
}
