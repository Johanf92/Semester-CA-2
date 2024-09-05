import { getBid } from "../../api/posts/getBid.mjs";
import { placeBid } from "../../handlers/posts/createBidHandler.mjs";

/**
 * Renders a list of posts into a specified parent element.
 */

export function renderSingleListing(parent, listingData) {
  console.log("Listings Data:", listingData); // Debugging output

  const container = document.querySelector(parent);

  container.innerHTML = "";

  if (listingData && listingData.data) {
    const listingHtml = createListing(listingData);
    container.appendChild(listingHtml);
  } else {
    console.warn("Listing data or data property is missing.");
  }
}

/**
 * Creates a post element.
 * @param {Object} post - The post data. The object should have `id`, `title`, `body`, and `media` properties.
 * @returns {HTMLElement} The created post element.
 */

function createListing(listingData) {
  const listings = listingData.data;
  const {
    id,
    title: heading,
    description: body,
    media,
    tags,
    bids,
    _count,
    seller,
    endsAt,
  } = listings;

  // Create the main card element
  const card = document.createElement("div");
  card.classList.add("card", "mb-4", "bg-light");

  // Create the card body to hold all content
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Title section
  const title = document.createElement("h3");
  title.classList.add("card-title");
  title.textContent = heading;
  cardBody.appendChild(title);

  const hr3 = document.createElement("hr");
  cardBody.appendChild(hr3);

  // Seller information
  if (seller) {
    const sellerInfo = document.createElement("div");
    sellerInfo.classList.add(
      "seller-info",
      "d-flex",
      "align-items-center",
      "mb-3"
    );

    const sellerAvatar = document.createElement("img");
    sellerAvatar.src = seller.avatar?.url || "default-avatar-url";
    sellerAvatar.alt = seller.avatar?.alt || seller.name || "Seller Avatar";
    sellerAvatar.classList.add(
      "seller-avatar",
      "rounded-circle",
      "me-2",
      "img-fluid"
    );
    sellerAvatar.style.width = "50px";
    sellerAvatar.style.height = "50px";

    const sellerName = document.createElement("span");
    sellerName.textContent = seller.name || "Unknown Seller";

    sellerInfo.appendChild(sellerAvatar);
    sellerInfo.appendChild(sellerName);
    cardBody.appendChild(sellerInfo);
  } else {
    console.warn("Seller information is missing.");
  }

  // Image carousel section
  if (media && media.length > 0) {
    const carousel = document.createElement("div");
    carousel.id = `carousel-${id}`;
    carousel.classList.add("carousel", "slide", "mb-3");
    carousel.setAttribute("data-bs-ride", "carousel");

    // Carousel indicators
    const indicators = document.createElement("ol");
    indicators.classList.add("carousel-indicators");
    media.forEach((_, index) => {
      const indicator = document.createElement("li");
      indicator.setAttribute("data-bs-target", `#carousel-${id}`);
      indicator.setAttribute("data-bs-slide-to", index);
      if (index === 0) indicator.classList.add("active");
      indicators.appendChild(indicator);
    });
    carousel.appendChild(indicators);

    // Carousel inner container
    const carouselInner = document.createElement("div");
    carouselInner.classList.add("carousel-inner");

    media.forEach((image, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (index === 0) carouselItem.classList.add("active");

      const img = document.createElement("img");
      img.src = image.url;
      img.alt = image.alt || heading;
      img.classList.add("d-block", "w-100", "img-fluid", "carousel-image"); // Added 'carousel-image' class
      img.style.height = "auto"; // This can be controlled by CSS as well

      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);
    });

    // Carousel controls
    const prevButton = document.createElement("button");
    prevButton.classList.add("carousel-control-prev");
    prevButton.type = "button";
    prevButton.setAttribute("data-bs-target", `#carousel-${id}`);
    prevButton.setAttribute("data-bs-slide", "prev");
    prevButton.innerHTML = `
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    `;

    const nextButton = document.createElement("button");
    nextButton.classList.add("carousel-control-next");
    nextButton.type = "button";
    nextButton.setAttribute("data-bs-target", `#carousel-${id}`);
    nextButton.setAttribute("data-bs-slide", "next");
    nextButton.innerHTML = `
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    `;

    carousel.appendChild(carouselInner);
    carousel.appendChild(prevButton);
    carousel.appendChild(nextButton);

    cardBody.appendChild(carousel);
  } else {
    const img = document.createElement("img");
    img.src = "default-image-url";
    img.alt = "No image available";
    img.classList.add("card-img-top", "mb-3", "img-fluid");
    img.style.height = "auto"; // Adjust to fit within the container

    cardBody.appendChild(img);
  }

  // Description section
  const bodyParagraph = document.createElement("p");
  bodyParagraph.classList.add("card-text", "bg-light");
  bodyParagraph.textContent = body || "No description available.";
  cardBody.appendChild(bodyParagraph);

  // Horizontal line between description and tags
  const hr1 = document.createElement("hr");
  cardBody.appendChild(hr1);

  // Tags section
  const tagsDiv = document.createElement("div");
  tagsDiv.classList.add("tags", "mb-3");

  const tagsContent =
    tags && tags.length > 0 ? tags.join(", ") : "No tags available";
  const tagsLabel = document.createElement("span");
  tagsLabel.textContent = `Tags: ${tagsContent}`;

  tagsDiv.appendChild(tagsLabel);
  cardBody.appendChild(tagsDiv);

  // Horizontal line between tags and bidding details
  const hr2 = document.createElement("hr");
  cardBody.appendChild(hr2);

  // Bids section
  const biddingSection = document.createElement("div");
  biddingSection.classList.add("bids-container", "text-center", "mb-3");
  biddingSection.style.padding = "10px";
  biddingSection.style.borderRadius = "5px";

  const currentBid =
    bids && bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;
  const bidCount = _count ? _count.bids : 0;

  // List to display current bids
  const bidsList = document.createElement("ul");
  bidsList.id = "bids-list";
  bidsList.style.listStyle = "none";
  bidsList.style.padding = "0";
  bidsList.style.margin = "0";

  if (bids && bids.length > 0) {
    bids.forEach((bid) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Bid: $${bid.amount} by ${
        bid.bidder.name || "Anonymous"
      } on ${new Date(bid.created).toLocaleString()}`;
      bidsList.appendChild(listItem);
    });
  } else {
    const noBidsItem = document.createElement("li");
    noBidsItem.textContent = "No bids yet.";
    bidsList.appendChild(noBidsItem);
  }

  biddingSection.appendChild(bidsList);

  // Footer section with the bidding information
  const cardFooter = document.createElement("div");
  cardFooter.classList.add("card-footer", "text-center", "mt-3");
  cardFooter.style.color = "red";

  const currentBidText = document.createElement("p");
  currentBidText.textContent = `Current Bid: $${currentBid} | Number of Bids: ${bidCount} | Auction ends on: ${new Date(
    endsAt
  ).toLocaleString()}`;
  cardFooter.appendChild(currentBidText);

  const bidForm = document.createElement("div");
  bidForm.classList.add("bid-form", "text-center");
  bidForm.style.marginTop = "10px";
  bidForm.style.display = "flex";
  bidForm.style.flexDirection = "column";
  bidForm.style.alignItems = "center";

  const bidInput = document.createElement("input");
  bidInput.type = "number";
  bidInput.id = "bid-amount";
  bidInput.classList.add("form-control");
  bidInput.placeholder = "Enter your bid";
  bidInput.style.width = "100%";
  bidInput.style.maxWidth = "300px";

  const bidButton = document.createElement("button");
  bidButton.id = "place-bid-btn";
  bidButton.classList.add("btn", "submit");
  bidButton.textContent = "Place Bid";
  bidButton.style.width = "100%";
  bidButton.style.maxWidth = "300px";
  bidButton.style.marginTop = "10px";

  bidButton.addEventListener("click", async () => {
    const bidAmount = parseFloat(bidInput.value);

    // Confirm the bid with the user
    const isConfirmed = window.confirm(
      `Are you sure you want to place a bid of $${bidAmount}?`
    );

    if (isConfirmed) {
      // Check if the bid amount is valid and greater than the current bid
      if (bidAmount && bidAmount > currentBid) {
        try {
          await placeBid(id, bidAmount);

          // Update the bid display (if you want to do this without refreshing)
          currentBidText.textContent = `Current Bid: $${bidAmount} | Number of Bids: ${
            bidCount + 1
          } | Auction ends on: ${new Date(endsAt).toLocaleString()}`;

          // Refresh the page
          window.location.reload();
        } catch (error) {
          console.error("Failed to place bid:", error);
          alert("There was an error placing your bid. Please try again.");
        }
      } else {
        alert("Please enter a valid bid amount greater than the current bid.");
      }
    }
  });

  bidForm.appendChild(bidInput);
  bidForm.appendChild(bidButton);

  // Append the bidForm below the bidsList
  biddingSection.appendChild(bidForm);

  cardBody.appendChild(biddingSection);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  return card;
}
