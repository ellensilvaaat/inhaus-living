export const genericServices = {
  flooring: {
    label: "Premium Flooring",
    businessName: "Inhaus Living",
    heroImage:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-eroVX2UFNK4-unsplash.jpg",
  },

  "construction-renovations": {
    label: "Construction Renovations",
    businessName: "Inhaus Living",
    heroImage:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-eroVX2UFNK4-unsplash.jpg",
  },

  "bathroom-renovations": {
    label: "Bathroom Renovations",
    businessName: "Inhaus Living",
    heroImage:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/carlos-masias-yg8zkwBS30Q-unsplash%20(1).jpg",
  },

  "home-renovations": {
    label: "Home Renovations",
    businessName: "Inhaus Living",
    heroImage:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-Cio7d2EK1vs-unsplash.jpg",
  },

  "kitchen-renovations": {
    label: "Kitchen Renovations",
    businessName: "Inhaus Living",
    heroImage:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/lisa-anna-2g6aRZE9S8s-unsplash%20(1).jpg",
  },

  "apartment-renovations": {
    label: "Apartment Renovations",
    businessName: "Inhaus Living",
    heroImage:
      "https://ik.imagekit.io/ijsd2xvnc/Inhaus/caroline-badran-eroVX2UFNK4-unsplash.jpg",
  },
} as const;

export type GenericServiceKey = keyof typeof genericServices;