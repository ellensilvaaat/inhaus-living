export const services = {
  "bathroom-renovations": {
    label: "Bathroom Renovations",
    businessName: "Inhaus Living",
    heroImage:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/carlos-masias-yg8zkwBS30Q-unsplash%20(1).jpg",
    suburbs: [
      // SYDNEY
      "rushcutters-bay",
      "arncliffe",
      "matraville",
      "botany",
      "hillsdale",
      "eastgardens",
      "rosebery",
      "surry-hills",
      "banksmeadow",
      "waverley",
      "clovelly",
      "chippendale",
      "daceyville",
      "paddington",
      "camperdown",
      "maroubra",
      "edgecliff",
      "newtown",
      "double-bay",
      "sydney-cbd",
      "bondi",
      "mascot",
      "haymarket",
      "woollahra",
      "bronte",
      "darlinghurst",
      "darlington",
      "bellevue-hill",
      "pagewood",
      "st-peters",
      "malabar",
      "eastlakes",
      "beaconsfield",
      "kensington",
      "zetland",
      "alexandria",
      "eveleigh",
      "kingsford",
      "erskineville",
      "randwick",
      "waterloo",
      "coogee",
      "port-botany",
      "centennial-park",
      "bondi-beach",
      "tempe",
      "green-square",
      "south-coogee",
      "redfern",
      "queens-park",
      "bondi-junction",
      "moore-park",

      // CANBERRA (apenas 1 página)
      "canberra",
    ],
  },

  "apartment-renovation": {
    label: "Full Apartment Renovations",
    businessName: "Inhaus Living",
    heroImage:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/lisa-anna-2g6aRZE9S8s-unsplash%20(1).jpg",
    suburbs: [
      // SYDNEY (Sutherland Shire)
      "jannali",
      "kangaroo-point",
      "grays-point",
      "como",
      "kirrawee",
      "oyster-bay",
      "port-hacking",
      "dolans-bay",
      "burraneer",
      "cronulla",
      "sylvania-waters",
      "sylvania",
      "gymea-bay",
      "gymea",
      "caringbah-south",
      "yowie-bay",
      "woolooware",

      // CANBERRA
      "canberra",
    ],
  },

  "flooring": {
    label: "Premium Flooring",
    businessName: "Inhaus Living",
    heroImage:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-eroVX2UFNK4-unsplash.jpg",
    suburbs: [
      // SYDNEY
      "moore-park",
      "taren-point",
      "caringbah-nsw",

      // CANBERRA
      "fyshwick",
      "canberra",
    ],
  },

  "kitchen-renovation": {
    label: "Kitchen Renovations",
    businessName: "Inhaus Living",
    heroImage:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-Cio7d2EK1vs-unsplash.jpg",
    suburbs: [
      // SYDNEY
      "taren-point",
      "moore-park",

      // CANBERRA
      "fyshwick",
      "canberra",
    ],
  },

  "home-construction": {
    label: "Home Construction",
    businessName: "Inhaus Living",
    heroImage:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-eroVX2UFNK4-unsplash.jpg",
    suburbs: [
      // SYDNEY
      "taren-point",

      // CANBERRA
      "canberra",
    ],
  },

  "home-renovation": {
    label: "Home Renovations",
    businessName: "Inhaus Living",
    heroImage:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-eroVX2UFNK4-unsplash.jpg",
    suburbs: [
      // CANBERRA apenas
      "canberra",
    ],
  },
};

export type ServiceKey = keyof typeof services;