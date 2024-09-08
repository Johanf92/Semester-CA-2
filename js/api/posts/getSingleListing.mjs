import { listings_URL } from "../../constants/constants.mjs";

/**
 * Fetches a single listing by its ID, including the seller information and bids.
 *
 * This function sends a `GET` request to retrieve a specific listing, along with related seller information
 * and bids, by appending the query parameters `_seller=true&_bids=true`. The user must be authenticated with
 * a token stored in `localStorage`. If the request is successful, the listing data is returned.
 * If the listing ID is not provided or the user is not logged in, an error is thrown.
 *
 * @async
 * @function getSingleListing
 * @param {string} id - The unique ID of the listing to retrieve.
 * @returns {Promise<Object>} Resolves with the listing data, including seller and bids, if successful.
 * @throws {Error} If no listing ID is provided or if the user is not logged in.
 * @throws {Error} If the API request fails, an error is thrown with the relevant message.
 *
 */

export async function getSingleListing(id) {
  if (!id) {
    throw new Error("No listing ID was provided");
  }
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please log in to view listings");
  }

  const options = {
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${listings_URL}/${id}?_seller=true&_bids=true`,
    options
  );
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors[0].message);
  }

  return json;
}
