// ICT251 Activity 3 - Moses Milambo
// Features: 1) Contact form validation + preview (compulsory)
//           2) Gallery viewer  3) Theme switch  4) Mobile navigation

/* ---------- Feature 1: Contact form validation and preview ---------- */

// Returns true if the text looks like a valid email address
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// Shows (or clears) an error message next to a field
function setError(fieldId, message) {
  var box = document.getElementById(fieldId + "-error");
  if (box) {
    box.textContent = message;
  }
}

// Validates the form and shows a local preview if everything is OK
function handleFormSubmit(event) {
  event.preventDefault(); // keep submission local, no page reload

  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var topic = document.getElementById("topic").value;
  var message = document.getElementById("message").value.trim();
  var preview = document.getElementById("form-preview");
  var valid = true;

  setError("name", "");
  setError("email", "");
  setError("message", "");
  preview.textContent = "";

  if (name === "") {
    setError("name", "Please enter your name (spaces only is not allowed).");
    valid = false;
  }
  if (email === "") {
    setError("email", "Please enter your email address.");
    valid = false;
  } else if (!isValidEmail(email)) {
    setError("email", "Please enter a valid email, for example name@example.com.");
    valid = false;
  }
  if (message === "") {
    setError("message", "Please write a message (spaces only is not allowed).");
    valid = false;
  }

  if (!valid) {
    return;
  }

  // Build the preview with textContent so user text is never treated as HTML
  var heading = document.createElement("h3");
  heading.textContent = "Form validated in your browser. No message was sent.";
  preview.appendChild(heading);

  var rows = [
    ["Name", name],
    ["Email", email],
    ["Topic", topic],
    ["Message", message]
  ];
  for (var i = 0; i < rows.length; i++) {
    var p = document.createElement("p");
    var label = document.createElement("strong");
    label.textContent = rows[i][0] + ": ";
    var value = document.createElement("span");
    value.textContent = rows[i][1];
    p.appendChild(label);
    p.appendChild(value);
    preview.appendChild(p);
  }
}

/* ---------- Feature 2: Gallery viewer (Previous / Next) ---------- */

// EDIT THIS ARRAY: use your own photo files, alt text and captions
var photos = [
  { src: "images/photo1.jpg", alt: "Moses after attending a class on his birthday", caption: "My birthday, taken after class" },
  { src: "images/photo2.jpg", alt: "Moses after attending church", caption: "Taken after church" },
  { src: "images/photo3.jpg", alt: "Moses relaxing with some friends", caption: "Spending time with friends" }
];
var currentPhoto = 0;

// Shows the photo at the current index and disables buttons at the ends
function showPhoto() {
  var img = document.getElementById("gallery-img");
  var caption = document.getElementById("gallery-caption");
  var count = document.getElementById("gallery-count");
  var prev = document.getElementById("prev-photo");
  var next = document.getElementById("next-photo");
  if (!img || !caption || !prev || !next) {
    return;
  }
  img.src = photos[currentPhoto].src;
  img.alt = photos[currentPhoto].alt;
  caption.textContent = photos[currentPhoto].caption;
  count.textContent = "Photo " + (currentPhoto + 1) + " of " + photos.length;
  prev.disabled = currentPhoto === 0;
  next.disabled = currentPhoto === photos.length - 1;
}

function nextPhoto() {
  if (currentPhoto < photos.length - 1) {
    currentPhoto++;
    showPhoto();
  }
}

function previousPhoto() {
  if (currentPhoto > 0) {
    currentPhoto--;
    showPhoto();
  }
}

/* ---------- Feature 3: Light / dark theme switch ---------- */

// Applies the chosen theme and updates the button text and state
function applyTheme(isDark) {
  var button = document.getElementById("theme-toggle");
  document.body.classList.toggle("dark", isDark);
  if (button) {
    button.textContent = isDark ? "Switch to light mode" : "Switch to dark mode";
    button.setAttribute("aria-pressed", isDark ? "true" : "false");
  }
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (e) {
    // storage not available, the preference is just not saved
  }
}

function toggleTheme() {
  applyTheme(!document.body.classList.contains("dark"));
}

/* ---------- Feature 4: Mobile navigation ---------- */

// Opens or closes the menu on narrow screens and updates its state
function toggleMenu() {
  var nav = document.getElementById("site-nav");
  var button = document.getElementById("menu-toggle");
  var isOpen = nav.classList.toggle("open");
  button.setAttribute("aria-expanded", isOpen ? "true" : "false");
  button.textContent = isOpen ? "Close menu" : "Menu";
}

// Closes the menu after a link is tapped
function closeMenu() {
  var nav = document.getElementById("site-nav");
  var button = document.getElementById("menu-toggle");
  nav.classList.remove("open");
  button.setAttribute("aria-expanded", "false");
  button.textContent = "Menu";
}

/* ---------- Connect everything once the page is ready ---------- */

var form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", handleFormSubmit);
}

var prevButton = document.getElementById("prev-photo");
var nextButton = document.getElementById("next-photo");
if (prevButton && nextButton) {
  prevButton.addEventListener("click", previousPhoto);
  nextButton.addEventListener("click", nextPhoto);
  showPhoto();
}

var themeButton = document.getElementById("theme-toggle");
if (themeButton) {
  themeButton.addEventListener("click", toggleTheme);
  var saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (e) {
    saved = null;
  }
  applyTheme(saved === "dark");
}

var menuButton = document.getElementById("menu-toggle");
var siteNav = document.getElementById("site-nav");
if (menuButton && siteNav) {
  menuButton.addEventListener("click", toggleMenu);
  var navLinks = siteNav.querySelectorAll("a");
  for (var j = 0; j < navLinks.length; j++) {
    navLinks[j].addEventListener("click", closeMenu);
  }
}