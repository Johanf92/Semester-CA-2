import { listings_URL } from "../../constants/constants.mjs";

/**
 * Fetches all posts from the server.
 * @throws {Error} If the user is not logged in.
 * @throws {Error} If the server responds with an error.
 * @returns {Promise<Array<Object>>} An array of post data.
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

  console.log(json); // Log the response to check its format
  return json.data;
}
