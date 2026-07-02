"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  CloudUpload,
  Trash2,
  Navigation,
  MapPin,
  Sparkles,
  FileText,
  ShieldCheck,
  X,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ListMapPreview = dynamic(
  () => import("@/components/pets/ListMapPreview"),
  {
    ssr: false,
    loading: () => (
      <div className="h-48 w-full animate-pulse rounded-2xl bg-slate-100 flex items-center justify-center text-xs text-slate-400 font-semibold">
        Loading Map...
      </div>
    ),
  }
);

// Local interface — does NOT depend on external types
interface CustomListing {
  id: string;
  referenceId: string;
  name: string;
  species: "dog" | "cat" | "other";
  breed: string;
  gender: "male" | "female";
  age: number;
  ageUnit: "months" | "years";
  weight: number;
  color: string;
  vaccinated: boolean;
  spayed: boolean;
  microchipped: boolean;
  adoptionFee: number;
  description: string;
  healthNotes: string;
  photos: string[];
  location: { state: string; city: string; area: string; lat: number; lng: number };
  owner: { name: string; phone: string; email: string; whatsapp: string; contact: string };
  status: "Pending" | "Approved" | "Rejected";
  submittedAt: string;
}

interface FormErrors {
  [key: string]: string;
}

const STEPS = ["Basic Info", "Health", "Photos", "Location", "Owner", "Review"];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh", "Puducherry",
];

export default function ListPetWizard() {
  const [step, setStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState("");
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [improvingAI, setImprovingAI] = useState(false);

  // Step 1: Basic Info
  const [name, setName] = useState("");
  const [species, setSpecies] = useState<"dog" | "cat" | "other">("dog");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [ageValue, setAgeValue] = useState("");
  const [ageUnit, setAgeUnit] = useState<"months" | "years">("months");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [adoptionFee, setAdoptionFee] = useState("0");
  const [description, setDescription] = useState("");

  // Step 2: Health
  const [vaccinated, setVaccinated] = useState(false);
  const [spayed, setSpayed] = useState(false);
  const [microchipped, setMicrochipped] = useState(false);
  const [healthNotes, setHealthNotes] = useState("");
  const [vacCert, setVacCert] = useState(false);
  const [medReport, setMedReport] = useState(false);
  const [ownerId, setOwnerId] = useState(false);

  // Step 3: Photos
  const [photos, setPhotos] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Step 4: Location
  const [locState, setLocState] = useState("Maharashtra");
  const [locCity, setLocCity] = useState("Mumbai");
  const [locArea, setLocArea] = useState("");
  const [locPin, setLocPin] = useState("");
  const [lat, setLat] = useState(19.076);
  const [lng, setLng] = useState(72.8777);
  const [locating, setLocating] = useState(false);

  // Step 5: Owner
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerWhatsapp, setOwnerWhatsapp] = useState("");
  const [ownerContact, setOwnerContact] = useState("phone");

  // Step 6: Special Notes
  const [specialNotes, setSpecialNotes] = useState("");

  // Draft autosave every 2s
  useEffect(() => {
    if (isSuccess) return;
    const t = setTimeout(() => {
      const draft = {
        name, species, breed, gender, ageValue, ageUnit, weight, color,
        adoptionFee, description, vaccinated, spayed, microchipped, healthNotes,
        vacCert, medReport, ownerId: ownerId, photos,
        locState, locCity, locArea, locPin, lat, lng,
        ownerName, ownerPhone, ownerEmail, ownerWhatsapp, ownerContact,
        specialNotes, step,
      };
      localStorage.setItem("dofo_list_pet_draft", JSON.stringify(draft));
    }, 2000);
    return () => clearTimeout(t);
  }, [
    name, species, breed, gender, ageValue, ageUnit, weight, color,
    adoptionFee, description, vaccinated, spayed, microchipped, healthNotes,
    vacCert, medReport, ownerId, photos,
    locState, locCity, locArea, locPin, lat, lng,
    ownerName, ownerPhone, ownerEmail, ownerWhatsapp, ownerContact,
    specialNotes, step, isSuccess
  ]);

  // Check for draft on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("dofo_list_pet_draft");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.name || p.ownerName || p.breed) setShowDraftModal(true);
      } catch { /* ignore */ }
    }
  }, []);

  const resumeDraft = () => {
    const saved = localStorage.getItem("dofo_list_pet_draft");
    if (!saved) return;
    try {
      const p = JSON.parse(saved);
      if (p.name !== undefined) setName(p.name);
      if (p.species) setSpecies(p.species);
      if (p.breed !== undefined) setBreed(p.breed);
      if (p.gender) setGender(p.gender);
      if (p.ageValue !== undefined) setAgeValue(p.ageValue);
      if (p.ageUnit) setAgeUnit(p.ageUnit);
      if (p.weight !== undefined) setWeight(p.weight);
      if (p.color !== undefined) setColor(p.color);
      if (p.adoptionFee !== undefined) setAdoptionFee(p.adoptionFee);
      if (p.description !== undefined) setDescription(p.description);
      if (p.vaccinated !== undefined) setVaccinated(p.vaccinated);
      if (p.spayed !== undefined) setSpayed(p.spayed);
      if (p.microchipped !== undefined) setMicrochipped(p.microchipped);
      if (p.healthNotes !== undefined) setHealthNotes(p.healthNotes);
      if (p.vacCert !== undefined) setVacCert(p.vacCert);
      if (p.medReport !== undefined) setMedReport(p.medReport);
      if (p.photos) setPhotos(p.photos);
      if (p.locState) setLocState(p.locState);
      if (p.locCity !== undefined) setLocCity(p.locCity);
      if (p.locArea !== undefined) setLocArea(p.locArea);
      if (p.locPin !== undefined) setLocPin(p.locPin);
      if (p.lat) setLat(p.lat);
      if (p.lng) setLng(p.lng);
      if (p.ownerName !== undefined) setOwnerName(p.ownerName);
      if (p.ownerPhone !== undefined) setOwnerPhone(p.ownerPhone);
      if (p.ownerEmail !== undefined) setOwnerEmail(p.ownerEmail);
      if (p.ownerWhatsapp !== undefined) setOwnerWhatsapp(p.ownerWhatsapp);
      if (p.ownerContact) setOwnerContact(p.ownerContact);
      if (p.specialNotes !== undefined) setSpecialNotes(p.specialNotes);
      if (p.step !== undefined) setStep(p.step);
    } catch { /* ignore */ }
    setShowDraftModal(false);
  };

  const discardDraft = () => {
    localStorage.removeItem("dofo_list_pet_draft");
    setShowDraftModal(false);
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setLocating(false);
      },
      () => {
        setLocating(false);
        alert("Could not access location. Please allow permissions and try again.");
      }
    );
  };

  const handleFiles = (files: FileList) => {
    const remaining = 8 - photos.length;
    if (remaining <= 0) { alert("Maximum 8 photos allowed."); return; }
    setUploading(true);
    const toProcess = Array.from(files).slice(0, remaining);
    let done = 0;
    toProcess.forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      setTimeout(() => {
        setPhotos((prev) => [...prev, url]);
        done++;
        if (done === toProcess.length) setUploading(false);
      }, 400 + Math.random() * 600);
    });
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (step === 0) {
      if (!name.trim()) errs.name = "Pet name is required";
      if (!breed.trim()) errs.breed = "Breed is required";
      if (!ageValue || isNaN(+ageValue) || +ageValue <= 0) errs.age = "Valid age required";
      if (!weight || isNaN(+weight) || +weight <= 0) errs.weight = "Valid weight required";
      if (!color.trim()) errs.color = "Color is required";
      if (!description.trim()) errs.description = "Description is required";
    }
    if (step === 1) {
      if (!healthNotes.trim()) errs.healthNotes = "Health notes are required";
    }
    if (step === 2) {
      if (photos.length === 0) errs.photos = "At least one photo is required";
    }
    if (step === 3) {
      if (!locArea.trim()) errs.locArea = "Area is required";
      if (!locPin.trim() || locPin.length !== 6 || !/^\d+$/.test(locPin)) errs.locPin = "Enter valid 6-digit PIN";
    }
    if (step === 4) {
      if (!ownerName.trim()) errs.ownerName = "Name is required";
      if (!ownerPhone.trim() || ownerPhone.length < 10 || !/^\d+$/.test(ownerPhone)) errs.ownerPhone = "Enter valid 10-digit phone";
      if (!ownerEmail.trim() || !ownerEmail.includes("@")) errs.ownerEmail = "Enter valid email";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep((s) => s + 1);
  };

  const handleImproveWithAI = async () => {
    if (!description.trim()) { alert("Write a draft description first."); return; }
    setImprovingAI(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: description }],
          mode: "improve-description",
        }),
      });
      const data = await res.json();
      if (data.improved) setDescription(data.improved);
    } catch {
      // Fallback
      setDescription(description + " A truly loving companion ready to bring joy and warmth to your home.");
    } finally {
      setImprovingAI(false);
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const reference = `DOFO-PET-${Math.floor(10000 + Math.random() * 90000)}`;
    const listing: CustomListing = {
      id: `custom-${Date.now()}`,
      referenceId: reference,
      name, species, breed, gender,
      age: Number(ageValue), ageUnit,
      weight: Number(weight), color,
      vaccinated, spayed, microchipped,
      adoptionFee: Number(adoptionFee),
      description,
      healthNotes: healthNotes + (specialNotes ? ` | Notes: ${specialNotes}` : ""),
      photos: photos.length > 0 ? photos : [],
      location: { state: locState, city: locCity, area: locArea, lat, lng },
      owner: { name: ownerName, phone: ownerPhone, email: ownerEmail, whatsapp: ownerWhatsapp, contact: ownerContact },
      status: "Pending",
      submittedAt: new Date().toISOString(),
    };

    const myListings = JSON.parse(localStorage.getItem("dofo_my_listings") || "[]");
    localStorage.setItem("dofo_my_listings", JSON.stringify([listing, ...myListings]));
    const pending = JSON.parse(localStorage.getItem("dofo_pending_listings") || "[]");
    localStorage.setItem("dofo_pending_listings", JSON.stringify([listing, ...pending]));
    localStorage.removeItem("dofo_list_pet_draft");

    setRefId(reference);
    setIsSuccess(true);
  };

  const resetForm = () => {
    setIsSuccess(false); setStep(0);
    setName(""); setBreed(""); setAgeValue(""); setWeight(""); setColor("");
    setAdoptionFee("0"); setDescription(""); setHealthNotes(""); setPhotos([]);
    setLocArea(""); setLocPin(""); setOwnerName(""); setOwnerPhone("");
    setOwnerEmail(""); setOwnerWhatsapp(""); setSpecialNotes("");
    setVaccinated(false); setSpayed(false); setMicrochipped(false);
    setVacCert(false); setMedReport(false); setOwnerId(false);
    setErrors({});
  };

  // ─── SUCCESS SCREEN ───────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl bg-white border border-slate-100 shadow-premium p-8 md:p-12 text-center space-y-6 max-w-lg mx-auto"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-light flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-emerald" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-black text-slate-800">Listing Submitted!</h2>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Your pet listing is now under review. Our team will verify your details within 24–48 hours.
          </p>
        </div>
        <div className="bg-cream rounded-2xl p-4 text-left space-y-2 max-w-xs mx-auto">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">Reference ID</span>
            <span className="text-slate-800 font-mono">{refId}</span>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">Status</span>
            <span className="text-amber-600">Pending Verification</span>
          </div>
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">Review Time</span>
            <span className="text-slate-600">24–48 Hours</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={resetForm}
            className="px-6 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            List Another Pet
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-coral to-emerald text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {/* Draft Recovery Modal */}
      <AnimatePresence>
        {showDraftModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full border border-slate-100 text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-coral-light flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-coral" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-slate-800">Saved Draft Found</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  You have an unsaved draft from your previous session. Resume where you left off?
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={discardDraft}
                  className="flex-1 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Discard
                </button>
                <button
                  onClick={resumeDraft}
                  className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-coral to-emerald text-white text-xs font-semibold hover:scale-105 transition-all cursor-pointer shadow-md"
                >
                  Resume Draft
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Wizard */}
      <div className="rounded-3xl bg-white border border-slate-100 shadow-premium overflow-hidden">
        {/* Step Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif text-xl font-black text-slate-800">
                List a Pet for Adoption
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 font-semibold">
                Step {step + 1} of 6 — {STEPS[step]}
              </p>
            </div>
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i <= step ? "bg-coral w-6" : "bg-slate-100 w-4"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {/* ── STEP 0: BASIC INFO ── */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Pet Name *</label>
                    <Input
                      placeholder="e.g. Bruno, Simba, Luna"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={errors.name ? "border-red-300 focus-visible:border-red-400" : ""}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Pet Type *</label>
                    <select
                      value={species}
                      onChange={(e) => setSpecies(e.target.value as "dog" | "cat" | "other")}
                      className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all cursor-pointer"
                    >
                      <option value="dog">🐶 Dog</option>
                      <option value="cat">🐱 Cat</option>
                      <option value="other">🐰 Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Breed *</label>
                    <Input
                      placeholder="e.g. Labrador, Persian"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      className={errors.breed ? "border-red-300" : ""}
                    />
                    {errors.breed && <p className="text-[10px] text-red-500 font-semibold">{errors.breed}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Gender *</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as "male" | "female")}
                      className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all cursor-pointer"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Color *</label>
                    <Input
                      placeholder="e.g. Golden, Black & White"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className={errors.color ? "border-red-300" : ""}
                    />
                    {errors.color && <p className="text-[10px] text-red-500 font-semibold">{errors.color}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Age *</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        min="0"
                        placeholder="e.g. 6"
                        value={ageValue}
                        onChange={(e) => setAgeValue(e.target.value)}
                        className={cn("flex-1", errors.age ? "border-red-300" : "")}
                      />
                      <select
                        value={ageUnit}
                        onChange={(e) => setAgeUnit(e.target.value as "months" | "years")}
                        className="h-10 rounded-xl border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all cursor-pointer"
                      >
                        <option value="months">Months</option>
                        <option value="years">Years</option>
                      </select>
                    </div>
                    {errors.age && <p className="text-[10px] text-red-500 font-semibold">{errors.age}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Weight (kg) *</label>
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="e.g. 5.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className={errors.weight ? "border-red-300" : ""}
                    />
                    {errors.weight && <p className="text-[10px] text-red-500 font-semibold">{errors.weight}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Adoption Fee (₹)</label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0 for Free"
                      value={adoptionFee}
                      onChange={(e) => setAdoptionFee(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Description *</label>
                  <textarea
                    rows={4}
                    placeholder="Tell adopters about your pet's personality, habits, and why they'd make a great companion..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={cn(
                      "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all resize-none",
                      errors.description ? "border-red-300" : ""
                    )}
                  />
                  {errors.description && <p className="text-[10px] text-red-500 font-semibold">{errors.description}</p>}
                </div>
              </motion.div>
            )}

            {/* ── STEP 1: HEALTH ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Vaccinated", value: vaccinated, setter: setVaccinated },
                    { label: "Spayed / Neutered", value: spayed, setter: setSpayed },
                    { label: "Microchipped", value: microchipped, setter: setMicrochipped },
                  ].map(({ label, value, setter }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setter(!value)}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-2xl border text-left transition-all cursor-pointer",
                        value
                          ? "border-emerald bg-emerald-light text-emerald"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0",
                        value ? "border-emerald bg-emerald" : "border-slate-300"
                      )}>
                        {value && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs font-bold">{label}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Health Notes *</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your pet's health status, recent vet visits, diet, and any medical history..."
                    value={healthNotes}
                    onChange={(e) => setHealthNotes(e.target.value)}
                    className={cn(
                      "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all resize-none",
                      errors.healthNotes ? "border-red-300" : ""
                    )}
                  />
                  {errors.healthNotes && <p className="text-[10px] text-red-500 font-semibold">{errors.healthNotes}</p>}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-coral" />
                    <label className="text-xs font-bold text-slate-700">Verification Documents (Optional)</label>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Vaccination Certificate", value: vacCert, setter: setVacCert },
                      { label: "Medical Report", value: medReport, setter: setMedReport },
                      { label: "Owner ID Proof", value: ownerId, setter: setOwnerId },
                    ].map(({ label, value, setter }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setter(!value)}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer text-xs font-semibold",
                          value
                            ? "border-emerald bg-emerald-light text-emerald"
                            : "border-slate-200 bg-slate-50 text-slate-600 hover:border-coral"
                        )}
                      >
                        <span>{label}</span>
                        {value ? (
                          <ShieldCheck className="w-4 h-4" />
                        ) : (
                          <CloudUpload className="w-4 h-4 text-slate-300" />
                        )}
                      </button>
                    ))}
                  </div>
                  {(vacCert || medReport || ownerId) && (
                    <p className="text-[10px] text-emerald font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Documents marked as uploaded — listing will get a Verified badge
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: PHOTOS ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div
                  onDragEnter={() => setDragActive(true)}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
                  }}
                  onClick={() => document.getElementById("photo-input")?.click()}
                  className={cn(
                    "border-2 border-dashed rounded-3xl p-10 text-center transition-all cursor-pointer flex flex-col items-center gap-3",
                    dragActive ? "border-coral bg-coral-light" : "border-slate-200 hover:border-coral bg-slate-50/50"
                  )}
                >
                  <CloudUpload className={cn("w-10 h-10", dragActive ? "text-coral" : "text-slate-300")} />
                  <div>
                    <p className="text-sm font-bold text-slate-700">Drop photos here or click to browse</p>
                    <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP — Max 8 photos</p>
                  </div>
                  <input
                    id="photo-input"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  />
                </div>

                {uploading && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-coral">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-coral border-t-transparent animate-spin" />
                    Processing photos...
                  </div>
                )}

                {errors.photos && <p className="text-[10px] text-red-500 font-semibold">{errors.photos}</p>}

                {photos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {photos.map((photo, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-100">
                        <img src={photo} alt={`Pet photo ${idx + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setPhotos((p) => p.filter((_, i) => i !== idx))}
                            className="p-1.5 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {idx === 0 && (
                          <span className="absolute bottom-2 left-2 text-[9px] font-black bg-coral text-white px-1.5 py-0.5 rounded uppercase tracking-wider">
                            Cover
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── STEP 3: LOCATION ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">State *</label>
                    <select
                      value={locState}
                      onChange={(e) => setLocState(e.target.value)}
                      className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all cursor-pointer"
                    >
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">City *</label>
                    <Input
                      placeholder="e.g. Mumbai, Bangalore"
                      value={locCity}
                      onChange={(e) => setLocCity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700">Area / Locality *</label>
                    <Input
                      placeholder="e.g. Bandra West, Koramangala"
                      value={locArea}
                      onChange={(e) => setLocArea(e.target.value)}
                      className={errors.locArea ? "border-red-300" : ""}
                    />
                    {errors.locArea && <p className="text-[10px] text-red-500 font-semibold">{errors.locArea}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">PIN Code *</label>
                    <Input
                      placeholder="e.g. 400050"
                      value={locPin}
                      maxLength={6}
                      onChange={(e) => setLocPin(e.target.value.replace(/\D/g, ""))}
                      className={errors.locPin ? "border-red-300" : ""}
                    />
                    {errors.locPin && <p className="text-[10px] text-red-500 font-semibold">{errors.locPin}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-coral" />
                      Map Location
                    </label>
                    <button
                      type="button"
                      onClick={handleLocation}
                      disabled={locating}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-coral hover:text-emerald transition-colors cursor-pointer disabled:opacity-50 uppercase tracking-wide"
                    >
                      <Navigation className={cn("w-3 h-3", locating && "animate-spin")} />
                      {locating ? "Detecting..." : "Use My Location"}
                    </button>
                  </div>
                  <ListMapPreview lat={lat} lng={lng} />
                  <p className="text-[10px] text-slate-400 font-semibold">
                    Coordinates: {lat.toFixed(4)}, {lng.toFixed(4)}
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: OWNER DETAILS ── */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <Input
                      placeholder="Your full name"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className={errors.ownerName ? "border-red-300" : ""}
                    />
                    {errors.ownerName && <p className="text-[10px] text-red-500 font-semibold">{errors.ownerName}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Phone *</label>
                    <Input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={ownerPhone}
                      maxLength={10}
                      onChange={(e) => setOwnerPhone(e.target.value.replace(/\D/g, ""))}
                      className={errors.ownerPhone ? "border-red-300" : ""}
                    />
                    {errors.ownerPhone && <p className="text-[10px] text-red-500 font-semibold">{errors.ownerPhone}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email *</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      className={errors.ownerEmail ? "border-red-300" : ""}
                    />
                    {errors.ownerEmail && <p className="text-[10px] text-red-500 font-semibold">{errors.ownerEmail}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">WhatsApp (Optional)</label>
                    <Input
                      type="tel"
                      placeholder="WhatsApp number"
                      value={ownerWhatsapp}
                      maxLength={10}
                      onChange={(e) => setOwnerWhatsapp(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Preferred Contact Method</label>
                  <div className="flex gap-3">
                    {["phone", "whatsapp", "email"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setOwnerContact(method)}
                        className={cn(
                          "flex-1 py-2.5 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer",
                          ownerContact === method
                            ? "border-coral bg-coral-light text-coral"
                            : "border-slate-200 text-slate-500 hover:border-slate-300"
                        )}
                      >
                        {method === "phone" ? "📞 Phone" : method === "whatsapp" ? "💬 WhatsApp" : "✉️ Email"}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 5: REVIEW & SUBMIT ── */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {/* Summary Card */}
                <div className="bg-cream rounded-2xl p-5 space-y-4">
                  <h3 className="font-serif text-sm font-black text-slate-800">Listing Summary</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-slate-400 font-semibold">Name</p>
                      <p className="font-bold text-slate-800">{name}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Species / Breed</p>
                      <p className="font-bold text-slate-800 capitalize">{species} — {breed}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Age & Weight</p>
                      <p className="font-bold text-slate-800">{ageValue} {ageUnit}, {weight}kg</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Adoption Fee</p>
                      <p className="font-bold text-slate-800">{Number(adoptionFee) === 0 ? "Free Adoption" : `₹${Number(adoptionFee).toLocaleString()}`}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Location</p>
                      <p className="font-bold text-slate-800">{locArea}, {locCity}, {locState}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Owner</p>
                      <p className="font-bold text-slate-800">{ownerName}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Photos</p>
                      <p className="font-bold text-slate-800">{photos.length} uploaded</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-semibold">Health</p>
                      <p className="font-bold text-slate-800">
                        {[vaccinated && "Vaccinated", spayed && "Spayed", microchipped && "Microchipped"].filter(Boolean).join(", ") || "None marked"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Description */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">Adoption Bio (Description)</label>
                    <button
                      type="button"
                      onClick={handleImproveWithAI}
                      disabled={improvingAI}
                      className="flex items-center gap-1.5 text-[10px] font-black text-coral hover:text-emerald transition-colors cursor-pointer disabled:opacity-50 uppercase tracking-wide"
                    >
                      <Sparkles className={cn("w-3.5 h-3.5", improvingAI && "animate-pulse")} />
                      {improvingAI ? "Improving..." : "Improve with AI ✨"}
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Special Notes / Diet Instructions (Optional)</label>
                  <Input
                    placeholder="Any specific care instructions for adopters..."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Footer */}
        <div className="px-6 pb-6 flex items-center justify-between border-t border-slate-50 pt-4">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-coral to-emerald text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-8 py-2.5 rounded-2xl bg-gradient-to-r from-coral to-emerald text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Submit Listing
            </button>
          )}
        </div>
      </div>
    </>
  );
}
