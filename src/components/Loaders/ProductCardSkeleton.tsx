

export default function ProductCardSkeleton() {
    return (
        <div className="bg-gray-200 rounded-lg shadow-md p-4 w-full h-80 sm:w-64 mx-auto animate-pulse">
            <div className="h-56 bg-gray-300 rounded mb-3"></div>
            <div className="flex flex-col h-full">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="h-8 bg-gray-500 rounded"></div>
            </div>
        </div>
    );
}
