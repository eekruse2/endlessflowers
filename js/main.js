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

  try {
    // Load flower image list from JSON file
    const res = await fetch('flowers.json'); // adjust path if needed
    const images = await res.json();

    if (!images.length) {
      console.error("No images found in flowers.json");
      return;
    }

    // Determine today's index based on day of year
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const idx = dayOfYear % images.length;

    function update() {
      img.src = images[idx];
      img.alt = `Flower of the Day`;
      quoteEl.textContent = quotes[idx % quotes.length];
      console.log("Showing:", images[idx], "— Quote:", quoteEl.textContent);
    }

    // helper to compute ms until next local midnight
    function msUntilMidnight() {
      const now  = new Date();
      const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      return next.getTime() - now.getTime();
    }

    // 1) Show today’s image immediately
    update();

    // 2) Schedule tomorrow’s update and daily refresh
    const DAY_MS = 24 * 60 * 60 * 1000;
    setTimeout(() => {
      update();                             // first nightly update
      setInterval(update, DAY_MS);          // then every 24h
    }, msUntilMidnight());

  } catch (err) {
    console.error("Failed to load flowers.json or update image:", err);
  }
});

