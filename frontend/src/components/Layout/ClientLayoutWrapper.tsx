"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Preloader from "@/components/Preloader/Preloader";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const normalizedPath =
    pathname && pathname !== "/" ? pathname.replace(/\/$/, "") : pathname;

  const isServicePage =
  normalizedPath?.startsWith("/bathroom-renovations") ||
  normalizedPath?.startsWith("/apartment-renovation") ||
  normalizedPath?.startsWith("/apartment-renovations") ||
  normalizedPath?.startsWith("/flooring") ||
  normalizedPath?.startsWith("/kitchen-renovation") ||
  normalizedPath?.startsWith("/home-construction") ||
  normalizedPath?.startsWith("/thank-you") ||
   normalizedPath?.startsWith("/home-extensions") ||
  normalizedPath?.startsWith("/construction-renovations") ||
  normalizedPath?.startsWith("/home-renovation");

  return (
    <>
      {!isServicePage && <Navbar />}

      {children}

      {!isServicePage && <Footer />}

      {loading && (
        <Preloader finishLoading={() => setLoading(false)} />
      )}
    </>
  );
}