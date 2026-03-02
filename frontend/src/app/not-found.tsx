import type { Metadata } from "next";
import NotFound from "@/components/NotFound/NotFound";

export const metadata: Metadata = {
  title: "Page Not Found | Inhaus Living",
  description:
    "The page you are looking for does not exist or may have been moved.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function NotFoundPage() {
  return <NotFound />;
}