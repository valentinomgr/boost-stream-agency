// year in footer
document.getElementById("year").textContent = new Date().getFullYear();

function sendForm(e) {
  e.preventDefault();
  document.getElementById("ok").style.display = "block";
  e.target.reset();
  return false;
}

// cookie
const c = document.getElementById("cookie");
function acceptCookies() {
  localStorage.setItem("bs_cookie_ok", "1");
  c.style.display = "none";
}
if (!localStorage.getItem("bs_cookie_ok")) {
  c.style.display = "flex";
}

// ----------- I18N -----------
async function loadLang(code) {
  try {
    const response = await fetch(`/i18n/${code}.json`);
    const dictionary = await response.json();

    // textContent targets
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const k = element.getAttribute("data-i18n");
      if (dictionary[k] !== undefined) element.textContent = dictionary[k];
    });
    // innerHTML targets
    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const k = element.getAttribute("data-i18n-html");
      if (dictionary[k] !== undefined) element.innerHTML = dictionary[k];
    });

    // <html lang>
    document.documentElement.setAttribute("lang", code);
    document.documentElement.setAttribute("data-lang", code);

    // language selection is saved
    localStorage.setItem("lang", code);
  } catch (error) {
    console.error("i18n load error", error);
  }
}

// init switch
const sel = document.getElementById("langSwitch");
const saved =
  localStorage.getItem("lang") ||
  (navigator.language?.toLowerCase().startsWith("uk") ? "uk" : "en");
sel.value = saved;
loadLang(saved);
sel.addEventListener("change", (e) => loadLang(e.target.value));
