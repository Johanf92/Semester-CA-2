import { getSingleListing } from "../../api/posts/getSingleListing.mjs";
import { displayMessage } from "../../ui/common/displayMessage.mjs";
import { renderSingleListing } from "../../ui/listings/renderSingleListing.mjs";

/**
 * Fetches and displays a single listing based on the listing ID from the URL query parameter.
 * If the listing ID is not provided, it throws an error.
 * If the listing is fetched successfully, it changes the document title to include the listing title and renders the listing.
 * If there is an error in fetching the listing, it logs the error and displays an error message.
 * @throws {Error} When no listing id is provided in the URL query parameter.
 */

export async function displaySingleListingHandler() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
      throw new Error("No post id was provided");
    }

    const listingData = await getSingleListing(id);

    if (listingData) {
      document.title = `CA 2 / ${listingData.data.title}`;
      renderSingleListing("#listing", listingData);
    }
  } catch (error) {
    displayMessage("#listing", "danger", error.message);
  }
}
