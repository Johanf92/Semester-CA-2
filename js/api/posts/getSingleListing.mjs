import { listings_URL } from "../../constants/constants.mjs";

export async function getSingleListing(id) {
  if (!id) {
    throw new Error("No listing ID was provided");
  }
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please log in to view listings");
  }

  const options = {
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${listings_URL}/${id}?_seller=true&_bids=true`,
    options
  );
  const json = await response.json();

  console.log("API Response:", json); // Debugging output

  if (!response.ok) {
    throw new Error(json.errors[0].message);
  }

  return json;
}
