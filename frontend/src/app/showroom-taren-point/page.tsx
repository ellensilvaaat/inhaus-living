import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Intro/intro";
import TeamCarousel from "./components/TeamCarousel/TeamCarousel";
import OurProcess from "./components/Process/Process";
import VisitSection from "./components/VisitSection/VisitSection";
import LocationSection from "./components/LocationSection/LocationSection";
import AdvantagesSection from "./components/AdvantagesSection/AdvantagesSection";
import Footer from "./components/Footer/Footer";

export const metadata = {
  title: "Taren Point Kitchen Showroom | Inhaus Living",
  description:
    "Visit our Taren Point showroom in Caringbah to explore custom kitchens, bathrooms & joinery. Premium design solutions in Sydney.",
  keywords: [
    "Taren Point showroom",
    "kitchen showroom Caringbah",
    "kitchen showroom Sydney",
    "custom kitchens Caringbah",
    "bathroom showroom Sydney",
    "joinery Sydney",
    "Inhaus Living",
  ],
  openGraph: {
    title: "Taren Point Kitchen Showroom | Inhaus Living",
    description:
      "Discover custom kitchens, bathrooms and joinery at our Taren Point showroom in Caringbah, Sydney.",
    url: "https://inhausliving.com/showroom-taren-point",
    siteName: "Inhaus Living",
    images: [
      {
        url: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-gYsjkPCsCfU-unsplash.jpg",
        width: 1200,
        height: 630,
        alt: "Inhaus Living Showroom Taren Point",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taren Point Kitchen Showroom | Inhaus Living",
    description:
      "Visit our Taren Point showroom and explore premium custom kitchens and interiors.",
    images: ["https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-gYsjkPCsCfU-unsplash.jpg"],
  },
  alternates: {
    canonical: "https://inhausliving.com/showroom-taren-point",
  },
};

export default function ShowroomTarenPointPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Inhaus Living - Taren Point Showroom",
    image: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-gYsjkPCsCfU-unsplash.jpg",
    "@id": "https://inhausliving.com/showroom-taren-point",
    url: "https://inhausliving.com/showroom-taren-point",
    telephone: "+61 2 8359 1679",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 2/175 Taren Point Rd",
      addressLocality: "Caringbah",
      addressRegion: "NSW",
      postalCode: "2229",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -34.041,
      longitude: 151.121, // approx (se quiser depois colocamos exato)
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Monday",
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Tuesday",
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Wednesday",
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Thursday",
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
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
      <Intro />
      <TeamCarousel />
      <OurProcess />
      <VisitSection />
      <LocationSection />
      <AdvantagesSection />
      <Footer />
    </main>
  );
}