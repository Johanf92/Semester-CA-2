/**
 * Renders a list of posts into a specified parent element.
 */

export function renderListings(parent, listings) {
  console.log("Listings data:", listings);

  const container = document.querySelector(parent);

  container.innerHTML = "";

  const listingsHtml = listings.map((listing) => {
    return createListing(listing);
  });

  container.append(...listingsHtml);
}

/**
 * Creates a post element.
 * @param {Object} post - The post data. The object should have `id`, `title`, `body`, and `media` properties.
 * @returns {HTMLElement} The created post element.
 */

function createListing(listing) {
  const { id, title: heading, body, media, tags } = listing;

  const card = document.createElement("div");
  card.classList.add("card", "mt-3", "text-center");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h3");
  title.classList.add("card-title", "mt-3");
  title.textContent = heading;

  const bodyParagraph = document.createElement("p");
  bodyParagraph.classList.add("card-text", "mt-5", "mb-5");
  bodyParagraph.textContent = body;

  const img = document.createElement("img");
  img.src = media;
  img.classList.add("card-img-top");

  const tagsDiv = document.createElement("div");
  tagsDiv.classList.add("tags", "card-body");

  const tagsContent = tags.join(", ");
  const tagsLabel = document.createElement("span");
  tagsLabel.textContent = `Tags: ${tagsContent}`;

  tagsDiv.appendChild(tagsLabel);

  const button = document.createElement("button");
  button.textContent = "Read more...";
  button.classList.add("btn", "btn-success");

  button.addEventListener("click", () => {
    window.location.href = `/post/index.html?id=${id}`;
  });

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(bodyParagraph);
  card.appendChild(tagsDiv);
  card.appendChild(button);

  return card;
}
