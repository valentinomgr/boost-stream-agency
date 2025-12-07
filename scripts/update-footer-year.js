export function updateFooterYear() {
  const yearElement = document.getElementById("year");

  // Перевіряємо, чи існує елемент, і лише тоді виконуємо присвоєння.
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
