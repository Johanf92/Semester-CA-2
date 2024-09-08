import { searchListingsHandler } from "../../handlers/posts/searchListingsHandler.mjs";

/**
 * Sets up the event listener for the search button in the search modal.
 *
 * This function selects the search button within the element with ID `#searchModal` and attaches an event listener
 * to it. When the button is clicked, the event listener prevents the default form submission behavior and
 * calls the `searchListingsHandler` function to perform the search operation.
 *
 * @function searchListingsSetup
 *
 * @example
 * // Call this function to initialize the search functionality when the search modal is shown
 * searchListingsSetup();
 */

export function searchListingsSetup() {
  console.log("Setting up search listings...");
  const searchBtn = document.querySelector("#searchModal .search-button");

  if (searchBtn) {
    console.log("Search button found");
    searchBtn.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Search button clicked");
      searchListingsHandler();
    });
  } else {
    console.error("Search button not found");
  }
}
// Call this function when the document is ready
document.addEventListener("DOMContentLoaded", searchListingsSetup);
