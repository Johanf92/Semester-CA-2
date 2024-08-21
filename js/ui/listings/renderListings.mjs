/**
 * Renders a list of posts into a specified parent element.
 */

export function renderListings(parent, listings) {
  console.log("Listings data:", listings);

  const container = document.querySelector(parent);

  container.innerHTML = "";

  const cardGroup = document.createElement("div");
  cardGroup.classList.add("card-group");

  const listingsHtml = listings.map((listing) => {
    return createListing(listing);
  });

  cardGroup.append(...listingsHtml);
  container.appendChild(cardGroup);
}

/**
 * Creates a post element.
 * @param {Object} post - The post data. The object should have `id`, `title`, `body`, and `media` properties.
 * @returns {HTMLElement} The created post element.
 */

function createListing(listing) {
  const { id, title: heading, description: body, media, tags } = listing;

  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  if (media && media.length > 0) {
    img.src = media[0].url;
    img.alt = media[0].alt || heading;
  } else {
    img.src = ""; // Provide a default or placeholder image URL
    img.alt = "No image available";
  }
  img.classList.add("card-img-top");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = heading;

  const bodyParagraph = document.createElement("p");
  bodyParagraph.classList.add("card-text");
  bodyParagraph.textContent = body;

  const tagsDiv = document.createElement("div");
  tagsDiv.classList.add("tags");

  const tagsContent = tags.join(", ");
  const tagsLabel = document.createElement("span");
  tagsLabel.textContent = `Tags: ${tagsContent}`;

  tagsDiv.appendChild(tagsLabel);

  cardBody.appendChild(title);
  cardBody.appendChild(bodyParagraph);
  cardBody.appendChild(tagsDiv);

  const cardFooter = document.createElement("div");
  cardFooter.classList.add("card-footer");

  const smallText = document.createElement("small");
  smallText.classList.add("text-muted");

  cardFooter.appendChild(smallText);

  const button = document.createElement("button");
  button.textContent = "See Auction...";
  button.classList.add("btn", "btn-primary");

  button.addEventListener("click", () => {
    window.location.href = `/listing/index.html?id=${id}`;
  });

  cardFooter.appendChild(button);

  card.appendChild(img);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  return card;
}
