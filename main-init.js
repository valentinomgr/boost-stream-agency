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
  if (cookieBanner && !localStorage.getItem("bs_cookie_ok")) {
    cookieBanner.style.display = "flex";
  }

  // --- Cookie Banner Initialization (Покращена версія) ---
  const cookieBanner = document.getElementById("cookie");
  const cookieKey = "bs_cookie_ok";
  const cookieStatus = localStorage.getItem(cookieKey); // Отримуємо статус

  console.log("--- ІНІЦІАЛІЗАЦІЯ КУКІ-БАНЕРА ---");
  console.log(`Елемент банера (ID='cookie') знайдено: ${!!cookieBanner}`);
  console.log(
    `Статус кукі '${cookieKey}': ${cookieStatus ? "ЗГОДА Є" : "ЗГОДИ НЕМАЄ"}`
  );

  if (cookieBanner) {
    if (!cookieStatus) {
      // Умова: Елемент існує І згоди немає
      cookieBanner.style.display = "flex";
      console.log("✅ КУКІ-БАНЕР ПОКАЗАНО: Згоди в Local Storage не знайдено.");
    } else {
      // Умова: Елемент існує І згода Є
      console.log("🛑 КУКІ-БАНЕР ПРИХОВАНО: Згоду знайдено в Local Storage.");
    }
  } else {
    // Умова: Елемент НЕ існує
    console.error(
      `❌ ПОМИЛКА: Не вдалося знайти елемент банера з ID='cookie'.`
    );
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
