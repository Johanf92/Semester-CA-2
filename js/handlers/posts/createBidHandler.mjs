import { listings_URL } from "../../constants/constants.mjs";

/**
 * Places a bid on a specific listing by ID.
 * @param {string} id - The ID of the listing to place a bid on.
 * @param {number} amount - The bid amount.
 * @returns {Promise<Object>} The response data.
 */
export async function placeBid(id, amount) {
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  if (!token) {
    throw new Error("Please log in to place a bid.");
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify({ amount }),
  };

  const response = await fetch(`${listings_URL}/${id}/bids`, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.errors ? json.errors[0].message : "Failed to place bid"
    );
  }

  console.log(json); // Log the response to check its format
  return json;
}
