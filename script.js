// CODEZ GAMES SITE - MASSIVE FRONTEND SCRIPT
// Drop this into: script.js and link it in your HTML

/* =========================
   BASIC SETUP
========================= */

const games = [
  { name: "Cookie Clicker", url: "https://orteil.dashnet.org/cookieclicker/", category: "idle" },
  { name: "2048", url: "https://play2048.co/", category: "puzzle" },
  { name: "Slope", url: "https://slope-game.github.io/", category: "arcade" },
  { name: "Run 3", url: "https://run3.io/", category: "arcade" }
];

const gameGrid = document.getElementById("gameGrid");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("gameModal");
const gameFrame = document.getElementById("gameFrame");
const modalTitle = document.getElementById("modalTitle");
const favoriteKey = "codez_favorites";

/* =========================
   RENDER GAMES
========================= */

function renderGames(filter = "") {
  gameGrid.innerHTML = "";

  const filtered = games.filter(g => 
    g.name.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML = `
      <h3>${game.name}</h3>
      <p>${game.category}</p>
      <button onclick="playGame('${game.url}', '${game.name}')">Play</button>
      <button onclick="toggleFavorite('${game.name}')">❤️</button>
    `;

    gameGrid.appendChild(card);
  });
}

/* =========================
   PLAY GAME MODAL
========================= */

function playGame(url, name) {
  modal.style.display = "flex";
  gameFrame.src = url;
  modalTitle.innerText = name;
}

function closeGame() {
  modal.style.display = "none";
  gameFrame.src = "";
}

/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", (e) => {
  renderGames(e.target.value);
});

/* =========================
   FAVORITES SYSTEM
========================= */

function getFavorites() {
  return JSON.parse(localStorage.getItem(favoriteKey)) || [];
}

function toggleFavorite(name) {
  let favs = getFavorites();

  if (favs.includes(name)) {
    favs = favs.filter(f => f !== name);
  } else {
    favs.push(name);
  }

  localStorage.setItem(favoriteKey, JSON.stringify(favs));
  alert(name + " updated favorites!");
}

/* =========================
   DARK MODE
========================= */

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "codez_theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
}

function loadTheme() {
  const theme = localStorage.getItem("codez_theme");
  if (theme === "dark") document.body.classList.add("dark-mode");
}

/* =========================
   FULLSCREEN MODE
========================= */

function fullscreenGame() {
  if (gameFrame.requestFullscreen) {
    gameFrame.requestFullscreen();
  }
}

/* =========================
   KEYBOARD SHORTCUTS
========================= */

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeGame();
  if (e.key === "/") searchInput.focus();
});

/* =========================
   INIT
========================= */

window.onload = () => {
  loadTheme();
  renderGames();
};

/* =========================
   OPTIONAL: ADD GAME DYNAMICALLY
========================= */

function addGame(name, url, category) {
  games.push({ name, url, category });
  renderGames();
}

/* =========================
   EXPORT TO GLOBAL
========================= */

window.playGame = playGame;
window.closeGame = closeGame;
window.toggleFavorite = toggleFavorite;
window.toggleTheme = toggleTheme;
window.fullscreenGame = fullscreenGame;
window.addGame = addGame;

