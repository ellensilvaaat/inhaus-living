import type { Metadata } from "next";
import ThankYou from "@/components/ThankYou/ThankYou";

const siteUrl = "https://inhausliving.com.au";
const pageUrl = `${siteUrl}/thank-you`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Thank You | Inhaus Living",

  description:
    "Thank you for contacting Inhaus Living. Our renovation team will be in touch shortly.",

  alternates: {
    canonical: pageUrl,
  },

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

  referrer: "no-referrer",
};

export default function ThankYouPage() {
  return <ThankYou />;
}