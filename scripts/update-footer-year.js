export function updateFooterYear() {
  // 1. Get the element by its ID
  const yearElement = document.getElementById("year");

  // 2. Check if the element was successfully found
  if (yearElement) {
    // 3. Update the content
    yearElement.textContent = new Date().getFullYear();
  }
}
