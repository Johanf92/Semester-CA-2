import { placeBid } from "../../handlers/posts/createBidHandler.mjs";
import { createImageModal } from "../../ui/common/imageModal.mjs";

/**
 * Renders a list of posts into a specified parent element.
 */
export function renderSingleListing(parent, listingData) {

  const container = document.querySelector(parent);
  container.innerHTML = "";

  if (listingData && listingData.data) {
    const listingHtml = createListing(listingData);
    container.appendChild(listingHtml);

    createImageModal();
  } else {
    console.warn("Listing data or data property is missing.");
  }
}

/**
 * Creates a listing element.
 * @param {Object} listingData - The listing data. The object should have `id`, `title`, `description`, `media`, `tags`, `bids`, `_count`, `seller`, and `endsAt` properties.
 * @returns {HTMLElement} The created listing element.
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

  const now = new Date();
  const auctionEndDate = new Date(endsAt);
  const isAuctionEnded = now > auctionEndDate;

  const card = document.createElement("div");
  card.classList.add("card", "mb-4", "bg-light");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h3");
  title.classList.add("card-title");
  title.textContent = heading;
  cardBody.appendChild(title);

  const hr3 = document.createElement("hr");
  cardBody.appendChild(hr3);

  if (seller) {
    const sellerInfo = document.createElement("div");
    sellerInfo.classList.add(
      "seller-info",
      "d-flex",
      "align-items-center",
      "mb-3",
      "ms-3",
      "position-relative"
    );

    const sellerAvatar = document.createElement("img");
    sellerAvatar.src = seller.avatar?.url || "default-avatar-url";
    sellerAvatar.alt = seller.avatar?.alt || seller.name || "Seller Avatar";
    sellerAvatar.classList.add("seller-avatar", "rounded-circle", "img-fluid");
    sellerAvatar.style.width = "50px";
    sellerAvatar.style.height = "50px";

    const sellerName = document.createElement("span");
    sellerName.textContent = seller.name || "Unknown Seller";

    const heartLink = document.createElement("a");
    heartLink.href = "/likes/index.html";
    heartLink.classList.add(
      "position-absolute",
      "end-0",
      "top-50",
      "me-3",
      "translate-middle-y"
    );

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fas", "fa-heart", "text-danger", "fa-2x", "me-4");

    heartLink.appendChild(heartIcon);

    sellerInfo.appendChild(sellerAvatar);
    sellerInfo.appendChild(sellerName);
    sellerInfo.appendChild(heartLink);

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
      img.classList.add("d-block", "w-100", "img-fluid", "carousel-image");

      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        const modalImage = document.getElementById("modalImage");
        modalImage.src = image.url; 
        const imageModal = new bootstrap.Modal(
          document.getElementById("imageModal")
        );
        imageModal.show(); 
      });

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
    img.src =
      "https://images.pexels.com/photos/3683053/pexels-photo-3683053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    img.alt = "No image available";
    img.classList.add("card-img-top", "mb-3", "img-fluid", "w-50");
    cardBody.appendChild(img);
  }

  const descriptionHeading = document.createElement("h3");
  descriptionHeading.classList.add("text-center", "mb-3"); 
  descriptionHeading.textContent = "Description:";
  cardBody.appendChild(descriptionHeading);

  const bodyParagraph = document.createElement("p");
  bodyParagraph.classList.add("card-text", "bg-light", "container");
  bodyParagraph.textContent = body || "No description available.";
  cardBody.appendChild(bodyParagraph);

  const hr1 = document.createElement("hr");
  cardBody.appendChild(hr1);

  const tagsDiv = document.createElement("div");
  tagsDiv.classList.add("tags", "mb-3");

  const tagsContent =
    tags && tags.length > 0 ? tags.join(", ") : "No tags available";
  const tagsLabel = document.createElement("span");
  tagsLabel.textContent = `Tags: ${tagsContent}`;

  tagsDiv.appendChild(tagsLabel);
  cardBody.appendChild(tagsDiv);

  const hr2 = document.createElement("hr");
  cardBody.appendChild(hr2);

  const biddingSection = document.createElement("div");
  biddingSection.classList.add("bids-container", "text-center", "mb-3");
  biddingSection.style.padding = "10px";
  biddingSection.style.borderRadius = "5px";

  const bidsList = document.createElement("ul");
  bidsList.id = "bids-list";
  bidsList.style.listStyle = "none";
  bidsList.style.padding = "0";
  bidsList.style.margin = "0";

  const updateBids = () => {
    bidsList.innerHTML = "";

    if (bids && bids.length > 0) {
      const currentBid = Math.max(...bids.map((bid) => bid.amount));
      bids.forEach((bid) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Bid: $${bid.amount} by ${
          bid.bidder.name || "Anonymous"
        } on ${new Date(bid.created).toLocaleString()}`;

        if (bid.amount === currentBid) {
          listItem.style.fontWeight = "bold";
          listItem.style.backgroundColor = "#d4edda";
          listItem.style.color = "#155724";
          listItem.style.padding = "5px";
          listItem.style.borderRadius = "5px";
        }

        bidsList.appendChild(listItem);
      });
    } else {
      const noBidsItem = document.createElement("li");
      noBidsItem.textContent = "No bids yet.";
      bidsList.appendChild(noBidsItem);
    }
  };

  updateBids();

  biddingSection.appendChild(bidsList);

  const cardFooter = document.createElement("div");
  cardFooter.classList.add("card-footer", "text-center", "mt-3");
  cardFooter.style.color = "red";

  const currentBidText = document.createElement("p");
  currentBidText.textContent = `Current Bid: $${Math.max(
    0,
    bids && bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0
  )} | Number of Bids: ${
    _count ? _count.bids : 0
  } | Auction ends on: ${new Date(endsAt).toLocaleString()}`;
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
  bidButton.textContent = "Place Bid";
  bidButton.classList.add("btn", "submit", "mt-2");
  bidButton.style.width = "100%";
  bidButton.style.maxWidth = "300px";

  if (isAuctionEnded) {
    bidInput.disabled = true;
    bidButton.disabled = true;
    const endedMessage = document.createElement("p");
    endedMessage.textContent = "The auction has ended.";
    endedMessage.style.color = "red";
    bidForm.appendChild(endedMessage);
  } else {
    bidButton.addEventListener("click", async () => {
      const bidAmount = parseFloat(bidInput.value);
      if (
        isNaN(bidAmount) ||
        bidAmount <=
          Math.max(
            0,
            bids && bids.length > 0
              ? Math.max(...bids.map((bid) => bid.amount))
              : 0
          )
      ) {
        alert("Please enter a bid higher than the current highest bid.");
        return;
      }

      const isConfirmed = confirm(
        `Are you sure you want to place a bid of $${bidAmount}?`
      );
      if (isConfirmed) {
        try {
          await placeBid(id, bidAmount);

          // Update bids data and UI
          bids.push({
            amount: bidAmount,
            bidder: { name: "You" },
            created: new Date().toISOString(),
          });
          updateBids();
          currentBidText.textContent = `Current Bid: $${Math.max(
            0,
            bids && bids.length > 0
              ? Math.max(...bids.map((bid) => bid.amount))
              : 0
          )} | Number of Bids: ${
            _count ? _count.bids + 1 : 1
          } | Auction ends on: ${new Date(endsAt).toLocaleString()}`;
          bidInput.value = "";
        } catch (error) {
          console.error("Failed to place bid:", error);
          alert("There was an error placing your bid. Please try again.");
        }
      }
    });
  }

  bidForm.appendChild(bidInput);
  bidForm.appendChild(bidButton);

  const returnToFeedLink = document.createElement("a");
  returnToFeedLink.href = "/feed/index.html";
  returnToFeedLink.textContent = "Return to Feed";
  returnToFeedLink.classList.add("mt-3", "mb-2", "return-singleListing");

  bidForm.appendChild(returnToFeedLink);

  cardFooter.appendChild(bidForm);

  cardBody.appendChild(biddingSection);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  return card;
}
