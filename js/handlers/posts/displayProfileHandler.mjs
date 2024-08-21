import { profileURL } from "../../constants/constants.mjs";
import { getUserListings } from "../../api/posts/getProfileListings.mjs";
import { renderProfileListings } from "../../ui/listings/renderProfileListings.mjs";
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
    console.log("Setting user profile info");
    document.getElementById("profile-username").textContent = userName;
    document.getElementById("profile-email").textContent =
      localStorage.getItem("email");

    // Fetch profile data
    console.log("Fetching profile data");
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
    console.log("Profile data received:", profileData);
    document.getElementById("credits").textContent = profileData.data.credits;

    // Update profile picture if available
    if (profileData.data.avatar && profileData.data.avatar.url) {
      document.getElementById("profile-picture").src =
        profileData.data.avatar.url;
    }

    // Fetch user listings
    console.log("Fetching user listings");
    const userListings = await getUserListings(userName);

    if (userListings && userListings.length > 0) {
      console.log("Rendering user listings");
      renderProfileListings("#profile_listings", userListings);
    } else {
      console.warn("No listings found");
      displayMessage("#profile_listings", "danger", "No listings found");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    displayMessage(
      "#profile_listings",
      "danger",
      `Failed to load profile data: ${error.message}`
    );
  }
}
