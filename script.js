const quotes = [
  { text: "Believe in yourself!", author: "Anonymous" },
  { text: "You are stronger than you think.", author: "Unknown" },
  { text: "Every day is a second chance.", author: "Oprah Winfrey" },
  { text: "Push yourself, because no one else will.", author: "Les Brown" },
  { text: "Stay positive, work hard, make it happen.", author: "Unknown" },
  { text: "Make each day your masterpiece.", author: "John Wooden" },
  { text: "The best time for new beginnings is now.", author: "Tony Robbins" }
];

// Show daily quote based on date
function showDailyQuote() {
  const today = new Date();
  const index = today.getDate() % quotes.length;
  const quote = quotes[index];

  document.getElementById("daily-quote").innerText = `"${quote.text}"`;
  document.getElementById("daily-author").innerText = `— ${quote.author}`;
}

// Random quote generator
let lastShownQuote = null;
function generateRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  lastShownQuote = quote;

  document.getElementById("random-quote").innerText = `"${quote.text}"`;
  document.getElementById("random-author").innerText = `— ${quote.author}`;
}

// Save to favorites
function saveFavorite() {
  if (!lastShownQuote) return alert("Generate a quote first!");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(lastShownQuote);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavorites();
}

// Display favorites
function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favList = document.getElementById("fav-list");
  favList.innerHTML = "";

  favorites.forEach((q, i) => {
    const card = document.createElement("div");
    card.className = "quote-card";
    card.innerHTML = `
      <p>"${q.text}"</p>
      <small>— ${q.author}</small>
      <button onclick="copyToClipboard('${q.text} — ${q.author}')">Copy</button>
      <button onclick="removeFavorite(${i})">Delete</button>
    `;
    favList.appendChild(card);
  });
}

// Remove favorite
function removeFavorite(i) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.splice(i, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavorites();
}

// Copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
}

// Surprise popup
function showSurprise() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("surprise-text").innerText = `"${quote.text}"`;
  document.getElementById("surprise-author").innerText = `— ${quote.author}`;
  document.getElementById("surprise-popup").style.display = "flex";
}

function closeSurprise() {
  document.getElementById("surprise-popup").style.display = "none";
}

// Load on page open
window.onload = function () {
  showDailyQuote();
  displayFavorites();
};
