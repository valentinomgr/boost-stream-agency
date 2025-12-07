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
    const res = await fetch(`/i18n/${code}.json`);
    const dict = await res.json();

    // textContent targets
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (dict[k] !== undefined) el.textContent = dict[k];
    });
    // innerHTML targets
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const k = el.getAttribute("data-i18n-html");
      if (dict[k] !== undefined) el.innerHTML = dict[k];
    });

    // <html lang>
    document.documentElement.setAttribute("lang", code);
    document.documentElement.setAttribute("data-lang", code);

    // language selection is saved
    localStorage.setItem("lang", code);
  } catch (e) {
    console.error("i18n load error", e);
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
