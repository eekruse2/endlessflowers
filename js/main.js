console.log("✔️ main.js loaded");

document.addEventListener('DOMContentLoaded', async () => {
  const img     = document.getElementById('daily-flower');
  const quoteEl = document.getElementById('daily-quote');

  const quotes = [
    "“Love is composed of a single soul inhabiting two bodies.” – Aristotle",
    "“Where there is love there is life.” – Mahatma Gandhi",
    "“Love isn’t something you find. Love is something that finds you.” – Loretta Young",
    "“To love and be loved is to feel the sun from both sides.” – David Viscott"
  ];

  function msUntilMidnight() {
    const now  = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return next.getTime() - now.getTime();
  }

  async function update() {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % quotes.length;

    try {
      const res = await fetch(`/api/flower?day=${dayOfYear}`);
      const data = await res.json();

      if (!data.photos || !data.photos.length) throw new Error("No photos found");

      const imageUrl = data.photos[0].src.large;
      img.src = imageUrl;
      img.alt = "Flower of the Day";
      quoteEl.textContent = quotes[quoteIndex];
      console.log("Showing:", imageUrl, "— Quote:", quoteEl.textContent);
    } catch (err) {
      console.error("Failed to load flower image:", err);
    }
  }

  update(); // show immediately

  const DAY_MS = 24 * 60 * 60 * 1000;
  setTimeout(() => {
    update();                             // first nightly update
    setInterval(update, DAY_MS);          // then every 24h
  }, msUntilMidnight());

  // ✅ ADDITION: Save to Archive logic
  const saveBtn = document.getElementById('save-to-archive'); // Make sure this button exists in your HTML

  if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
      const archiveEntry = {
        date: new Date().toISOString().split('T')[0],
        imageUrl: img.src,
        quote: quoteEl.textContent
      };

      try {
        const res = await fetch('https://your-api-url.com/api/archive', { // Replace with your actual API domain
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(archiveEntry)
        });

        if (res.ok) {
          alert('Saved to shared archive!');
        } else {
          alert('Failed to save to archive.');
        }
      } catch (err) {
        console.error("Error saving to archive:", err);
        alert('Network error when saving.');
      }
    });
  }
});

