/**
 * Displays a message to the user within a specified container.
 *
 * This function inserts an alert message into a specified container element in the DOM. The message is styled
 * based on the `messageType` parameter, which determines the alert's visual appearance (e.g., success, danger, warning).
 * The function uses Bootstrap's alert classes to style the message.
 *  */

export function displayMessage(parent, messageType, message) {
  const container = document.querySelector(parent);

  if (!container) {
    console.error(`Error: The container "${parent}" was not found.`);
    return;
  }

  container.innerHTML = `<div class="alert alert-${messageType}">${message}</div>`;
}
