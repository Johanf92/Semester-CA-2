import { profileURL } from "../../constants/constants.mjs";
import { getUserListings } from "../../api/posts/getProfileListings.mjs";
import { renderProfileListings } from "../../ui/listings/renderProfileListings.mjs";
import { displayMessage } from "../../ui/common/displayMessage.mjs";

/**
 * Fetches and displays the user's profile information and listings.
 *
 * This function retrieves the current user's profile information and their listings. It first checks for the presence of
 * required authentication data (`userName` and `token`) in local storage. If not found, it redirects the user to the
 * login page. It then fetches profile data from the server and updates the profile information on the page, including
 * the username, email, credits, and avatar. After updating the profile information, it fetches the user's listings
 * and displays them. If there are no listings or an error occurs, appropriate messages are displayed to the user.
 *
 */

export async function displayProfileHandler() {
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  if (!userName || !token) {
    window.location.href = "/index.html";
    return;
  }

  try {
    document.getElementById("profile-username").textContent = userName;
    document.getElementById("profile-email").textContent =
      localStorage.getItem("email");

    const response = await fetch(`${profileURL}/${userName}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Profile Fetch Error:", errorResponse);
      throw new Error(
        `Failed to fetch profile data: ${response.status} ${response.statusText}`
      );
    }

    const profileData = await response.json();

    document.getElementById("credits").textContent = profileData.data.credits;

    if (profileData.data.avatar && profileData.data.avatar.url) {
      document.getElementById("profile-picture").src =
        profileData.data.avatar.url;
    }

    const userListings = await getUserListings(userName);

    if (userListings.length > 0) {
      renderProfileListings("#profile_listings", userListings);
    } else {
      displayMessage("#profile_listings", "danger", "No listings found");
    }
  } catch (error) {
    displayMessage(
      "#profile_listings",
      "danger",
      `Failed to load profile data: ${error.message}`
    );
  }
}
