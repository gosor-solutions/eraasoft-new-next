import { Star } from "lucide-react";

export default function ReviewCard({ item }) {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4">
      <div className="flex flex-col gap-3 rounded-3xl bg-[#2243A41A] p-6 shadow-sm h-full text-right">
        <div className="flex justify-end gap-1">
          {[...Array(5)]?.map((_, i) => (
            <Star
              key={i}
              className=" text-yellow-400"
              fill={i < item.stars ? "currentColor" : "none"}
            />
          ))}
        </div>
        <p className="text-[#777] text-lg line-clamp-4 min-h-20">
          {item.message}
        </p>
        <div className="flex  gap-2 items-center" dir="rtl">
          <div className="shrink-0 w-10 h-10 aspect-square bg-(--primary-color) rounded-full flex justify-center items-center">
            <p className="text-white font-bold text-base leading-none">
              {item.name?.charAt(0)}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-[#0C1739]">{item.name}</h3>
            <p className="text-[#777]">{item.course}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
