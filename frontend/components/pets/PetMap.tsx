"use client";

import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { Heart, Navigation, Eye, CheckCircle2, MapPin } from "lucide-react";
import type { Pet } from "@/lib/pets-data";
import { useFavoritesStore } from "@/lib/store";
import { cn } from "@/lib/utils";

// Fix default leaflet icons in webpack/nextjs safely
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

interface PetMapProps {
  pets: Pet[];
}

interface Coordinate {
  lat: number;
  lng: number;
}

// Haversine formula to calculate distance between user and pet in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Custom React leaflet view controller to animate pans/zooms
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 0.75 });
  }, [center, zoom, map]);
  return null;
}

// Listen to zoom changes reactively
function MapEventsHandler({ onZoomEnd }: { onZoomEnd: (zoom: number) => void }) {
  const map = useMap();
  useEffect(() => {
    const handleZoom = () => {
      onZoomEnd(map.getZoom());
    };
    map.on("zoomend", handleZoom);
    return () => {
      map.off("zoomend", handleZoom);
    };
  }, [map, onZoomEnd]);
  return null;
}

// Generate premium custom HTML marker icons
const createPetIcon = (species: string, isSelected: boolean) => {
  const isDog = species === "dog";
  const borderCol = isSelected ? "border-coral ring-4 ring-coral/20 scale-110" : "border-white";
  const bgCol = isDog ? "bg-coral" : "bg-emerald";
  const emoji = isDog ? "🐶" : "🐱";

  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center w-8 h-8 rounded-full ${bgCol} border-2 ${borderCol} shadow-lg text-sm cursor-pointer transition-all duration-300 transform hover:scale-110">
        <span>${emoji}</span>
        <div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-white shadow-sm"></div>
      </div>
    `,
    className: "custom-leaflet-pet-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const createClusterIcon = (count: number, cityName: string) => {
  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-coral to-emerald text-white border-2 border-white shadow-xl text-xs font-black cursor-pointer transform hover:scale-105 transition-all">
        <span>${count}</span>
        <div class="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-slate-900/90 text-[9px] text-white px-2 py-0.5 rounded-md font-bold whitespace-nowrap shadow-sm border border-white/10 z-50">
          ${cityName}
        </div>
      </div>
    `,
    className: "custom-leaflet-cluster-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

export function PetMap({ pets }: PetMapProps) {
  // State
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // India Center
  const [mapZoom, setMapZoom] = useState<number>(5);
  const [currentZoom, setCurrentZoom] = useState<number>(5);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  
  // Geolocation states
  const [userLocation, setUserLocation] = useState<Coordinate | null>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  const { favoriteIds, toggle: toggleFavorite } = useFavoritesStore();

  const isFavorite = (id: string) => favoriteIds.includes(id);

  // Parse pets with distance calculation if userLocation is available
  const processedPets = useMemo(() => {
    if (!userLocation) {
      return pets.map((p) => ({ ...p, distanceVal: null }));
    }

    return pets
      .map((p) => {
        const dist = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          p.location.lat,
          p.location.lng
        );
        return {
          ...p,
          distanceVal: dist,
          distance: `${dist.toFixed(1)} km`,
        };
      })
      // Sort nearest pets first
      .sort((a, b) => (a.distanceVal || 0) - (b.distanceVal || 0));
  }, [pets, userLocation]);

  // Cluster calculations (grouping pets by city for low zoom levels)
  const cityClusters = useMemo(() => {
    const groups: { [city: string]: Array<Pet & { distanceVal: number | null }> } = {};
    processedPets.forEach((pet) => {
      const city = pet.location.city;
      if (!groups[city]) groups[city] = [];
      groups[city].push(pet);
    });

    return Object.entries(groups).map(([city, list]) => {
      // Find average lat/lng for cluster center
      const latSum = list.reduce((sum, p) => sum + p.location.lat, 0);
      const lngSum = list.reduce((sum, p) => sum + p.location.lng, 0);
      return {
        city,
        lat: latSum / list.length,
        lng: lngSum / list.length,
        count: list.length,
        petsList: list,
      };
    });
  }, [processedPets]);

  // Request browser geolocation permission
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    setLocError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
        setMapCenter([coords.lat, coords.lng]);
        setMapZoom(11);
        setLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocError("Permission denied or location unavailable.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleSelectPet = (pet: typeof processedPets[0]) => {
    setSelectedPetId(pet.id);
    setMapCenter([pet.location.lat - 0.015, pet.location.lng]); // Offset slightly south to accommodate popup
    setMapZoom(12);
  };

  const handleClusterClick = (cluster: typeof cityClusters[0]) => {
    setMapCenter([cluster.lat, cluster.lng]);
    setMapZoom(9);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full bg-white p-4 rounded-[2.5rem] border border-slate-200/60 shadow-sm min-h-[500px]">
      
      {/* List Sidebar (Left - sorted by nearest first if geolocation active) */}
      <div className="w-full lg:w-80 flex flex-col max-h-[550px] overflow-hidden">
        <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-800">Locations Map</h3>
            <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
              {processedPets.length} Pets Available
            </p>
          </div>
          <button
            onClick={handleUseMyLocation}
            disabled={locating}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-coral to-emerald hover:scale-105 active:scale-95 transition-all text-white font-bold rounded-2xl text-[10px] shadow-sm cursor-pointer disabled:opacity-75"
          >
            <Navigation className={cn("w-3 h-3", locating && "animate-spin")} />
            {locating ? "Locating..." : "Use My Location"}
          </button>
        </div>

        {locError && (
          <p className="text-[10px] font-bold text-red-500 bg-red-50 p-2 rounded-xl mt-2">
            ⚠️ {locError}
          </p>
        )}

        {/* Scrollable Pet cards list */}
        <div className="flex-1 overflow-y-auto pt-4 space-y-3 pr-1 scrollbar-hide">
          {processedPets.map((pet) => (
            <div
              key={pet.id}
              onClick={() => handleSelectPet(pet)}
              className={cn(
                "p-3 rounded-2xl border cursor-pointer transition-all flex gap-3 hover:bg-slate-50",
                selectedPetId === pet.id
                  ? "bg-slate-50 border-coral/45 shadow-sm"
                  : "bg-white border-slate-100"
              )}
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img src={pet.images[0]} alt={pet.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-800 truncate">{pet.name}</h4>
                  {pet.distanceVal !== null && (
                    <span className="text-[9px] font-extrabold text-coral bg-coral-light px-2 py-0.5 rounded-full shrink-0">
                      {pet.distance}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                  {pet.breed} · {pet.age.label}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-black text-slate-900">
                    {pet.adoptionFee === 0 ? "Free" : `₹${pet.adoptionFee}`}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5 text-slate-300" /> {pet.location.city}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {processedPets.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-semibold">No pets match active filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Leaflet Map Widget (Right) */}
      <div className="flex-1 rounded-[2rem] overflow-hidden border border-slate-100 h-[380px] lg:h-[550px] relative z-10 shadow-inner">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <ChangeView center={mapCenter} zoom={mapZoom} />
          <MapEventsHandler onZoomEnd={(z) => setCurrentZoom(z)} />
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User Location Pulse Marker */}
          {userLocation && (
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={L.divIcon({
                html: `
                  <div class="relative flex items-center justify-center w-6 h-6">
                    <span class="absolute inline-flex h-full w-full rounded-full bg-blue-500/30 opacity-75 animate-ping"></span>
                    <div class="w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white shadow-md z-10"></div>
                  </div>
                `,
                className: "custom-leaflet-user-icon",
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              })}
            >
              <Popup>
                <div className="text-center text-xs font-bold text-blue-600">Your Current Location</div>
              </Popup>
            </Marker>
          )}

          {/* Clustering Render Logic based on zoom level */}
          {currentZoom < 7 ? (
            // Low zoom level: render grouped city clusters
            cityClusters.map((cluster) => (
              <Marker
                key={`cluster-${cluster.city}`}
                position={[cluster.lat, cluster.lng]}
                icon={createClusterIcon(cluster.count, cluster.city)}
                eventHandlers={{
                  click: () => handleClusterClick(cluster),
                }}
              />
            ))
          ) : (
            // High zoom level: render all individual pets (with slight jitter to prevent overlapping coordinates)
            processedPets.map((pet, idx) => {
              // Add minor jitter/offset coordinates if multiple pets are in same city
              const cityCount = processedPets.filter(p => p.location.city === pet.location.city).length;
              const jitterLat = cityCount > 1 ? pet.location.lat + (idx * 0.005 - 0.0025) : pet.location.lat;
              const jitterLng = cityCount > 1 ? pet.location.lng + (idx * 0.005 - 0.0025) : pet.location.lng;

              return (
                <Marker
                  key={pet.id}
                  position={[jitterLat, jitterLng]}
                  icon={createPetIcon(pet.species, selectedPetId === pet.id)}
                  eventHandlers={{
                    click: () => setSelectedPetId(pet.id),
                  }}
                >
                  <Popup>
                    <div className="w-56 p-1 text-slate-800 font-sans">
                      <div className="h-32 rounded-xl overflow-hidden bg-slate-100 mb-2 relative shadow-inner">
                        <img src={pet.images[0]} alt={pet.name} className="w-full h-full object-cover" />
                        <span className={cn(
                          "absolute top-2 right-2 text-[8px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm",
                          pet.gender === "male" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"
                        )}>
                          {pet.gender}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-base text-slate-900 flex items-center gap-1">
                          {pet.name}
                          {pet.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald fill-emerald-light shrink-0" />}
                        </h4>
                        {pet.distanceVal !== null && (
                          <span className="text-[8px] font-black text-coral bg-coral-light px-2 py-0.5 rounded-full shrink-0">
                            {pet.distance}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        {pet.breed} · {pet.age.label}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {pet.vaccinated && (
                          <span className="text-[9px] bg-emerald-light text-emerald font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Vaccinated
                          </span>
                        )}
                        <span className="text-[9px] bg-slate-100 text-slate-500 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {pet.location.city}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                        <span className="text-sm font-black text-slate-900">
                          {pet.adoptionFee === 0 ? "Free Adoption" : `₹${pet.adoptionFee}`}
                        </span>
                      </div>

                      {/* Popup CTA buttons */}
                      <div className="flex gap-1.5 mt-3 pt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(pet.id);
                          }}
                          className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shrink-0"
                          title={isFavorite(pet.id) ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Heart className={cn("w-3.5 h-3.5", isFavorite(pet.id) ? "fill-coral text-coral" : "text-slate-400")} />
                        </button>
                        <Link
                          href={`/pets/${pet.id}`}
                          className="flex-1 bg-gradient-to-r from-coral to-emerald text-white text-[10px] font-extrabold py-2 rounded-xl text-center shadow-sm hover:shadow hover:scale-[1.02] transition-all block"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })
          )}
        </MapContainer>
      </div>
    </div>
  );
}
