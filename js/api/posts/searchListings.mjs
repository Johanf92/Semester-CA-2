import { searchURL } from "../../constants/constants.mjs";

/**
 * Searches listings based on a query string.
 *
 * This function sends a `GET` request to search for listings using the provided query string.
 * If the request is successful, it returns an array of listings that match the query.
 * If the request fails, an error is thrown with an appropriate message.
 *
 */

export async function searchListing(query) {
  try {
    const response = await fetch(`${searchURL}?q=${query}`);
    const jsonResponse = await response.json();

    if (response.ok) {
      return jsonResponse.data;
    } else {
      throw new Error(jsonResponse.message || "Search failed");
    }
  } catch (error) {
    console.error("Error searching listings:", error);
    throw error;
  }
}
