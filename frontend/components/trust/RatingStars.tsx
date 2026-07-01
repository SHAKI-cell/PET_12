import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = "sm",
  showValue = false,
  className,
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalf ? 1 : 0);

  const sizeClass = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }[size];

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(sizeClass, "text-amber-400 fill-amber-400")}
          />
        ))}
        {hasHalf && (
          <StarHalf
            className={cn(sizeClass, "text-amber-400 fill-amber-400")}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(sizeClass, "text-slate-200")}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-slate-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
