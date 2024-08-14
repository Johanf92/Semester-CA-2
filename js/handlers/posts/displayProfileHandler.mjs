import { profileURL } from "../../constants/constants.mjs";
import { getUserListings } from "../../api/posts/getProfileListings.mjs";
import { renderListings } from "../../ui/listings/renderListings.mjs";
import { displayMessage } from "../../ui/common/displayMessage.mjs";

export async function displayProfileHandler() {
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  if (!userName || !token) {
    // Redirect if not authenticated
    window.location.href = "/index.html";
    return;
  }

  try {
    // Update DOM with user name and email
    document.getElementById("profile-username").textContent = userName;
    document.getElementById("profile-email").textContent =
      localStorage.getItem("email");

    // Fetch profile data
    const response = await fetch(`${profileURL}${userName}`, {
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

    // Update profile picture if available
    if (profileData.data.avatar && profileData.data.avatar.url) {
      document.querySelector(".profile-picture").src =
        profileData.data.avatar.url;
    }

    // Fetch user listings
    const userListings = await getUserListings(userName);

    if (userListings && userListings.length > 0) {
      renderListings("#profile_listings", userListings);
    } else {
      displayMessage("#profile_listings", "danger", error.message);
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    // Using displayMessage function to show error
    displayMessage(
      "#profile_listings",
      "danger",
      `Failed to load profile data: ${error.message}`
    );
  }
}
