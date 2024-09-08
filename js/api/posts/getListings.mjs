import { listings_URL } from "../../constants/constants.mjs";

/**
 * Fetches all listings (posts) from the server.
 *
 * This function sends a `GET` request to retrieve all available listings. The user must be authenticated via a token
 * stored in `localStorage`. If the request is successful, it returns an array of post data. If the user is not logged in
 * or if the server responds with an error, an appropriate error is thrown.
 *
 * @async
 * @function getListings
 * @throws {Error} If the server responds with an error, throws an error with the message from the server response.
 * @returns {Promise<Array<Object>>} Resolves with an array of listing objects if successful.
 *
 */

export async function getListings() {
  const token = localStorage.getItem("token");

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(listings_URL, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}
