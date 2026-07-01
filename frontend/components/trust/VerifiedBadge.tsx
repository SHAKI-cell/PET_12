"use client";

import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  className?: string;
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function VerifiedBadge({ className, size = "sm", showLabel = false }: VerifiedBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 text-emerald",
        className
      )}
      title="Verified Shelter/Breeder"
    >
      <ShieldCheck
        className={cn(
          "fill-emerald-light",
          size === "sm" ? "w-4 h-4" : "w-5 h-5"
        )}
      />
      {showLabel && (
        <span className={cn(
          "font-semibold",
          size === "sm" ? "text-xs" : "text-sm"
        )}>
          Verified
        </span>
      )}
    </div>
  );
}
