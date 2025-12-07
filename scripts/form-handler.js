export function sendForm(event) {
  event.preventDefault();

  // Show success message
  document.getElementById("ok").style.display = "block";

  // Reset the form fields
  event.target.reset();

  return false;
}
