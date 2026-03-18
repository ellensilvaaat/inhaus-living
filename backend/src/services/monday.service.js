import fetch from "node-fetch";

const MONDAY_API_KEY = process.env.MONDAY_API_KEY;
const BOARD_ID = process.env.MONDAY_BOARD_ID;

/**
 * Format date to YYYY-MM-DD (required by Monday)
 */
const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split("T")[0];
};

export const sendLeadToMonday = async (lead) => {
  try {
    let columnValues = {
      // 📧 Email
      lead_email: {
        email: lead.email,
        text: lead.email,
      },

      // 📞 Phone
      lead_phone: {
        phone: lead.mobile || "",
        countryShortName: "AU",
      },

      // 📍 Address
      location5: lead.address
        ? { address: lead.address }
        : undefined,

      // 📝 Subject
      text_mkmmp75w: lead.subject || undefined,

      // 💬 Message
      long_text: lead.message
        ? { text: lead.message }
        : undefined,

      // 📅 Installation Date
      date_mkmmn5w0: lead.installation_date
        ? { date: formatDate(lead.installation_date) }
        : undefined,

      // 🛠 Service (Status column)
      single_select_mkmm1y2g: lead.service
        ? { label: lead.service }
        : undefined,

      // 💰 Budget (Status column)
      status_1_mkmmgnw0: lead.budget
        ? { label: lead.budget }
        : undefined,

      // 🔎 Found Us (Status column)
      single_select_mkmmpqqn: lead.found_us
        ? { label: lead.found_us }
        : undefined,
    };

    /**
     * Remove undefined / null values
     */
    Object.keys(columnValues).forEach((key) => {
      if (!columnValues[key]) {
        delete columnValues[key];
      }
    });

    const query = `
      mutation ($columnValues: JSON!) {
        create_item(
          board_id: ${BOARD_ID},
          item_name: "${lead.fullName || "New Lead"}",
          column_values: $columnValues
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
      body: JSON.stringify({
        query,
        variables: { columnValues },
      }),
    });

    const result = await response.json();

    // 🔍 Debug (pode remover depois)
    console.log("MONDAY RESULT:", JSON.stringify(result, null, 2));

    return result;

  } catch (error) {
    console.error("Monday integration failed:", error.message);
  }
};