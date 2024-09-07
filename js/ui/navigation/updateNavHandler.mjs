import { get } from "../../utilities/storage/index.mjs";
import { logoutHandler } from "../../handlers/auth/logoutHandler.mjs"; // Adjust the path as necessary

/**
 * Updates the navigation button based on the user's login status.
 * If the user is logged in, it will show "Logout", otherwise it will show "Login".
 */

export function updateNavHandler() {
  const logoutButton = document.querySelector("#logoutBtn");

  if (!logoutButton) {
    console.warn("Logout button not found.");
    return;
  }

  const token = get("token");

  if (token) {
    logoutButton.innerText = "Logout";
    logoutButton.href = "#";
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      logoutHandler();
    });
  } else {
    logoutButton.innerText = "Login";
    logoutButton.href = "/login/index.html";
  }
}
