/**
 * Renders a list of posts into a specified parent element.
 */

export function renderListings(parent, listings) {
  const container = document.querySelector(parent);
  if (!container) {
    console.error(`Error: The parent element "${parent}" was not found.`);
    return;
  }

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
  const {
    id,
    title: heading,
    description: body,
    media,
    tags,
    endsAt,
  } = listing;

  const card = document.createElement("div");
  card.classList.add("card");

  // Create the link for the card
  const link = document.createElement("a");
  link.href = `/listing/index.html?id=${id}`;
  link.classList.add("card-link");

  // Image section
  const img = document.createElement("img");
  if (media && media.length > 0) {
    img.src = media[0].url;
    img.alt = media[0].alt || heading;
  } else {
    img.src =
      "https://images.pexels.com/photos/3683053/pexels-photo-3683053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; // Provide a default or placeholder image URL
    img.alt = "No image available";
  }
  img.classList.add("card-img-top", "img-fluid");

  // Card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = heading;

  const bodyParagraph = document.createElement("p");
  bodyParagraph.classList.add("card-text", "mt-4");
  bodyParagraph.textContent = body;

  const tagsDiv = document.createElement("div");
  tagsDiv.classList.add("tags");

  const tagsContent = tags.join(", ");
  const tagsLabel = document.createElement("span");
  tagsLabel.textContent = `Tags: ${tagsContent}`;

  tagsDiv.appendChild(tagsLabel);

  // Countdown timer section
  const countdown = document.createElement("div");
  countdown.classList.add("countdown");

  const countdownText = document.createElement("span");
  countdownText.classList.add("countdown-text");
  countdownText.textContent = "Auction ends in: ";

  const timeDisplay = document.createElement("span");
  timeDisplay.classList.add("time-display");
  countdown.appendChild(countdownText);
  countdown.appendChild(timeDisplay);

  cardBody.appendChild(title);
  cardBody.appendChild(bodyParagraph);

  const hr1 = document.createElement("hr");
  cardBody.appendChild(hr1);

  cardBody.appendChild(tagsDiv);

  // Add horizontal line
  const hr = document.createElement("hr");
  cardBody.appendChild(hr);

  cardBody.appendChild(countdown);

  // Card footer
  const cardFooter = document.createElement("div");
  cardFooter.classList.add("card-footer");

  const smallText = document.createElement("small");
  smallText.classList.add("text-muted");

  cardFooter.appendChild(smallText);

  const button = document.createElement("button");
  button.textContent = "Discover More";
  button.classList.add("btn", "submit", "px-5");

  button.addEventListener("click", () => {
    window.location.href = `/listing/index.html?id=${id}`;
  });

  cardFooter.appendChild(button);

  // Append the image and card body to the link
  link.appendChild(img);
  link.appendChild(cardBody);
  card.appendChild(link);
  card.appendChild(cardFooter);

  // Function to update the countdown timer
  function updateCountdown() {
    const now = new Date();
    const endDate = new Date(endsAt);
    const timeRemaining = endDate - now;

    if (timeRemaining <= 0) {
      timeDisplay.textContent = "Auction has ended";
      clearInterval(countdownInterval);
    } else {
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      timeDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }

  // Update the countdown every second
  const countdownInterval = setInterval(updateCountdown, 1000);

  return card;
}
