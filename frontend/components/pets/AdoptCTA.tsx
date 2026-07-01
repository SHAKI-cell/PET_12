"use client";

import { useState } from "react";
import { MessageSquare, Calendar, Sparkles, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface AdoptCTAProps {
  petName: string;
  adoptionFee: number;
}

export function AdoptCTA({ petName, adoptionFee }: AdoptCTAProps) {
  const [meetOpen, setMeetOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [successMode, setSuccessMode] = useState<"chat" | "meet" | null>(null);
  
  // Form states
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleMeetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMode("meet");
    setTimeout(() => {
      setSuccessMode(null);
      setMeetOpen(false);
      setDate("");
      setTime("");
    }, 2000);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMode("chat");
    setTimeout(() => {
      setSuccessMode(null);
      setChatOpen(false);
      setMessage("");
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-cream to-blush border border-coral/10 p-6 rounded-3xl space-y-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-coral uppercase tracking-wider block">Adoption Fee</span>
          <span className="text-2xl font-bold text-slate-900">
            {adoptionFee === 0 ? "Free Adoption" : `Rs. ${adoptionFee.toLocaleString("en-IN")}`}
          </span>
        </div>
        <div className="bg-white/80 p-2.5 rounded-2xl shadow-sm text-xs font-semibold text-slate-700 flex items-center gap-1.5 border border-slate-100">
          <Heart className="w-4 h-4 text-coral fill-coral/10" />
          Healthy & Ready
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => setChatOpen(true)}
          className="w-full bg-gradient-to-r from-coral to-emerald hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-white font-bold py-3.5 rounded-full transition-all duration-300 text-sm flex items-center justify-center gap-2 shadow-md"
        >
          <MessageSquare className="w-4 h-4" />
          Adopt Me
        </button>
        
        <button
          onClick={() => setMeetOpen(true)}
          className="w-full bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-bold py-3 rounded-full transition-all duration-300 text-sm flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Schedule a Meet
        </button>
      </div>

      <p className="text-[11px] text-slate-400 text-center leading-relaxed">
        By clicking, you agree to our Adoption Safety Guidelines. We facilitate conversations but never charge safety deposits.
      </p>

      {/* MEET DIALOG */}
      <Dialog open={meetOpen} onOpenChange={setMeetOpen}>
        <DialogContent className="sm:max-w-md">
          {successMode === "meet" ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-emerald-light rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <span className="text-2xl text-emerald font-bold">✓</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Meetup Requested</h3>
              <p className="text-sm text-slate-500 mt-2">
                We have notified the owner about your requested date.
              </p>
            </div>
          ) : (
            <form onSubmit={handleMeetSubmit}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-serif">
                  <Calendar className="w-5 h-5 text-coral" />
                  Schedule Meet with {petName}
                </DialogTitle>
                <DialogDescription>
                  Choose a date and time to visit {petName}.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      Preferred Date
                    </label>
                    <Input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      Preferred Time
                    </label>
                    <Input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setMeetOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* CHAT DIALOG */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="sm:max-w-md">
          {successMode === "chat" ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-emerald-light rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <span className="text-2xl text-emerald font-bold">✓</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Message Sent</h3>
              <p className="text-sm text-slate-500 mt-2">
                Your message has been sent. Check your dashboard inbox for replies.
              </p>
            </div>
          ) : (
            <form onSubmit={handleChatSubmit}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-serif">
                  <Sparkles className="w-5 h-5 text-coral" />
                  Adopt {petName}
                </DialogTitle>
                <DialogDescription>
                  Send a message to the listing owner to express interest.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-4">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Introduction Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Hi! I am interested in adopting ${petName}. I'd love to know more about their routine...`}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral resize-none transition-all"
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setChatOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Send Message</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
