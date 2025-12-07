export async function loadLang(code) {
  try {
    const response = await fetch(`/i18n/${code}.json`);
    // Check for HTTP errors before parsing JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const dictionary = await response.json();

    // textContent targets
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (dictionary[key] !== undefined) element.textContent = dictionary[key];
    });

    // innerHTML targets
    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const key = element.getAttribute("data-i18n-html");
      if (dictionary[key] !== undefined) element.innerHTML = dictionary[key];
    });

    // Update <html lang> attributes
    document.documentElement.setAttribute("lang", code);
    document.documentElement.setAttribute("data-lang", code);

    // Save language selection
    localStorage.setItem("lang", code);
  } catch (error) {
    console.error("i18n load error", error);
  }
}
