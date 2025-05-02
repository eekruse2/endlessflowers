console.log("✔️ main.js loaded");

document.addEventListener('DOMContentLoaded', async () => {
  const img      = document.getElementById('daily-flower');
  const quoteEl  = document.getElementById('daily-quote');

  // build image list
  const res   = await fetch('flowers/');
  const text  = await res.text();
  const doc   = new DOMParser().parseFromString(text, 'text/html');
  const images = Array.from(doc.querySelectorAll('a'))
    .map(a => a.getAttribute('href'))
    .filter(name => /\.(jpe?g|png|gif|avif)$/i.test(name))
    .map(name => `flowers/${name}`);

  if (!images.length) {
    console.error("No images found in /flowers/");
    return;
  }

  // your quotes
  const quotes = [
    "“Love is composed of a single soul inhabiting two bodies.” – Aristotle",
    "“Where there is love there is life.” – Mahatma Gandhi",
    "“Love isn’t something you find. Love is something that finds you.” – Loretta Young",
    "“To love and be loved is to feel the sun from both sides.” – David Viscott",
    "“You know you’re in love when you can’t fall asleep because reality is finally better than your dreams.” – Dr. Seuss"
  ];

  let idx = 0;
  function update() {
    img.src       = images[idx];
    img.alt       = `Flower #${idx + 1}`;
    quoteEl.textContent = quotes[idx % quotes.length];
    console.log("Showing:", images[idx], "— Quote:", quoteEl.textContent);
    idx = (idx + 1) % images.length;
  }

  // helper to compute ms until next local midnight
  function msUntilMidnight() {
    const now  = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return next.getTime() - now.getTime();
  }

  // 1) Show today’s image immediately
  update();

  // 2) In msUntilMidnight() ms, run update & then every 24h
  const DAY_MS = 24 * 60 * 60 * 1000;
  setTimeout(() => {
    update();                             // first nightly update
    setInterval(update, DAY_MS);          // then every 24h
  }, msUntilMidnight());
});

