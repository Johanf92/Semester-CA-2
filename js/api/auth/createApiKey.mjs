import { createApiKeyURL } from "../../constants/constants.mjs";

/**
 * Sends a request to create a new API key for the user, stores it in localStorage, and returns the key.
 *
 * This function sends a `POST` request to the provided `createApiKeyURL` with an authorization token to create
 * a new API key. If the request is successful, the new API key is stored in localStorage under the key `apiKey`,
 * and the key is returned. If the request fails, an error is thrown with the relevant error message.
 *
 * @async
 * @function createApiKey
 * @param {string} token - The user's authorization token to authenticate the request.
 * @returns {Promise<string>} Resolves with the newly created API key as a string.
 * @throws {Error} If the API request fails, an error is thrown with the first error message from the API's response.
 */

export async function createApiKey(token) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: "My API Key name" }),
  };

  const response = await fetch(createApiKeyURL, options);
  const apiKeyData = await response.json();

  if (response.ok) {
    localStorage.setItem("apiKey", apiKeyData.data.key);
    return apiKeyData.data.key;
  } else {
    throw new Error(apiKeyData.errors[0].message);
  }
}
