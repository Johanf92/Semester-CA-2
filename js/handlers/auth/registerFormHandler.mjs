import { register } from "../../api/auth/register.mjs";
import { displayMessage } from "../../ui/common/displayMessage.mjs";

/**
 * Attaches the register form submission event handler.
 * This function is called to attach the `handleRegisterForm` function to the submit event of the form with id "registerForm".
 */

export function registerFormHandler() {
  const form = document.querySelector("#registerForm");
  form.addEventListener("submit", handleRegisterForm);
}

/**
 * Handles the register form submission.
 * This function is called when the form with id "registerForm" is submitted.
 * It prevents the default form submission behavior, collects the data from the form fields,
 * and sends a request to register the user using the register API.
 * If the registration is successful, it displays a success message and resets the form.
 * If there's an error, it logs the error and displays an error message.
 * @function
 * @param {Event} event - The form submission event
 */

async function handleRegisterForm(event) {
  event.preventDefault();

  const form = event.target;

  const formData = new FormData(form);
  const entries = formData.entries();
  const userDetails = Object.fromEntries(entries);

  const fieldset = form.querySelector("fieldset");

  try {
    fieldset.disabled = true;
    const response = await register(userDetails);
    displayMessage("#message", "success", "You registred successfully");
    form.reset();
  } catch (error) {
    displayMessage("#message", "danger", error.message);
  } finally {
    fieldset.disabled = false;
  }
}
