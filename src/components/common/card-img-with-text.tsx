const ComboImgWithText = ({
  src,
  title,
  onClick,
}: {
  src: string;
  title: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className="flex flex-col gap-3 cursor-pointer h-full"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="overflow-hidden rounded-lg bg-gray-100 aspect-square flex items-center justify-center">
        <img
          src={src || "/src/assets/img/img-placeholder.png"}
          alt={title || "ảnh nổi bật"}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
        />
      </div>

      <p className="text-base font-semibold text-black text-center leading-tight">
        {title ?? "--"}
      </p>
    </div>
  );
};
export default ComboImgWithText;
