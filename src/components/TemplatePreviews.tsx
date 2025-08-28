// src/components/TemplatePreviews.tsx

export const MinimalistPreview = () => (
  <div className="w-full h-full bg-white p-4 font-sans text-[5px] leading-snug text-gray-700 flex flex-col">
    {/* Header */}
    <div className="text-center mb-3">
      <div className="w-28 h-2.5 bg-gray-800 mx-auto rounded-sm"></div>
      <div className="flex justify-center gap-2 mt-1.5 text-[4px]">
        <div className="w-12 h-1 bg-gray-400 rounded-sm"></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        <div className="w-12 h-1 bg-gray-400 rounded-sm"></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        <div className="w-12 h-1 bg-gray-400 rounded-sm"></div>
      </div>
    </div>

    {/* Experience */}
    <div className="mb-3">
      <div className="w-1/4 h-2 bg-gray-700 rounded-sm mb-1.5"></div>
      <div className="w-full h-px bg-gray-200"></div>
      <div className="mt-1.5 space-y-2">
        <div>
          <div className="flex justify-between items-center">
            <div className="w-1/3 h-1.5 bg-gray-600 rounded-sm"></div>
            <div className="w-1/5 h-1 bg-gray-400 rounded-sm"></div>
          </div>
          <div className="w-1/4 h-1.5 bg-gray-500 rounded-sm mt-0.5"></div>
          <div className="space-y-0.5 mt-1 pl-1">
            <div className="w-11/12 h-1 bg-gray-300 rounded-sm"></div>
            <div className="w-full h-1 bg-gray-300 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Education */}
    <div className="mb-3">
      <div className="w-1/4 h-2 bg-gray-700 rounded-sm mb-1.5"></div>
      <div className="w-full h-px bg-gray-200"></div>
       <div className="mt-1.5 space-y-2">
        <div>
          <div className="flex justify-between items-center">
            <div className="w-1/3 h-1.5 bg-gray-600 rounded-sm"></div>
            <div className="w-1/5 h-1 bg-gray-400 rounded-sm"></div>
          </div>
          <div className="w-1/4 h-1.5 bg-gray-500 rounded-sm mt-0.5"></div>
        </div>
      </div>
    </div>
  </div>
);

export const CreativePreview = () => (
  <div className="w-full h-full bg-white font-sans text-[5px] leading-snug flex">
    {/* Left Column */}
    <div className="w-1/3 bg-yellow-400 p-3 space-y-3">
      <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
      <div>
        <div className="w-full h-2 bg-black rounded-sm mb-1"></div>
        <div className="space-y-1">
          <div className="w-full h-1 bg-gray-800 rounded-sm"></div>
          <div className="w-5/6 h-1 bg-gray-800 rounded-sm"></div>
        </div>
      </div>
      <div>
        <div className="w-full h-2 bg-black rounded-sm mb-1"></div>
        <div className="space-y-1">
          <div className="w-full h-1 bg-gray-800 rounded-sm"></div>
          <div className="w-full h-1 bg-gray-800 rounded-sm"></div>
        </div>
      </div>
    </div>

    {/* Right Column */}
    <div className="w-2/3 p-3 space-y-3">
      <div className="w-3/4 h-4 bg-gray-800 rounded-sm"></div>
      <div className="w-1/2 h-2 bg-gray-500 rounded-sm -mt-0.5 mb-2"></div>
      
      <div>
        <div className="w-1/3 h-2 bg-gray-700 rounded-sm mb-1.5"></div>
        <div className="space-y-2">
          <div>
            <div className="w-2/5 h-1.5 bg-gray-600 rounded-sm mb-0.5"></div>
            <div className="space-y-1">
              <div className="w-full h-1 bg-gray-300 rounded-sm"></div>
              <div className="w-11/12 h-1 bg-gray-300 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

       <div>
        <div className="w-1/3 h-2 bg-gray-700 rounded-sm mb-1.5"></div>
        <div className="w-2/5 h-1.5 bg-gray-600 rounded-sm"></div>
      </div>
    </div>
  </div>
);