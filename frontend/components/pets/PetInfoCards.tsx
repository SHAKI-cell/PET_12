import { Dna, Calendar, Compass, ShieldAlert, Heart, Activity } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { VetCheckedTag } from "@/components/trust/VetCheckedTag";

interface PetInfoCardsProps {
  breed: string;
  ageLabel: string;
  gender: string;
  size: string;
  vaccinated: boolean;
  spayed: boolean;
  temperament: string[];
}

export function PetInfoCards({
  breed,
  ageLabel,
  gender,
  size,
  vaccinated,
  spayed,
  temperament,
}: PetInfoCardsProps) {
  const cards = [
    { icon: Dna, title: "Breed", value: breed, bg: "bg-coral-light/40 text-coral" },
    { icon: Calendar, title: "Age", value: ageLabel, bg: "bg-emerald-light/40 text-emerald" },
    { icon: Compass, title: "Gender", value: gender.charAt(0).toUpperCase() + gender.slice(1), bg: "bg-amber-100 text-amber-700" },
    { icon: Activity, title: "Size", value: size.charAt(0).toUpperCase() + size.slice(1), bg: "bg-blue-50 text-blue-700" },
  ];

  return (
    <div className="space-y-6">
      {/* Key Info Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-center text-center">
            <div className={`p-2.5 rounded-xl ${card.bg} mb-2.5`}>
              <card.icon className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-400 font-medium">{card.title}</span>
            <span className="text-sm font-bold text-slate-800 mt-0.5 truncate w-full px-1">
              {card.value}
            </span>
          </div>
        ))}
      </div>

      {/* Health & Temperament Status */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
        <h3 className="font-serif text-lg font-bold text-slate-900">Health & Temperament</h3>
        
        <div className="flex flex-wrap gap-2.5">
          {vaccinated && <VetCheckedTag />}
          <Badge variant={spayed ? "success" : "secondary"} className="h-6 font-semibold">
            {spayed ? "Neutered / Spayed ✓" : "Not Spayed"}
          </Badge>
          <Badge variant="outline" className="h-6 font-semibold">
            House Trained
          </Badge>
        </div>

        {/* Temperament Tags */}
        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Temperament
          </p>
          <div className="flex flex-wrap gap-1.5">
            {temperament.map((t) => (
              <span
                key={t}
                className="text-xs font-semibold bg-slate-50 border border-slate-150 text-slate-700 px-3.5 py-1 rounded-full capitalize"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
