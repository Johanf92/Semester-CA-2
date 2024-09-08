export function save(key, value) {
  let savedValue = value;
  if (typeof value !== "string") {
    savedValue = JSON.stringify(value);
  }

  localStorage.setItem(key, savedValue);
}
