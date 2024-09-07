import { searchListing } from "../../api/posts/searchListings.mjs";
import { renderListings } from "../../ui/listings/renderListings.mjs";
import { displayMessage } from "../../ui/common/displayMessage.mjs";

/**
 * Handles the search functionality for listings.
 *
 * This function retrieves the search term from the input field with ID `searchInput`. It validates the input to ensure
 * that a search term is provided. If the input is valid, it calls the `searchListing` function to fetch search results
 * from the server. Depending on the results, it either renders the listings using `renderListings` or displays an
 * appropriate message using the `displayMessage` function. If an error occurs during the search process, it displays
 * an error message.
 *
 */

export async function searchListingsHandler() {
  const searchInput = document.getElementById("searchInput").value;

  if (searchInput.trim() === "") {
    displayMessage("warning", "Please enter a search term", ".modal-body");
    return;
  }

  try {
    const results = await searchListing(searchInput);
    if (results && results.length > 0) {
      renderListings("#listings", results);
    } else {
      displayMessage("info", "No listings found", "#listings");
    }
  } catch {
    displayMessage("error", "An error occurred while searching.", "#listings");
  }
}
