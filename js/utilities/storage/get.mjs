export function get(key) {
  const item = localStorage.getItem(key);
  console.log(`Getting ${key}:`, item); // Debugging log
  try {
    return JSON.parse(item);
  } catch (e) {
    return item;
  }
}
