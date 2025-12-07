// Function is exported to be called by an HTML button's onclick attribute
export function acceptCookies() {
  const cookieBanner = document.getElementById("cookie");

  localStorage.setItem("bs_cookie_ok", "1");

  // Ensure the element exists before trying to manipulate it
  if (cookieBanner) {
    cookieBanner.style.display = "none";
  }
}
