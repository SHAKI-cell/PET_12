import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up — DoFo Premium",
  description:
    "Create your premium DoFo account and find your perfect companion.",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide Navbar and Footer on signup, override parent layout padding */}
      <style>{`
        nav { display: none !important; }
        footer { display: none !important; }
        main { padding-top: 0 !important; }
        body { background: #0f1b33 !important; }
      `}</style>
      {children}
    </>
  );
}
