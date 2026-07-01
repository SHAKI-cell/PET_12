"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface PetGalleryProps {
  images: string[];
}

export function PetGallery({ images }: PetGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image View */}
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-sm group">
        <img
          src={images[activeIndex]}
          alt={`Pet Image ${activeIndex + 1}`}
          onError={(e) => { e.currentTarget.src = "/images/pets/placeholder.jpg"; }}
          className="w-full h-full object-cover"
        />

        {/* Overlay Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
          </>
        )}

        {/* Lightbox Trigger */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-colors text-white shadow-lg"
        >
          <Maximize2 className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[4/3] w-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                activeIndex === idx ? "border-coral shadow-md" : "border-transparent"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                onError={(e) => { e.currentTarget.src = "/images/pets/placeholder.jpg"; }}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl p-1 bg-black border-none rounded-2xl overflow-hidden">
          <div className="relative aspect-[4/3] flex items-center justify-center">
            <img
              src={images[activeIndex]}
              alt={`Pet Image ${activeIndex + 1}`}
              onError={(e) => { e.currentTarget.src = "/images/pets/placeholder.jpg"; }}
              className="max-h-[85vh] max-w-full object-contain"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
