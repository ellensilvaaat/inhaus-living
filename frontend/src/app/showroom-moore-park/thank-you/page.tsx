import type { Metadata } from "next";
import ThankYou from "./thank-you";

export const metadata: Metadata = {
  title: "Visit Confirmed | Moore Park Showroom",
  description:
    "Your visit to our Moore Park showroom has been confirmed. We look forward to welcoming you and discussing your project.",
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

export default function ThankYouMooreParkPage() {
  return <ThankYou />;
}