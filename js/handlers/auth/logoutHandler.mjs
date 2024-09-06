import { remove } from "../../utilities/storage/index.mjs";

/**
 * Sets up the logout functionality for the user.
 *
 * This function attaches a click event listener to the logout button. When the button is clicked, it triggers the
 * `handleLogout` function, which removes the user's access token and other related data from local storage, logs a
 * message to the console, and then redirects the user to the home page.
 *
 * @function logoutHandler
 *
 */

export function logoutHandler() {
  const logoutButton = document.querySelector("#logoutBtn");

  logoutButton.addEventListener("click", handleLogout);

  function handleLogout(event) {
    event.preventDefault();

    remove("token");
    remove("userName");
    remove("email");

    window.location.href = "/";
  }
}
