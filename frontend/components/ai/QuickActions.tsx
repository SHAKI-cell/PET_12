import React from "react";

interface QuickActionsProps {
  onActionClick: (text: string) => void;
}

const suggestions = [
  "Recommend food",
  "Best food for Labrador",
  "Compare Pedigree vs Royal Canin",
  "Food for Persian Cat",
  "Puppy Nutrition",
  "Senior Dog Food"
];

export default function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="space-y-2 pt-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick suggestions</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((action) => (
          <button
            key={action}
            onClick={() => onActionClick(action)}
            className="text-left text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 px-3.5 py-2 rounded-2xl hover:bg-slate-100 hover:border-slate-300 transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
