// ---------- Mobile menu ----------
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

menuToggle.addEventListener('click', () => {
  // Show or hide the menu, and tell screen readers whether it is open
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close the menu after tapping a link
siteNav.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// ---------- Form validation ----------
const form = document.getElementById('orderForm');
const successMessage = document.getElementById('formSuccess');

// Checks one field. Returns true when valid, otherwise shows an error message.
function validateField(input, errorId, message) {
  const errorEl = document.getElementById(errorId);
  const value = input.value.trim();
  let isValid = value !== '';

  // The email field also needs a simple format check
  if (isValid && input.type === 'email') {
    isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  errorEl.textContent = isValid ? '' : message;
  input.classList.toggle('invalid', !isValid);
  return isValid;
}

form.addEventListener('submit', (event) => {
  event.preventDefault(); // stop the page from reloading
  successMessage.hidden = true;

  const nameOk = validateField(form.name, 'nameError', 'Please enter your name.');
  const emailOk = validateField(form.email, 'emailError', 'Please enter a valid email address.');
  const orderOk = validateField(form.order, 'orderError', 'Please tell us what you would like to order.');

  if (nameOk && emailOk && orderOk) {
    // A real site would send this data to a server. This demo only shows a message.
    successMessage.textContent = `Thank you, ${form.name.value.trim()}. We have received your order.`;
    successMessage.hidden = false;
    form.reset();
  }
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
