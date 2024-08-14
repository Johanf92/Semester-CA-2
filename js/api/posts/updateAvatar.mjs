import { profileURL } from "../../constants/constants.mjs";

/**
 * Updates the avatar for the current user.
 * @param {string} avatarUrl - The new avatar URL.
 * @returns {Promise<void>}
 */
export async function updateAvatar(avatarUrl, userName) {
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  // Ensure userName is provided
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
    const response = await fetch(`${profileURL}${userName}`, options);
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
