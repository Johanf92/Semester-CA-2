/**
 * Renders a list of posts into a specified parent element.
 */

export function renderSingleListing(parent, listingData) {
  console.log("Listings data:", listingData);

  const container = document.querySelector(parent);

  container.innerHTML = "";

  const listingHtml = createListing(listingData);
  container.appendChild(listingHtml);
}

/**
 * Creates a post element.
 * @param {Object} post - The post data. The object should have `id`, `title`, `body`, and `media` properties.
 * @returns {HTMLElement} The created post element.
 */

function createListing(listingData) {
  // Access the actual listing from the data object
  const listing = listingData.data;

  // Destructure necessary fields from the listing object
  const {
    id,
    title: heading,
    description: body,
    media,
    tags,
    created,
    endsAt,
    bids,
    seller,
  } = listing;

  // Safely handle undefined bids
  const currentBid =
    bids && bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;
  const numberOfBids = bids ? bids.length : 0;

  // Create the main card element
  const card = document.createElement("div");
  card.classList.add("card");

  // Create the image element
  const img = document.createElement("img");
  if (media && media.length > 0) {
    img.src = media[0].url;
    img.alt = media[0].alt || heading;
  } else {
    img.src = ""; // Provide a default or placeholder image URL
    img.alt = "No image available";
  }
  img.classList.add("card-img-top");

  // Create the card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Create the title element
  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = heading;

  // Create the description element
  const bodyParagraph = document.createElement("p");
  bodyParagraph.classList.add("card-text");
  bodyParagraph.textContent = body;

  // Create the tags element
  const tagsDiv = document.createElement("div");
  tagsDiv.classList.add("tags");

  const tagsContent = tags.join(", ");
  const tagsLabel = document.createElement("span");
  tagsLabel.textContent = `Tags: ${tagsContent}`;

  tagsDiv.appendChild(tagsLabel);

  // Create seller info element
  const sellerDiv = document.createElement("div");
  sellerDiv.classList.add("seller-info");

  const sellerAvatar = document.createElement("img");
  sellerAvatar.classList.add("seller-avatar");
  if (seller && seller.avatar && seller.avatar.url) {
    sellerAvatar.src = seller.avatar.url;
    sellerAvatar.alt = seller.avatar.alt || "Seller Avatar";
  } else {
    sellerAvatar.src = ""; // Provide a default or placeholder avatar URL
    sellerAvatar.alt = "No avatar available";
  }

  const sellerName = document.createElement("p");
  sellerName.classList.add("seller-name");
  sellerName.textContent = `Seller: ${
    seller && seller.name ? seller.name : "Unknown"
  }`;

  sellerDiv.appendChild(sellerAvatar);
  sellerDiv.appendChild(sellerName);

  // Append all created elements to the card body
  cardBody.appendChild(title);
  cardBody.appendChild(bodyParagraph);
  cardBody.appendChild(tagsDiv);
  cardBody.appendChild(sellerDiv);

  // Create the card footer
  const cardFooter = document.createElement("div");
  cardFooter.classList.add("card-footer");

  // Create a small text element for bids and auction end time
  const bidInfo = document.createElement("small");
  bidInfo.classList.add("text-muted");
  bidInfo.textContent = `Current Bid: $${currentBid} | Number of Bids: ${numberOfBids} | Auction ends on: ${new Date(
    endsAt
  ).toLocaleString()}`;

  cardFooter.appendChild(bidInfo);

  // Create a "Read more" button
  const button = document.createElement("button");
  button.textContent = "Bid here!";
  button.classList.add("btn", "btn-success");

  button.addEventListener("click", () => {
    window.location.href = `/post/index.html?id=${id}`;
  });

  cardFooter.appendChild(button);

  // Append card body and footer to the main card element
  card.appendChild(img);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  return card;
}
