import { searchListing } from "../../api/posts/searchListings.mjs";
import { renderListings } from "../../ui/listings/renderListings.mjs";
import { displayMessage } from "../../ui/common/displayMessage.mjs";

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
  } catch (error) {
    displayMessage("error", "An error occurred while searching.", "#listings");
  }
}
