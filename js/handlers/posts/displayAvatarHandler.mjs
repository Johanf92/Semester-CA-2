import { updateAvatar } from "../../api/posts/updateAvatar.mjs";

/**
 * Sets up the event listener for updating the user's avatar.
 *
 * This function attaches an event listener to the `DOMContentLoaded` event to ensure the DOM is fully loaded before
 * setting up the event handlers. It adds a click event listener to the button with ID `updateAvatarBtn` to handle
 * the avatar update process. It validates the presence of the image URL and user name, then attempts to update the
 * avatar by calling the `updateAvatar` function. On success, it displays a success message and redirects the user
 * to their profile page. On failure, it displays an error message.
 * */

export async function displayAvatarHandler() {
  document.addEventListener("DOMContentLoaded", () => {
    const updateButton = document.getElementById("updateAvatarBtn");
    const imageUrlInput = document.getElementById("avatarUrlInput");

    if (!updateButton || !imageUrlInput) {
      return;
    }

    updateButton.addEventListener("click", async (event) => {
      event.preventDefault();

      const avatarUrl = imageUrlInput.value.trim();
      const userName = localStorage.getItem("userName");

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

displayAvatarHandler();
