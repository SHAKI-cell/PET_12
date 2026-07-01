"use client";

import { Calendar, MessageSquare, Award } from "lucide-react";
import { RatingStars } from "@/components/trust/RatingStars";
import { VerifiedBadge } from "@/components/trust/VerifiedBadge";
import { formatDate, getInitials } from "@/lib/utils";

interface OwnerCardProps {
  name: string;
  avatar: string;
  rating: number;
  memberSince: string;
  onContactClick?: () => void;
}

export function OwnerCard({
  name,
  avatar,
  rating,
  memberSince,
  onContactClick,
}: OwnerCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm">
      <h3 className="font-serif text-lg font-bold text-slate-900 mb-4">Listed By</h3>

      <div className="flex items-center gap-4">
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-14 h-14 rounded-full object-cover border border-slate-200"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-coral-light to-emerald-light flex items-center justify-center font-serif font-bold text-xl text-coral border border-coral/10">
            {getInitials(name)}
          </div>
        )}

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-slate-900 truncate">{name}</h4>
            <VerifiedBadge />
          </div>
          
          <div className="flex items-center gap-1 mt-1">
            <RatingStars rating={rating} size="sm" showValue />
          </div>

          <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>Member since {formatDate(memberSince)}</span>
          </div>
        </div>
      </div>

      {/* Trust Badge Bar */}
      <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2">
        <Award className="w-5 h-5 text-emerald shrink-0" />
        <span className="text-xs text-slate-600 font-medium">
          Top-rated shelter with verified animal safety practices.
        </span>
      </div>

      {/* Message Button */}
      <button
        onClick={onContactClick}
        className="w-full mt-4 bg-slate-100 hover:bg-coral-light hover:text-coral text-slate-700 font-semibold py-3 rounded-full transition-all duration-300 text-sm flex items-center justify-center gap-2"
      >
        <MessageSquare className="w-4 h-4" />
        Send Message
      </button>
    </div>
  );
}
