import { profileURL } from "../../constants/constants.mjs";

/**
 * Fetches all listings created by the specified user.
 *
 * This function sends a `GET` request to retrieve all listings associated with a given username.
 * The user must be authenticated via a token and API key stored in `localStorage`. If the request
 * is successful, it returns an array of the user's listings. If the request fails, an error is thrown.
 *
 * @async
 * @function getUserListings
 * @param {string} userName - The username whose listings are to be retrieved.
 * @returns {Promise<Array<Object>>} Resolves with an array of listings created by the specified user.
 * @throws {Error} If the request fails, an error is thrown with the appropriate status message.
 *
 */

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

    return data.data || [];
  } catch (error) {
    console.error("Error fetching user listings:", error);
    throw error;
  }
}
