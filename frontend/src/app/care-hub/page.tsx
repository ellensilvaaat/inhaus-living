import CareHubHero from "@/components/care-hub/CareHubHero";
import CareHubLibrary from "@/components/care-hub/CareHubLibrary";
import CareHubPhilosophy from "@/components/care-hub/CareHubPhilosophy";
import CareHubFinal from "@/components/care-hub/CareHubFinal";

export const metadata = {
  title: "Care Hub | Inhaus Living",
  description:
    "Official after-care guides by Inhaus Living. Learn how to maintain and preserve your renovation finishes, materials, and spaces.",
};

export default function CareHubPage() {
  return (
    <main>
      <CareHubHero />
      <CareHubLibrary />
      <CareHubPhilosophy />
      <CareHubFinal />
    </main>
  );
}