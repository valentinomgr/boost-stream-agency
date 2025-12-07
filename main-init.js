// --- 1. IMPORT STATEMENTS ---
// Relative paths must be correct based on where this file is located.
import { updateFooterYear } from "./scripts/update-footer-year.js";
import { sendForm } from "./scripts/form-handler.js";
import { acceptCookies } from "./scripts/cookie-handler.js";
import { loadLang } from "./scripts/i18n-loader.js";

// --- 2. MAKE FUNCTIONS GLOBALLY ACCESSIBLE ---
// These functions must be attached to the window object
// if they are called directly via HTML attributes (e.g., onclick="acceptCookies()")
window.sendForm = sendForm;
window.acceptCookies = acceptCookies;

// --- 3. DOM-DEPENDENT INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  // --- Footer Year ---
  updateFooterYear();

  // --- Contact Form Attachment (Best Practice) ---
  const formElement = document.getElementById("contactForm");
  if (formElement) {
    formElement.addEventListener("submit", sendForm);
  }

  // --- Cookie Banner Initialization ---
  const cookieBanner = document.getElementById("cookie");
  if (cookieBanner && !localStorage.getItem("bs_cookie_ok")) {
    cookieBanner.style.display = "flex";
  }

  // --- Language Switcher Initialization ---
  const langSwitch = document.getElementById("langSwitch");

  if (langSwitch) {
    const saved =
      localStorage.getItem("lang") ||
      (navigator.language?.toLowerCase().startsWith("uk") ? "uk" : "en");

    langSwitch.value = saved;

    loadLang(saved);

    langSwitch.addEventListener("change", (event) =>
      loadLang(event.target.value)
    );
  }
});
