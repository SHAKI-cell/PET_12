"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

const REPORT_REASONS = [
  "Fake or misleading listing",
  "Suspected animal abuse",
  "Scam or fraud",
  "Inappropriate content",
  "Already adopted/sold",
  "Other",
];

interface ReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listingId: string;
  listingName: string;
}

export function ReportModal({
  open,
  onOpenChange,
  listingId,
  listingName,
}: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Mock submission
    console.log("Report submitted:", { listingId, selectedReason, description });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedReason("");
      setDescription("");
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-coral" />
            Report Listing
          </DialogTitle>
          <DialogDescription>
            Report &ldquo;{listingName}&rdquo; — we&apos;ll review this within 24 hours.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-emerald-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <p className="font-semibold text-slate-900">Report Submitted</p>
            <p className="text-sm text-slate-500 mt-1">Thank you for helping keep Dofo safe.</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 py-2">
              <p className="text-sm font-medium text-slate-700">Select a reason:</p>
              <div className="space-y-2">
                {REPORT_REASONS.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedReason === reason
                        ? "border-coral bg-coral-light/50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="report-reason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="accent-coral"
                    />
                    <span className="text-sm text-slate-700">{reason}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-slate-700 block mb-1.5">
                  Additional details (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us more about the issue..."
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral resize-none transition-all"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!selectedReason}
                variant="destructive"
              >
                Submit Report
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
