document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('archive-container');

  try {
    const res = await fetch('https://your-api-url.com/api/archive');
    const archive = await res.json();

    if (!archive.length) {
      container.innerHTML = "<p>No items in archive yet.</p>";
      return;
    }

    archive.forEach(entry => {
      const item = document.createElement('div');
      item.style.marginBottom = '2rem';

      const img = document.createElement('img');
      img.src = entry.imageUrl;
      img.alt = "Archived Flower";
      img.style.maxWidth = "300px";

      const quote = document.createElement('p');
      quote.textContent = entry.quote;

      const date = document.createElement('small');
      date.textContent = `Saved on: ${entry.date}`;

      item.appendChild(img);
      item.appendChild(quote);
      item.appendChild(date);

      container.appendChild(item);
    });
  } catch (err) {
    console.error('Failed to load archive:', err);
    container.innerHTML = "<p>Error loading archive.</p>";
  }
});

