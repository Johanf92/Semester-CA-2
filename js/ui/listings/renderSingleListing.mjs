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
  const listing = listingData.data; // Ensure this is correct
  const {
    id,
    title: heading,
    description: body,
    media,
    tags,
    bids,
    _count,
    seller, // Extract seller
    endsAt,
  } = listing;

  console.log("Listing Data:", listing); // Debugging output
  console.log("Seller Data:", seller); // Debugging output

  // Create the main card element
  const card = document.createElement("div");
  card.classList.add("card", "mb-4");

  // Create the card body to hold all content
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Title section
  const title = document.createElement("h3");
  title.classList.add("card-title");
  title.textContent = heading;
  cardBody.appendChild(title);

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
    sellerAvatar.src = seller.avatar?.url || "default-avatar-url"; // Provide a default avatar URL if none
    sellerAvatar.alt = seller.avatar?.alt || seller.name || "Seller Avatar";
    sellerAvatar.classList.add("seller-avatar", "rounded-circle", "me-2");
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
      img.classList.add("d-block", "w-100");
      img.style.height = "250px"; // Adjust as needed
      img.style.objectFit = "cover";

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
    img.src = "default-image-url"; // Provide a default or placeholder image URL
    img.alt = "No image available";
    img.classList.add("card-img-top", "mb-3");
    img.style.height = "250px"; // Adjust as needed
    img.style.objectFit = "cover";
    cardBody.appendChild(img);
  }

  // Description section
  const bodyParagraph = document.createElement("p");
  bodyParagraph.classList.add("card-text");
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

  // Bidding section
  const biddingSection = document.createElement("div");
  biddingSection.id = "bidding-section";

  // Calculate the current highest bid
  let currentBid =
    bids && bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;
  const bidCount = _count ? _count.bids : 0;

  // Footer section with the bidding information
  const cardFooter = document.createElement("div");
  cardFooter.classList.add("card-footer", "text-center", "mt-3");

  const currentBidText = document.createElement("p");
  currentBidText.textContent = `Current Bid: $${currentBid} | Number of Bids: ${bidCount} | Auction ends on: ${new Date(
    endsAt
  ).toLocaleString()}`;
  cardFooter.appendChild(currentBidText);

  // Create a form for placing a bid
  const bidForm = document.createElement("div");
  bidForm.classList.add("bid-form");

  const bidInput = document.createElement("input");
  bidInput.type = "number";
  bidInput.id = "bid-amount";
  bidInput.classList.add("form-control");
  bidInput.placeholder = "Enter your bid";

  const bidButton = document.createElement("button");
  bidButton.id = "place-bid-btn";
  bidButton.classList.add("btn", "btn-primary", "mt-2");
  bidButton.textContent = "Place Bid";

  bidButton.addEventListener("click", async () => {
    const bidAmount = parseFloat(bidInput.value);
    if (bidAmount && bidAmount > currentBid) {
      await placeBid(id, bidAmount, currentBidText);
    } else {
      alert("Please enter a valid bid amount greater than the current bid.");
    }
  });

  bidForm.appendChild(bidInput);
  bidForm.appendChild(bidButton);

  biddingSection.appendChild(bidForm);

  // List to display current bids
  const bidsList = document.createElement("ul");
  bidsList.id = "bids-list";

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

  cardBody.appendChild(biddingSection);

  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  return card;
}
