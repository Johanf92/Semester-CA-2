import { listings_URL } from "../../constants/constants.mjs";

/**
 * Fetches the bids for a specific listing by its ID.
 *
 * This function sends a `GET` request to retrieve the bid data for a given listing. The user must be authenticated
 * via a token stored in `localStorage`. If the request is successful, it returns the bid data associated with the listing.
 * If the request fails or the user is not logged in, an error is thrown.
 *
 * @async
 * @function getBid
 * @param {string} id - The unique ID of the listing for which to fetch bids.
 * @returns {Promise<Object>} Resolves with the bid data for the listing.
 * @throws {Error} If the user is not logged in, or if the request fails, an error is thrown with a relevant message.
 *
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

  return json;
}
