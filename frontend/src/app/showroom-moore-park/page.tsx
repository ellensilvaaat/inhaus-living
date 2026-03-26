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
  title: "Moore Park Kitchen Showroom | Inhaus Living",
  description:
    "Visit our Moore Park showroom to explore custom kitchens, bathrooms & joinery. Experience premium design solutions in Sydney.",
  keywords: [
    "Moore Park showroom",
    "kitchen showroom Sydney",
    "custom kitchens Sydney",
    "bathroom showroom Sydney",
    "joinery Sydney",
    "Inhaus Living",
  ],
  openGraph: {
    title: "Moore Park Kitchen Showroom | Inhaus Living",
    description:
      "Explore custom kitchens, bathrooms and joinery at our Moore Park showroom in Sydney.",
    url: "https://inhausliving.com/showroom-moore-park",
    siteName: "Inhaus Living",
    images: [
      {
        url: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-gYsjkPCsCfU-unsplash.jpg", // troca se tiver uma imagem real
        width: 1200,
        height: 630,
        alt: "Inhaus Living Showroom Moore Park",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moore Park Kitchen Showroom | Inhaus Living",
    description:
      "Visit our Moore Park showroom and discover premium custom kitchens and interiors.",
    images: ["https://inhausliving.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://inhausliving.com/showroom-moore-park",
  },
};

export default function ShowroomMooreParkPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Inhaus Living",
    image: "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-gYsjkPCsCfU-unsplash.jpg",
    "@id": "https://inhausliving.com/showroom-moore-park",
    url: "https://inhausliving.com/showroom-moore-park",
    telephone: " +61 2 9662 3509",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop 10/2A Todman Ave",
      addressLocality: "Kensington",
      addressRegion: "NSW",
      postalCode: "2033",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.903455,
      longitude: 151.214979,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "17:30",
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