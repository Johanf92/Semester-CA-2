export function renderProfileListings(parent, profile_listings) {
  const container = document.querySelector(parent);

  container.innerHTML = "";

  const postsHtml = profile_listings.map((post) => {
    return createPost(post);
  });

  container.append(...postsHtml);
}
