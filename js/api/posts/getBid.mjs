import { listings_URL } from "../../constants/constants.mjs";

/**
 * Fetches bids for a specific listing by ID.
 * @param {string} id - The ID of the listing to fetch bids for.
 * @returns {Promise<Object>} The bid data.
 */
export async function getBid(id) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please log in to view bids.");
  }

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${listings_URL}/${id}/bids`, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.errors ? json.errors[0].message : "Failed to fetch bids"
    );
  }

  console.log(json); // Log the response to check its format
  return json;
}
