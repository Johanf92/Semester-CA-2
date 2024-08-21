import { createListing } from "../../api/posts/createListing.mjs";
import { displayMessage } from "../../ui/common/displayMessage.mjs";

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
        url: url.trim(), // Assuming the server expects an object with a 'url' property
      }));

      const listData = {
        title,
        description,
        media: mediaArray,
        tags: tags.split(",").map((tag) => tag.trim()),
        endsAt,
      };

      try {
        const json = await createListing(listData); // Call createListing here
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
