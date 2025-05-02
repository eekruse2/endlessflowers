console.log("✔️ main.js loaded");

document.addEventListener('DOMContentLoaded', async () => {
  const img     = document.getElementById('daily-flower');
  const quoteEl = document.getElementById('daily-quote');

  // your quotes
  const quotes = [
    "“Love is composed of a single soul inhabiting two bodies.” – Aristotle",
    "“Where there is love there is life.” – Mahatma Gandhi",
    "“Love isn’t something you find. Love is something that finds you.” – Loretta Young",
    "“To love and be loved is to feel the sun from both sides.” – David Viscott"
  ];

  const API_KEY = "YOUR_PEXELS_API_KEY";
  const BASE_URL = "https://api.pexels.com/v1/search?query=flower&per_page=1&page=";

  // helper to compute ms until next local midnight
  function msUntilMidnight() {
    const now  = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return next.getTime() - now.getTime();
  }

  async function update() {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const idx = dayOfYear % 50; // Pexels API supports many pages; adjust as needed

    try {
      const res = await fetch(BASE_URL + (idx + 1), {
        headers: {
          Authorization: API_KEY
        }
      });

      const data = await res.json();

      if (!data.photos || !data.photos.length) {
        console.error("No flower image found for today.");
        return;
      }

      const imageUrl = data.photos[0].src.large;
      img.src = imageUrl;
      img.alt = "Flower of the Day";
      quoteEl.textContent = quotes[dayOfYear % quotes.length];
      console.log("Showing:", imageUrl, "— Quote:", quoteEl.textContent);

    } catch (err) {
      console.error("Failed to fetch flower image from Pexels:", err);
    }
  }

  // 1) Show today’s image immediately
  update();

  // 2) Schedule tomorrow’s update and daily refresh
  const DAY_MS = 24 * 60 * 60 * 1000;
  setTimeout(() => {
    update();                             // first nightly update
    setInterval(update, DAY_MS);          // then every 24h
  }, msUntilMidnight());
});

