import { get } from "../../utilities/storage/index.mjs";

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

  // Check if the user is logged in by checking the existence of the token in localStorage
  const token = get("token");

  if (token) {
    // User is logged in, show "Logout" and set up the logout function
    logoutButton.innerText = "Logout";
    logoutButton.href = "#"; // Prevents default action
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      // Execute the logoutHandler function when the user clicks "Logout"
      logoutHandler();
    });
  } else {
    // User is not logged in, show "Login" and redirect to the login page
    logoutButton.innerText = "Login";
    logoutButton.href = "/login/index.html";
  }
}
