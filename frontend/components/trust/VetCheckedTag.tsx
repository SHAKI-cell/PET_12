import { Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface VetCheckedTagProps {
  className?: string;
}

export function VetCheckedTag({ className }: VetCheckedTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 bg-emerald-light text-emerald px-3 py-1 rounded-full text-xs font-semibold",
        className
      )}
    >
      <Stethoscope className="w-3.5 h-3.5" />
      Vet Checked
    </span>
  );
}
