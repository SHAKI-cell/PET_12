"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Calendar, Heart, ShieldAlert, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getPetById } from "@/lib/api/pets";
import type { Pet } from "@/lib/pets-data";
import { PetGallery } from "@/components/pets/PetGallery";
import { PetInfoCards } from "@/components/pets/PetInfoCards";
import { OwnerCard } from "@/components/pets/OwnerCard";
import { AdoptCTA } from "@/components/pets/AdoptCTA";
import { SimilarPets } from "@/components/pets/SimilarPets";
import { useFavoritesStore } from "@/lib/store";
import { ReportModal } from "@/components/trust/ReportModal";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils";

export default function PetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [reportOpen, setReportOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { toggle, isFavorite } = useFavoritesStore();
  const fav = pet ? isFavorite(pet.id) : false;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchPet() {
      setLoading(true);
      const data = await getPetById(id);
      if (data) {
        setPet(data);
      } else {
        setPet(null);
      }
      setLoading(false);
    }
    fetchPet();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-6 w-24" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <Skeleton className="aspect-[4/3] rounded-3xl" />
              <Skeleton className="h-40 rounded-3xl" />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <Skeleton className="h-48 rounded-3xl" />
              <Skeleton className="h-64 rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-2">Pet Not Found</h2>
        <p className="text-slate-500 mb-6 max-w-sm">
          The pet profile you are looking for does not exist or has already been adopted.
        </p>
        <Link
          href="/pets"
          className="bg-gradient-to-r from-coral to-emerald text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/pets"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-coral transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to pet listings
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggle(pet.id)}
              className="p-2.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
              title="Add to favorites"
            >
              <Heart className={`w-4 h-4 ${mounted && fav ? "fill-coral text-coral" : "text-slate-500"}`} />
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
              className="p-2.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
              title="Share listing"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Images, Info, Description) */}
          <div className="lg:col-span-7 space-y-8">
            <PetGallery images={pet.images} />
            
            <PetInfoCards
              breed={pet.breed}
              ageLabel={pet.age.label}
              gender={pet.gender}
              size={pet.size}
              vaccinated={pet.vaccinated}
              spayed={pet.spayed}
              temperament={pet.temperament}
              distance={pet.distance}
            />

            {/* Description Card */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
              <h3 className="font-serif text-2xl font-bold text-slate-900">About {pet.name}</h3>
              <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
                {pet.description}
              </p>
              
              {pet.healthNotes && (
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                  <h4 className="font-serif text-lg font-bold text-slate-800">Health Notes</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {pet.healthNotes}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center pt-6 border-t border-slate-100 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Listed on {formatDate(pet.createdAt)}
                </span>
                <button
                  onClick={() => setReportOpen(true)}
                  className="flex items-center gap-1 hover:text-red-400 transition-colors font-semibold"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Report Listing
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (Owner profile & Action CTA) */}
          <div className="lg:col-span-5 space-y-6">
            <AdoptCTA petName={pet.name} adoptionFee={pet.adoptionFee} />
            
            <OwnerCard
              name={pet.ownerName}
              avatar={pet.ownerAvatar}
              rating={pet.ownerRating}
              memberSince={pet.ownerMemberSince}
              onContactClick={() => {
                router.push("/messages");
              }}
            />
          </div>
        </div>

        {/* Similar Pets Section */}
        <SimilarPets species={pet.species} currentPetId={pet.id} />
      </div>

      {/* Report Modal */}
      <ReportModal
        open={reportOpen}
        onOpenChange={setReportOpen}
        listingId={pet.id}
        listingName={pet.name}
      />
    </div>
  );
}
