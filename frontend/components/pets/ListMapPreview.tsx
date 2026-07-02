"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface ListMapPreviewProps {
  lat: number;
  lng: number;
}

function ChangeView({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13, { animate: true });
  }, [lat, lng, map]);
  return null;
}

const markerIcon =
  typeof window !== "undefined"
    ? L.divIcon({
        html: `<div style="width:32px;height:32px;border-radius:50% 50% 50% 0;background:linear-gradient(135deg,#E36B5A,#4A9B7A);transform:rotate(-45deg);border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.25);"></div>`,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      })
    : undefined;

export default function ListMapPreview({ lat, lng }: ListMapPreviewProps) {
  return (
    <div className="h-48 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-glass">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={true}
        style={{ width: "100%", height: "100%" }}
      >
        <ChangeView lat={lat} lng={lng} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerIcon && <Marker position={[lat, lng]} icon={markerIcon} />}
      </MapContainer>
    </div>
  );
}
