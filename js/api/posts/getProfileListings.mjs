import { listings_URL, profileURL } from "../../constants/constants.mjs";

/**
 * Fetches all listings created by the specified user.
 * @param {string} userName - The username whose listings you want to retrieve.
 * @returns {Promise<Array>} - The user's listings.
 */
// Fetch user's listings based on their username
export async function getUserListings(userName) {
  try {
    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("apiKey");

    const response = await fetch(`${profileURL}/${userName}/listings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user listings: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Log the data to verify its structure
    console.log("Listings Data:", data);

    // Ensure to return the correct property from the API response
    // Assuming the listings are under 'data' property
    return data.data || []; // Adjust this line based on actual API response structure
  } catch (error) {
    console.error("Error fetching user listings:", error);
    throw error;
  }
}
