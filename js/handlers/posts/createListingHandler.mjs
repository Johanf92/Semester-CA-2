import { createListing } from "../../api/posts/createListing.mjs";
import { displayMessage } from "../../ui/common/displayMessage.mjs";

/**
 * Handles the form submission for creating a new listing.
 *
 * This function attaches a `submit` event listener to the form with the ID `#createListForm`. When the form is submitted,
 * it collects the form data, validates the end date to ensure it's between now and one year from now, formats the media
 * URLs and tags, and then sends the listing data to the server using the `createListing` function. It also displays
 * success or error messages based on the outcome and redirects the user to the feed page upon successful creation.
 *
 * @async
 * @function createListingHandler
 *
 */

export async function createListingHandler() {
  const createListForm = document.querySelector("#createListForm");
  if (createListForm) {
    createListForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const { value: description } = document.querySelector(
        "#listing-description"
      );
      const { value: media } = document.querySelector("#media-urls");
      const { value: title } = document.querySelector("#listing-title");
      const { value: tags } = document.querySelector("#tags");
      const { value: endsAt } = document.querySelector("#end-date");

      const endsAtDate = new Date(endsAt);
      const now = new Date();
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(now.getFullYear() + 1);

      if (endsAtDate < now || endsAtDate > oneYearFromNow) {
        displayMessage(
          "#message",
          "danger",
          "End date must be between now and one year from now."
        );
        return;
      }

      const mediaArray = media.split(",").map((url) => ({
        url: url.trim(),
      }));

      const listData = {
        title,
        description,
        media: mediaArray,
        tags: tags.split(",").map((tag) => tag.trim()),
        endsAt,
      };

      try {
        await createListing(listData);
        displayMessage(
          "#message",
          "success",
          "Listing created successfully, redirecting..."
        );
        setTimeout(() => {
          window.location.href = "/feed/";
        }, 2000);
      } catch (error) {
        console.error(error);
        displayMessage("#message", "danger", "Failed to create listing.");
      }
    });
  }
}
