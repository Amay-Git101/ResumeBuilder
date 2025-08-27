// src/components/TemplatePreviews.tsx

export const MinimalistPreview = () => (
    <div className="w-full h-full bg-white p-4 font-sans text-[8px] text-gray-700">
        <div className="text-center">
            <div className="w-28 h-4 bg-gray-700 rounded-sm mx-auto"></div>
            <div className="w-20 h-2 bg-gray-400 rounded-sm mt-1 mx-auto"></div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="col-span-1 border-r pr-2">
                <div className="w-1/2 h-2.5 bg-gray-500 rounded-sm mb-2"></div>
                <div className="w-full h-1.5 bg-gray-200 rounded-sm mb-1"></div>
                <div className="w-10/12 h-1.5 bg-gray-200 rounded-sm"></div>
            </div>
            <div className="col-span-2">
                <div className="w-1/3 h-2.5 bg-gray-500 rounded-sm mb-2"></div>
                <div className="w-full h-1.5 bg-gray-200 rounded-sm mb-1"></div>
                <div className="w-10/12 h-1.5 bg-gray-200 rounded-sm"></div>
            </div>
        </div>
    </div>
);

export const ModernPreview = () => (
    <div className="w-full h-full bg-white p-4 font-sans text-[8px] text-gray-700">
        <div className="w-full h-10 bg-gray-800 flex items-center justify-center">
            <div className="text-center">
                <div className="w-24 h-4 bg-white rounded-sm"></div>
                <div className="w-16 h-2 bg-gray-400 rounded-sm mt-1 mx-auto"></div>
            </div>
        </div>
        <div className="mt-4">
            <div className="w-1/4 h-3 bg-gray-500 rounded-sm mb-2"></div>
            <div className="w-full h-1.5 bg-gray-200 rounded-sm mb-1"></div>
            <div className="w-full h-1.5 bg-gray-200 rounded-sm mb-1"></div>
            <div className="w-10/12 h-1.5 bg-gray-200 rounded-sm"></div>
        </div>
    </div>
);

export const TraditionalPreview = () => (
    <div className="w-full h-full bg-white p-4 font-sans text-[8px] text-gray-700">
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 bg-blue-500 p-3 text-white">
                <div className="w-10/12 h-3 bg-blue-300 rounded-sm mb-4"></div>
                <div className="w-8/12 h-2 bg-blue-300 rounded-sm"></div>
                <div className="mt-6">
                    <div className="w-1/2 h-2 bg-blue-300 rounded-sm mb-2"></div>
                    <div className="w-full h-1.5 bg-blue-200 rounded-sm mb-1"></div>
                    <div className="w-full h-1.5 bg-blue-200 rounded-sm mb-1"></div>
                </div>
            </div>
            <div className="col-span-2">
                <div className="w-10/12 h-2 bg-gray-300 rounded-sm mb-1"></div>
                <div className="w-full h-1.5 bg-gray-200 rounded-sm mb-1"></div>
                <div className="w-full h-1.5 bg-gray-200 rounded-sm mb-1"></div>
                <div className="w-8/12 h-1.5 bg-gray-200 rounded-sm"></div>
                <div className="mt-4 w-1/3 h-2.5 bg-gray-400 rounded-sm mb-2"></div>
                <div className="w-full h-1.5 bg-gray-200 rounded-sm mb-1"></div>
                <div className="w-10/12 h-1.5 bg-gray-200 rounded-sm"></div>
            </div>
        </div>
    </div>
);

export const CreativePreview = () => (
    <div className="w-full h-full bg-white p-4 font-sans text-[8px] text-gray-700">
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 bg-yellow-400 p-3 text-gray-800">
                <div className="w-10/12 h-4 bg-black rounded-sm mb-1"></div>
                <div className="w-8/12 h-4 bg-black rounded-sm mb-4"></div>
                <div className="w-full h-2 bg-gray-800 rounded-sm"></div>

                <div className="mt-6">
                    <div className="w-1/2 h-2 bg-black rounded-sm mb-2"></div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-sm mb-1"></div>
                    <div className="w-3/4 h-1.5 bg-white rounded-sm"></div>
                </div>
            </div>
            <div className="col-span-2">
                <div className="w-1/3 h-3 bg-gray-500 rounded-sm mb-2"></div>
                <div className="w-full h-1.5 bg-gray-200 rounded-sm mb-1"></div>
                <div className="w-10/12 h-1.5 bg-gray-200 rounded-sm"></div>
            </div>
        </div>
    </div>
);