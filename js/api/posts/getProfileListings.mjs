import { listings_URL, profileURL } from "../../constants/constants.mjs";

/**
 * Fetches all listings created by the specified user.
 * @param {string} userName - The username whose listings you want to retrieve.
 * @returns {Promise<Array>} - The user's listings.
 */
export async function getUserListings(userName) {
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  };

  try {
    // Update the URL to the correct endpoint for fetching listings
    const response = await fetch(`${listings_URL}?user=${userName}`, options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.errors[0].message);
    }

    // Assuming the listings are in an array under a key called `data`
    return json.data || [];
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
}
