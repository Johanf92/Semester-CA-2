export function get(key) {
  const item = localStorage.getItem(key);
  try {
    return JSON.parse(item);
  } catch {
    return item;
  }
}
