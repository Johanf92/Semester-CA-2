import { createApiKeyURL } from "../../constants/constants.mjs";

export async function createApiKey(token) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: "My API Key name" }), // Optional body
  };

  const response = await fetch(createApiKeyURL, options);
  const apiKeyData = await response.json();

  if (response.ok) {
    localStorage.setItem("apiKey", apiKeyData.data.key);
    return apiKeyData.data.key;
  } else {
    throw new Error(apiKeyData.errors[0].message);
  }
}
