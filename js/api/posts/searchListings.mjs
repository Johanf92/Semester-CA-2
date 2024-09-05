import { searchURL } from "../../constants/constants.mjs";

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
