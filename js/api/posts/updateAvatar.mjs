import { profileURL } from "../../constants/constants.mjs";

/**
 * Updates the avatar for the specified user.
 *
 * This function sends a `PUT` request to update the avatar of a user profile. The user must be authenticated with
 * a token and API key stored in `localStorage`. The new avatar URL is passed in the request body. If the update
 * is successful, the avatar is updated. If the request fails, an error is thrown.
 *
 * @async
 * @function updateAvatar
 * @param {string} avatarUrl - The URL of the new avatar to set for the user's profile.
 * @param {string} userName - The username of the user whose avatar is being updated.
 * @returns {Promise<void>} Resolves if the avatar is updated successfully.
 * @throws {Error} Throws an error if the request fails, or if the username is not provided.
 *
 */

export async function updateAvatar(avatarUrl, userName) {
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  if (!userName) {
    throw new Error("User name is required to update the profile picture");
  }

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify({
      avatar: { url: avatarUrl },
    }),
  };

  try {
    const response = await fetch(`${profileURL}/${userName}`, options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(
        json.errors[0]?.message || "Failed to update profile picture"
      );
    }
  } catch (error) {
    console.error("Error in updateAvatar function:", error);
    throw error;
  }
}
