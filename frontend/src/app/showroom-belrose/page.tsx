import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import SectionIntro from "./components/Intro/Intro";
import Tension from "./components/Tension/Tension";
import Showroom from "./components/Showroom/Showroom";
import Invite from "./components/Invite/Invite";
import Footer from "./components/Footer/Footer";

export const metadata = {
  title: "Belrose Kitchen Showroom (Coming Soon) | Inhaus",
  description:
    "New kitchen showroom opening in Belrose. Register your interest to explore custom kitchens, bathrooms & joinery in Sydney’s Northern Beaches.",
  keywords: [
    "Belrose showroom",
    "kitchen showroom Belrose",
    "Northern Beaches kitchens",
    "custom kitchens Sydney",
    "showroom coming soon",
    "Inhaus Living Belrose",
  ],
  openGraph: {
    title: "Belrose Showroom Opening Soon | Inhaus Living",
    description:
      "Be the first to visit our new Belrose showroom. Register now for early access and updates.",
    url: "https://inhausliving.com/showroom-belrose",
    siteName: "Inhaus Living",
    images: [
      {
        url: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-gYsjkPCsCfU-unsplash.jpg?updatedAt=1770869458921",
        width: 1200,
        height: 630,
        alt: "Inhaus Living Belrose Showroom Coming Soon",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Belrose Showroom Opening Soon | Inhaus Living",
    description:
      "Register your interest for our new Belrose showroom opening soon.",
    images: ["https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-gYsjkPCsCfU-unsplash.jpg?updatedAt=1770869458921"],
  },
  alternates: {
    canonical: "https://inhausliving.com/showroom-belrose",
  },
};

export default function ShowroomBelrosePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Inhaus Living - Belrose Showroom (Coming Soon)",
    image: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-gYsjkPCsCfU-unsplash.jpg?updatedAt=1770869458921",
    "@id": "https://inhausliving.com/showroom-belrose",
    url: "https://inhausliving.com/showroom-belrose",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop T120/6 Niangala Cl",
      addressLocality: "Belrose",
      addressRegion: "NSW",
      postalCode: "2085",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.741, // aproximado (depois dá pra refinar)
      longitude: 151.218,
    },
    description:
      "New Inhaus Living showroom opening soon in Belrose. Register your interest for early access.",
    openingHoursSpecification: [], // ainda não aberto
    sameAs: [
      "https://www.instagram.com/inhaus_living",
      "https://www.facebook.com/inhausliving.com.au",
    ],
  };

  return (
    <main>
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Navbar />
      <Hero />
      <SectionIntro />
      <Tension />
      <Showroom />
      <Invite />
      <Footer />
    </main>
  );
}