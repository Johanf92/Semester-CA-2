import { listings_URL } from "../../constants/constants.mjs";

/**
 * Sends a request to create a new listing using the provided listing data.
 * 
 * This function sends a `POST` request to the `listings_URL` endpoint, with the provided listing data in the request body. 
 * It uses an authorization token and an optional API key from `localStorage` to authenticate the request. 
 * If the listing is successfully created, the response is returned. If the user is not logged in or if the 
 * request fails, an error is thrown with the relevant message.
 * 
 * @async
 * @function createListing
 * @param {Object} listData - The data for the listing to be created. It should be in a format expected by the API.
 * @param {string} listData.title - The title of the listing.
 * @param {string} listData.description - The description of the listing.
 * @param {number} [listData.price] - The price of the item being listed.
 * @param {string} [listData.imageUrl] - URL of the image to be associated with the listing (optional).
 * @returns {Promise<Object>} Resolves with the created listing's response data if successful.
 * @throws {Error} Throws an error if the user is not logged in, or if the API request fails.
 * 

 */

export async function createListing(listData) {
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  if (!token) {
    throw new Error("Please log in to create post");
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(listData),
  };

  const response = await fetch(listings_URL, options);
  const json = await response.json();

  if (response.ok) {
    return json;
  }

  throw new Error(json.errors[0].message);
}
