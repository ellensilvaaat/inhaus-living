"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import "./LocationMap.css";

export default function LocationMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  const LOCATION = {
    lat: -33.903455,
    lng: 151.214979,
  };

  useEffect(() => {
    if (!loaded || !window.google) return;

    const map = new window.google.maps.Map(mapRef.current as HTMLElement, {
      center: LOCATION,
      zoom: 15,
      disableDefaultUI: true,
    });

    new window.google.maps.Marker({
      position: LOCATION,
      map,
    });
  }, [loaded]);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />

      <div className="map-container">
        <div className="map-inner">
          <div ref={mapRef} className="google-map" />
        </div>
      </div>
    </>
  );
}