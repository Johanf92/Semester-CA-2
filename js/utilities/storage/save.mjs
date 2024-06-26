export function save(key, value) {
  let savedValue = value;
  if (typeof value !== "string") {
    savedValue = JSON.stringify(value);
  }

  console.log(`Saving ${key}:`, savedValue); // Debugging log, can delete later
  localStorage.setItem(key, savedValue);
}
