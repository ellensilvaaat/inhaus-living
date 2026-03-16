import fetch from "node-fetch";
import logger from "../utils/logger.js";

const MONDAY_API_KEY = process.env.MONDAY_API_KEY;
const BOARD_ID = process.env.MONDAY_BOARD_ID;

export const sendLeadToMonday = async (lead) => {
  try {

    const columnValues = JSON.stringify({
      email: {
        email: lead.email,
        text: lead.email,
      },
      phone: lead.mobile || "",
      address: lead.address || "",
      text0: lead.service || lead.service_label || "",
      text1: lead.budget || "",
      long_text: lead.message || "",
    }).replace(/"/g, '\\"');

    const query = `
      mutation {
        create_item(
          board_id: ${BOARD_ID},
          item_name: "${lead.fullName}",
          column_values: "${columnValues}"
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

    logger.info("Lead sent to Monday", { lead: lead.email });

    return result;

  } catch (error) {

    logger.error("Monday integration failed", {
      message: error.message,
    });

  }
};