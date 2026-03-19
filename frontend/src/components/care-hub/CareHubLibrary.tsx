"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import "./CareHubLibrary.css";

type GuideSection = {
  id: string;
  title: string;
  body: string[];
  callout?: string;
  products?: string[];
  warning?: string;
  tip?: string;
  tips?: {
  text: string;
  icon: string;
}[];
  disclaimer?: string;
};

type Guide = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  coverImage: string;
  pdfUrl: string;
  accent: string;
  cardClassName:
    | "chl-card--wide-left"
    | "chl-card--small-right"
    | "chl-card--small-left"
    | "chl-card--wide-right";
  sections: GuideSection[];
};

const guides: Guide[] = [
  {
    id: "kitchen-care",
    title: "Kitchen Care",
    eyebrow: "Care Library",
    description:
      "Your kitchen is one of the most used spaces in the home. With a few simple habits and mindful care, its beauty and performance can be preserved for years to come.",
    coverImage:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/lisa-anna-2g6aRZE9S8s-unsplash%20(1).jpg?updatedAt=1772085186047",
    pdfUrl: "/care-hub/kitchen-care.pdf",
    accent: "#f67c0b",
    cardClassName: "chl-card--wide-left",
    sections: [
      {
  id: "daily-care",
  title: "Daily Care",
  body: [],
  tips: [
  { 
    text: "Wipe benchtops and cabinetry at the end of each day", 
    icon: "🧼" 
  },
  { 
    text: "Avoid placing hot cookware directly on stone surfaces. Always use trivets or heat-resistant pads to prevent thermal shock or damage.", 
    icon: "🔥" 
  },
  { 
    text: "Use chopping boards when preparing food to help prevent scratching or surface damage to benchtops.", 
    icon: "🔪" 
  },
  { 
    text: "Ensure good ventilation during and after cooking", 
    icon: "💨" 
  },
  { 
    text: "Address spills and splashes as soon as they occur", 
    icon: "💧" 
  },
],
  callout:
    "For premium surfaces, consistency is more important than aggressive cleaning.",
    disclaimer:
  "These recommendations are provided as general guidance only and may not be suitable for all materials or finishes. Care requirements can vary between manufacturers and products. You should always confirm appropriate care methods with your supplier or manufacturer. Nothing in this guidance excludes or limits any rights you may have under Australian Consumer Law. Always test cleaning products on a small, inconspicuous area before full application.",
},
      {
        id: "benchtops-and-splashbacks",
        title: "Benchtops & Splashbacks",
        body: [
          "Clean daily using a soft microfibre cloth and warm water with a mild, pH-neutral detergent.",
          "For deeper cleaning, use a stone-safe cleaner specifically formulated for natural and engineered stone.",
        ],
        products: [
          "Hillmark Stone Kleen & Protect (or equivalent pH-neutral stone cleaner)",
          "Guardsman Stone Seal & Protector Spray (or similar stone-safe protector)",
          "Magic Stone Benchtop Cleaner (or equivalent non-abrasive cleaner)",
        ],
        warning:
          "Avoid abrasive sponges, bleach, acidic products (such as vinegar or lemon) and harsh chemicals. These can dull the surface and cause long-term damage.",
        tip:
          "Always wipe spills promptly to prevent staining and preserve the finish.",
      },
      {
        id: "cabinetry-joinery",
        title: "Cabinetry & Joinery",
        body: [
    "Clean joinery using a soft microfibre cloth lightly dampened with warm water and a mild, pH-neutral detergent. Dry immediately after cleaning to prevent moisture absorption and protect the finish.",
    "Avoid solvent-based cleaners, bleach, abrasive pads or excessive moisture, as these may cause discolouration, swelling or long-term damage to laminated and melamine finishes.",
    "A gentle, consistent approach is key to maintaining the appearance of your cabinetry."
       ],
      },
      {
        id: "appliances",
        title: "Appliances",
        body: [
    "Follow the manufacturer’s care instructions for each appliance.",
    "Wipe surfaces regularly using a soft cloth and appropriate cleaner, and clean filters as recommended to ensure optimal performance and longevity.",
    "For stainless steel and glass finishes, use non-abrasive cleaners designed specifically for those surfaces to minimise streaking and fingerprints."
       ],
      },
    ],
  },
  {
  id: "bathroom-care",
  title: "Bathroom Care",
  eyebrow: "Care Library",
  description:
    "Bathrooms are high-use, moisture-rich spaces. With appropriate care, ventilation and suitable cleaning products, surfaces and fittings can maintain their appearance.",
  coverImage:
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/alex-tyson-NxXAf-Ky8cw-unsplash.jpg?updatedAt=1772086509471",
  pdfUrl: "/care-hub/bathroom-care.pdf",
  accent: "#d98b3e",
  cardClassName: "chl-card--small-right",
  sections: [
    {
      id: "daily-care",
      title: "Everyday Care",
      body: [],
      tips: [
  { text: "Wipe tapware and glass surfaces regularly to minimise water spots and mineral build-up", icon: "🧼" },
  { text: "Use gentle, pH-neutral cleaning products suitable for bathroom surfaces", icon: "🧴" },
  { text: "Address leaks, spills or excess moisture promptly to prevent long-term damage", icon: "💧" },
  { text: "Ensure adequate ventilation during and after showers to reduce humidity and condensation", icon: "💨" },
  { text: "Avoid leaving standing water on surfaces to minimise staining and deterioration", icon: "💧" },
],
      callout:
        "Consistent, light cleaning helps preserve finishes and reduces the need for stronger chemicals.",
    },

    {
      id: "tiles-grout",
      title: "Tiles & Grout",
      body: [
        "Clean tiles regularly using a soft cloth or mop with a pH-neutral cleaner suitable for the surface.",
        "Grout should be cleaned gently and sealed periodically to help reduce staining, moisture absorption and mould growth.",
      ],
      products: [
        "Mould Off Shower & Grout Cleaner (use sparingly and as directed)",
        "White King Grout & Tile Cleaner (or equivalent tile-safe cleaner)",
        "Mild pH-neutral floor cleaners suitable for tile and stone surfaces",
      ],
      warning:
        "Avoid acidic, bleach-heavy or abrasive cleaning products, as these may damage grout lines, degrade sealers and dull tile finishes over time.",
    },

    {
      id: "tapware-fixtures",
      title: "Tapware & Fixtures",
      body: [
        "Wipe tapware dry after each use to help prevent water spotting and mineral build-up.",
        "Clean regularly using a soft cloth and a mild, non-abrasive cleaner appropriate for the specific finish (such as chrome, brushed or matte surfaces).",
      ],
      products: [
        "Method Bathroom Cleaner (or equivalent non-abrasive cleaner)",
        "Mild dishwashing liquid diluted in warm water",
        "Microfibre cloths only",
      ],
      warning:
        "Avoid harsh chemicals, bleach and abrasive pads, as these can damage protective coatings and surface finishes.",
    },

    {
      id: "shower-glass",
      title: "Shower & Glass Screens",
      body: [
        "Rinse and wipe glass surfaces after each use to minimise soap residue, spotting and mineral deposits.",
        "For deeper cleaning, use a non-abrasive, glass-safe cleaner with a soft microfibre cloth.",
      ],
      products: [
        "Windex Crystal Rain (or equivalent glass-safe cleaner)",
        "Shower Power (use occasionally and as directed)",
        "Approved non-abrasive glass cleaners suitable for shower screens",
      ],
      warning:
        "Avoid abrasive pads, harsh chemicals or unapproved acidic solutions, as these may damage coatings and reduce glass clarity over time.",
      tip:
        "Regular light cleaning reduces the need for stronger chemicals and helps maintain clarity.",
    },

    {
      id: "vanity-cabinetry",
      title: "Vanity Cabinetry",
      body: [
        "Clean cabinetry using a soft microfibre cloth lightly dampened with warm water and a mild, pH-neutral detergent.",
        "Dry surfaces immediately after cleaning and ensure adequate ventilation to minimise moisture build-up.",
      ],
      products: [
        "Warm water with mild pH-neutral dishwashing liquid",
        "Microfibre cloths only",
      ],
      warning:
        "Avoid solvent-based cleaners, abrasive products and excessive moisture, as these may cause discolouration, swelling or long-term damage to laminated and melamine finishes.",
    },

    {
      id: "disclaimer",
      title: "Important Information",
      body: [
        "These recommendations are provided as general guidance only and may not be suitable for all materials or finishes. Care requirements can vary between manufacturers and products. You should always confirm appropriate care methods with your supplier or manufacturer. Nothing in this guidance excludes or limits any rights you may have under Australian Consumer Law. Always test cleaning products on a small, inconspicuous area before full application.",
      ],
    },
  ],
},
  {
  id: "floors-walls-care",
  title: "Floors and Walls Care",
  eyebrow: "Care Library",
  description:
    "Floors and walls define the overall look and feel of your home and are subject to daily wear. With appropriate care their appearance and durability can be preserved over time.",
  coverImage:
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg?updatedAt=1767758312133",
  pdfUrl: "/care-hub/floors-walls-care.pdf",
  accent: "#c8a072",
  cardClassName: "chl-card--small-left",
  sections: [
    {
      id: "daily-care",
      title: "Everyday Care",
      body: [],
      tips: [
  { text: "Place mats at entry points to help reduce dirt, grit and moisture being tracked indoors", icon: "🪟" },
  { text: "Use felt pads under furniture to minimise scratching and surface wear", icon: "🪑" },
  { text: "Clean spills promptly to help prevent staining or long-term damage", icon: "💧" },
  { text: "Avoid dragging heavy furniture across floors to protect surface finishes", icon: "🪑" },
  { text: "Use rugs or runners in high-traffic areas to reduce wear over time", icon: "🪟" },
],
      callout:
        "Preventative care and gentle, consistent cleaning will significantly extend the life of floor and wall finishes.",
    },

    {
      id: "porcelain-ceramic",
      title: "Porcelain & Ceramic Tiles",
      body: [
        "Sweep or vacuum regularly to remove dust and grit that may cause surface wear.",
        "Mop using warm water and a pH-neutral cleaner to maintain the finish without leaving residue.",
      ],
      products: [
        "White King Tile & Floor Cleaner (or equivalent tile-safe cleaner)",
        "Sabco Floor Cleaner (pH-neutral or equivalent)",
        "Microfibre mop and cloths",
      ],
      warning:
        "Avoid abrasive pads, acidic cleaners and bleach-heavy products, as these may dull tile surfaces and damage grout over time.",
    },

    {
      id: "timber-flooring",
      title: "Timber Flooring",
      body: [
        "Sweep or vacuum frequently using a soft brush attachment to minimise scratching from dust and debris.",
        "Clean with a lightly damp (not wet) mop using a timber-specific cleaner designed to protect the finish.",
      ],
      products: [
        "Bona Timber Floor Cleaner (or equivalent timber-safe cleaner)",
        "Osmo Wash and Care (or equivalent)",
        "Microfibre mop",
      ],
      warning:
        "Avoid excess water, steam mops and harsh detergents, as moisture can cause swelling, warping and long-term damage to timber surfaces.",
    },

    {
      id: "laminate-floors",
      title: "Laminate Floors",
      body: [
        "Vacuum or sweep regularly to remove dirt and debris that may cause surface wear.",
        "Clean using a lightly damp mop with a laminate-safe cleaner, ensuring no water remains on the surface.",
      ],
      products: [
        "Bona Laminate Floor Cleaner (or equivalent laminate-safe cleaner)",
        "Microfibre mop with minimal moisture",
      ],
      warning:
        "Avoid steam mops, soaking the floor or using abrasive cleaners, as moisture may penetrate joints and cause swelling or damage.",
    },

    {
      id: "vinyl-floors",
      title: "Vinyl Floors",
      body: [
        "Sweep or vacuum frequently to prevent grit build-up that may scratch the surface.",
        "Mop using warm water and a vinyl-safe, pH-neutral cleaner to maintain flexibility and finish.",
      ],
      products: [
        "Bona Vinyl Floor Cleaner (or equivalent vinyl-safe cleaner)",
        "Mild pH-neutral detergent diluted in warm water",
        "Microfibre mop",
      ],
      warning:
        "Avoid solvent-based cleaners, abrasive pads and excessive water, as these may damage the surface layer or affect long-term performance.",
    },

    {
      id: "walls-painted",
      title: "Walls & Painted Surfaces",
      body: [
        "Dust walls regularly using a soft cloth or duster to prevent build-up.",
        "Spot clean marks gently using a damp cloth and a mild, pH-neutral detergent, testing first in an inconspicuous area.",
      ],
      products: [
        "Warm water with mild pH-neutral dishwashing liquid",
        "Microfibre cloths or soft sponges",
      ],
      warning:
        "Avoid abrasive cleaners or aggressive scrubbing, as this may damage painted finishes or alter surface sheen.",
    },

    {
      id: "disclaimer",
      title: "Important Information",
      body: [
        "These recommendations are provided as general guidance only and may not be suitable for all materials or finishes. Care requirements can vary between manufacturers and products. You should always confirm appropriate care methods with your supplier or manufacturer. Nothing in this guidance excludes or limits any rights you may have under Australian Consumer Law. Always test cleaning products on a small, inconspicuous area before full application.",
      ],
    },
  ],
},
  {
  id: "joinery-cabinetry-care",
  title: "Joinery and Cabinetry Care",
  eyebrow: "Care Library",
  description:
    "Joinery plays a key role in both the function and aesthetic of your home. With care cabinetry and custom joinery can maintain their finish, structure and appearance over time.",
  coverImage:
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/bilal-mansuri-PkepZpGteGQ-unsplash.jpg?updatedAt=1767842583019",
  pdfUrl: "/care-hub/joinery-cabinetry-care.pdf",
  accent: "#b87432",
  cardClassName: "chl-card--wide-right",
  sections: [
    {
      id: "daily-care",
      title: "Everyday Care",
      body: [],
      tips: [
  { text: "Wipe spills immediately, particularly around sinks and moisture-prone areas", icon: "💧" },
  { text: "Avoid hanging excessive weight on cabinet doors or drawers to prevent strain on hinges", icon: "⚠️" },
  { text: "Open and close doors and drawers gently to maintain alignment and hardware longevity", icon: "🚪" },
  { text: "Ensure adequate ventilation in enclosed or high-moisture areas", icon: "💨" },
  { text: "Address leaks promptly to help prevent internal swelling or long-term damage", icon: "💧" },
],
      callout:
        "Consistent, gentle use and early intervention will significantly extend the life of cabinetry and joinery.",
    },

    {
      id: "laminate-joinery",
      title: "Laminated & Melamine Joinery",
      body: [
        "Clean surfaces using a soft microfibre cloth lightly dampened with warm water and a mild, pH-neutral detergent.",
        "Dry immediately after cleaning to minimise moisture absorption and protect edges, seams and finishes.",
      ],
      products: [
        "Warm water with mild pH-neutral dishwashing liquid",
        "Microfibre cloths only",
      ],
      warning:
        "Avoid abrasive pads, solvent-based cleaners, bleach and excessive moisture, as these may cause discolouration, swelling or surface damage.",
    },

    {
      id: "timber-veneer",
      title: "Timber & Veneer Joinery",
      body: [
        "Dust regularly using a dry or slightly damp microfibre cloth to prevent build-up.",
        "For deeper cleaning, use products specifically formulated for timber or veneer finishes.",
      ],
      products: [
        "Osmo Spray Cleaner (or equivalent timber-safe cleaner)",
        "Gentle timber-safe cleaning products suitable for finished surfaces",
        "Dry or lightly damp microfibre cloths",
      ],
      warning:
        "Avoid harsh chemicals, excessive moisture and direct heat exposure, as these may dry out, warp or damage timber finishes over time.",
    },

    {
      id: "cabinet-interiors",
      title: "Cabinet Interiors & Shelving",
      body: [
        "Remove contents periodically and wipe internal surfaces using a soft cloth and a mild, pH-neutral detergent.",
        "Ensure all internal areas are completely dry before replacing items, particularly in moisture-prone zones such as kitchens, bathrooms and laundries.",
      ],
      warning:
        "Avoid lining shelves with non-breathable materials that may trap moisture and contribute to mould or surface damage.",
    },

    {
      id: "hardware",
      title: "Hardware, Hinges & Handles",
      body: [
        "Wipe handles and hardware regularly using a soft cloth to remove fingerprints, oils and residue.",
        "For metal finishes, use a non-abrasive cleaner suitable for the specific material and finish.",
      ],
      products: [
        "Microfibre cloth",
        "Mild dishwashing liquid diluted in warm water",
      ],
      warning:
        "Avoid abrasive cleaners or pads, as these may scratch, dull or degrade protective coatings on metal finishes.",
    },

    {
      id: "disclaimer",
      title: "Important Information",
      body: [
        "These recommendations are provided as general guidance only and may not be suitable for all materials or finishes. Care requirements can vary between manufacturers and products. You should always confirm appropriate care methods with your supplier or manufacturer. Nothing in this guidance excludes or limits any rights you may have under Australian Consumer Law. Always test cleaning products on a small, inconspicuous area before full application.",
      ],
    },
  ],
},
  {
  id: "appliances-care",
  title: "Appliances Care",
  eyebrow: "Care Library",
  description:
    "Appliances are integral to the performance and functionality of your home. With correct use, regular maintenance and manufacturer-approved care methods, appliances can operate efficiently and maintain their appearance over time.",
  coverImage:
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/project4.jpg?updatedAt=1767743441731",
  pdfUrl: "/care-hub/appliances-care.pdf",
  accent: "#d47c4c",
  cardClassName: "chl-card--wide-left",
  sections: [
    {
      id: "daily-care",
      title: "Everyday Care",
      body: [],
      tips: [
  { text: "Always follow manufacturer instructions for operation and cleaning before using any appliance", icon: "⚡" },
  { text: "Wipe external surfaces regularly to prevent build-up of grease, moisture and residue", icon: "🧼" },
  { text: "Avoid using excessive water near electrical components or control panels", icon: "💧" },
  { text: "Ensure adequate ventilation around appliances to support safe operation and performance", icon: "💨" },
  { text: "Clean spills immediately to prevent staining, corrosion or damage to surrounding surfaces", icon: "💧" },
],
      callout:
        "Manufacturer guidance should always take priority over general care recommendations.",
    },

    {
      id: "manufacturer-guidance",
      title: "Manufacturer Guidance",
      body: [
        "Always refer to the specific care, cleaning and maintenance instructions provided by the appliance manufacturer before using any product or method.",
        "Where manufacturer guidance differs from general advice, the manufacturer's instructions should take precedence.",
      ],
      warning:
        "Failure to follow manufacturer instructions may void warranties or result in damage to the appliance.",
    },

    {
      id: "external-finishes",
      title: "External Finishes",
      body: [
        "Clean appliance surfaces using a soft cloth and a non-abrasive cleaner suitable for the specific finish (such as stainless steel, glass or enamel).",
        "For stainless steel surfaces, wipe in the direction of the grain where applicable to maintain a consistent finish.",
      ],
      products: [
        "Non-abrasive cleaners suitable for appliance finishes",
        "Microfibre cloths",
        "Mild pH-neutral detergent diluted in warm water",
      ],
      warning:
        "Avoid abrasive pads, harsh chemicals, bleach or solvent-based cleaners, as these may damage coatings, finishes or protective layers.",
    },

    {
      id: "internal-maintenance",
      title: "Internal Maintenance",
      body: [
        "Clean filters, trays, seals and accessible internal components at intervals recommended by the manufacturer.",
        "Remove debris and residue regularly to maintain hygiene, airflow and appliance efficiency.",
      ],
      warning:
        "Do not dismantle or service internal components unless specified by the manufacturer or carried out by a qualified technician.",
    },

    {
      id: "performance-longevity",
      title: "Performance & Longevity",
      body: [
        "Ensure appliances are used within their intended capacity and purpose to avoid unnecessary strain.",
        "Arrange servicing and maintenance where required in accordance with manufacturer recommendations.",
      ],
      tip:
        "Regular maintenance and correct usage will help extend appliance lifespan and maintain optimal performance.",
    },

    {
      id: "disclaimer",
      title: "Important Information",
      body: [
        "These recommendations are provided as general guidance only and may not be suitable for all appliances or finishes. Care requirements can vary between manufacturers and models. You should always refer to and follow the specific instructions provided by the appliance manufacturer. Nothing in this guidance excludes or limits any rights you may have under Australian Consumer Law. Always test cleaning products on a small, inconspicuous area before full application.",
      ],
    },
  ],
},
  {
  id: "general-home-care",
  title: "General Home Care",
  eyebrow: "Care Library",
  description:
    "Maintaining your home through consistent, considered care helps preserve the integrity, appearance and performance of all finishes. Simple, preventative habits can significantly extend the life of your renovation.",
  coverImage:
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/murat-demircan-FkxmAuYD8ls-unsplash.jpg?updatedAt=1767846146747",
  pdfUrl: "/care-hub/general-home-care.pdf",
  accent: "#e29e5f",
  cardClassName: "chl-card--small-right",
  sections: [
    {
      id: "daily-care",
      title: "Everyday Care",
      body: [],
      tips: [
  { text: "Maintain a regular, gentle cleaning routine to prevent build-up of dirt, dust and residue", icon: "🧼" },
  { text: "Address spills, moisture and marks promptly to minimise staining or long-term damage", icon: "💧" },
  { text: "Ensure adequate ventilation throughout the home to reduce humidity and condensation", icon: "💨" },
  { text: "Use only soft cloths and non-abrasive, pH-neutral cleaning products suitable for each surface", icon: "🧴" },
  { text: "Avoid using excessive water or harsh chemicals on any internal finishes", icon: "⚠️" },
],
      callout:
        "Consistent, preventative care is more effective than infrequent intensive cleaning.",
    },

    {
      id: "protective-measures",
      title: "Protective Measures",
      body: [
        "Use mats at entry points and protective pads under furniture to reduce wear, scratching and surface impact.",
        "Lift rather than drag furniture or heavy objects to avoid damaging flooring and joinery.",
        "Distribute weight evenly and avoid concentrated load points on delicate surfaces.",
      ],
      warning:
        "Impact, abrasion and excessive load can cause permanent damage to finishes, edges and structural components.",
    },

    {
      id: "environmental-care",
      title: "Environmental Considerations",
      body: [
        "Maintain stable indoor conditions where possible, avoiding excessive humidity, dryness or rapid temperature changes.",
        "Use ventilation, extraction fans and natural airflow to manage moisture in kitchens, bathrooms and laundries.",
      ],
      tip:
        "Balanced indoor environments help preserve materials such as timber, joinery finishes and painted surfaces.",
    },

    {
      id: "cleaning-products",
      title: "Cleaning Products & Methods",
      body: [
        "Always select cleaning products that are appropriate for the specific material or finish being cleaned.",
        "Use non-abrasive, pH-neutral cleaners wherever possible and follow product instructions carefully.",
      ],
      warning:
        "Incorrect or incompatible cleaning products may cause discolouration, surface damage or deterioration over time.",
    },

    {
      id: "when-to-seek-advice",
      title: "When to Seek Advice",
      body: [
        "If you are unsure about the correct care method for any surface or finish, seek guidance before using unfamiliar cleaning products.",
        "For specific product information, maintenance clarification or specialist concerns, contact the relevant supplier or manufacturer.",
      ],
      callout:
        "Taking a cautious approach helps protect both the finish and any applicable warranties.",
    },

    {
      id: "disclaimer",
      title: "Important Information",
      body: [
        "These recommendations are provided as general guidance only and may not be suitable for all materials or finishes. Care requirements can vary between manufacturers and products. You should always confirm appropriate care methods with your supplier or manufacturer. Nothing in this guidance excludes or limits any rights you may have under Australian Consumer Law. Always test cleaning products on a small, inconspicuous area before full application.",
      ],
    },
  ],
}
];

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const items = Array.from(
      node.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function CareHubLibrary() {
  const revealRef = useReveal();
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  useEffect(() => {
    if (!activeGuide) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    setActiveSectionId(activeGuide.sections[0]?.id ?? "");

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeGuide]);

  useEffect(() => {
    if (!activeGuide) return;

    const sectionIds = activeGuide.sections.map((section) => section.id);
    const nodes = sectionIds
      .map((id) => document.getElementById(`guide-section-${id}`))
      .filter(Boolean) as HTMLElement[];

    if (!nodes.length) return;

    const rootEl = document.querySelector(".chl-viewerBody");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          )[0];

        if (visible?.target?.id) {
          setActiveSectionId(visible.target.id.replace("guide-section-", ""));
        }
      },
      {
        root: rootEl,
        threshold: 0.35,
        rootMargin: "-18% 0px -45% 0px",
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [activeGuide]);

  const readingProgress = useMemo(() => {
    if (!activeGuide || !activeSectionId) return 0;

    const index = activeGuide.sections.findIndex(
      (section) => section.id === activeSectionId
    );

    if (index < 0) return 0;

    return ((index + 1) / activeGuide.sections.length) * 100;
  }, [activeGuide, activeSectionId]);

  const scrollToSection = (sectionId: string) => {
  setActiveSectionId(sectionId); 

  const target = document.getElementById(`guide-section-${sectionId}`);
  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  return (
    <>
      <section className="chl-section" id="guides" ref={revealRef}>
        <div className="chl-bgGlow chl-bgGlow--left" aria-hidden="true" />
        <div className="chl-bgGlow chl-bgGlow--right" aria-hidden="true" />
        <div className="chl-noise" aria-hidden="true" />

        <div className="chl-shell">
          <div className="chl-header" data-reveal>
            <span className="chl-kicker">
              Care Library
              <span className="chl-kickerDot" aria-hidden="true" />
            </span>

            <h2 className="chl-title">
              Your after care guides,
              <br />
              reimagined as an experience.
            </h2>

            <p className="chl-subtitle">
              Explore every guide directly inside the Care Hub, then download the
              official PDF whenever you want a saved version.
            </p>
          </div>

          <div className="chl-grid">
            {guides.map((guide, index) => (
              <article
                key={guide.id}
                className={`chl-card ${guide.cardClassName}`}
                data-reveal
                style={
                  {
                    "--delay": `${index * 80}ms`,
                    "--accent": guide.accent,
                  } as CSSProperties
                }
              >
                <div className="chl-cardGlow" aria-hidden="true" />

                <div className="chl-cardMedia">
                  <Image
                    src={guide.coverImage}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="chl-cardImage"
                  />
                  <div className="chl-cardOverlay" />
                  <div className="chl-cardScan" />
                </div>

                <div className="chl-cardBody">
                  <span className="chl-cardEyebrow">{guide.eyebrow}</span>

                  <h3 className="chl-cardTitle">{guide.title}</h3>

                  <p className="chl-cardDescription">{guide.description}</p>

                  <div className="chl-cardFooter">
                    <button
                      type="button"
                      className="chl-btn chl-btn--primary"
                      onClick={() => setActiveGuide(guide)}
                    >
                      Read Guide
                      <span className="chl-btnShine" aria-hidden="true" />
                    </button>

                    <a
                      href={guide.pdfUrl}
                      download
                      className="chl-btn chl-btn--secondary"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeGuide && (
        <div
          className="chl-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeGuide.title} viewer`}
        >
          <div
            className="chl-viewerBackdrop"
            onClick={() => setActiveGuide(null)}
          />

          <div className="chl-viewerPanel">
            <div className="chl-progress">
              <span
                className="chl-progressBar"
                style={{ width: `${readingProgress}%` }}
              />
            </div>

            <div className="chl-viewerTop">
              <div className="chl-viewerTopMeta">
                <span className="chl-viewerEyebrow">{activeGuide.eyebrow}</span>
                <h3 className="chl-viewerTitle">{activeGuide.title}</h3>
                <p className="chl-viewerIntro">{activeGuide.description}</p>
              </div>

              <div className="chl-viewerActions">
                <a
                  href={activeGuide.pdfUrl}
                  download
                  className="chl-btn chl-btn--secondary"
                >
                  Download PDF
                </a>

                <button
                  type="button"
                  className="chl-close"
                  onClick={() => setActiveGuide(null)}
                  aria-label="Close guide viewer"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="chl-viewerLayout">
              <aside className="chl-sidebar">
                <div className="chl-sidebarInner">
                  <span className="chl-sidebarLabel">On this guide</span>

                  <nav className="chl-sidebarNav" aria-label="Guide sections">
                    {activeGuide.sections.map((section, index) => {
                      const isActive = activeSectionId === section.id;

                      return (
                        <button
                          key={section.id}
                          type="button"
                          className={`chl-sidebarLink ${isActive ? "is-active" : ""}`}
                          onClick={() => scrollToSection(section.id)}
                        >
                          <span className="chl-sidebarIndex">
                            {(index + 1).toString().padStart(2, "0")}
                          </span>
                          <span className="chl-sidebarText">{section.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </aside>

              <div className="chl-viewerBody">
                <div className="chl-articleHero">
                  <div className="chl-articleHeroMedia">
                    <Image
                      src={activeGuide.coverImage}
                      alt={activeGuide.title}
                      fill
                      sizes="100vw"
                      className="chl-articleHeroImage"
                    />
                    <div className="chl-articleHeroOverlay" />
                  </div>

                  <div className="chl-articleHeroContent">
                    <span className="chl-articleHeroKicker">Guide Preview</span>
                    <h4 className="chl-articleHeroTitle">{activeGuide.title}</h4>
                    <p className="chl-articleHeroText">
                      Thoughtfully structured guidance designed to help you care
                      for your renovation with confidence.
                    </p>
                  </div>
                </div>

                <div className="chl-article">
                  {activeGuide.sections.map((section, index) => (
                    <section
                      key={section.id}
                      id={`guide-section-${section.id}`}
                      className="chl-articleSection"
                    >
                      <div className="chl-articleSectionHead">
                        <span className="chl-articleSectionIndex">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <h5 className="chl-articleSectionTitle">{section.title}</h5>
                      </div>

                      <div className="chl-articleSectionBody">
                        {section.tips && (
<div className="chl-tipsGrid">
  {section.tips.map((tip, i) => (
    <div key={i} className="chl-tipCard">
      <div className="chl-tipIcon">
        {tip.icon}
      </div>

      <p>{tip.text}</p>
    </div>
  ))}
</div>
)}

{section.disclaimer && (
  <div className="chl-disclaimer">
    <span className="chl-disclaimerLabel">Important</span>
    <p>{section.disclaimer}</p>
  </div>
)}
                        {section.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}

                        {section.products && section.products.length > 0 && (
                          <div className="chl-products">
                            <span className="chl-calloutLabel">Recommended Products</span>
                            <ul className="chl-productsList">
                              {section.products.map((product) => (
                                <li key={product}>{product}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {section.warning && (
                          <div className="chl-callout chl-callout--warning">
                            <span className="chl-calloutLabel">Warning</span>
                            <p>{section.warning}</p>
                          </div>
                        )}

                        {section.tip && (
                          <div className="chl-callout chl-callout--tip">
                            <span className="chl-calloutLabel">Care Tip</span>
                            <p>{section.tip}</p>
                          </div>
                        )}

                        {section.callout && (
                          <div className="chl-callout">
                            <span className="chl-calloutLabel">Inhaus Note</span>
                            <p>{section.callout}</p>
                          </div>
                        )}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}