import { updateAvatar } from "../../api/posts/updateAvatar.mjs";

/**
 * Handles the update of the user's avatar.
 */
export async function displayAvatarHandler() {
  document.addEventListener("DOMContentLoaded", () => {
    const updateButton = document.getElementById("updateAvatarBtn");
    const imageUrlInput = document.getElementById("avatarUrlInput");

    if (!updateButton || !imageUrlInput) {
      console.error("Update button or image URL input element not found.");
      return;
    }

    updateButton.addEventListener("click", async (event) => {
      event.preventDefault(); // Prevent default form submission

      const avatarUrl = imageUrlInput.value.trim();
      const userName = localStorage.getItem("userName"); // Retrieve username from localStorage

      if (!avatarUrl) {
        alert("Please enter an image URL.");
        return;
      }

      if (!userName) {
        alert("User name is missing. Please log in again.");
        return;
      }

      try {
        await updateAvatar(avatarUrl, userName);
        alert("Profile picture updated successfully.");
        window.location.href = "/profile";
      } catch (error) {
        console.error("Error updating profile picture:", error);
        alert(`Failed to update profile picture: ${error.message}`);
      }
    });
  });
}

// Initialize the handler
displayAvatarHandler();
