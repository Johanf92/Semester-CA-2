import { remove } from "../../utilities/storage/index.mjs";

/**
 * Handles the logout process.
 * When the logout button is clicked, the access token is removed from storage and the user is redirected to the home page.
 */

export function logoutHandler() {
  const logoutButton = document.querySelector("#logoutBtn");

  logoutButton.addEventListener("click", handleLogout);

  function handleLogout(event) {
    event.preventDefault();

    console.log("Logging out...");

    remove("token");
    remove("userName");
    remove("email");

    console.log("localstorage cleared..");
    window.location.href = "/";
  }
}
