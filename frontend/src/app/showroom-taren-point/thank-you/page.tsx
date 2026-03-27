import type { Metadata } from "next";
import ThankYou from "./thank-you";

export const metadata: Metadata = {
  title: "Visit Confirmed | Taren Point Showroom",
  description:
    "Your visit to our Taren Point showroom has been confirmed. We look forward to welcoming you and discussing your project.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": 0,
    },
  },
};

export default function ThankYouTarenPointPage() {
  return <ThankYou />;
}