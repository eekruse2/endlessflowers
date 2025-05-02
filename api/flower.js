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
} catch (err) {
  console.error("Failed to load flower image:", err);
}
