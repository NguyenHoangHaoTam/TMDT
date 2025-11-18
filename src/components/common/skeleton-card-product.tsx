const SkeletonCardProduct = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden relative shadow-sm flex-none sm:w-[200px] lg:w-[260px] animate-pulse">
      {/* Ảnh sản phẩm */}
      <div className="relative overflow-hidden h-[270px] aspect-square flex items-center justify-center bg-gray-200"></div>

      {/* Badge giảm giá */}
      <div className="absolute top-2 right-2 w-16 h-6 bg-gray-300 rounded-2xl"></div>

      {/* Nội dung */}
      <div className="px-4 pb-4 mt-3 space-y-3">
        {/* Tên sản phẩm */}
        <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
        <div className="w-2/5 h-4 bg-gray-200 rounded-md"></div>

        {/* Hàng & rating */}
        <div className="flex items-center justify-between">
          <div className="w-16 h-3 bg-gray-300 rounded-md"></div>
          <div className="w-10 h-3 bg-gray-300 rounded-md"></div>
        </div>

        {/* Giá */}
        <div className="flex gap-2 items-center">
          <div className="w-20 h-4 bg-gray-300 rounded-md"></div>
          <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCardProduct;
