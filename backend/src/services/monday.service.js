import fetch from "node-fetch";

const MONDAY_API_KEY = process.env.MONDAY_API_KEY;
const BOARD_ID = process.env.MONDAY_BOARD_ID;
const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

/**
 * 🛠 SERVICE MAP (FRONT → MONDAY)
 */
const enquiryMap = {
  "Kitchen Renovation": "Kitchen Renovations",
  "Bathroom Renovation": "Bathroom Renovations",
  "Home Renovation": "Home Renovation",
  "Apartment Renovation": "Apartment Renovations",
  "Flooring Services": "Flooring Services",
  "Construction & Additions": "Construction & Additions",
};

/**
 * 💰 FORMAT BUDGET (ROBUSTO)
 */
const formatBudget = (budget) => {
  if (!budget) return "$25,000-$50,000";

  const normalized = budget.replace(/\s*-\s*/g, "-");

  // 🔥 valores que NÃO existem no Monday
  if (
    normalized.includes("1.5 million") ||
    normalized.includes("2 million")
  ) {
    return "$1 million +";
  }

  return normalized;
};

/**
 * 📍 GOOGLE GEOCODE
 */
const getCoordinates = async (address) => {
  try {
    if (!address) return null;

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${GOOGLE_API_KEY}`
    );

    const data = await res.json();

    if (!data.results || !data.results.length) return null;

    const { lat, lng } = data.results[0].geometry.location;

    return { lat, lng, address };

  } catch (err) {
    console.error("Geocode error:", err.message);
    return null;
  }
};

/**
 * 🚀 SEND TO MONDAY
 */
export const sendLeadToMonday = async (lead) => {
  try {
    // 🔒 validação mínima
    if (!lead?.email || !lead?.fullName) return;

    const locationData = await getCoordinates(lead.address);

    const columnValues = {
      // 📧 EMAIL
      lead_email: {
        email: lead.email,
        text: lead.email,
      },

      // 📞 PHONE
      lead_phone: {
        phone: lead.mobile || "",
        countryShortName: "AU",
      },

      // 📍 LOCATION
      location5: locationData || undefined,

      // 🛠 SERVICE
      status_1_mkmmfkyh: {
        label: enquiryMap[lead.service] || "Home Renovation",
      },

      // 💬 MESSAGE
      long_text: lead.message
        ? { text: lead.message }
        : undefined,

      // 💰 BUDGET
      status_1_mkmmgnw0: {
        label: formatBudget(lead.budget),
      },
    };

    // remove undefined
    Object.keys(columnValues).forEach((key) => {
      if (!columnValues[key]) delete columnValues[key];
    });

    const stringifiedValues = JSON.stringify(columnValues).replace(/"/g, '\\"');

    const query = `
      mutation {
        create_item(
          board_id: ${BOARD_ID},
          item_name: "${lead.fullName}",
          column_values: "${stringifiedValues}"
        ) {
          id
        }
      }
    `;

    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        Authorization: MONDAY_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("Monday error:", JSON.stringify(result.errors));
    }

    return result;

  } catch (error) {
    console.error("Monday integration failed:", error.message);
  }
};