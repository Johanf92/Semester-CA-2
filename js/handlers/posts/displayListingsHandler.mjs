import { getListings } from "../../api/posts/getListings.mjs";
import { displayMessage } from "../../ui/common/displayMessage.mjs";
import { renderListings } from "../../ui/listings/renderListings.mjs";

/**
 * Handles the display of posts.
 * This function is called to fetch and display posts from the API.
 * It uses the `getPosts` function to fetch the posts, and the `renderPosts` function to display them.
 * If there's an error, it logs the error and displays an error message using the `displayMessage` function.
 */

export async function displayListingsHandler() {
  try {
    const listings = await getListings();
    console.log("Fetched listings:", listings); // Log the fetched listings to check the structure

    if (!Array.isArray(listings)) {
      throw new Error("Invalid data format: listings should be an array");
    }

    renderListings("#listings", listings);
  } catch (error) {
    console.log(error);
    displayMessage("#listings", "danger", error.message);
  }
}
