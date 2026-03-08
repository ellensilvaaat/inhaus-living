import type { ReactNode } from "react";
import Script from "next/script";

export default function LandingPagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {/* PERFORMANCE BOOST FOR GOOGLE ADS */}

      <link rel="preconnect" href="https://maps.googleapis.com" />
      <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="" />

      {/* GOOGLE PLACES API */}

      <Script
        id="google-maps-places"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />

      {children}
    </>
  );
}