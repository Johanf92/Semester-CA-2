import { searchListingsHandler } from "../../handlers/posts/searchListingsHandler.mjs";

export function searchListingsSetup() {
  const searchBtn = document.querySelector("#searchModal .search-button");

  if (searchBtn) {
    searchBtn.addEventListener("click", (event) => {
      event.preventDefault();
      searchListingsHandler();
    });
  }
}
