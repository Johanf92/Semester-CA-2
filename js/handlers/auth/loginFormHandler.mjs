import { login } from "../../api/auth/login.mjs";
import { displayMessage } from "../../ui/common/displayMessage.mjs";
import * as utilities from "../../utilities/storage/index.mjs";

/**
 * Attaches the login form submission event handler.
 * This function is called to attach the `handleLoginForm` function to the submit event of the form with id "loginForm".
 * @function
 */

export function loginFormHandler() {
  const form = document.querySelector("#loginForm");
  form.addEventListener("submit", handleLoginForm);
}

/**
 * Handles the login form submission.
 * It prevents the default form submission behavior, collects the data from the form fields,
 * and sends a request to login the user using the login API.
 * If the login is successful, it saves the user's token, name, and email to storage, and redirects the user to the feed page.
 * If there's an error, it logs the error and displays an error message.
 *
 * @async
 * @function
 * @param {Event} event - The form submission event
 */

async function handleLoginForm(event) {
  event.preventDefault();

  const form = event.target;

  const formData = new FormData(form);
  const entries = formData.entries();
  const userDetails = Object.fromEntries(entries);

  const fieldset = form.querySelector("fieldset");

  try {
    fieldset.disabled = true;
    const response = await login(userDetails);

    const { data } = response;
    const { accessToken, name, email } = data;

    if (data && accessToken) {
      utilities.save("token", accessToken);
      utilities.save("userName", name);
      utilities.save("email", email);

      window.location.href = "/feed";
    } else {
      console.error("AccessToken not found in response:", data);
    }
  } catch (error) {
    displayMessage("#message", "danger", error.message);
  } finally {
    fieldset.disabled = false;
  }
}
