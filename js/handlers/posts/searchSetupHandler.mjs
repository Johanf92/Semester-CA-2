import { searchListingsHandler } from "../../handlers/posts/searchListingsHandler.mjs";

export function searchListingsSetup() {
  const searchBtn = document.querySelector("#searchModal .search-button");

  // Ensure search button exists before adding the event listener
  if (searchBtn) {
    searchBtn.addEventListener("click", (event) => {
      event.preventDefault();
      searchListingsHandler(); // Calls the search handler when the search button is clicked
    });
  }
}
